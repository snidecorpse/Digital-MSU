import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';
import { OrbitControls } from '@react-three/drei';

const Button3D = ({ children, to }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to); 
  };

  return (
    <group onClick={handleClick}>
      {children}
    </group>
  );
};

export default Button3D;
