import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css'; 

// particles Torus Knot Transition
const TorusParticles = ({ position, trigger }) => {
    const groupRef = useRef();
    const particleCount = 2200;
    const particles = Array.from({ length: particleCount }, () => ({
        position: [
            position[0] + (Math.random() - 0.5) * 10,
            position[1] + (Math.random() - 0.5) * 10,
            position[2] + (Math.random() - 0.5) * 10,
        ],
        velocity: [
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 6,
        ],
    }));

    useFrame((_, delta) => {
        if (trigger && groupRef.current) {
            groupRef.current.children.forEach((child, i) => {
                const particle = particles[i];
                child.position.x += particle.velocity[0] * delta;
                child.position.y += particle.velocity[1] * delta;
                child.position.z += particle.velocity[2] * delta;
                // particle.velocity[1] -= delta * 2;
            });
        }
    });

    return (
        <group ref={groupRef}>
            {particles.map((p, i) => (
                <mesh key={i} position={p.position} scale={0.1}>
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshStandardMaterial
                        color={Math.random() > 0.5 ? "#ffffff" : "#00ff00"} // Random white or green
                        emissive={Math.random() > 0.5 ? "#ffffff" : "#00ff00"} // Random white or green
                    />
                </mesh>
            ))}
        </group>
    );
};

// Reflective Torus Knot
const TorusKnot = ({ onClick, setParticlesPosition }) => {
  const torusRef = useRef();

  useFrame(({ clock }) => {
    if (torusRef.current) {
      const time = clock.getElapsedTime();
      torusRef.current.rotation.x = time * 0.3;
      torusRef.current.rotation.y = time * 0.5;
    }
  });

  return (
    <mesh
      ref={torusRef}
      position={[0, 0, 0]}
      onClick={() => {
        setParticlesPosition(torusRef.current.position.clone());
        onClick();
      }}
      castShadow
      receiveShadow
    >
      <torusKnotGeometry args={[1, 0.4, 128, 32]} />
      <meshStandardMaterial
        color="#ffffff"
        metalness={1}
        roughness={0.1}
        emissive="#ffffff"
        emissiveIntensity={0.1}
        envMapIntensity={1}
      />
    </mesh>
  );
};

const Home = () => {
  const [confettiTriggered, setConfettiTriggered] = useState(false);
  const [particlesPosition, setParticlesPosition] = useState([0, 0, 0]);
  const navigate = useNavigate();

  const handleClick = () => {
    setConfettiTriggered(true);
    setTimeout(() => {
      navigate('/viewer'); // Redirect after 2000 ms
    }, 2000);
  };

  return (
    <div className="home-container">
        {/* Overlay */}
      <div className="overlay-text">Enter the MSU virtual interactive platform</div>

      {/* Three.js  */}
      <Canvas shadows>
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={2} />

        {/* HDRI Environment */}
        <Environment preset="sunset" background={false} />

        {/* Torus Knot */}
        {!confettiTriggered && (
          <TorusKnot
            onClick={handleClick}
            setParticlesPosition={(pos) => setParticlesPosition(pos.toArray())}
          />
        )}

        {/* Particles Transition */}
        {confettiTriggered && <TorusParticles position={particlesPosition} trigger={confettiTriggered} />}

        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Home;
