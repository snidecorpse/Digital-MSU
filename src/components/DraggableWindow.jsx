import React, { useState } from 'react';
import '../styles/DraggableWindow.css';

const DraggableWindow = ({ onClose }) => {
  const [position, setPosition] = useState({ x: 100, y: 100 }); // Initial position
  const [size, setSize] = useState({ width: 300, height: 200 }); // Initial size
  const [isDragging, setIsDragging] = useState(false); // Track dragging state
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // Offset for dragging

  // Handle dragging
  const handleMouseDownDrag = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false); // Stop dragging
  };

  // Handle resizing buttons
  const handleResize = (direction) => {
    const increment = direction === 'increase' ? 1 : -1;
    setSize((prev) => ({
      width: Math.max(200, prev.width + increment * 0), // horizontal (doesnt change (0)
      height: Math.max(100, prev.height + increment * 50), //vertical
    }));
  };

  return (
    <div
      className="draggable-window"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Stop dragging if the mouse leaves window boundary
    >
      {/* Header for dragging */}
      <div
        className="header"
        onMouseDown={handleMouseDownDrag}
      >
        <span>Floating Window</span>
        <div className="controls">
          <button onClick={() => handleResize('increase')} className="resize-button">
            +
          </button>
          <button onClick={() => handleResize('decrease')} className="resize-button">
            -
          </button>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="content">
        <h2>Resizable & Draggable Window</h2>
        <p>Use the + and - buttons to resize this window.</p>
      </div>
    </div>
  );
};

export default DraggableWindow;

