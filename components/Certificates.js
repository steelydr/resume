import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material';
import Modal from './Modal.js';

const colors = {
  primary: '#8A2BE2', // Violet
  secondary: '#4B0082', // Indigo
  accent: '#DA70D6', // Orchid
  text: '#E9E9E9', // Light Grey
  background: '#1F1F1F', 
  white: '#FFFFFF', 
};

const CertificatesWrapper = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '20px',
  position: 'relative',
  alignItems: 'center',
  fontFamily: 'Montserrat, sans-serif',
  marginBottom: '5rem',
});

const CList = styled('div')(({ isOdd, isAnimated }) => ({
  fontFamily: 'Montserrat, sans-serif',
  marginRight: '10rem',
  marginLeft: '10rem',

  '.num': {
    padding: '0.5rem 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    opacity: isAnimated ? 1 : 0,
    transform: isAnimated 
      ? 'translateX(0)' 
      : `translateX(${isOdd ? '-100%' : '100%'})`,
    transition: 'opacity 1.5s ease-out, transform 1.5s ease-out',
  },

  '.num h3': {
    position: 'relative',
    left: '-1.5rem',
    color: colors.text,
    fontSize: '1rem',
    transition: '0.25s',
  },

  '.num:hover': {
    background: 'linear-gradient(to right, rgba(234,173,231, 0.8), rgba(234,173,231, 0))',
    cursor: 'pointer',
  },

  '.num:hover h3': {
    left: '1rem',
    color: colors.background,
  },

  '@media (max-width: 1200px)': {
    marginRight: '5rem',
    marginLeft: '5rem',

    '.num': {
      padding: '0.5rem 1.5rem',
    },
  },

  '@media (max-width: 768px)': {
    marginRight: '2.5rem',
    marginLeft: '2.5rem',
  },

  '@media (max-width: 480px)': {
    marginRight: '2.5rem',
    marginLeft: '2.5rem',
  },
}));

const Certificates = ({ userData }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [animatedItems, setAnimatedItems] = useState([]);

  const handleClick = (imagePath) => {
    setSelectedImage(imagePath);
    setShowModal(true);
  };
  
  useEffect(() => {
    if (userData && userData.certifications) {
      const timer = setTimeout(() => {
        setAnimatedItems(userData.certifications.map((_, index) => index));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [userData]);

  if (!userData || !userData.certifications) {
    return null;
  }

  return (
    <CertificatesWrapper>
      {userData.certifications.map((certification, index) => (
        <CList key={index} isOdd={index % 2 === 0} isAnimated={animatedItems.includes(index)}>
          <div className="num" onClick={() => handleClick(`/certs/${certification.authority}.png`)}>
            <h3>{certification.name}</h3>
          </div>
        </CList>
      ))}
      <Modal show={showModal} onClose={() => setShowModal(false)} imagePath={selectedImage} />
    </CertificatesWrapper>
  );
};

export default Certificates;