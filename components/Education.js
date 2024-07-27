import React from 'react';
import { styled } from '@mui/material';
import Image from 'next/image';
import Section from "../components/Section";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const colors = {
  primary: '#8A2BE2', // Violet
  secondary: '#4B0082', // Indigo
  accent: '#DA70D6', // Orchid
  text: '#E9E9E9', // Light Grey
  background: '#1F1F1F', // Almost Black
  white: '#FFFFFF', // White
};

const fonts = {
  primary: "Helvetica, Arial, sans-serif",  // Primary font
  secondary: "Georgia, serif",  // Secondary font for quotes or highlights
};

const FancyBorderRadius = styled('div')(({ zIndexValue, animationDuration, bgColor, sizeAdjustment }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: `calc(45% + ${sizeAdjustment})`, // Adjusted width for desktop
  height: `calc(75% + ${sizeAdjustment})`, // Adjusted height for desktop
  borderRadius: '48% 52% 70% 30% / 35% 22% 78% 65%',
  backgroundColor: bgColor,
  transform: 'translate(-50%, -50%)',
  zIndex: zIndexValue,
  animation: `changeRadius ${animationDuration} infinite alternate`,
  '@keyframes changeRadius': {
    '0%': {
      borderRadius: '48% 52% 70% 30% / 35% 22% 78% 65%',
    },
    '100%': {
      borderRadius: '70% 30% 48% 52% / 78% 65% 35% 22%',
    },
  },
  '@media (max-width: 768px)': {
    width: `calc(30% + ${sizeAdjustment})`, // Adjusted width for mobile
    height: `calc(110% + ${sizeAdjustment})`, // Adjusted height for mobile
  },
}));

const NoLineSection = styled(Section)({
  position: 'absolute',
  '& svg': {
    display: 'none',
  },
  color: colors.text,
  textAlign: 'center',
  paddingTop: '200px',
  fontFamily: fonts.primary,
});

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  backgroundColor: colors.background,
  '@media (max-width: 768px)': {
    flexDirection: 'column',
  },
});

const EducationGrid = styled('div')({
  margin: '5%',
  display: 'flex',
  flexDirection: 'column',
  paddingRight: '120px',
  gap: '20px',
  width: '100%',
  alignItems: 'center',
  fontFamily: fonts.primary,
  textAlign: 'center',
  '@media (max-width: 768px)': {
    margin: '2%',
    paddingRight: '0',
  },
});

const EducationItem = styled('div')({
  color: colors.text,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: colors.background, // Background set to almost black
  padding: '20px',
  borderRadius: '0', // No rounded corners

  '& h3': {
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '20px 0',
    color: colors.text,
    fontFamily: fonts.primary,
  },

  '& p': {
    fontSize: '1.2rem',
    margin: '10px 0',
    color: colors.text,
    fontFamily: fonts.primary,
  },

  '& .image-container': {
    position: 'relative',
    width: '200px',
    height: '150px',
    margin: '10px 0',
  },

  '& .image-container img': {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    filter: 'brightness(1.2) contrast(1.2)', // Adjust brightness and contrast
  },

  '& .inst': {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: colors.text,
    margin: '10px 0',
  },

  '& .des': {
    fontSize: '1rem',
    color: colors.text,
    margin: '10px 0',
    textAlign: 'justify',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    padding: '0 20px',
    width: 'calc(100% - 40px)',
  },

  '@media (max-width: 600px)': {
    '& h3': {
      fontSize: '1.5rem',
    },
    '& p': {
      fontSize: '1rem',
    },
    '& .inst': {
      fontSize: '1rem',
    },
    '& .image-container': {
      width: '150px',
      height: '100px',
    },
    '& .des': {
      fontSize: '0.9rem',
      textAlign: 'left',
    },
  },
});

const Navigation = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
  margin-top: 16px;
  font-family: ${fonts.primary};
`;

const ArrowButton = styled('div')`
  color: ${colors.text};
  cursor: pointer;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  
  &:hover {
    color: ${colors.primary};
  }
`;

const ArrowLeftButton = styled(ArrowButton)`
  left: -50px; /* Adjust this value to position the left arrow */
`;

const ArrowRightButton = styled(ArrowButton)`
  right: -50px; /* Adjust this value to position the right arrow */
`;

const Education = ({ userData, activeIndex, setActiveIndex }) => {
  if (!userData || !userData.educations) {
    return null;
  }

  const handlePrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : userData.educations.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex < userData.educations.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <Container>
      <NoLineSection
        sx={{
          position: 'sticky',
          top: 0,
          width: '100%',
          zIndex: 1,
          paddingLeft: '200px',
          color: colors.text,
          '@media (max-width: 768px)': {
            width: '100%',
            paddingLeft: '40px',
          },
        }}
      >
        <p>Knowledge from</p>
      </NoLineSection>
      <EducationGrid>
        <Navigation>
          <ArrowLeftButton onClick={handlePrevious}>
            <ArrowBackIosIcon fontSize="large" />
          </ArrowLeftButton>
          <EducationItem>
            <h3>{userData.educations[activeIndex].degree} in {userData.educations[activeIndex].fieldOfStudy}</h3>
            <div className="image-container">
              <Image
                src={`/education/${encodeURIComponent(userData.educations[activeIndex].institution)}.png`}
                alt={`${userData.educations[activeIndex].institution} logo`}
                width={200}
                height={150}
                onError={(e) => {
                  if (e.target.src !== `${window.location.origin}/education/default.png`) {
                    e.target.src = '/education/default.png';
                  }
                }}
                style={{ filter: 'brightness(1.2) contrast(1.2)' }} // Adjust brightness and contrast
              />
            </div>
            <p className="inst">{userData.educations[activeIndex].institution}</p>
            <p className="des">{userData.educations[activeIndex].description}</p>
          </EducationItem>
          <ArrowRightButton onClick={handleNext}>
            <ArrowForwardIosIcon fontSize="large" />
          </ArrowRightButton>
        </Navigation>
      </EducationGrid>
    </Container>
  );
};

export default Education;
