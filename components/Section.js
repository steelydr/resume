import React from 'react';
import { styled } from '@mui/material';
const colors = {
  primary: '#8A2BE2', // Violet
  secondary: '#4B0082', // Indigo
  accent: '#DA70D6', // Orchid
  text: '#E9E9E9', // Light Grey
  background: '#1F1F1F', // Almost Black
  white: '#FFFFFF', // White
};
const SectionWrapper = styled('div')(({ isMobile }) => ({
  position: 'relative',
  margin: '40px auto',
  marginTop:'100px',
  maxWidth: '1200px',
  textAlign: 'left',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  paddingTop: '2rem',
  paddingBottom: '2rem',
  paddingLeft: isMobile ? '1rem' : '2rem',
  paddingRight: isMobile ? '1rem' : '2rem',
  backgroundColor: colors.background,

  '& p': {
    display: 'inline-block',
    position: 'relative',
    paddingLeft: isMobile ? '0.8em' : '1.2em',
    fontSize: isMobile ? '1.5rem' : '1.95rem',
    fontWeight: 'bold',
    color: colors.text,
    lineHeight: isMobile ? '1.5rem' : '1.95rem',
    margin: '0 0 1rem 0',
    '&::before': {
      content: '"{"',
      position: 'absolute',
      left: '0',
      color: colors.accent,
      fontSize: isMobile ? '2rem' : '2.95rem',
      lineHeight: '1',
      top: '50%',
      transform: 'translateY(-50%)',
    },
    '&::after': {
      content: '" }"',
      color: colors.accent,
      fontSize: isMobile ? '2rem' : '2.95rem',
      lineHeight: '1',
      marginLeft: isMobile ? '0.1em' : '0.2em',
    }
  },

  '& svg': {
    marginLeft: '20px',
    flexShrink: 0,
    width: '66%',
    opacity: '1',
  },

  '@media (max-width: 1200px)': {
    paddingLeft: '1rem',
    paddingRight: '1rem',

    '& p': {
      paddingLeft: '1em',
      fontSize: '1.75rem',
      lineHeight: '1.75rem',
      '&::before': {
        fontSize: '2.5rem',
      },
      '&::after': {
        fontSize: '2.5rem',
        marginLeft: '0.15em',
      },
    },

    '& svg': {
      width: '60%',
    },
  },

  '@media (max-width: 768px)': {
    marginLeft:'50px',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',

    '& p': {
      paddingLeft: '0.9em',
      fontSize: '1.5rem',
      lineHeight: '1.5rem',
      '&::before': {
        fontSize: '2rem',
      },
      '&::after': {
        fontSize: '2rem',
        marginLeft: '0.1em',
      },
    },

    '& svg': {
      width: '50%',
    },
  },

  '@media (max-width: 480px)': {
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',

    '& p': {
      paddingLeft: '0.8em',
      fontSize: '1.3rem',
      lineHeight: '1.3rem',
      '&::before': {
        fontSize: '1.75rem',
      },
      '&::after': {
        fontSize: '1.75rem',
        marginLeft: '0.1em',
      },
    },

    '& svg': {
      width: '80%',
    },
  },
}));

const Line = styled('svg')({
  height: '2px',
  width: '66%',

  'line': {
    stroke: colors.primary,
    strokeWidth: 1,
  },

  '@media (max-width: 1200px)': {
    width: '60%',
  },

  '@media (max-width: 768px)': {
    width: '50%',
  },

  '@media (max-width: 480px)': {
    width: '40%',
  },
});

const Section = React.forwardRef(({ children, ...props }, ref) => (
  <SectionWrapper ref={ref} {...props}>
    {children}
  </SectionWrapper>
));

// Add displayName for the component
Section.displayName = 'Section';

export default Section;
