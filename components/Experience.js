import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material';
import { motion, useInView, useAnimation } from 'framer-motion';

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
      '& p:first-of-type': {
        fontSize: '1.2rem',
      },
      '& p:last-of-type': {
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
      borderRadius: '90%',
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

      '& ul': {
        paddingLeft: '20px',
        margin: '0',
      },
      '& li': {
        listStyle: 'disc',
        marginBottom: '0.5rem',
      },
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
      marginTop: '10px',
      marginLeft: '20px',
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
          display: 'none',
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
        display: 'none',
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

// ---------------------
// Mocked Data
// ---------------------
const mockedData = {
  experiences: [
    {
      company: 'SoundSafe.AI',
      jobTitle: 'Software Engineer',
      description:
        'Built a Full Stack fintech and payment processing web app with fraud prevention and PCI-DSS-compliant workflows. Designed backend architectures with REST, gRPC, GraphQL, and microservices. Created abstraction layers for payment gateways, logistics APIs, and internal systems. Enhanced UI with responsive React components for checkout, payment tracking, and shipment updates. Integrated AI-driven anomaly detection, improving transaction trust. Monitored AWS-hosted services using Prometheus & Grafana for performance optimization. Coordinated with engineering teams and French-speaking partners via Slack.',
      startDate: '2025-01-01',
    },
    {
      company: 'IFFCO (via Pravisblu Technology Services)',
      jobTitle: 'Software Engineer',
      description:
        'Developed backend services for payment processing, fraud detection, and shipment tracking. Implemented REST and GraphQL APIs with PostgreSQL and MongoDB for low-latency performance. Enhanced compliance dashboards with intuitive UI flows and real-time data. Built logistics tracking modules with third-party API integration, reducing delivery estimate errors by 12%. Collaborated with international teams to align architecture decisions. Applied debugging, testing, and CI/CD to cut deployment times by 40%.',
      startDate: '2023-05-01',
    },
    {
      company: 'Virtusa',
      jobTitle: 'Backend Developer',
      description:
        'Implemented secure, high-performance REST APIs for data-intensive apps. Built ETL processes to clean, transform, and load datasets into PostgreSQL for analytics dashboards. Optimized backend workflows to cut response times by 25% and improve scalability.',
      startDate: '2022-01-01',
    },
    {
      company: 'Tech Mahindra (via LaxOrbis)',
      jobTitle: 'Junior Software Engineer',
      description:
        'Developed internal monitoring dashboards for operations teams using PostgreSQL and data visualization. Automated regression and UI testing, reducing manual QA cycles by 30%. Worked with product teams on UI/UX improvements and feature refinements.',
      startDate: '2019-08-01',
    },
  ],
};


// ---------------------
// Animated Timeline Event Component
// ---------------------
const AnimatedTimelineEvent = ({ experience, index, expandedDescriptions, handleShowMore }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const isEven = index % 2 === 0;

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay: 0.2, when: 'beforeChildren', staggerChildren: 0.1 }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: isEven ? -50 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  const formatDescription = (description, isExpanded) => {
    const lines = description.split(/(?<=\.)\s+|\n/);
    const visibleLines = isExpanded ? lines : lines.slice(0, 3);
    return (
      <ul>
        {visibleLines.map((sentence, idx) => (
          <li key={idx} className="bulleted-paragraph">
            {sentence}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <motion.div
      ref={ref}
      className="timeline__event animated fadeInUp delay-3s timeline__event--type1"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <motion.div
        className="timeline__event__icon"
        variants={itemVariants}
      />
      <motion.div
        className="timeline__event__date"
        variants={itemVariants}
      >
        <p>{new Date(experience.startDate).toLocaleDateString('en-US', { month: 'long' })}</p>
        <p>{new Date(experience.startDate).getFullYear()}</p>
      </motion.div>
      <motion.div
        className="timeline__event__content"
        variants={contentVariants}
      >
        <motion.div
          className="timeline__event__title"
          variants={itemVariants}
        >
          <p>{experience.company} - {experience.jobTitle}</p>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className={`timeline__event__description ${expandedDescriptions[index] ? 'expanded' : ''}`}
        >
          {formatDescription(experience.description, expandedDescriptions[index])}
        </motion.div>
        <motion.button
          className="show-more"
          onClick={() => handleShowMore(index)}
          variants={itemVariants}
        >
          {expandedDescriptions[index] ? 'Show Less' : 'Show More'}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

// ---------------------
// Experience Component Using Mocked Data
// ---------------------
const Experience = () => {
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  // Use mocked data directly
  const experiences = mockedData.experiences;

  useEffect(() => {
    if (experiences) {
      const initialExpandedState = {};
      experiences.forEach((_, idx) => {
        initialExpandedState[idx] = false;
      });
      setExpandedDescriptions(initialExpandedState);
    }
  }, [experiences]);

  if (!experiences) {
    return null;
  }

  return (
    <Timeline>
      {experiences.map((experience, idx) => (
        <AnimatedTimelineEvent
          key={idx}
          experience={experience}
          index={idx}
          expandedDescriptions={expandedDescriptions}
          handleShowMore={(index) => 
            setExpandedDescriptions((prev) => ({
              ...prev,
              [index]: !prev[index],
            }))
          }
        />
      ))}
    </Timeline>
  );
};

export default Experience;
