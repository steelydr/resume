import React, { useState } from 'react';
import { styled } from '@mui/material';
import Modal from './Modal.js';

const colors = {
  primary: '#00704A',
  secondary: '#27251F',
  accent: '#D4E9E2',
  text: '#1E3932',
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

const CList = styled('div')({
  fontFamily: 'Montserrat, sans-serif',
  marginRight: '10rem',
  marginLeft: '10rem',

  '.num': {
    padding: '0.5rem 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  '.number': {
    fontSize: '4rem',
    fontWeight: 'bold',
    color: colors.background,
    width: '2rem',
    opacity: '0.1',
    transition: '0.25s',
  },

  '.num:before': {
    fontSize: '4rem',
    fontWeight: 'bold',
    color: colors.primary,
    width: '2rem',
    opacity: '0.05',
    transition: '0.25s',
  },

  '.num h3': {
    position: 'relative',
    left: '-1.5rem',
    color: colors.text,
    fontSize: '1rem',
    transition: '0.25s',
  },

  '.num:hover': {
    backgroundColor: colors.accent,
    cursor: 'pointer',
  },

  '.num:hover:before': {
    opacity: '0.2',
    color: colors.text,
  },

  '.num:hover h3': {
    left: '1rem',
    color: colors.text,
  },

  '@media (max-width: 1200px)': {
    marginRight: '5rem',
    marginLeft: '5rem',

    '.num': {
      padding: '0.5rem 1.5rem',
    },

    '.number': {
      width: '1.5rem',
    },

    '.num:before': {
      width: '1.5rem',
    },
  },

  '@media (max-width: 768px)': {
    marginRight: '2.5rem',
    marginLeft: '2.5rem',

    '.num': {

    },

    '.number': {
      width: '1rem',
    },

    '.num:before': {
      width: '1rem',
    },
  },

  '@media (max-width: 480px)': {
    marginRight: '2.5rem',
    marginLeft: '2.5rem',

    '.num': {

    },

    '.number': {
      width: '0.75rem',
    },

    '.num:before': {
      width: '0.75rem',
    },
  },
});

const Certificates = ({ userData }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleClick = (imagePath) => {
    setSelectedImage(imagePath);
    setShowModal(true);
  };

  return (
    <CertificatesWrapper>
      {userData.certifications.map((certification, index) => (
        <CList key={index}>
          <div className="num" onClick={() => handleClick(`/certs/${certification.authority}.png`)}>
            {/* <div className="number">{index + 1}</div> */}
            <h3>{certification.name}</h3>
          </div>
        </CList>
      ))}
      <Modal show={showModal} onClose={() => setShowModal(false)} imagePath={selectedImage} />
    </CertificatesWrapper>
  );
};

export default Certificates;
