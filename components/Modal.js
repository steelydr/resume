import React from 'react';
import { styled } from '@mui/system';
import { motion, AnimatePresence } from 'framer-motion';

const ModalBackground = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

const Image = styled('img')`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ModalContent = styled(motion.div)`
  background: transparent;
  padding: 1.5rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 90%;
  max-height: 90%;
  height: auto;
  width: 500px;
  height: 300px;
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
  border-radius: 50%;
`;

const Modal = ({ show, onClose, imagePath }) => {
  return (
    <AnimatePresence>
      {show && (
        <ModalBackground
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalContent
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CloseButton onClick={onClose}>&times;</CloseButton>
            <Image src={imagePath} alt="Certificate" />
          </ModalContent>
        </ModalBackground>
      )}
    </AnimatePresence>
  );
};

export default Modal;
