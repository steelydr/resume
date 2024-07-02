"use client";
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Image from 'next/image';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
  styled,
  alpha,
} from '@mui/material';
import { IoLogoGithub, IoLogoLinkedin } from 'react-icons/io';
import MenuIcon from '@mui/icons-material/Menu';
import Modal from '../components/Modal.js';
import CloseIcon from '@mui/icons-material/Close';

const colors = {
  primary: '#00704A', // Starbucks green
  secondary: '#27251F', // Dark gray
  accent: '#D4E9E2', // Light mint
  background: '#F1F8F6', // Off-white
  text: '#1E3932', // Dark green
};

const StyledMenuIcon = styled(MenuIcon)(({ open }) => ({
  transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: 'transform 0.3s ease-in-out',
  color: colors.secondary,
}));

const StyledCloseIcon = styled(CloseIcon)(({ open }) => ({
  transform: open ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: 'transform 0.3s ease-in-out',
  color: colors.secondary,
}));

const Loader = styled('div')({
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

const EducationGrid = styled('div')(({ isMobile }) => ({
  margin: isMobile ? '2%' : '5%',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '100%',
  alignItems: 'center',
  fontFamily: 'Montserrat, sans-serif',
}));

const EducationCard = styled('div')({
  backgroundColor: colors.accent,
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  padding: '20px',
  color: colors.text,
  opacity: '0.75',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  height: '100%',
  display: 'flex',
  marginBottom: '0px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  fontFamily: 'Montserrat, sans-serif',

  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '12px',
    backgroundColor: colors.primary,
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
    zIndex: -1,
  },

  '&:hover': {
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
    transform: 'translateY(-4px)',
    '&:before': {
      opacity: 0.1,
    },
  },

  '& h3': {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    margin: '15px 0',
    opacity: 9,
    zIndex: 9,
    color: colors.secondary,
  },

  '& p': {
    fontSize: '1.1rem',
    margin: '10px 0',
    color: colors.text,
  },
  '& img': {
    display: 'block',
    width: '200px',
    height: '150px',
    objectFit: 'contain',
    margin: '10px auto',
    borderRadius: '12px',
    mixBlendMode: 'multiply',
    backgroundColor: 'transparent',
  },
  '& .inst': {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: colors.secondary,
    margin: '10px 0',
    textAlign: 'center',
  },

  '& .des': {
    fontSize: '1rem',
    fontStyle: 'italic',
    color: colors.secondary,
    margin: '10px 0',
    textAlign: 'justify',
  },
});

const Dots = styled('div')`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  grid-column: 1 / -1;
  font-family: 'Montserrat, sans-serif';
`;

const Dot = styled('div')`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => (props.active ? colors.primary : colors.accent)};
  margin: 0 8px;
  cursor: pointer;
  font-family: 'Montserrat, sans-serif';
`;

const Timeline = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  margin: '20px auto',
  position: 'relative',
  width: '100%',
  fontFamily: 'Montserrat, sans-serif',

  '& .timeline__event': {
    marginBottom: '20px',
    position: 'relative',
    display: 'flex',
    margin: '20px 0',
    borderRadius: '6px',
    alignSelf: 'center',
    width: '90vw',
    maxWidth: '800px',

    '&:nth-child(2n + 1)': {
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
      boxShadow:
        '0 30px 60px -12px rgba(50, 50, 93, 0.25), 0 18px 36px -18px rgba(0, 0, 0, 0.3), 0 -12px 36px -8px rgba(0, 0, 0, 0.025)',
      backgroundColor: colors.background,
      width: 'calc(100% - 84px)',
      borderRadius: '0 6px 6px 0',
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
      '& p:first-child': {
        fontSize: '1.2rem',
      },
      '& p:last-child': {
        fontSize: '1rem',
      },
    },
    '& .timeline__event__icon': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: colors.background,
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
      color: colors.secondary,
      overflow: 'hidden',
      maxHeight: '6rem',
      position: 'relative',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      textOverflow: 'ellipsis',
      transition: 'max-height 0.3s ease',
    },

    '& .timeline__event__description.expanded': {
      WebkitLineClamp: 'unset',
      maxHeight: 'none',
    },

    '& .show-more': {
      display: 'block',
      backgroundColor: 'transparent',
      border: 'none',
      color: colors.secondary,
      cursor: 'pointer',
      textAlign: 'left',
      padding: '0',
      marginTop: '5px',
      fontFamily: 'Montserrat, sans-serif',
    },

    '&.bulleted-paragraph': {
      display: 'block',
    },

    '&.bulleted-paragraph::before': {
      content: '"• "',
      display: 'inline-block',
      verticalAlign: 'top',
      color: colors.secondary,
      backgroundColor: colors.secondary,
    },

    '& .bulleted-paragraph + .bulleted-paragraph': {
      marginTop: '10px',
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
});

const ProjectsTab = styled('div')`
  html, body {
    height: 100%;
    width: 100%;
    margin: 0;
    overflow: hidden;
    background-color: ${colors.secondary};
    font-family: 'Montserrat, sans-serif';
    color: ${colors.background};
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  label {
    font-size: 17px;
    font-weight: 500;
    cursor: pointer;
    opacity: 1;
    transition: opacity .4s ease-in-out;
    display: block;
    width: calc(100% - 48px);
    text-align: right;
    z-index: 100;
    user-select: none;
    color: ${colors.text};
  }

  input[type="radio"] {
    display: none;
    width: 0;
  }

  label:hover, input[type="radio"]:checked + label {
    color: ${colors.text};
    opacity: 1;
  }

  .popup {
    width: 100%;
    height: 100%;
    min-height: 660px;
    max-height: 660px;
    border-radius: 48px;
    box-sizing: border-box;
    margin: 100px 0;
    overflow: hidden;
    display: flex;
  }

  .tabs {
    width: 100%;
    max-width: 240px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
  }

  .content-wrapper {
    width: 100%;
    overflow: hidden;
    padding: 20px;
  }

  .content {
    display: none;
    padding: 20px;
    background-color: none;
    border-radius: 8px;
    color: ${colors.text};
    margin-bottom: 20px;
  }

  .content.active {
    display: block;
  }

  .content p {
    margin: 0 0 10px;
    line-height: 1.6;
  }

  .content a {
    color: ${colors.primary};
    text-decoration: none;
    font-weight: 600;
    transition: color .3s;
  }

  .content a:hover {
    color: ${colors.primary};
  }

  .active-tab-indicator {
    position: absolute;
    width: 100%;
    height: 200%;
    display: flex;
    flex-direction: column;
    top: calc(-100%);
    left: 0;
    transition: transform .2s ease-in-out;
  }

  .active-tab-indicator #bottom, .active-tab-indicator #top {
    background-color: ${colors.primary};
  }

  .active-tab-indicator #top {
    height: calc(50%);
    margin-bottom: auto;
    border-radius: 0 0 32px 0;
  }

  .active-tab-indicator #bottom {
    height: calc(50% - 75px);
    border-radius: 0 32px 0 0;
  }
`;

const TechLogo = styled('img')`
  width: 60px;
  height: 60px;
  margin: 10px 20px 10px 10px;
`;

const ProjectContent = styled('div')`
  .tech-icons {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }

  .carousel {
    width: 80%;
    overflow: hidden;
  }

  .carousel__track {
    display: flex;
    width: calc(82px * 12);
    animation: scroll 20s linear infinite;
  }

  .carousel__images {
    display: flex;
    width: calc(80px * 8);
  }

  .carousel__images img {
    width: 240px;
    height: 150px;
    object-fit: cover;
    margin: 15px 15px 15px 15px;
    border-radius: 8px;
    transition: transform 0.3s ease-in-out;
  }

  .carousel__images img:hover {
    transform: scale(1.2);
    cursor: pointer;
  }

  .carousel__images:hover .carousel__track {
    animation-play-state: paused;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  }

  .overlay img {
    max-width: 80%;
    max-height: 80%;
    border-radius: 8px;
  }

  .overlay.active {
    visibility: visible;
    opacity: 1;
  }

  p {
    --line-height: 0.9;
    line-height: var(--line-height);
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    max-height: calc(0.9em * 8);
    transition: max-height 0.3s ease-in-out;
    padding-top: 10px;
  }

  p::before {
    content: '';
    display: block;
    height: 10px;
  }

  p {
    font-family: Arial, sans-serif;
  }

  p::first-letter {
    font-size: 1.2em; 
    font-weight: bold;
    color: blue;
  }

  p:has(+ .expandbtn:checked) {
    -webkit-line-clamp: unset;
    max-height: none;
  }

  .expandbtn {
    appearance: none;
    padding: .5em;
    cursor: pointer;
    margin: 0px 0px;
  }

  .expandbtn::before {
    content: "Expand";
  }

  .expandbtn:checked::before {
    content: "Show less";
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-80px * 8));
    }
  }
`;

const Certificates = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '20px',
  position: 'relative',
  alignItems: 'center',
  fontFamily: 'Montserrat, sans-serif',
  marginBottom:'5rem',
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


const FooterContainer = styled('footer')(({ isMobile }) => ({
  position: 'relative',
  width: '100%',
  background: colors.secondary,
  minHeight: isMobile ? '100px' : '200px',
  padding: '20px 50px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  overflow: 'hidden',

  '@media (max-width: 1200px)': {
    minHeight: isMobile ? '100px' : '180px',
    padding: '20px 40px',
  },

  '@media (max-width: 768px)': {
    minHeight: isMobile ? '100px' : '150px',
    padding: '20px 30px',
  },

  '@media (max-width: 480px)': {
    minHeight: isMobile ? '100px' : '120px',
    padding: '20px 20px',
  },
}));

const SocialIconList = styled('ul')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '10px 0',
  flexWrap: 'wrap',
  listStyle: 'none',
  padding: 0,
});

const SocialIconItem = styled('li')({
  margin: '0 10px',
});

const SocialIconLink = styled('a')({
  fontSize: '2rem',
  color: colors.background,
  display: 'inline-block',
  transition: '0.5s',
  '&:hover': {
    transform: 'translateY(-10px)',
  },
});

const FooterText = styled(Typography)({
  color: colors.background,
  margin: '10px 0 7px 0',
  fontSize: '1rem',
  fontWeight: 300,
});

const FooterDes = styled(Typography)({
  color: colors.background,
  margin: '5px 0 5px 0',
  fontSize: '1rem',
  fontWeight: 300,
});

const Section = styled('div')(({ isMobile }) => ({
  position: 'relative',
  margin: '20px auto',
  maxWidth: '1200px',
  textAlign: 'left',
  display: 'flex',
  alignItems: 'center',
  paddingTop:'2rem',
  paddingBottom:'2rem',

  '& p': {
    display: 'inline-block',
    position: 'relative',
    paddingLeft: isMobile ? '0.8em' : '1.2em',
    fontSize: isMobile ? '1.5rem' : '1.95rem',
    fontWeight: 'bold',
    color: colors.secondary,
    lineHeight: isMobile ? '1.5rem' : '1.95rem',
    margin: '0',
    '&::before': {
      content: '"<"',
      position: 'absolute',
      left: '0',
      color: colors.secondary,
      fontSize: isMobile ? '2rem' : '2.95rem',
      lineHeight: '1',
      top: '50%',
      transform: 'translateY(-50%)',
    },
    '&::after': {
      content: '"/>"',
      color: colors.secondary,
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
    marginLeft: '5rem',
    marginRight: '5rem',

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
    marginLeft: '2rem',
    marginRight: '2rem',

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
    marginLeft: '1rem',
    marginRight: '1rem',

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
    stroke: '#274c77',
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

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showD, setShowD] = useState(false);
  const [showR, setShowR] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [smallLoader, setSmallLoader] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const [showFullDescription, setShowFullDescription] = useState({});

  //const homeRef = useRef(null);
  const educationRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const certificationRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://rajeswari-depala.netlify.app/api/users?firstName=Depala&lastName=Rajeswari');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();

    setTimeout(() => setShowD(true), 500);
    setTimeout(() => setShowR(true), 1000);
    setTimeout(() => {
      setShowContent(true);
      setSmallLoader(true);
    }, 2000);
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerContent = (
    <List
      sx={{
        width: 250,
        bgcolor: colors.background,
        '& .MuiListItemButton-root:hover': {
          bgcolor: alpha(colors.primary, 0.25),
        },
      }}
    >
      <ListItemButton onClick={toggleDrawer(false)} sx={{ justifyContent: 'center' }}>
        <ListItemText
          primary="EDUCATION"
          primaryTypographyProps={{
            style: {
              fontWeight: 700,
              color: colors.primary,
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '1rem',
              textAlign: 'center',
            },
          }}
        />
      </ListItemButton>
      <ListItemButton onClick={toggleDrawer(false)} sx={{ justifyContent: 'center' }}>
        <ListItemText
          primary="EXPERIENCE"
          primaryTypographyProps={{
            style: {
              fontWeight: 700,
              color: colors.primary,
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '1rem',
              textAlign: 'center',
            },
          }}
        />
      </ListItemButton>
      <ListItemButton onClick={toggleDrawer(false)} sx={{ justifyContent: 'center' }}>
        <ListItemText
          primary="PROJECTS"
          primaryTypographyProps={{
            style: {
              fontWeight: 700,
              color: colors.primary,
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '1rem',
              textAlign: 'center',
            },
          }}
        />
      </ListItemButton>
      <ListItemButton onClick={toggleDrawer(false)} sx={{ justifyContent: 'center' }}>
        <ListItemText
          primary="CERTIFICATION"
          primaryTypographyProps={{
            style: {
              fontWeight: 700,
              color: colors.primary,
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '1rem',
              textAlign: 'center',
            },
          }}
        />
      </ListItemButton>
    </List>
  );

  const appBarActions = (
    <List component="nav" sx={{ display: 'flex' }}>
      <ListItemButton>
        <ListItemText
          primary="EDUCATION"
          primaryTypographyProps={{
            sx: {
              fontWeight: 770,
              color: colors.primary,
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '1rem',
            },
          }}
        />
      </ListItemButton>
      <ListItemButton>
        <ListItemText
          primary="EXPERIENCE"
          primaryTypographyProps={{
            sx: {
              fontWeight: 770,
              color: colors.primary,
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '1rem',
            },
          }}
        />
      </ListItemButton>
      <ListItemButton>
        <ListItemText
          primary="PROJECTS"
          primaryTypographyProps={{
            sx: {
              fontWeight: 790,
              color: colors.primary,
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '1rem',
            },
          }}
        />
      </ListItemButton>
      <ListItemButton>
        <ListItemText
          primary="CERTIFICATION"
          primaryTypographyProps={{
            sx: {
              fontWeight: 790,
              color: colors.primary,
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '1rem',
            },
          }}
        />
      </ListItemButton>
    </List>
  );

  useEffect(() => {
    if (userData && userData.projects) {
      const tabsCount = userData.projects.length;
      let percentage;

      if (activeTab === tabsCount - 1) {
        percentage = 55.5 / tabsCount;
      } else {
        percentage = 56 / tabsCount;
      }
      const translateYValue = percentage * activeTab;
      setIndicatorStyle({
        transform: `translateY(${translateYValue}%)`,
      });
    }
  }, [activeTab, userData]);

  useEffect(() => {
    if (userData) {
      const bulletedParagraphs = userData.experiences.map((experience) => {
        const sentences = experience.description.match(/[^\.!\?]+[\.!\?]+/g);
        return sentences
          ? sentences.reduce((acc, sentence, index) => {
              if (index % 2 === 0) {
                acc.push(`<p class="bulleted-paragraph">${sentence.trim()}`);
              } else {
                acc[acc.length - 1] += ` ${sentence.trim()}</p>`;
              }
              return acc;
            }, [])
          : [];
      });
      setUserData((prevData) => ({
        ...prevData,
        experiences: prevData.experiences.map((experience, index) => ({
          ...experience,
          description: bulletedParagraphs[index].join(''),
        })),
      }));
    }
  }, [userData]);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const getTechLogo = (tech) => {
    switch (tech.toLowerCase()) {
      case 'pytorch':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg';
      case 'anaconda':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/anaconda/anaconda-original.svg';
      case 'python':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg';
      case 'java springboot':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg';
      case 'reactjs':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg';
      case 'express.js':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg';
      case 'c':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg';
      case 'linux':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg';
      case 'oracle vm virtualbox':
        return 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Virtualbox_logo.png'; // Custom URL for Oracle VM VirtualBox
      case 'r':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg';
      case 'api dog':
        return 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg';
      default:
        return null;
    }
  };

  const renderCarousel = (projectTitle, imageCount = 8) => {
    const images = [];
    for (let i = 1; i <= imageCount; i++) {
      images.push(
        <Image
          key={`${i}-original`}
          src={`/projects/${projectTitle}/${i}.jpg`}
          alt={`${projectTitle} ${i}`}
          width={240}
          height={150}
        />
      );
    }
    for (let i = 1; i <= imageCount; i++) {
      images.push(
        <Image
          key={`${i}-duplicate`}
          src={`/projects/${projectTitle}/${i}.jpg`}
          alt={`${projectTitle} ${i}`}
          width={240}
          height={150}
        />
      );
    }
    return <div className="carousel__images">{images}</div>;
  };

  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const [overlayImage, setOverlayImage] = useState(null);

  const highlightNumbers = (text) => {
    const parts = text.split(/(\d+)/);
    return (
      <span>
        {parts.map((part, index) =>
          /\d+/.test(part) ? (
            <span key={index} style={{ color: '#274c77', fontWeight: 'bold' }}>
              {part}
            </span>
          ) : (
            <span key={index} style={{ color: '#484848', fontWeight: 'normal' }}>
              {part}
            </span>
          )
        )}
      </span>
    );
  };

  useEffect(() => {
    const disableZoom = (event) => {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    };

    const disablePinchZoom = (event) => {
      if (event.scale !== 1) {
        event.preventDefault();
      }
    };

    document.addEventListener('touchmove', disableZoom, { passive: false });
    document.addEventListener('touchstart', disableZoom, { passive: false });
    document.addEventListener('gesturestart', disablePinchZoom);

    return () => {
      document.removeEventListener('touchmove', disableZoom);
      document.removeEventListener('touchstart', disableZoom);
      document.removeEventListener('gesturestart', disablePinchZoom);
    };
  }, []);

  return (
    <React.Fragment>
      {!showContent && (
        <Loader>
          <Polygon>
            <Text className={showR ? 'show' : ''}>R</Text>
          </Polygon>
        </Loader>
      )}
      {showContent && (
        <>
          <AppBar
            position="sticky"
            sx={{
              backgroundColor: alpha(colors.accent, 0.9),
              backdropFilter: 'blur(10px)',
              boxShadow: 'none',
              width: '100%',
            }}
          >
            <Toolbar>
              <Polygon small={smallLoader}>
                <Text small={smallLoader} className="show">
                  R
                </Text>
              </Polygon>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  fontWeight: 700,
                  color: colors.primary,
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '1rem',
                  marginLeft: '10px',
                }}
              >
                HOME
              </Typography>
              {isMobile && (
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                  {drawerOpen ? <></> : <StyledMenuIcon style={{ color: colors.secondary }} />}
                </IconButton>
              )}
              {!isMobile && appBarActions}
            </Toolbar>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              sx={{
                '& .MuiDrawer-paper': {
                  transition: 'width 0.3s ease',
                  boxShadow: '4px 0 12px rgba(0,0,0,0.1)',
                  backgroundColor: colors.background,
                },
              }}
            >
              <StyledCloseIcon style={{ color: colors.secondary, fontSize: '35px', padding: '35px' }} onClick={toggleDrawer(false)} />
              {drawerContent}
            </Drawer>
          </AppBar>
          <div
            style={{
              display: 'flex',
              height: 'calc(100vh - 64px)',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.primary,
              width: '100%',
            }}
          >
            <div style={{ textAlign: 'center', color: colors.background }}>
              <h1 style={{ fontFamily: 'Montserrat, sans-serif', marginBottom: '0.5rem' }}>Hi there! I am</h1>
              {userData && (
                <>
                  <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '2.5rem', marginTop: '0' }}>
                    {userData.firstName} {userData.lastName}
                  </h1>
                  <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.2rem', marginBottom: '1rem' }}>
                    A {userData.jobTitle}
                  </p>
                  <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
                    {userData.summary}
                  </p>
                </>
              )}
              {error && <p style={{ color: colors.accent }}>{error}</p>}
            </div>
          </div>
          <Section ref={educationRef}>
            <p>Knowledge from</p>
            <svg height="2" width="100%">
              <line x1="0" y1="1" x2="100%" y2="1" style={{ stroke: '#274c77', strokeWidth: 1 }} />
            </svg>
          </Section>
          <EducationGrid>
            <EducationCard>
              <h3>{userData.educations[activeIndex].degree} in {userData.educations[activeIndex].fieldOfStudy}</h3>
              <Image
                src={`/education/${encodeURIComponent(userData.educations[activeIndex].institution)}.png`}
                alt={`${userData.educations[activeIndex].institution} logo`}
                width={200}
                height={150}
                onError={(e) => {
                  if (e.target.src !== `${window.location.origin}/education/default.png`) {
                    e.target.src = '/education/default.png'; // Ensure this file exists
                  }
                }}
              />
              <p className="inst">{userData.educations[activeIndex].institution}</p>
              <p className="des">{userData.educations[activeIndex].description}</p>
            </EducationCard>
            <Dots>
              {userData.educations.map((_, index) => (
                <Dot key={index} active={index === activeIndex} onClick={() => setActiveIndex(index)} />
              ))}
            </Dots>
          </EducationGrid>
          <Section ref={experienceRef}>
            <p>Where I&apos;ve worked</p>
            <svg height="2" width="100%">
              <line x1="0" y1="1" x2="100%" y2="1" style={{ stroke: '#274c77', strokeWidth: 1 }} />
            </svg>
          </Section>
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
                  <div className={`timeline__event__description ${showFullDescription[index] ? 'expanded' : ''}`}>
                    <div dangerouslySetInnerHTML={{ __html: experience.description }} />
                  </div>
                  <button className="show-more" onClick={() => setShowFullDescription(prev => ({ ...prev, [index]: !prev[index] }))}>
                    {showFullDescription[index] ? 'Show Less' : 'Show More'}
                  </button>
                </div>
              </div>
            ))}
          </Timeline>
          <Section ref={projectsRef}>
            <p>Skills I&apos;ve applied</p>
            <svg height="2" width="100%">
              <line x1="0" y1="1" x2="100%" y2="1" style={{ stroke: '#274c77', strokeWidth: 1 }} />
            </svg>
          </Section>
          <ProjectsTab>
            <div className="popup">
              <div className="tabs">
                {userData.projects.map((project, index) => (
                  <React.Fragment key={index}>
                    <input type="radio" id={`tab${index + 1}`} name="tab" onChange={() => setActiveTab(index)} />
                    <label htmlFor={`tab${index + 1}`}>{project.title}</label>
                  </React.Fragment>
                ))}
                <div className="active-tab-indicator" style={indicatorStyle}>
                  <div id="top"></div>
                  <div id="bottom"></div>
                </div>
              </div>
              <div className="content-wrapper">
                {userData.projects.map((project, index) => (
                  <ProjectContent key={index} className={`content ${activeTab === index ? 'active' : ''}`}>
                    <div className="carousel">
                      <div className="carousel__track">{renderCarousel(project.title)}</div>
                    </div>
                    {overlayImage && (
                      <div className="overlay active" onClick={() => setOverlayImage(null)}>
                        <Image src={overlayImage} alt="Overlay" width={800} height={600} />
                      </div>
                    )}
                    <div className="tech-icons">
                      {project.technologies.map((tech, techIndex) => (
                        <TechLogo key={techIndex} src={getTechLogo(tech)} alt={tech} />
                      ))}
                    </div>
                    <p>{highlightNumbers(project.description)}</p>
                    <input type="checkbox" className="expandbtn"></input>
                    <a href={project.glink} target="_blank" rel="noopener noreferrer">
                      View Project
                    </a>
                  </ProjectContent>
                ))}
              </div>
            </div>
          </ProjectsTab>
          <Section ref={certificationRef}>
            <p>Credentials earned</p>
            <svg height="2" width="100%">
              <line x1="0" y1="1" x2="100%" y2="1" style={{ stroke: '#274c77', strokeWidth: 1 }} />
            </svg>
          </Section>
          <Certificates>
            {userData.certifications.map((certification, index) => (
              <CList key={index}>
                <div className="num" onClick={() => handleClick(`/certs/${certification.authority}.png`)}>
                  {/* <div className="number">{index + 1}</div> */}
                  <h3>{certification.name}</h3>
                </div>
              </CList>
            ))}
          </Certificates>
          <Modal show={showModal} onClose={() => setShowModal(false)} imagePath={selectedImage} />
          <FooterContainer>
            <SocialIconList>
              <SocialIconItem>
                <SocialIconLink href="https://www.linkedin.com/in/rajeswarid/" target="_blank" rel="noopener noreferrer">
                  <IoLogoLinkedin />
                </SocialIconLink>
              </SocialIconItem>
              <SocialIconItem>
                <SocialIconLink href="https://github.com/steelydr" target="_blank" rel="noopener noreferrer">
                  <IoLogoGithub />
                </SocialIconLink>
              </SocialIconItem>
            </SocialIconList>
            <FooterDes>Built with Next.js and MongoDB</FooterDes>
            <FooterText>&copy;2024 Depala Rajeswari | All Rights Reserved</FooterText>
          </FooterContainer>
        </>
      )}
    </React.Fragment>
  );
}
