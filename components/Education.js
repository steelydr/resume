import React from 'react';
import { styled } from '@mui/material';
import Image from 'next/image';
import Section from "../components/Section";

const colors = {
  primary: '#00704A', // Starbucks Green
  secondary: '#005241', // Deep Green
  accent: '#D4E9E2', // Light Mint Green
  text: '#1E3932', // Almost Black
  background: '#FFFFFF', // White
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
  fontFamily: 'Montserrat, sans-serif',
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
  fontFamily: 'Montserrat, sans-serif',
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
  backgroundColor: colors.background, // Background set to white
  padding: '20px',
  borderRadius: '0', // No rounded corners

  '& h3': {
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '20px 0',
    color: colors.text,
    fontFamily: 'Montserrat, sans-serif',
  },

  '& p': {
    fontSize: '1.2rem',
    margin: '10px 0',
    color: colors.text,
    fontFamily: 'Montserrat, sans-serif',
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
    backgroundColor: 'transparent',
    mixBlendMode: 'multiply',
  },

  '& .inst': {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: colors.text,
    margin: '10px 0',
  },

  '& .des': {
    fontSize: '1rem',
    fontStyle: 'italic',
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

const Dots = styled('div')`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  font-family: 'Montserrat, sans-serif';
`;

const Dot = styled('div')`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => (props.active ? colors.primary : colors.accent)};
  margin: 0 8px;
  cursor: pointer;
`;


const Education = ({ userData, activeIndex, setActiveIndex }) => (
  <Container>
    <NoLineSection
      sx={{
        position: 'sticky',
        top: 0,
        width: '100%',
        zIndex: 1000,
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
          />
        </div>
        <p className="inst">{userData.educations[activeIndex].institution}</p>
        <p className="des">{userData.educations[activeIndex].description}</p>
      </EducationItem>
      <Dots>
        {userData.educations.map((_, index) => (
          <Dot key={index} active={index === activeIndex} onClick={() => setActiveIndex(index)} />
        ))}
      </Dots>
    </EducationGrid>
  </Container>
);

export default Education;
