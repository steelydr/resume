import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/system';
import { AppBar, Toolbar, Typography } from '@mui/material';
import axios from 'axios';
import { IoLogoGithub, IoLogoLinkedin } from 'react-icons/io';
import { useMediaQuery } from 'react-responsive';
import imageUrl from './myimageraj.jpg';

const StyledAppBar = styled(AppBar)({
  background: '#274c77',
  fontFamily: 'Montserrat, sans-serif',
  color: '#ecf0f1',
  opacity: '0.75',
  display: 'flex',
  alignItems: 'left',
  justifyContent: 'space-between',
  padding: '0 20px',
});

const NavLinks = styled('ul')({
  display: 'flex',
  alignItems: 'center',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  color: '#ecf0f1',
  fontFamily: 'Montserrat, sans-serif',
  flexWrap: 'wrap',
});

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

const StyledImage = styled('img')({
  width: '100%',
  borderRadius: '50%',
  display: 'block',
  height: '100%',
  animation: 'hue-rotate 10s linear infinite',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.01)',
  },
  fontFamily: 'Montserrat, sans-serif',
});

const EducationGrid = styled('div')({
  margin: '0 10%',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  alignItems: 'center',
  fontFamily: 'Montserrat, sans-serif',
});

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
  margin: '3px 3px 3px 0px',
  fontSize: isMobile ? '20px' : '40px',
  fontWeight: 'bold',
  color: '#2c3e50',
  fontFamily: 'Montserrat, sans-serif',
}));

const EducationCard = styled('div')({
  backgroundColor: '#d5deed',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  padding: '10px',
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
    color: '#2c3e50',
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

const Arrow = styled('div')`
  font-size: 24px;
  color: #3498db;
  cursor: pointer;
  text-align: center;
  font-family: 'Montserrat, sans-serif';

  &:hover {
    transform: scale(1.1);
  }
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
    background-color: #f5f5f5;
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

const FooterContainer = styled('footer')({
  position: 'relative',
  width: '100%',
  background: '#274c77',
  minHeight: '200px',
  padding: '20px 50px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  overflow: 'hidden',
});

const Waves = styled('div')({
  position: 'absolute',
  bottom: 0,
  left: 0,
  top: '-100px',
  width: '100%',
  height: '200px',
  overflow: 'hidden',
  lineHeight: 0,
  '& .wave': {
    position: 'absolute',
    width: '200%',
    height: '200px',
    background: 'url("https://i.ibb.co/wQZVxxk/wave.png") repeat-x',
    backgroundSize: '50% 200px',
  },
  '& #wave1': {
    zIndex: 1000,
    opacity: 1,
    bottom: 0,
    animation: 'moveWaves 4s linear infinite',
  },
  '& #wave2': {
    zIndex: 999,
    opacity: 0.5,
    bottom: '10px',
    animation: 'moveWaves 4s linear infinite reverse',
  },
  '& #wave3': {
    zIndex: 1000,
    opacity: 0.2,
    bottom: '20px',
    animation: 'moveWaves 3s linear infinite',
  },
  '& #wave4': {
    zIndex: 999,
    opacity: 0.7,
    bottom: '30px',
    animation: 'moveWaves 3s linear infinite reverse',
  },
  '@keyframes moveWaves': {
    '0%': {
      transform: 'translateX(0)',
    },
    '100%': {
      transform: 'translateX(-50%)',
    },
  },
});

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

const MenuList = styled('ul')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '10px 0',
  flexWrap: 'wrap',
  listStyle: 'none',
  padding: 0,
});

const MenuItem = styled('li')({
  margin: '0 10px',
});

const MenuLink = styled('a')({
  fontSize: '1.2rem',
  color: '#fff',
  display: 'inline-block',
  transition: '0.5s',
  textDecoration: 'none',
  opacity: 0.75,
  fontWeight: 300,
  '&:hover': {
    opacity: 1,
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

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const toggleDescription = (index) => {
    setShowFullDescription((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handlePrevClick = () => {
    setActiveIndex(activeIndex === 0 ? userData.educations.length - 1 : activeIndex - 1);
  };

  const handleNextClick = () => {
    setActiveIndex(activeIndex === userData.educations.length - 1 ? 0 : activeIndex + 1);
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

  return (
    <>
      <StyledAppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DR
          </Typography>
          <NavLinks>
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
              <p>{userData.summary}</p>
            </div>
            <StyledImage
              src={imageUrl.src}
              alt="Profile"
              onError={(e) => console.error('Error loading image:', e.target.src, e)}
            />
          </UserGrid>
          <h2 ref={educationRef}> Education</h2>
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
  <p>{userData.educations[activeIndex].institution}</p>
  <p>{userData.educations[activeIndex].description}</p>
</EducationCard>
            <Dots>
              {userData.educations.map((_, index) => (
                <Dot key={index} active={index === activeIndex} onClick={() => setActiveIndex(index)} />
              ))}
            </Dots>
          </EducationGrid>
          <Timeline ref={experienceRef}>
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
          <ProjectsTab ref={projectsRef}>
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
                  <div key={index} className={`content ${activeTab === index ? 'active' : ''}`}>
                    <p>{project.description}</p>
                    <p><strong>Technologies Used:</strong> {project.technologies.join(', ')}</p>
                    <a href={project.glink} target="_blank" rel="noopener noreferrer">
                      View Project
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </ProjectsTab>
          <Certificates ref={certificationRef}>
            {userData.certifications.map((certification, index) => (
              <List key={index}>
                <div className="num">
                  <div className="number">{index + 1}</div>
                  <h3>{certification.name}</h3>
                </div>
              </List>
            ))}
          </Certificates>
        </HomeSection>
      )}
      <FooterContainer>
        <SocialIconList>
          <SocialIconItem>
            <SocialIconLink href="#">
              <IoLogoLinkedin />
            </SocialIconLink>
          </SocialIconItem>
          <SocialIconItem>
            <SocialIconLink href="#">
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
