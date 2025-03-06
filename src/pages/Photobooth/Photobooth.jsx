import React, { useRef, useState, useEffect } from 'react';
import PageTransition from '../../components/PageTransition';
import StickerEditor from '../../components/StickerEditor/StickerEditor';
import './Photobooth.css';

const Photobooth = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [selectedFrame, setSelectedFrame] = useState('white');
  const [showStickerEditor, setShowStickerEditor] = useState(false);

  const filters = [
    { name: 'none', label: 'Normal' },
    { name: 'greyscale', label: 'Greyscale' },
    { name: 'sepia', label: 'Sepia' },
    { name: 'warm', label: 'Warm' },
    { name: 'cold', label: 'Cold' },
    { name: 'soft', label: 'Soft' }
  ];

  const frames = [
    { color: 'white', label: 'White' },
    { color: 'black', label: 'Black' },
    { color: 'blue', label: 'Blue' },
    { color: 'pink', label: 'Pink' },
    { color: 'yellow', label: 'Yellow' },
    { color: 'violet', label: 'Violet' }
  ];

  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640,
          height: 480
        } 
      });
      videoRef.current.srcObject = stream;
      setIsCameraActive(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Unable to access camera. Please ensure you have granted camera permissions.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const startCountdown = () => {
    if (photos.length >= 4 || isCountingDown) return;
    
    setIsCountingDown(true);
    setCountdown(3);
    
    let count = 3;
    const timer = setInterval(() => {
      count--;
      if (count < 0) {
        clearInterval(timer);
        setIsCountingDown(false);
        capturePhoto();
      } else {
        setCountdown(count);
      }
    }, 1000);
  };

  const capturePhoto = () => {
    if (photos.length >= 4) {
      alert("Maximum number of photos (4) reached!");
      return;
    }

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

    // Set canvas dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame
    // Temporary canvas for un-mirroring
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = video.videoWidth;
    tempCanvas.height = video.videoHeight;

    // First, draw the mirrored video to temp canvas
    tempCtx.scale(-1, 1);
    tempCtx.drawImage(video, -tempCanvas.width, 0, tempCanvas.width, tempCanvas.height);

    // Now draw the un-mirrored image to main canvas with filter
    if (selectedFilter !== 'none') {
      context.filter = getFilterStyle(selectedFilter);
    }
    context.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);

    const photoUrl = canvas.toDataURL('image/jpeg');
    setPhotos(prevPhotos => [...prevPhotos, { url: photoUrl, filter: selectedFilter }]);

    // Play capture sound
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZRA0PVqzn77BdGAg+ltryxnMpBSl+zPLaizsIGGS57OihUBELTKXh8bllHgU2jdXzzn0vBSF1xe/glEILElyx6OyrWBUIQ5zd8sFuJAUuhM/z1YU2Bhxqvu7mnEYODlOq5O+zYBoGPJPY88p2KwUme8rx3I4+CRZiturqpVITC0mi4PK8aB8GM4nU8tGAMQYfcsLu45ZFDBFZr+ftrVoXCECY3PLEcSYELIHO8diJOQgZaLvt559NEAxPqOPwtmMcBjiP1/PMeS0GI3fH8N2RQAoUXrTp66hVFApGnt/yvmwhBTGH0fPTgjQGHW/A7+OZRA0PVqzn77BdGAg+ltrzxnUoBSh+zPLaizsIGGS57OihUBELTKXh8bllHgU1jdXzzn0vBSF1xe/glEILElyx6OyrWBUIQ5zd8sFuJAUug8/z1YU2BhxsvuvlnEYODlOq5O+zYRsGPJPY88p2KwUme8rx3I4+CRZht+rqpVITC0mi4PK8aB8GM4nU8tGAMQYfcsPu45ZFDBFZr+ftrVoXCECY3PLEcSYELIHO8diJOQgZaLvt559NEAxPqOPwtmMcBjiP1/PMeS0GI3fH8N2RQAoUXrTp66hVFApGnt/yvmwhBTGH0fPTgjQGHW/A7+OZRA0PVqzn77BdGAg+ltrzxnUoBSh+zPLaizsIGGS57OihUBELTKXh8bllHgU1jdXzzn0vBSF1xe/glEILElyx6OyrWBUIQ5zd8sFuJAUug8/z1YU2BhxsvuvlnEYODlOq5O+zYRsGPJPY88p2KwUme8rx3I4+CRZht+rqpVITC0mi4PK8aB8GM4nU8tGAMQYfcsPu45ZFDBFZr+ftrVoXCECY3PLEcSYELIHO8diJOQgZaLvt559NEAxPqOPwtmMcBjiP1/PMeS0GI3fH8N2RQAoUXrTp66hVFApGnt/yvmwhBTGH0fPTgjQGHW/A7+OZRA0PVqzn77BdGAg+ltrzxnUoBSh+zPLaizsIGGS57OihUBELTKXh8bllHgU1jdXzzn0vBSF1xe/glEILElyx6OyrWBUIQ5zd8sFuJAUug8/z1YU2BhxsvuvlnEYODlOq5O+zYRsGPJPY88p2KwUme8rx3I4+CRZht+rqpVITC0mi4PK8aB8GM4nU8tGAMQYfcsLu45ZFDBFZr+ftrVoXCECY3PLEcSYELYDO8diJOQgZabvt559NEAxPqOPwtmMcBjiP1/PMeS0GI3fH8N2RQAoUXrTp66hVFApGnt/yvmwhBTGH0fPTgjQGHW/A7+OZRA0PVqzn77BdGAg+ltrzxnUoBSh+zPLaizsIGGS57OihUBELTKXh8bllHgU1jdXzzn0vBSF1xe/glEILElyx6OyrWBUIQ5zd8sFuJAUug8/z1YU2BhxsvuvlnEYODlOq5O+zYRsGPJPY88p2KwUme8rx3I4+CRZht+rqpVITC0mi4PK8aB8GM4nU8tGAMQYfcsLu45ZFDBFZr+ftrVoXCECY3PLEcSYELYDO8diJOQgZabvt559NEAxPqOPwtmMcBjiP1/PMeS0');
    audio.play();

    if (photos.length === 3) {
      stopCamera();
    }
  };

  const getFilterStyle = (filter) => {
    switch (filter) {
      case 'greyscale':
        return 'grayscale(100%)';
      case 'sepia':
        return 'sepia(100%)';
      case 'warm':
        return 'contrast(110%) brightness(110%) saturate(130%)';
      case 'cold':
        return 'contrast(90%) brightness(100%) saturate(70%) hue-rotate(180deg)';
      case 'soft':
        return 'brightness(110%) contrast(90%) saturate(90%) blur(0.5px)';
      default:
        return 'none';
    }
  };

  const downloadPhotostrip = () => {
    if (photos.length === 0) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const padding = 20;
    const frameWidth = 20;
    const photoWidth = 640;
    const photoHeight = 480;
    
    canvas.width = photoWidth + (padding * 2) + (frameWidth * 2);
    canvas.height = (photoHeight * photos.length) + (padding * (photos.length + 1)) + (frameWidth * 2);
    
    // Draw frame background
    ctx.fillStyle = selectedFrame;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Load and draw all photos
    const loadImages = photos.map((photo, index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          // Create temporary canvas for filter application
          const tempCanvas = document.createElement('canvas');
          const tempCtx = tempCanvas.getContext('2d');
          tempCanvas.width = photoWidth;
          tempCanvas.height = photoHeight;
          
          // Apply filter if any
          if (photo.filter !== 'none') {
            tempCtx.filter = getFilterStyle(photo.filter);
          }
          
          // Draw image with filter
          tempCtx.drawImage(img, 0, 0, photoWidth, photoHeight);
          
          // Draw filtered image onto main canvas
          ctx.drawImage(
            tempCanvas,
            padding + frameWidth,
            padding + frameWidth + (index * (photoHeight + padding)),
            photoWidth,
            photoHeight
          );
          resolve();
        };
        img.src = photo.url;
      });
    });

    Promise.all(loadImages).then(() => {
      const link = document.createElement('a');
      link.download = 'photostrip.jpg';
      link.href = canvas.toDataURL('image/jpeg', 0.8);
      link.click();
    });
  };

  const resetPhotobooth = () => {
    setPhotos([]);
    startCamera();
  };

  const handleOpenStickerEditor = () => {
    setShowStickerEditor(true);
  };

  const handleStickerEditorCancel = () => {
    setShowStickerEditor(false);
  };

  const handleStickerEditorSave = (editedPhotos) => {
    setPhotos(editedPhotos);
    setShowStickerEditor(false);
  };

  return (
    <PageTransition>
      <div className="photobooth-container">
        <div className="photobooth-header">
          <h1 className="main-title">TRY MY PHOTOBOOTH</h1>
          <p className="subtitle">Create your own photostrip with cool filters & frames!</p>
        </div>
        <div className="photobooth-content">
          <div className="main-section">
            <div className="camera-section">
              {!isCameraActive && photos.length === 0 && (
                <button className="start-button" onClick={startCamera}>
                  Start Photobooth
                </button>
              )}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className={`${isCameraActive ? 'visible' : 'hidden'} ${selectedFilter}`}
              />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
              {isCountingDown && (
                <div className="countdown-overlay">
                  <span className="countdown-number">{countdown}</span>
                </div>
              )}
              {isCameraActive && !isCountingDown && (
                <button className="capture-button" onClick={startCountdown}>
                  Take Photo ({photos.length}/4)
                </button>
              )}
            </div>

            <div className="photos-preview">
              {photos.map((photo, index) => (
                <div key={index} className="preview-photo">
                  <img 
                    src={photo.url} 
                    alt={`Preview ${index + 1}`}
                    className={photo.filter}
                  />
                </div>
              ))}
            </div>
          </div>

          {isCameraActive && (
            <div className="filter-section">
              <h3>Select Filter</h3>
              <div className="filter-options">
                {filters.map((filter) => (
                  <button
                    key={filter.name}
                    className={`filter-button ${selectedFilter === filter.name ? 'active' : ''}`}
                    onClick={() => setSelectedFilter(filter.name)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {photos.length === 4 && (
            <div className="final-options">
              <div className="frame-section">
                <h3>Select Frame Color</h3>
                <div className="frame-options">
                  {frames.map((frame) => (
                    <button
                      key={frame.color}
                      className={`frame-button ${selectedFrame === frame.color ? 'active' : ''}`}
                      onClick={() => setSelectedFrame(frame.color)}
                      style={{ backgroundColor: frame.color }}
                    >
                      <span>{frame.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="action-buttons">
                <button className="edit-button" onClick={handleOpenStickerEditor}>
                  Edit Pictures
                </button>
                <button className="download-button" onClick={downloadPhotostrip}>
                  Download Photostrip
                </button>
                <button className="reset-button" onClick={resetPhotobooth}>
                  Take New Photos
                </button>
              </div>
            </div>
          )}
        </div>
        {showStickerEditor && (
          <StickerEditor 
            photos={photos} 
            onSave={handleStickerEditorSave} 
            onCancel={handleStickerEditorCancel} 
          />
        )}
      </div>
    </PageTransition>
  );
};

export default Photobooth;
