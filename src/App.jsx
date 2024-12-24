import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { extend } from '@react-three/fiber';
import ModelPage from './pages/ModelPage';
import './App.css'; // Include animation styles
import { AnimatePresence, motion } from 'framer-motion';

extend({ GLTFLoader });

const isMobile = () => {
    return /Mobi|Android/i.test(navigator.userAgent); // trying mobile detection
  };

const pageVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

const App = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.key}>
        <Route
          path="/"
          element={
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%', 
                display: 'flex', 
              }}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/viewer"
          element={
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%', 
                display: 'flex',
              }}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <ModelPage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
