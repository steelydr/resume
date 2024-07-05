import React from 'react';
import { styled } from '@mui/material';
import { IoLogoGithub, IoLogoLinkedin } from 'react-icons/io';

const colors = {
  primary: '#00704A',
  secondary: '#27251F',
  background: '#F1F8F6',
  text: '#1E3932',
};

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

const FooterText = styled('div')({
  color: colors.background,
  margin: '10px 0 7px 0',
  fontSize: '1rem',
  fontWeight: 300,
  textAlign: 'center',
});

const FooterDes = styled('div')({
  color: colors.background,
  margin: '5px 0 5px 0',
  fontSize: '1rem',
  fontWeight: 300,
  textAlign: 'center',
});

const Footer = () => (
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
);

export default Footer;
