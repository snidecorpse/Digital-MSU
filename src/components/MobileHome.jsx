import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MobileHome.css';

const MobileHome = () => {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate('/viewer'); // model viewer page direct ModelPage.jsx
  };

  return (
    <div className="mobile-home-container">
      <button className="mobile-home-button" onClick={handleEnter}>
        Enter
      </button>
      <p className="mobile-home-disclaimer">
        Support for mobile is under development. Please use a larger screen or laptop for the full experience.
      </p>
    </div>
  );
};

export default MobileHome;
