import React, { useState } from 'react';
import { styled } from '@mui/material';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { Button, TextField } from "@mui/material";
import { alpha } from "@mui/system";
import { GrSend } from "react-icons/gr";

const colors = {
  primary: '#8A2BE2', // Violet
  secondary: '#4B0082', // Indigo
  accent: '#DA70D6', // Orchid
  text: '#E9E9E9', // Light Grey
  background: '#1F1F1F', // Almost Black
  white: '#FFFFFF', // White
};

const Ebutton = styled(Button)({
  color: colors.text,
  borderColor: colors.accent,
  fontWeight: 300,
  fontFamily: "Montserrat, sans-serif",
  fontSize: "1rem",
  textTransform: 'none',
  marginTop: '20px', // Adjust the margin as needed
  '&:hover': {
    borderColor: colors.accent,
    backgroundColor: alpha(colors.accent, 0.3),
  },
});

const FooterContainer = styled('footer')(({ isMobile }) => ({
  position: 'relative',
  width: '100%',
  background: colors.background,
  minHeight: isMobile ? '100px' : '200px',
  padding: '20px 50px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  fontFamily: "Montserrat, sans-serif",
  overflow: 'hidden',

  '@media (max-width: 1200px)': {
    minHeight: isMobile ? '100px' : '180px',
    padding: '20px 40px',
  },

  '@media (max-width: 768px)': {
    minHeight: isMobile ? '100px' : '150px',
    padding: '20px 30px',
    textAlign: 'center',
  },

  '@media (max-width: 480px)': {
    minHeight: isMobile ? '100px' : '120px',
    padding: '20px 20px',
    textAlign: 'center',
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
  '@media (max-width: 768px)': {
    gap: '20px'
  },
});

const SocialIconItem = styled('li')({
  margin: '0 10px',
  '@media (max-width: 768px)': {
    margin: '10px 0',
  },
});

const SocialIconLink = styled('a')({
  fontSize: '2rem',
  color: colors.white,
  display: 'inline-block',
  transition: '0.5s',
  '&:hover': {
    transform: 'translateY(-4px)',
    color: colors.accent,
  },
});

const FooterText = styled('div')({
  color: colors.white,
  margin: '10px 0 7px 0',
  fontSize: '1rem',
  fontWeight: 300,
  textAlign: 'center',
});

const FooterDes = styled('div')({
  color: colors.white,
  margin: '5px 0 5px 0',
  fontSize: '1rem',
  fontWeight: 300,
  textAlign: 'center',
});

const FooterParagraph = styled('p')({
  color: colors.white,
  margin: '10px 0',
  padding: '0 20px',
  fontSize: '1rem',
  fontWeight: 300,
  textAlign: 'center',
  maxWidth: '600px', // Limit the width for better readability
  lineHeight: '1.5', // Improve readability with better line height
  '@media (max-width: 768px)': {
    padding: '0 10px',
    fontSize: '0.9rem',
    marginRight: '40px',
  },
});

const StyledGrSend = styled(GrSend)({
  color: colors.accent,
  fontSize: '1.5rem',
  transition: '0.3s',
  '&:hover': {
    transform: 'scale(1.1)',
    color: colors.primary,
  },
});

const NoHoverButton = styled(Button)({
  margin: '5px',
  marginBottom: '10px',
  borderColor: colors.background,
  color: colors.text,
  backgroundColor: colors.background,
  '&:hover': {
    borderColor: colors.background,
    color: colors.text,
    backgroundColor: colors.background,
  },
});

const Footer = () => {
  const [showButton, setShowButton] = useState(true);
  const [message, setMessage] = useState('');

  const handleButtonClick = () => {
    setShowButton(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Replace with your email sending logic
    const mailtoLink = `mailto:dsoni071rajeswari@gmail.com?subject=Message%20from%20Website&body=Message:%20${message}`;
    window.location.href = mailtoLink;
  };

  return (
    <FooterContainer>
      <SocialIconList>
        <SocialIconItem>
          <SocialIconLink href="https://www.linkedin.com/in/rajeswarid/" target="_blank" rel="noopener noreferrer">
            <FiLinkedin />
          </SocialIconLink>
        </SocialIconItem>
        <SocialIconItem>
          <SocialIconLink href="https://github.com/steelydr" target="_blank" rel="noopener noreferrer">
            <FiGithub />
          </SocialIconLink>
        </SocialIconItem>
      </SocialIconList>
      <FooterParagraph>
        I am actively seeking full-time opportunities and welcome any inquiries or connections. Feel free to reach out, whether you have a specific question or simply wish to connect. I will respond promptly.
      </FooterParagraph>
      <FooterDes sx={{ margin: '10px' }}>Email : dsoni071rajeswari@gmail.com</FooterDes>
      {showButton ? (
        <Ebutton variant="outlined" sx={{ margin: '20px', marginBottom: '50px' }} onClick={handleButtonClick}>
          Say Hi!
        </Ebutton>
      ) : (
        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
          <TextField
            label="Your Message"
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            inputProps={{ maxLength: 40 }}
            required
            sx={{
              marginBottom: '20px',
              width: '300px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: colors.accent,
                  color: colors.white,
                },
                '&:hover fieldset': {
                  borderColor: colors.accent,
                  color: colors.white,
                },
                '&.Mui-focused fieldset': {
                  borderColor: colors.accent,
                  color: colors.white,
                },
              },
              '& .MuiInputLabel-root': {
                color: colors.white,  // Change label color to white
              },
              '& .MuiInputBase-input': {
                color: colors.text,
              },
            }}
          />
          <NoHoverButton type="submit" variant="outlined">
            <StyledGrSend />
          </NoHoverButton>
        </form>
      )}
      <FooterDes sx={{ margin: '5px', marginBottom: '10px' }}>Built with Next.js and MongoDB</FooterDes>
      <FooterText sx={{ margin: '5px', marginBottom: '60px' }}>&copy;2024 Depala Rajeswari | All Rights Reserved</FooterText>
    </FooterContainer>
  );
};

export default Footer;
