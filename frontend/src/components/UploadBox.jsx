import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Image as ImageIcon, Video as VideoIcon, AlertCircle, Loader2, X, Volume2, VolumeX, Sparkles, Download } from 'lucide-react';
import { apiService } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const UploadBox = ({ type = 'image' }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, uploading, processing, success, error
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [viewMode, setViewMode] = useState('comparison'); // comparison, result, original
  const [muteOnDownload, setMuteOnDownload] = useState(false);
  const [downloadClarity, setDownloadClarity] = useState('original'); // original, enhanced
  const [imageQuality, setImageQuality] = useState('standard'); // standard, 2k, 4k

  const handleUpload = useCallback(async (fileToUpload) => {
    try {
      setStatus('uploading');
      setProgress(0);

      if (type === 'video') {
        const response = await apiService.uploadVideo(fileToUpload, (p) => setProgress(p));
        setStatus('processing');
        // Simulate video processing time for mock
        setTimeout(() => {
          setResult(response.data);
          setStatus('success');
        }, 2500);
      } else {
        const response = await apiService.uploadImage(fileToUpload, (p) => {
          setProgress(p);
          if (p >= 100) {
            setStatus('processing');
          }
        });
        setResult(response.data);
        setStatus('success');

        // Background removal is free and unlimited
      }

    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg(
        type === 'video' 
          ? 'Failed to process video. Please try again.' 
          : 'Failed to process image. Please try again.'
      );
    }
  }, [type, user]);

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles?.length > 0) {
      const selectedFile = acceptedFiles[0];
      
      // Upload size checks
      
      // Validation based on type
      const maxSize = type === 'video' ? 50 * 1024 * 1024 : 12 * 1024 * 1024;
      if (selectedFile.size > maxSize) {
        setStatus('error');
        setErrorMsg(
          type === 'video' 
            ? 'Video file size must be less than 50MB' 
            : 'Image file size must be less than 12MB'
        );
        return;
      }

      setFile(Object.assign(selectedFile, {
        preview: URL.createObjectURL(selectedFile)
      }));

      handleUpload(selectedFile);
    }
  }, [type, user, handleUpload]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    accept: type === 'video' ? {
      'video/mp4': ['.mp4'],
      'video/quicktime': ['.mov'],
      'video/webm': ['.webm']
    } : {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxFiles: 1,
    disabled: status !== 'idle' && status !== 'error'
  });

  const resetState = () => {
    if (file) URL.revokeObjectURL(file.preview);
    setFile(null);
    setStatus('idle');
    setProgress(0);
    setResult(null);
    setErrorMsg('');
    setViewMode('comparison');
    setMuteOnDownload(false);
    setDownloadClarity('original');
    setImageQuality('standard');
  };

  const handleDownload = async () => {
    if (!file) return;

    // Unlimited downloads for all qualities

    const downloadUrl = result?.resultUrl || file.preview;
    
    try {
      let finalUrl = downloadUrl;
      
      // If it's a remote URL, fetch as blob to trigger direct download
      if (downloadUrl.startsWith('http')) {
        const response = await fetch(downloadUrl);
        const blob = await response.blob();
        finalUrl = URL.createObjectURL(blob);
      }

      const link = document.createElement('a');
      link.href = finalUrl;

      const nameParts = file.name.split('.');
      const ext = nameParts.pop();
      const baseName = nameParts.join('.');
      const suffix = type === 'video' 
        ? `${muteOnDownload ? '-muted' : '-with-audio'}-${downloadClarity}`
        : `-removed-bg-${imageQuality}`;

      link.download = `${baseName}${suffix}.${ext}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the object URL if we created one
      if (finalUrl !== downloadUrl) {
        URL.revokeObjectURL(finalUrl);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      // Fallback: attempt direct link download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.target = '_blank';
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const selectBtnText = type === 'video' ? t('videoObjectRemover.selectBtn') : t('hero.selectBtn');
  const dragDropText = type === 'video' ? t('videoObjectRemover.dragDrop') : t('hero.dragDrop');

  return (
    <div className="w-full bg-white rounded-3xl p-2 shadow-xl border border-gray-100">
      {status === 'idle' || status === 'error' ? (
        <div
          {...getRootProps()}
          className={`
            w-full rounded-2xl border-2 border-dashed relative overflow-hidden group transition-all duration-300 min-h-[250px] flex flex-col items-center justify-center p-6
            ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50/50'}
          `}
        >
          <input {...getInputProps()} />

          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/50 pointer-events-none z-0"></div>

          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            {/* Glowing Icon Container */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 animate-pulse group-hover:bg-primary/30 transition-colors"></div>
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center relative z-10 text-primary group-hover:scale-105 transition-transform">
                <UploadCloud size={32} strokeWidth={1.5} />
              </div>
            </div>

            <button
              onClick={open}
              className="bg-foreground hover:bg-black text-white rounded-xl px-7 py-3 flex items-center gap-2 font-bold text-[14px] shadow-lg shadow-black/10 transition-all mb-3"
            >
              {selectBtnText}
            </button>

            <p className="text-xs text-gray-500 font-medium mb-3">
              {dragDropText}
            </p>

            {type === 'video' ? (
              <div className="flex flex-wrap justify-center gap-2 text-[11px] font-bold text-gray-400">
                <span className="bg-white border border-gray-100 px-2.5 py-1 rounded-md">MP4</span>
                <span className="bg-white border border-gray-100 px-2.5 py-1 rounded-md">MOV</span>
                <span className="bg-white border border-gray-100 px-2.5 py-1 rounded-md">WEBM</span>
                <span className="bg-white border border-gray-100 px-2.5 py-1 rounded-md">UP TO 50MB</span>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-2 text-[11px] font-bold text-gray-400">
                <span className="bg-white border border-gray-100 px-2.5 py-1 rounded-md">JPG</span>
                <span className="bg-white border border-gray-100 px-2.5 py-1 rounded-md">PNG</span>
                <span className="bg-white border border-gray-100 px-2.5 py-1 rounded-md">WEBP</span>
                <span className="bg-white border border-gray-100 px-2.5 py-1 rounded-md">UP TO 12MB</span>
              </div>
            )}

            {status === 'error' && (
              <div className="mt-6 px-4 py-3 bg-red-50 text-red-600 rounded-xl flex items-center gap-2 text-sm font-medium border border-red-100">
                <AlertCircle size={18} />
                {errorMsg}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full rounded-2xl border border-gray-100 relative overflow-hidden bg-white">
          {/* Close button */}
          {status === 'success' && (
            <button
              onClick={resetState}
              className="absolute top-4 right-4 z-50 p-2 bg-black/40 hover:bg-black text-white rounded-full backdrop-blur-md transition-colors"
            >
              <X size={16} />
            </button>
          )}

          <div className="relative aspect-video bg-gray-900 overflow-hidden flex items-center justify-center">
            {/* View Switcher Controls (Overlay) */}
            {status === 'success' && (
              <div className="absolute top-4 left-4 z-40 flex items-center gap-1 bg-black/60 backdrop-blur-md p-1 rounded-xl border border-white/10 shadow-lg">
                <button
                  type="button"
                  onClick={() => setViewMode('comparison')}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                    viewMode === 'comparison'
                      ? 'bg-white text-black shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Comparison
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('result')}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                    viewMode === 'result'
                      ? 'bg-white text-black shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Result
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('original')}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                    viewMode === 'original'
                      ? 'bg-white text-black shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Original
                </button>
              </div>
            )}

            {/* PRE-SUCCESS STATE OR SINGLE VIEW MODES */}
            {(status !== 'success' || viewMode === 'original' || viewMode === 'result') && (
              <div className="absolute inset-0 flex items-center justify-center">
                {status === 'success' && viewMode === 'result' ? (
                  <div className={`absolute inset-0 flex items-center justify-center ${type === 'image' ? 'custom-checkerboard' : 'bg-gray-950'}`}>
                    {type === 'video' ? (
                      <video
                        src={result?.resultUrl || file.preview}
                        autoPlay
                        loop
                        muted
                        controls
                        playsInline
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <img
                        src={result?.resultUrl || file.preview}
                        className="max-w-full max-h-full object-contain"
                        alt="Result"
                      />
                    )}
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {type === 'video' ? (
                      <video
                        src={file.preview}
                        autoPlay
                        loop
                        muted
                        {...(status === 'success' && viewMode === 'original' ? { controls: true } : {})}
                        playsInline
                        className={`w-full h-full object-contain transition-opacity duration-1000 ${
                          status === 'success' ? 'opacity-100' : 'opacity-50'
                        }`}
                      />
                    ) : (
                      <img
                        src={file.preview}
                        className={`w-full h-full object-contain transition-opacity duration-1000 ${
                          status === 'success' ? 'opacity-100' : 'opacity-50'
                        }`}
                        alt="Preview"
                      />
                    )}
                  </div>
                )}
              </div>
            )}

            {/* COMPARISON VIEW MODE (SIDE-BY-SIDE SPLIT GRID) */}
            {status === 'success' && viewMode === 'comparison' && (
              <div className="absolute inset-0 grid grid-cols-2 gap-px bg-gray-800">
                {/* Left Side: Original */}
                <div className="relative h-full flex items-center justify-center overflow-hidden bg-gray-950">
                  {type === 'video' ? (
                    <video
                      src={file.preview}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <img
                      src={file.preview}
                      className="w-full h-full object-contain"
                      alt="Original"
                    />
                  )}
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-md text-[10px] font-bold text-white uppercase tracking-wider select-none">
                    Original
                  </span>
                </div>

                {/* Right Side: Result */}
                <div className={`relative h-full flex items-center justify-center overflow-hidden ${type === 'image' ? 'custom-checkerboard' : 'bg-gray-950'}`}>
                  {type === 'video' ? (
                    <video
                      src={result?.resultUrl || file.preview}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <img
                      src={result?.resultUrl || file.preview}
                      className="w-full h-full object-contain"
                      alt="Result"
                    />
                  )}
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-[#0047FF] text-white rounded-md text-[10px] font-bold uppercase tracking-wider select-none">
                    Result
                  </span>
                </div>
              </div>
            )}

            {/* Scanning effect overlay */}
            {(status === 'uploading' || status === 'processing') && (
              <>
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-10" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20">
                  <Loader2 size={40} className="animate-spin mb-6 text-primary" strokeWidth={1.5} />
                  <span className="font-medium text-xl tracking-tight mb-2">
                    {status === 'uploading' 
                      ? `Uploading ${progress}%` 
                      : (type === 'video' ? 'AI is removing video object...' : 'AI is removing background...')}
                  </span>
                  <span className="text-sm text-gray-400 font-light">
                    {status === 'processing' ? 'Processing frame by frame' : 'Please wait'}
                  </span>
                </div>
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary shadow-[0_0_20px_rgba(212,175,55,1)] z-30 opacity-70" />
              </>
            )}
          </div>

          <div className="p-4 sm:p-5 flex flex-col gap-4 bg-white border-t border-gray-100">
            {/* Top Row: File Info */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3 select-none">
                <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 shrink-0 shadow-sm">
                  {type === 'video' ? <VideoIcon size={18} strokeWidth={1.5} className="text-primary" /> : <ImageIcon size={18} strokeWidth={1.5} className="text-primary" />}
                </div>
                <div className="overflow-hidden">
                  <p className="font-semibold text-xs text-foreground truncate max-w-[200px] sm:max-w-xs md:max-w-md">{file.name}</p>
                  <p className="text-[10px] text-gray-400 font-medium">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
              
              {status === 'success' && (
                <span className="px-2.5 py-1 bg-green-50 text-green-700 border border-green-100 rounded-lg text-[10px] font-bold uppercase tracking-wider select-none">
                  Processed
                </span>
              )}
            </div>

            {/* Separator line */}
            <div className="border-t border-gray-50 w-full my-0.5"></div>

            {/* Bottom Row: Controls */}
            {status === 'success' ? (
              <div className="flex flex-col items-stretch gap-3 w-full">
                {type === 'video' ? (
                  <div className="flex flex-col gap-3 w-full">
                    {/* Audio + Quality row */}
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Audio Option Switcher */}
                      <div className="flex items-center bg-gray-50 p-1 rounded-xl border border-gray-200/50 shadow-sm flex-1 min-w-[160px]">
                        <button
                          type="button"
                          onClick={() => setMuteOnDownload(false)}
                          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            !muteOnDownload
                              ? 'bg-white text-gray-900 shadow-sm border border-gray-100 font-bold'
                              : 'text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          <Volume2 size={13} className={!muteOnDownload ? 'text-primary' : 'text-gray-400'} />
                          <span>With Audio</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setMuteOnDownload(true)}
                          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            muteOnDownload
                              ? 'bg-white text-gray-900 shadow-sm border border-gray-100 font-bold'
                              : 'text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          <VolumeX size={13} className={muteOnDownload ? 'text-red-500' : 'text-gray-400'} />
                          <span>Mute Audio</span>
                        </button>
                      </div>

                      {/* Quality Switcher */}
                      <div className="flex items-center bg-gray-50 p-1 rounded-xl border border-gray-200/50 shadow-sm flex-1 min-w-[160px]">
                        <button
                          type="button"
                          onClick={() => setDownloadClarity('original')}
                          className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all text-center ${
                            downloadClarity === 'original'
                              ? 'bg-white text-gray-900 shadow-sm border border-gray-100 font-bold'
                              : 'text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          Original
                        </button>
                        <button
                          type="button"
                          onClick={() => setDownloadClarity('enhanced')}
                          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            downloadClarity === 'enhanced'
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm border border-blue-600 font-bold'
                              : 'text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          <Sparkles size={12} className={downloadClarity === 'enhanced' ? 'text-white' : 'text-gray-400'} />
                          <span>AI Enhanced</span>
                        </button>
                      </div>
                    </div>

                    {/* Download Button — full width */}
                    <button 
                      onClick={handleDownload}
                      className="bg-primary hover:bg-primary/90 hover:scale-[1.01] active:scale-[0.99] text-white w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 select-none cursor-pointer"
                    >
                      <Download size={14} />
                      <span>Download Video</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 w-full">
                    {/* Image Quality Switcher — full width, equal segments */}
                    <div className="flex items-center bg-gray-50 p-1 rounded-xl border border-gray-200/50 shadow-sm w-full">
                      <button
                        type="button"
                        onClick={() => setImageQuality('standard')}
                        className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-semibold transition-all text-center ${
                          imageQuality === 'standard'
                            ? 'bg-white text-gray-900 shadow-sm border border-gray-100 font-bold'
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        Standard
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageQuality('2k')}
                        className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-semibold transition-all text-center ${
                          imageQuality === '2k'
                            ? 'bg-white text-gray-900 shadow-sm border border-gray-100 font-bold'
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        HD (2K)
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageQuality('4k')}
                        className={`flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          imageQuality === '4k'
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm border border-blue-600 font-bold'
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        <Sparkles size={11} className={imageQuality === '4k' ? 'text-white' : 'text-gray-400'} />
                        <span>Ultra HD (4K)</span>
                      </button>
                    </div>

                    {/* Download Button — full width below quality switcher */}
                    <button 
                      onClick={handleDownload}
                      className="bg-primary hover:bg-primary/90 hover:scale-[1.01] active:scale-[0.99] text-white w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 select-none cursor-pointer"
                    >
                      <Download size={14} />
                      <span>Download Image</span>
                    </button>
                  </div>
                )}</div>
            ) : (
              <div className="w-full flex justify-end">
                <div className="px-4 py-2 bg-gray-50 rounded-lg text-xs font-bold text-gray-400 shadow-inner">
                  Processing...
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* No popups needed */}
    </div>
  );
};

export default UploadBox;
