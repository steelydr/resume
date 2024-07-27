import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material';

const colors = {
  accent: '#8A2BE2', // Violet
  secondary: '#4B0082', // Indigo
  primary: '#DA70D6', // Orchid
  text: '#E9E9E9', // Light Grey
  background: '#1F1F1F', // Almost Black
  white: '#FFFFFF', // White
};

const Timeline = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  margin: '20px auto',
  position: 'relative',
  width: '100%',
  fontFamily: 'Montserrat, sans-serif',
  paddingBottom: '40px',

  '& .timeline__event': {
    marginBottom: '20px',
    position: 'relative',
    display: 'flex',
    margin: '20px 0',
    borderRadius: '6px',
    alignSelf: 'center',
    width: '90vw',
    maxWidth: '800px',

    '&:nth-of-type(2n + 1)': {
      flexDirection: 'row-reverse',

      '& .timeline__event__date': {
        borderRadius: '0 6px 6px 0',
      },
      '& .timeline__event__content': {
        borderRadius: '6px 0 0 6px',
      },

      '& .timeline__event__icon': {
        '&:before': {
          content: '""',
          width: '2px',
          height: '100%',
          backgroundColor: colors.primary,
          position: 'absolute',
          top: '0%',
          left: '50%',
          right: 'auto',
          zIndex: '1',
          transform: 'translateX(-50%)',
          animation: 'fillTop 2s forwards 4s ease-in-out',
        },
        '&:after': {
          content: '""',
          width: '100%',
          height: '2px',
          backgroundColor: colors.primary,
          position: 'absolute',
          right: '0',
          zIndex: '1',
          top: '50%',
          left: 'auto',
          transform: 'translateY(-50%)',
          animation: 'fillRight 2s forwards 4s ease-in-out',
        },
      },
    },

    '& .timeline__event__title': {
      fontSize: '1.2rem',
      lineHeight: 1.4,
      textTransform: 'uppercase',
      fontWeight: 600,
      color: colors.primary,
      letterSpacing: '1.5px',
    },
    '& .timeline__event__content': {
      padding: '20px',
      backgroundColor: colors.background,
      width: 'calc(100% - 84px)',
      borderRadius: '0 6px 6px 0',
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
    },
    '& .timeline__event__date': {
      color: colors.background,
      fontSize: '1.5rem',
      fontWeight: 600,
      backgroundColor: colors.primary,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      whiteSpace: 'nowrap',
      padding: '0 20px',
      borderRadius: '6px 0 0 6px',

      '& p': {
        margin: 0,
      },
      '& p:first-of-type': { // Updated to :first-of-type
        fontSize: '1.2rem',
      },
      '& p:last-of-type': { // Updated to :last-of-type
        fontSize: '1rem',
      },
    },
    '& .timeline__event__icon': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: colors.white,
      padding: '20px',
      alignSelf: 'center',
      margin: '0 20px',
      backgroundColor: colors.primary,
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      position: 'relative',

      '&:before': {
        content: '""',
        width: '2px',
        height: '100%',
        backgroundColor: colors.primary,
        position: 'absolute',
        top: '0%',
        zIndex: '1',
        left: '50%',
        transform: 'translateX(-50%)',
        animation: 'fillTop 2s forwards 4s ease-in-out',
      },
      '&:after': {
        content: '""',
        width: '100%',
        height: '2px',
        backgroundColor: colors.primary,
        position: 'absolute',
        left: '0%',
        zIndex: '1',
        top: '50%',
        transform: 'translateY(-50%)',
        animation: 'fillLeft 2s forwards 4s ease-in-out',
      },
    },
    '& .timeline__event__description': {
      flexBasis: '100%',
      color: colors.text,
      position: 'relative',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      transition: 'max-height 0.3s ease',
    },

    '& .timeline__event__description.expanded': {
      WebkitLineClamp: 'unset',
    },

    '& .show-more': {
      display: 'block',
      backgroundColor: 'transparent',
      border: 'none',
      color: colors.primary,
      cursor: 'pointer',
      textAlign: 'left',
      padding: '0',
      marginTop: '5px',
      fontFamily: 'Montserrat, sans-serif',
    },
  },

  '@keyframes fillLeft': {
    '100%': {
      left: '100%',
    },
  },
  '@keyframes fillTop': {
    '100%': {
      top: '100%',
    },
  },
  '@keyframes fillRight': {
    '100%': {
      right: '100%',
    },
  },

  // Mobile Styles
  '@media (max-width: 600px)': {
    '& .timeline__event': {
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: 'none',

      '&:nth-of-type(2n + 1)': {
        flexDirection: 'column',

        '& .timeline__event__date': {
          borderRadius: '6px 6px 0 0',
        },
        '& .timeline__event__content': {
          borderRadius: '0 0 6px 6px',
        },

        '& .timeline__event__icon': {
          marginBottom: '10px',
          '&:before, &:after': {
            display: 'none',
          },
        },
      },

      '& .timeline__event__title': {
        fontSize: '1rem',
        textAlign: 'center',
      },
      '& .timeline__event__content': {
        width: 'calc(100% - 40px)',
        borderRadius: '0 0 6px 6px',
      },
      '& .timeline__event__date': {
        fontSize: '1.2rem',
        padding: '10px 20px',
        borderRadius: '6px 6px 0 0',
      },
      '& .timeline__event__icon': {
        margin: '10px 0',
        width: '30px',
        height: '30px',
      },
      '& .timeline__event__description': {
        maxHeight: 'none',
      },

      '& .show-more': {
        fontSize: '0.9rem',
      },
    },
  },
});

const Experience = ({ userData }) => {
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  useEffect(() => {
    if (userData && userData.experiences) {
      // Initialize expanded state for each experience
      const initialExpandedState = {};
      userData.experiences.forEach((_, index) => {
        initialExpandedState[index] = false;
      });
      setExpandedDescriptions(initialExpandedState);
    }
  }, [userData]);

  const formatDescription = (description, isExpanded) => {
    const lines = description.split(/(?<=\.)\s+|\n/);
    const visibleLines = isExpanded ? lines : lines.slice(0, 3);
    return visibleLines.map((sentence, index) => (
      <p key={index} className="bulleted-paragraph">
        • {sentence}
      </p>
    ));
  };

  const handleShowMore = (index) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (!userData || !userData.experiences) {
    return null;
  }

  return (
    <Timeline>
      {userData.experiences.map((experience, index) => (
        <div key={index} className="timeline__event animated fadeInUp delay-3s timeline__event--type1">
          <div className="timeline__event__icon"></div>
          <div className="timeline__event__date">
            <p>{new Date(experience.startDate).toLocaleDateString('en-US', { month: 'long' })}</p>
            <p>{new Date(experience.startDate).getFullYear()}</p>
          </div>
          <div className="timeline__event__content">
            <div className="timeline__event__title">
              <h3>{experience.title}</h3>
              <p>{experience.company}</p>
            </div>
            <div className={`timeline__event__description ${expandedDescriptions[index] ? 'expanded' : ''}`}>
              {formatDescription(experience.description, expandedDescriptions[index])}
            </div>
            <button className="show-more" onClick={() => handleShowMore(index)}>
              {expandedDescriptions[index] ? 'Show Less' : 'Show More'}
            </button>
          </div>
        </div>
      ))}
    </Timeline>
  );
};

export default Experience;
