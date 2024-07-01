import React from 'react';
import { styled } from '@mui/system';

const ModalBackground = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled('img')`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;


const ModalContent = styled('div')`
  background: white;
  padding: 1.5rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 90%;
  max-height: 90%;
  height: auto;
  width: 500px;  // Set the width for small overlay
  height: 300px; // Set the height for small overlay
  border-radius: 8px;
`;

const CloseButton = styled('button')`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: red;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 25px;
`;

const Modal = ({ show, onClose, imagePath }) => {
  if (!show) return null;

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Image src={imagePath} alt="Certificate" />
      </ModalContent>
    </ModalBackground>
  );
};

export default Modal;
