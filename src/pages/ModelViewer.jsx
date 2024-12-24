import React from 'react';
import Scene from '../components/Scene';
import { useGLTF } from '@react-three/drei';

const Model = () => {
  const { scene } = useGLTF('/path-to-your-model.glb'); // model path here (model must be in root folder models/)
  return <primitive object={scene} scale={0.5} />;
};

const ModelViewer = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#222' }}>
      <Scene>
        <Model />
      </Scene>
    </div>
  );
};

export default ModelViewer;
