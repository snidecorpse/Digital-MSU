import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Leva, useControls } from 'leva';
import '../styles/ModelPage.css';
import DraggableWindow from '../components/DraggableWindow';

const TestCube = ({ scale, rotation }) => {
    const { scene } = useGLTF('/models/testcube.gltf'); // GLTF model
    return <primitive object={scene} scale={scale} rotation={rotation} />;
  };
  

const ModelPage = () => {
  const [dividerPosition, setDividerPosition] = useState(66.6);
  const [newDividerPosition, setNewDividerPosition] = useState(66.6);
  const [isDragging, setIsDragging] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isLevaVisible, setIsLevaVisible] = useState(true); // Leva visibility
  const isDraggingRef = useRef(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    isDraggingRef.current = true;
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    if (isDraggingRef.current) {
      setDividerPosition(newDividerPosition);
    }
    setIsDragging(false);
    isDraggingRef.current = false;
  };

  const handleMouseMove = (e) => {
    if (isDraggingRef.current) {
      const newPos = (e.clientX / window.innerWidth) * 100;
      if (newPos > 20 && newPos < 80) {
        setNewDividerPosition(newPos);
      }
      setCursorPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const { ambientIntensity, directionalIntensity, pointIntensity, spotlightIntensity } = useControls(
    'Lights',
    {
      ambientIntensity: { value: 2, min: 0, max: 2, step: 0.1 },
      directionalIntensity: { value: 2, min: 0, max: 2, step: 0.1 },
      pointIntensity: { value: 2, min: 0, max: 2, step: 0.1 },
      spotlightIntensity: { value: 2, min: 0, max: 2, step: 0.1 },
    }
  );

  const { modelScale, rotationX, rotationY, rotationZ } = useControls('Model', {
    modelScale: { value: 0.5, min: 0.5, max: 3, step: 0.1 },
    rotationX: { value: 0.2, min: -Math.PI, max: Math.PI, step: 0.1 }, // Rotation on X
    rotationY: { value: -2.3, min: -Math.PI, max: Math.PI, step: 0.1 }, // Rotation on Y
    rotationZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.1 }, // Rotation on Z
  });


  return (
    <div
      className="model-page"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Leva */}
      {isLevaVisible && <Leva collapsed />}

      {/* Left: Three.js Viewer */}
      <div
        className={`viewer ${!isSidebarVisible ? 'viewer-fullscreen' : ''}`}
        style={{ flexBasis: `${dividerPosition}%` }}
      >
        <Canvas shadows>
          {/* Lights */}
          <ambientLight intensity={ambientIntensity} />
          <directionalLight
            position={[5, 10, 10]}
            intensity={directionalIntensity}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-10, 10, 10]} intensity={pointIntensity} />
          <spotLight
            position={[15, 20, 5]}
            angle={0.3}
            penumbra={1}
            intensity={spotlightIntensity}
            castShadow
          />

          {/* 3D Model */}
          <TestCube
            scale={[modelScale, modelScale, modelScale]}
            rotation={[rotationX, rotationY, rotationZ]}
          />
          {/* Controls */}
          <OrbitControls />
        </Canvas>
      </div>

      {/* Divider for resizing */}
      {isSidebarVisible && (
        <div
          className="divider"
          onMouseDown={handleMouseDown}
        ></div>
      )}

      {/* Dragging Indicator */}
      {isDragging && (
        <>
          {/* Line */}
          <div
            className="resize-line"
            style={{
              left: `${cursorPosition.x}px`,
            }}
          ></div>

          {/* Indicator */}
          <div
            className="resize-indicator"
            style={{
              left: `${cursorPosition.x}px`,
              top: `${cursorPosition.y}px`,
            }}
          >
            <span>Resize window to here</span>
          </div>
        </>
      )}

      {/* Sidebar or Floating Window */}
      {isSidebarVisible ? (
        <div className="ui">
          {/* Floating Window icon */}
      <button
  className="floating-window-button"
  onClick={() => setIsSidebarVisible(false)} // Toggle visibility
>
  ↗
</button>

          <h2>Model Controls</h2>
          <p>Use the controls below to interact with the model.</p>

          {/* Button Grid */}
          <div className="button-container">
            <button onClick={() => alert('Add Object')}>Add</button>
            <button onClick={() => alert('Modify Object')}>Modify</button>
            <button onClick={() => alert('Remove Object')}>Remove</button>
            <button onClick={() => alert('Reset View')}>Reset</button>
            <button onClick={() => setIsLevaVisible(!isLevaVisible)}>
              {isLevaVisible ? 'Hide Controls' : 'Show Controls'}
            </button>
          </div>
        </div>
      ) : (
        <DraggableWindow
          onClose={() => setIsSidebarVisible(true)} // Show sidebar when closing draggableWindow
        />
      )}
    </div>
  );
};

export default ModelPage;
