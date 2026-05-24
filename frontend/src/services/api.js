import axios from 'axios';

// API setup for Express backend integration
const API_URL = import.meta.env.VITE_API_URL;
const PYTHON_API_URL = import.meta.env.VITE_PYTHON_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const pythonClient = axios.create({
  baseURL: PYTHON_API_URL,
});

// Request interceptor to add Authorization token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const apiService = {
  uploadImage: async (file, onProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await pythonClient.post('/remove-bg-image/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        }
      },
    });

    return {
      data: {
        id: response.data.download_url ? response.data.download_url.split('_').pop().split('.')[0] : 'img-id',
        status: response.data.status,
        originalUrl: URL.createObjectURL(file),
        resultUrl: response.data.download_url,
      }
    };
  },
  
  uploadVideo: async (file, onProgress) => {
    console.log('Stub: uploadVideo called with', file.name);
    
    // Simulate upload delay for UI testing
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (onProgress) onProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          resolve({ 
            data: { 
              id: 'mock-video-id-123', 
              status: 'processed', 
              originalUrl: URL.createObjectURL(file),
              resultUrl: URL.createObjectURL(file) // Mocking result with original video
            } 
          });
        }
      }, 300);
    });
  },
  
  getResult: async (id) => {
    console.log('Stub: getResult called for id', id);
    return Promise.resolve({ data: { status: 'completed' } });
    // return apiClient.get(`/result/${id}`);
  },

  deleteFile: async (id) => {
    console.log('Stub: deleteFile called for id', id);
    return Promise.resolve({ data: { success: true } });
    // return apiClient.delete(`/file/${id}`);
  },

  login: async (credentials) => {
    return apiClient.post('/auth/login', credentials);
  },

  signup: async (userData) => {
    return apiClient.post('/auth/signup', userData);
  },

  getMe: async () => {
    return apiClient.get('/auth/me');
  },

  submitContact: async (contactData) => {
    return apiClient.post('/contact', contactData);
  },

  selectPricing: async (pricingData) => {
    return apiClient.post('/pricing/select', pricingData);
  },

  verifyPayment: async (paymentData) => {
    return apiClient.post('/pricing/verify', paymentData);
  }
};
