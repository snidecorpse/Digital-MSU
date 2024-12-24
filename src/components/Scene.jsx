import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const Scene = ({ children }) => {
  return (
    <Canvas>
      <ambientLight />
      <directionalLight position={[0, 5, 5]} />
      {children}
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;
