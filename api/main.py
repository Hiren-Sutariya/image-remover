from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
import uuid
import numpy as np
import cv2
from rembg import remove, new_session

app = FastAPI()

# --- 1. CORS સેટિંગ્સ ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Folder Setup
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(BASE_DIR, "outputs")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# --- 2. Static Files સેટઅપ ---
app.mount("/outputs", StaticFiles(directory=OUTPUT_DIR), name="outputs")

# --- 3. AI મોડલ સેટઅપ ---
# 'birefnet-general' મોડેલ સિંગલ ફોટામાંથી પાછળના વધારાના ક્રાઉડને સાફ કરવા માટે બેસ્ટ છે
session = new_session("birefnet-general")

# --- 4. API Endpoints ---

@app.get("/")
async def root():
    return {"message": "AI Image Background Remover Pro is Live & Running!"}

# ફક્ત ઈમેજ બેકગ્રાઉન્ડ રિમૂવલ એન્ડપોઇન્ટ (Premium Quality Fix)
@app.post("/remove-bg-image/")
async def remove_image_background(file: UploadFile = File(...)):
    file_id = str(uuid.uuid4())[:8]
    output_filename = f"perfect_img_{file_id}.png"
    output_path = os.path.join(OUTPUT_DIR, output_filename)

    try:
        # 1. ઈમેજ ડેટા રીડ કરો
        input_data = await file.read()
        
        # 2. એડવાન્સ BiRefNet મોડેલ વડે પ્રોસેસિંગ
        output_rgba_bytes = remove(
            input_data,
            session=session,
            alpha_matting=True,
            alpha_matting_foreground_threshold=240,
            alpha_matting_background_threshold=30,  # બેકગ્રાઉન્ડ થ્રેશોલ્ડ વધારે હોવાથી પાછળના વધારાના ઓબ્જેક્ટ્સ સાફ થશે
            alpha_matting_erode_size=8
        )
        
        # 3. OpenCV વડે ફાઇનલ કિનારીઓ અને ક્લીનિંગ પ્રોસેસ
        nparr = np.frombuffer(output_rgba_bytes, np.uint8)
        img_rgba = cv2.imdecode(nparr, cv2.IMREAD_UNCHANGED)
        
        if img_rgba is not None and img_rgba.shape[2] == 4:
            alpha = img_rgba[:, :, 3]
            
            # કોઈપણ છૂટાછવાયા ઝીણા પિક્સેલ્સ કે ગ્લેચ હટાવવા માટે Morphological Opening
            kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
            alpha = cv2.morphologyEx(alpha, cv2.MORPH_OPEN, kernel)
            
            # સૌથી પરફેક્ટ એજ માટે હળવું બ્લર
            alpha = cv2.GaussianBlur(alpha, (3, 3), 0)
            img_rgba[:, :, 3] = alpha

            cv2.imwrite(output_path, img_rgba)
        else:
            with open(output_path, "wb") as f:
                f.write(output_rgba_bytes)

        return {
            "status": "Success",
            "type": "image",
            "download_url": f"http://127.0.0.1:8001/outputs/{output_filename}"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)