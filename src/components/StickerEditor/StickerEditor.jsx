import React, { useState, useRef, useEffect } from 'react';
import './StickerEditor.css';

// Import all stickers
const importStickers = () => {
  const stickers = [];
  const stickerContext = import.meta.glob('/src/assets/images/stickers/*.{png,webp}', { eager: true });
  
  for (const path in stickerContext) {
    stickers.push({
      id: path.split('/').pop().split('.')[0],
      src: stickerContext[path].default
    });
  }
  
  return stickers;
};

const Sticker = ({ sticker, onSelect, selected }) => {
  return (
    <div 
      className={`sticker-item ${selected ? 'selected' : ''}`}
      onClick={() => onSelect(sticker)}
    >
      <img src={sticker.src} alt={sticker.id} />
    </div>
  );
};

const DraggableSticker = ({ sticker, onRemove, initialPosition, onPositionChange, onSizeChange }) => {
  const [position, setPosition] = useState(initialPosition || { x: 50, y: 50 });
  const [size, setSize] = useState(100); // Size in pixels
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const stickerRef = useRef(null);

  const handleMouseDown = (e) => {
    // Prevent event from bubbling up to parent elements
    e.stopPropagation();
    
    if (e.target.classList.contains('resize-handle')) {
      setIsResizing(true);
      return;
    }
    
    setIsDragging(true);
    const rect = stickerRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    // Add event listeners for mouse move and up
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      e.preventDefault();
      const parentRect = stickerRef.current.parentElement.getBoundingClientRect();
      let newX = e.clientX - parentRect.left - dragOffset.x;
      let newY = e.clientY - parentRect.top - dragOffset.y;
      
      // Constrain to parent boundaries
      newX = Math.max(0, Math.min(newX, parentRect.width - size));
      newY = Math.max(0, Math.min(newY, parentRect.height - size));
      
      setPosition({ x: newX, y: newY });
      if (onPositionChange) {
        onPositionChange({ x: newX, y: newY });
      }
    } else if (isResizing) {
      e.preventDefault();
      const parentRect = stickerRef.current.parentElement.getBoundingClientRect();
      const stickerRect = stickerRef.current.getBoundingClientRect();
      const cursorX = e.clientX - parentRect.left;
      const cursorY = e.clientY - parentRect.top;
      
      const newWidth = Math.max(50, Math.min(cursorX - position.x, parentRect.width - position.x));
      const newHeight = Math.max(50, Math.min(cursorY - position.y, parentRect.height - position.y));
      const newSize = Math.min(newWidth, newHeight);
      
      setSize(newSize);
      if (onSizeChange) {
        onSizeChange(newSize);
      }
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging || isResizing) {
      e.preventDefault();
      const touch = e.touches[0];
      const parentRect = stickerRef.current.parentElement.getBoundingClientRect();
      
      if (isDragging) {
        let newX = touch.clientX - parentRect.left - dragOffset.x;
        let newY = touch.clientY - parentRect.top - dragOffset.y;
        
        // Constrain to parent boundaries
        newX = Math.max(0, Math.min(newX, parentRect.width - size));
        newY = Math.max(0, Math.min(newY, parentRect.height - size));
        
        setPosition({ x: newX, y: newY });
        if (onPositionChange) {
          onPositionChange({ x: newX, y: newY });
        }
      } else if (isResizing) {
        const cursorX = touch.clientX - parentRect.left;
        const cursorY = touch.clientY - parentRect.top;
        
        const newWidth = Math.max(50, Math.min(cursorX - position.x, parentRect.width - position.x));
        const newHeight = Math.max(50, Math.min(cursorY - position.y, parentRect.height - position.y));
        const newSize = Math.min(newWidth, newHeight);
        
        setSize(newSize);
        if (onSizeChange) {
          onSizeChange(newSize);
        }
      }
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };
  
  useEffect(() => {
    // Always add and remove event listeners when component mounts/unmounts
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, isResizing]); // Still depend on these states to trigger re-renders
  
  // Touch events support for mobile devices
  const handleTouchStart = (e) => {
    e.stopPropagation();
    
    if (e.target.classList.contains('resize-handle')) {
      setIsResizing(true);
      return;
    }
    
    setIsDragging(true);
    const touch = e.touches[0];
    const rect = stickerRef.current.getBoundingClientRect();
    setDragOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    });
    
    // Add event listeners for touch move and end
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
    setIsResizing(false);
  };
  
  // Touch event handling is now managed in the main useEffect hook above

  return (
    <div
      ref={stickerRef}
      className="draggable-sticker"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size}px`,
        height: `${size}px`,
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <img src={sticker.src} alt={sticker.id} />
      <button className="remove-sticker" onClick={onRemove}>×</button>
      <div className="resize-handle"></div>
    </div>
  );
};

const StickerEditor = ({ photos, onSave, onCancel }) => {
  const [stickers, setStickers] = useState([]);
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [appliedStickers, setAppliedStickers] = useState(Array(photos.length).fill([]).map(() => []));
  const [stickerSizes, setStickerSizes] = useState({});
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  
  useEffect(() => {
    // Load stickers
    const loadedStickers = importStickers();
    setStickers(loadedStickers);
  }, []);

  const handleStickerSelect = (sticker) => {
    setSelectedSticker(sticker);
  };

  const handlePhotoClick = (index) => {
    setActivePhotoIndex(index);
  };

  const handleAddSticker = (photoIndex) => {
    if (!selectedSticker) return;
    
    const stickerId = `${selectedSticker.id}-${Date.now()}`;
    const newAppliedStickers = [...appliedStickers];
    newAppliedStickers[photoIndex] = [
      ...newAppliedStickers[photoIndex],
      {
        id: stickerId,
        sticker: selectedSticker,
        position: { x: 50, y: 50 }
      }
    ];
    
    // Initialize size for this sticker
    setStickerSizes(prev => ({
      ...prev,
      [stickerId]: 100 // Default size
    }));
    
    setAppliedStickers(newAppliedStickers);
  };

  const handleRemoveSticker = (photoIndex, stickerId) => {
    const newAppliedStickers = [...appliedStickers];
    newAppliedStickers[photoIndex] = newAppliedStickers[photoIndex].filter(
      item => item.id !== stickerId
    );
    setAppliedStickers(newAppliedStickers);
    
    // Remove size entry for this sticker
    setStickerSizes(prev => {
      const newSizes = {...prev};
      delete newSizes[stickerId];
      return newSizes;
    });
  };
  
  const handleStickerPositionChange = (photoIndex, stickerId, newPosition) => {
    const newAppliedStickers = [...appliedStickers];
    const stickerIndex = newAppliedStickers[photoIndex].findIndex(item => item.id === stickerId);
    
    if (stickerIndex !== -1) {
      newAppliedStickers[photoIndex][stickerIndex] = {
        ...newAppliedStickers[photoIndex][stickerIndex],
        position: newPosition
      };
      setAppliedStickers(newAppliedStickers);
    }
  };
  
  const handleStickerSizeChange = (stickerId, newSize) => {
    setStickerSizes(prev => ({
      ...prev,
      [stickerId]: newSize
    }));
  };

  const handleSave = async () => {
    // Create a canvas for each photo with its stickers
    const editedPhotos = await Promise.all(photos.map(async (photo, index) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas dimensions to match photo
      canvas.width = 640; // Standard width from photobooth
      canvas.height = 480; // Standard height from photobooth
      
      // Load and draw the photo
      const img = new Image();
      await new Promise(resolve => {
        img.onload = resolve;
        img.src = photo.url;
      });
      
      // Apply the photo's filter if any
      if (photo.filter !== 'none') {
        ctx.filter = getFilterStyle(photo.filter);
      }
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.filter = 'none'; // Reset filter for stickers
      
      // Draw all stickers for this photo
      const photoContainer = document.querySelector('.photo-container');
      const containerRect = photoContainer.getBoundingClientRect();
      
      for (const stickerItem of appliedStickers[index]) {
        const stickerImg = new Image();
        await new Promise(resolve => {
          stickerImg.onload = resolve;
          stickerImg.src = stickerItem.sticker.src;
        });
        
        // Use the stored size for this sticker
        const stickerSize = stickerSizes[stickerItem.id] || 100; // Default to 100 if not found
        
        // Calculate the scaled position and size
        const scaleX = canvas.width / containerRect.width;
        const scaleY = canvas.height / containerRect.height;
        const scaledX = stickerItem.position.x * scaleX;
        const scaledY = stickerItem.position.y * scaleY;
        const scaledSize = stickerSize * Math.min(scaleX, scaleY);
        
        ctx.drawImage(
          stickerImg,
          scaledX,
          scaledY,
          scaledSize,
          scaledSize
        );
      }
      
      return {
        url: canvas.toDataURL('image/jpeg'),
        filter: photo.filter
      };
    }));
    
    onSave(editedPhotos);
  };

  // Helper function to get filter style (copied from Photobooth component)
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

  return (
    <div className="sticker-editor-container">
      <div className="sticker-editor-header">
        <h2>Edit Your Photos</h2>
        <p>Add stickers to customize your photostrip</p>
      </div>
      
      <div className="sticker-editor-content">
        <div className="sticker-panel">
          <h3>Stickers</h3>
          <div className="stickers-grid">
            {stickers.map(sticker => (
              <Sticker
                key={sticker.id}
                sticker={sticker}
                onSelect={handleStickerSelect}
                selected={selectedSticker && selectedSticker.id === sticker.id}
              />
            ))}
          </div>
          {selectedSticker && (
            <button 
              className="add-sticker-button"
              onClick={() => handleAddSticker(activePhotoIndex)}
            >
              Add to Photo {activePhotoIndex + 1}
            </button>
          )}
        </div>
        
        <div className="photostrip-preview">
          {photos.map((photo, index) => (
            <div 
              key={index} 
              className={`photo-container ${activePhotoIndex === index ? 'active' : ''}`}
              onClick={() => handlePhotoClick(index)}
            >
              <img 
                src={photo.url} 
                alt={`Photo ${index + 1}`} 
                className={photo.filter}
              />
              {appliedStickers[index].map(item => (
                <DraggableSticker
                  key={item.id}
                  sticker={item.sticker}
                  initialPosition={item.position}
                  onRemove={() => handleRemoveSticker(index, item.id)}
                  onPositionChange={(newPosition) => handleStickerPositionChange(index, item.id, newPosition)}
                  onSizeChange={(newSize) => handleStickerSizeChange(item.id, newSize)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="sticker-editor-actions">
        <button className="cancel-button" onClick={onCancel}>Cancel</button>
        <button className="save-button" onClick={handleSave}>Save & Download</button>
      </div>
    </div>
  );
};

export default StickerEditor;