import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/system';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import { IoLogoGithub, IoLogoLinkedin } from 'react-icons/io';
import { useMediaQuery } from 'react-responsive';
import imageUrl from './myimageraj.jpg';
import Modal from './Modal'; // Import the modal component

import { SiPytorch, SiAnaconda, SiPython, SiSpringboot, SiReact, SiExpress, SiC, SiLinux, SiOracle, SiR } from 'react-icons/si';
import { FaDog } from 'react-icons/fa'; // Using FontAwesome for API Dog

import { hsl, parseToHsl } from 'polished';
import zIndex from '@mui/material/styles/zIndex';

const LoaderWrapper = styled('div')({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontFamily: 'Montserrat, sans-serif',
});

const Loader = styled('div')({
  width: '50px',
  aspectRatio: '1',
  display: 'grid',
  border: '4px solid #ecf0f1',
  borderRadius: '50%',
  borderRightColor: '#3498db',
  animation: 'l15 1s infinite linear',
  fontFamily: 'Montserrat, sans-serif',

  '&::before, &::after': {
    content: '""',
    gridArea: '1/1',
    margin: '2px',
    border: 'inherit',
    borderRadius: '50%',
    animation: 'l15 2s infinite',
  },

  '&::after': {
    margin: '8px',
    animationDuration: '3s',
  },

  '@keyframes l15': {
    '100%': { transform: 'rotate(1turn)' },
  },
});

const StyledAppBar = styled(AppBar)(({ isMobile }) => ({
  background: '#274c77',
  fontFamily: 'Montserrat, sans-serif',
  color: '#ecf0f1',
  opacity: '0.75',
  display: 'flex',
  alignItems: 'left',
  justifyContent: isMobile ? 'space-between' : 'space-around',
  padding: isMobile ? '0 10px' : '0 20px',
}));

const NavLinks = styled('ul')(({ isMobile }) => ({
  display: isMobile ? 'none' : 'flex',
  alignItems: 'center',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  color: '#ecf0f1',
  fontFamily: 'Montserrat, sans-serif',
  flexWrap: 'wrap',
}));

const NavItem = styled('li')({
  marginRight: '20px',
  color: '#ecf0f1',
  fontFamily: 'Montserrat, sans-serif',
  display: 'flex',
  alignItems: 'center',
});

const NavLink = styled('a')({
  color: '#ecf0f1',
  textDecoration: 'none',
  fontSize: '18px',
  fontWeight: 500,
  position: 'relative',
  padding: '6px 12px',
  fontFamily: 'Montserrat, sans-serif',
  cursor: 'pointer',
  '&:hover:before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '3px',
    width: '100%',
  },
});

const HomeSection = styled('div')(({ isMobile }) => ({
  margin: isMobile ? '0 5%' : '0 10%',
  backgroundColor: '#eef4f7',
  padding: '20px',
  borderRadius: '8px',
  color: '#2c3e50',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '20px',
  fontFamily: 'Montserrat, sans-serif',
}));

const UserGrid = styled('div')(({ isMobile }) => ({
  display: 'flex',
  flexDirection: isMobile ? 'column' : 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '100px',
  marginBottom: '120px',
  fontFamily: 'Montserrat, sans-serif',

  '& > *': {
    flexBasis: isMobile ? '100%' : '50%',
    textAlign: isMobile ? 'center' : 'left',
  },

  '& > img': {
    maxWidth: isMobile ? '60%' : '40%',
    borderRadius: '50%',
  },
}));

const borderRing = (colors, border, gap) => {
  const numColors = colors.length;
  const borderRadius = `calc(0.5 * ${border})`;
  const borderAngle = `calc(360deg / ${numColors})`;
  let stops = '';
  let gradients = '';

  colors.forEach((color, index) => {
    const currentAngle = `calc(${index + 1} * ${borderAngle})`;
    stops += `${color} 0% ${currentAngle}, `;

    const adjustedAngle = `calc(${currentAngle} - 90deg)`;
    const x = `calc(50% + (50% - ${borderRadius}) * ${Math.cos(adjustedAngle)})`;
    const y = `calc(50% + (50% - ${borderRadius}) * ${Math.sin(adjustedAngle)})`;
    gradients += `radial-gradient(circle at ${x} ${y}, ${color} calc(${borderRadius} - 1px), transparent ${borderRadius}), `;
  });

  return `
    border: solid ${border} transparent;
    padding: ${gap};
    border-radius: 50%;
    background: ${gradients.slice(0, -2)}, conic-gradient(${stops.slice(0, -2)});
    background-origin: border-box;
    --mask: radial-gradient(closest-side, red calc(100% - ${border} - ${gap} - 1px), transparent calc(100% - ${border} - ${gap}) calc(100% - ${border}), red calc(100% - ${border} + 1px) calc(100% - 1px), transparent);
    -webkit-mask: var(--mask);
    mask: var(--mask);
  `;

};

const StyledImage = styled('img')`
width: 150px; // Adjust width as needed
  height: 430px; // Adjust height as needed
  border-radius: 50%;
  display: block;
  font-family: 'Montserrat, sans-serif';
  filter: hue-rotate(17deg);
  transition: filter 0.3s ease;

  &:hover {
    filter: none;
  }

  ${(props) => borderRing(['#6c84cb', '#7d93d2', '#8fa2d9'], '0.60em', '0.35em')}
`;
const SummaryText = styled('p')(({ isMobile }) => ({
  fontSize: isMobile ? '1rem' : '1rem',
  lineHeight: 1.6,
  color: '#111a24',
  marginTop: '20px',
  fontFamily: 'Montserrat, sans-serif',
  whiteSpace: 'normal',    // Example whitespace property
}));


const Section = styled('div')({
  position: 'relative',
  marginLeft: '20px',
  textAlign: 'left',
  display: 'flex',
  alignItems: 'center', // Align items vertically in the center
  '& p': {
    display: 'inline-block',
    position: 'relative',
    paddingLeft: '1.2em',  // Adjust this value as needed for spacing
    fontSize: '1.95rem',
    fontWeight: 'bold',
    color: '#274c77',
    lineHeight: '1.95rem',  // Ensure the line height matches the font size
    margin: '0',  // Remove default margin
    
    '&::before': {
      content: '"<"',  // Use a checkmark instead of a bullet point
      position: 'absolute',
      left: '0',
      color: '#274c77',  // Match the symbol color with the text color
      fontSize: '2.95rem',  // Match the symbol size with the text size
      lineHeight: '1',  // Ensure the symbol is vertically aligned
      top: '50%',
      transform: 'translateY(-50%)',  // Center the symbol vertically
    },
    '&::after': {
      content: '"/>"',  // Add the closing symbol
      color: '#274c77',  // Match the symbol color with the text color
      fontSize: '2.95rem',  // Match the symbol size with the text size
      lineHeight: '1',  // Ensure the symbol is vertically aligned
      marginLeft: '0.2em',  // Add a little space between text and closing symbol
    }
  },
  '& svg': {
    marginLeft: '20px', // Add some space between the text and the line
    flexShrink: 0, // Prevent the line from shrinking
    width: '100%',
    opacity : '2',
  }
});

const StyledH1 = styled('h1')(({ isMobile }) => ({
  padding: '0px',
  fontSize: isMobile ? '40px' : '95px',
  margin: '15px 0px 0px 0px',
  fontWeight: 'bold',
  background: 'linear-gradient(to right, #4c65bc, #ADEFD1FF)',
  '-webkit-background-clip': 'text',
  '-webkit-text-fill-color': 'transparent',
  transition: 'background-position 0.5s ease',
  '&:hover': {
    backgroundPosition: '100% 0%',
  },
  fontFamily: 'Montserrat, sans-serif',
}));

const JobTitle = styled('p')(({ isMobile }) => ({
  margin: '9px 3px 3px 0px',
  fontSize: isMobile ? '20px' : '40px',
  fontWeight: 'bold',
  color: '#2c3e50',
  fontFamily: 'Montserrat, sans-serif',
}));

const EducationGrid = styled('div')({
  margin: '5%',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  alignItems: 'center',
  fontFamily: 'Montserrat, sans-serif',
});

const EducationCard = styled('div')({
  backgroundColor: '#d5deed',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  padding: '20px',
  color: '#000000',
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
    backgroundColor: '#4a70a9',
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
    zIndex:9,
    color: '#274c77',
  },

  '& p': {
    fontSize: '1.1rem',
    margin: '10px 0',
    color: 'black',
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
  color: '#274c77',
  margin: '10px 0',
  textAlign: 'center',
},

'& .des': {
  fontSize: '1rem',
  fontStyle: 'italic',
  color: '#555555',
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
  background-color: ${props => (props.active ? '#3498db' : 'rgba(255, 255, 255, 0.5)')};
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
    width: '50vw',

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
          backgroundColor: '#5d80b3',
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
          backgroundColor: '#5d80b3',
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
      color: '#5d80b3',
      letterSpacing: '1.5px',
    },
    '& .timeline__event__content': {
      padding: '20px',
      boxShadow:
        '0 30px 60px -12px rgba(50, 50, 93, 0.25), 0 18px 36px -18px rgba(0, 0, 0, 0.3), 0 -12px 36px -8px rgba(0, 0, 0, 0.025)',
      backgroundColor: '#fff',
      width: 'calc(40vw - 84px)',
      borderRadius: '0 6px 6px 0',
    },
    '& .timeline__event__date': {
      color: '#fff',
      fontSize: '1.5rem',
      fontWeight: 600,
      backgroundColor: '#5d80b3',
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
      color: '#fff',
      padding: '20px',
      alignSelf: 'center',
      margin: '0 20px',
      backgroundColor: '#5d80b3',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      position: 'relative',

      '&:before': {
        content: '""',
        width: '2px',
        height: '100%',
        backgroundColor: '#5d80b3',
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
        backgroundColor: '#5d80b3',
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
      color: '#7f8c8d',
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
      color: '#7f8c8d',
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
      color: '#7f8c8d',
      backgroundColor :'#7f8c8d'
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
    background-color: #2c3e50;
    font-family: 'Montserrat, sans-serif';
    color: #fff;
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
    color: black;
  }

  input[type="radio"] {
    display: none;
    width: 0;
  }

  label:hover, input[type="radio"]:checked + label {
    color: #1e3d58;
    opacity: 1;
  }

  .popup {
    width: 100%;
    height: 100%;
    min-height: 480px;
    max-height: 480px;
    border-radius: 48px;
    box-sizing: border-box;
    margin: 50px 0;
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
    color: #333;
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
    color: #1e90ff;
    text-decoration: none;
    font-weight: 600;
    transition: color .3s;
  }

  .content a:hover {
    color: #0056b3;
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
    background-color: #708fbd;
  }

  .active-tab-indicator #top {
    height: calc(50%);
    margin-bottom: auto;
    border-radius: 0 0 32px 0;
  }

  .active-tab-indicator #bottom {
    height: calc(50% - 72px);
    border-radius: 0 32px 0 0;
  }
`;

const TechLogo = styled('img')`
  width: 60px;
  height: 60px;
  margin: 10px 20px 10px 10px ;
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
    width: calc(82px * 12); /* Adjust based on the number of images */
    animation: scroll 20s linear infinite;
  }

  .carousel__images {
    display: flex;
    width: calc(80px * 8); /* Adjust based on the number of images */
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

  .projex {
    flex-basis: 100%;
    color: black;
    overflow: hidden;
    position: relative;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    transition: max-height 0.3s ease;
    margin: 10px 0px;
  }

  .projex.expanded {
    webkit-line-clamp: unset;
    max-height: none;
  }
  .show-more {
    display: block;
    background-color: transparent;
    border: none;
    color: #7f8c8d;
    cursor: pointer;
    text-align: left;
    padding: 0;
    margin-top: 5px;
    font-family: Montserrat, sans-serif;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-80px * 8)); /* Adjust based on the number of images */
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
});

const List = styled('div')({
  fontFamily: 'Montserrat, sans-serif',

  '.num': {
    padding: '0.5rem 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  '.number': {
    fontSize: '4rem',
    fontWeight: 'bold',
    color: 'white',
    width: '2rem',
    opacity: '0.1',
    transition: '0.25s',
  },

  '.num:before': {
    fontSize: '4rem',
    fontWeight: 'bold',
    color: 'black',
    width: '2rem',
    opacity: '0.05',
    transition: '0.25s',
  },

  '.num h3': {
    position: 'relative',
    left: '-1.5rem',
    color: 'black',
    fontSize: '1rem',
    transition: '0.25s',
  },

  '.num:hover': {
    backgroundColor: '#849fc7',
    cursor: 'pointer',
  },

  '.num:hover:before': {
    opacity: '0.2',
    color: 'black',
  },

  '.num:hover h3': {
    left: '1rem',
    color: 'black',
  },
});

const FooterContainer = styled('footer')(({ isMobile }) => ({
  position: 'relative',
  width: '100%',
  background: '#274c77',
  minHeight: isMobile ? '100px' : '200px',
  padding: '20px 50px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  overflow: 'hidden',
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
  color: '#fff',
  display: 'inline-block',
  transition: '0.5s',
  '&:hover': {
    transform: 'translateY(-10px)',
  },
});

const FooterText = styled(Typography)({
  color: '#fff',
  margin: '15px 0 10px 0',
  fontSize: '1rem',
  fontWeight: 300,
});

const CompletePage = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const [showFullDescription, setShowFullDescription] = useState({});

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const homeRef = useRef(null);
  const educationRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const certificationRef = useRef(null);
  const [overlayImage, setOverlayImage] = useState(null);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const toggleDescription = (index) => {
    setShowFullDescription((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://rajeswari-depala.netlify.app/api/users?firstName=Depala&lastName=Rajeswari');
        setUserData(response.data);
        console.log('Image URL:', imageUrl);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (userData && userData.projects) {
      const tabsCount = userData.projects.length;
      let percentage;

      if (activeTab === tabsCount - 1) {
        percentage = 56 / tabsCount;
      } else {
        percentage = 55 / tabsCount;
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
        <img key={`${i}-original`} src={`/projects/${projectTitle}/${i}.jpg`} alt={`${projectTitle} ${i}`} />
      );
    }
    // Duplicate the images for a seamless loop
    for (let i = 1; i <= imageCount; i++) {
      images.push(
        <img key={`${i}-duplicate`} src={`/projects/${projectTitle}/${i}.jpg`} alt={`${projectTitle} ${i}`} />
      );
    }
    return <div className="carousel__images">{images}</div>;
};

  return (
    <>
      <StyledAppBar position="sticky" isMobile={isMobile}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DR
          </Typography>
          <NavLinks isMobile={isMobile}>
            <NavItem>
              <NavLink onClick={() => scrollToSection(homeRef)}>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => scrollToSection(educationRef)}>Education</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => scrollToSection(experienceRef)}>Experience</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => scrollToSection(projectsRef)}>Projects</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => scrollToSection(certificationRef)}>Certifications</NavLink>
            </NavItem>
          </NavLinks>
          {isMobile && (
            <IconButton color="inherit" edge="end">
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </StyledAppBar>
      {loading ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : error ? (
        <HomeSection isMobile={isMobile} ref={homeRef}>
          <p>{error}</p>
        </HomeSection>
      ) : (
        <HomeSection isMobile={isMobile} ref={homeRef}>
          <UserGrid isMobile={isMobile}>
            <div>
              <h1>Hello! This is</h1>
              <StyledH1 isMobile={isMobile}>
                {userData.firstName} {userData.lastName}
              </StyledH1>
              <JobTitle isMobile={isMobile}>A {userData.jobTitle}</JobTitle>
              <SummaryText isMobile={isMobile}>{userData.summary}</SummaryText>
            </div>
            <StyledImage
              src={imageUrl.src}
              alt="Profile"
              onError={(e) => console.error('Error loading image:', e.target.src, e)}
            />
          </UserGrid>
          <Section ref={educationRef}><p >Knowledge from</p>
          <svg height="2" width="66%">
      <line x1="0" y1="1" x2="66%" y2="1" style={{ stroke: '#274c77', strokeWidth: 1 }} />
    </svg>
          </Section>
          <EducationGrid>
            <EducationCard>
              <h3>
                {userData.educations[activeIndex].degree} in {userData.educations[activeIndex].fieldOfStudy}
              </h3>
              <img
                src={`/education/${encodeURIComponent(userData.educations[activeIndex].institution)}.png`}
                alt={`${userData.educations[activeIndex].institution} logo`}
                onError={(e) => {
                  if (e.target.src !== `${window.location.origin}/education/default.png`) {
                    e.target.src = '/education/default.png'; // Ensure this file exists
                  }
                }}
              />
              <p className='inst'>{userData.educations[activeIndex].institution}</p>
              <p className='des'>{userData.educations[activeIndex].description}</p>
            </EducationCard>
            <Dots>
              {userData.educations.map((_, index) => (
                <Dot key={index} active={index === activeIndex} onClick={() => setActiveIndex(index)} />
              ))}
            </Dots>
          </EducationGrid>
          <Section ref={experienceRef}> <p>Where I&apos;ve worked</p>
          <svg height="2" width="66%">
      <line x1="0" y1="1" x2="66%" y2="1" style={{ stroke: '#274c77', strokeWidth: 1 }} />
    </svg></Section>
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
                  <button className="show-more" onClick={() => toggleDescription(index)}>
                    {showFullDescription[index] ? 'Show Less' : 'Show More'}
                  </button>
                </div>
              </div>
            ))}
          </Timeline>
          <Section ref={projectsRef}><p>Skills I&apos;ve applied</p> <svg height="2" width="66%">
      <line x1="0" y1="1" x2="66%" y2="1" style={{ stroke: '#274c77', strokeWidth: 1 }} />
    </svg></Section>
          <ProjectsTab>
            <div className="popup">
              <div className="tabs">
                {userData.projects.map((project, index) => (
                  <React.Fragment key={index}>
                    <input type="radio" id={`tab${index + 1}`} name="tab" onChange={() => handleTabChange(index)} />
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
                    <img src={overlayImage} alt="Overlay" />
                   </div>
                  )}
                  <div className="tech-icons">
                    {project.technologies.map((tech, techIndex) => (
                      <TechLogo key={techIndex} src={getTechLogo(tech)} alt={tech} />
                    ))}
                  </div>
                  <div className={`projex ${showFullDescription[index] ? 'expanded' : ''}`}>
                    <div dangerouslySetInnerHTML={{ __html: project.description }} />
                  </div>
                  <button className="show-more" onClick={() => toggleDescription(index)}>
                    {showFullDescription[index] ? 'Show Less' : 'Show More'}
                  </button>
                  <a href={project.glink} target="_blank" rel="noopener noreferrer">
                    View Project
                  </a>
                </ProjectContent>
                ))}
              </div>
            </div>
          </ProjectsTab>
          <Section ref={certificationRef}><p >Credentials earned</p> <svg height="2" width="66%">
      <line x1="0" y1="1" x2="66%" y2="1" style={{ stroke: '#274c77', strokeWidth: 1 }} />
    </svg></Section>
          <Certificates>
            {userData.certifications.map((certification, index) => (
              <List key={index}>
                <div className="num" onClick={() => handleClick(`/certs/${certification.authority}.png`)}>
                   {/* <div className="number">{index + 1}</div>*/}
                  <h3>{certification.name}</h3>
                </div>
              </List>
            ))}
          </Certificates>
          <Modal show={showModal} onClose={() => setShowModal(false)} imagePath={selectedImage} />
        </HomeSection>
      )}
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
        <FooterText>&copy;2024 Depala Rajeswari | All Rights Reserved</FooterText>
      </FooterContainer>
    </>
  );
};

export default CompletePage;