import React from 'react';
import { styled } from '@mui/material';

const colors = {
  background: '#F1F8F6',
  primary: '#00704A',
  text: '#1E3932',
};

const LoaderWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: colors.background,
  position: 'relative',
});

const Polygon = styled('div')(({ small }) => ({
  width: small ? '40px' : '120px',
  height: small ? '40px' : '120px',
  background: `linear-gradient(135deg, ${colors.primary}, ${colors.text})`,
  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  animation: small ? 'none' : 'scaleIn 0.5s ease-out',
  transition: 'all 0.5s ease-in-out',
  '@keyframes scaleIn': {
    '0%': {
      transform: 'scale(0)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
}));

const Text = styled('div')(({ small }) => ({
  fontSize: small ? '0.8rem' : '2rem',
  fontWeight: 'bold',
  fontFamily: 'Solaris, Arial, sans-serif',
  color: colors.background,
  opacity: 0,
  margin: '0 2px',
  '&.show': {
    opacity: 1,
    transition: 'opacity 0.5s ease-in-out',
  },
}));

const Loader = ({ showR }) => (
  <LoaderWrapper>
    <Polygon>
      <Text className={showR ? 'show' : ''}>R</Text>
    </Polygon>
  </LoaderWrapper>
);

export default Loader;
