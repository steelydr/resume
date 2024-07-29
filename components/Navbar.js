import React from 'react';
import { AppBar, Toolbar, IconButton, Drawer, alpha, styled, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { keyframes } from '@mui/material';

const colors = {
  primary: '#8A2BE2', // Violet
  secondary: '#4B0082', // Indigo
  accent: '#DA70D6', // Orchid
  text: '#E9E9E9', // Light Grey
  background: '#1F1F1F', // Almost Black
  white: '#FFFFFF', // White
};

const LoaderWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  backgroundColor: colors.background,
  position: 'relative',
  overflow: 'hidden',
});

const scaleIn = keyframes`
  0% { transform: scale(0); }
  100% { transform: scale(1); }
`;

const draw = keyframes`
  0% {
    stroke-dasharray: 0, 400;
  }
  100% {
    stroke-dasharray: 400, 0;
  }
`;

const Polygon = styled('svg')({
  width: '56px', // Adjusted size
  height: '56px', // Adjusted size
  animation: `${scaleIn} 0.5s ease-out`,
});

const PolygonPath = styled('polygon')({
  fill: 'none',
  stroke: colors.primary,
  strokeWidth: 5,
  strokeDasharray: 400,
  animation: `${draw} 2s ease-in-out`,
});

const Text = styled('div')({
  fontSize: '1.6rem', // Adjusted size
  fontWeight: 700,
  fontFamily: "'Roboto', sans-serif",
  color: colors.accent,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
  letterSpacing: '0.05rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '56px', // Adjusted size
  height: '56px', // Adjusted size
});

const Loader = ({ showR }) => (
  <LoaderWrapper>
    <Polygon viewBox="0 0 100 100">
      <PolygonPath points="50,5 90,25 90,75 50,95 10,75 10,25" />
    </Polygon>
    {showR && <Text>R</Text>}
  </LoaderWrapper>
);

const ResumeButton = styled(Button)({
  color: colors.text,
  borderColor: colors.accent,
  fontWeight: 300,
  fontFamily: "Montserrat, sans-serif",
  fontSize: "1rem",
  textTransform: 'none',
  '&:hover': {
    borderColor: colors.accent,
    backgroundColor: alpha(colors.accent, 0.1),
  },
});

const StyledMenuIcon = styled(MenuIcon)(({ open }) => ({
  transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: 'transform 0.3s ease-in-out',
  color: colors.secondary,
}));

const StyledCloseIcon = styled(CloseIcon)(({ open }) => ({
  transform: open ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: 'transform 0.3s ease-in-out',
  color: colors.white,
  fontSize: '35px',
}));

const LoaderContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  height: '50px',
  width: '50px',
  marginRight: '20px', // Add margin to separate from other elements
});

const Navbar = ({ isMobile, drawerOpen, toggleDrawer, appBarActions, drawerContent }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: alpha(colors.background, 0.9),
        backdropFilter: 'blur(10px)',
        boxShadow: 'none',
        width: '100%',
        paddingTop: '5px',
        paddingRight: '2px',
      }}
    >
      <Toolbar sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', backgroundColor: alpha(colors.background, 0.9) }}>
        <LoaderContainer onClick={() => window.scrollTo(0, 0)}>
          <Loader showR={true} />
        </LoaderContainer>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!isMobile && appBarActions}
          {!isMobile && (
            <ResumeButton variant="outlined" sx={{ marginRight: '0px' }}>
              Resume
            </ResumeButton>
          )}
          {isMobile && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              {drawerOpen ? <StyledCloseIcon open={drawerOpen} /> : <StyledMenuIcon open={drawerOpen} />}
            </IconButton>
          )}
        </Box>
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
            color: colors.white,
            padding: '10px',
          },
        }}
      >
        <Box sx={{ display: 'flex',padding: '40px', justifyContent: 'start' }}>
          <IconButton onClick={toggleDrawer(false)}>
            <StyledCloseIcon open={drawerOpen} />
          </IconButton>
        </Box>
        {drawerContent}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
