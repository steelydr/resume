import React from 'react';
import { styled, keyframes } from '@mui/material';

const colors = {
  primary: '#8A2BE2', // Violet
  secondary: '#4B0082', // Indigo
  accent: '#DA70D6', // Orchid
  text: '#E9E9E9', // Light Grey
  background: '#1F1F1F', // Almost Black
};

const LoaderWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: colors.background,
  position: 'relative',
  overflow: 'hidden',
});

const scaleIn = keyframes`
  0% { transform: scale(0); }
  100% { transform: scale(1); }
`;

const draw = keyframes`
  0% {
    stroke-dasharray: 0, 400;
  }
  100% {
    stroke-dasharray: 400, 0;
  }
`;

const Polygon = styled('svg')({
  width: '130px',
  height: '130px',
  animation: `${scaleIn} 0.5s ease-out`,
});

const PolygonPath = styled('polygon')({
  fill: 'none',
  stroke: colors.primary,
  strokeWidth: 5,
  strokeDasharray: 400,
  animation: `${draw} 2s ease-in-out`,
});

const Text = styled('div')({
  fontSize: '2.5rem',
  fontWeight: 700,
  fontFamily: "'Roboto', sans-serif",
  color: colors.accent,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
  letterSpacing: '0.05rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '130px',
  height: '130px',
});

const Loader = ({ showR }) => (
  <LoaderWrapper>
    <Polygon viewBox="0 0 100 100">
      <PolygonPath points="50,5 90,25 90,75 50,95 10,75 10,25" />
    </Polygon>
    {showR && <Text>R</Text>}
  </LoaderWrapper>
);

export default Loader;
