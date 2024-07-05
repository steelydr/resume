import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, List, ListItemButton, ListItemText, Drawer, alpha, styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { IoLogoGithub, IoLogoLinkedin } from 'react-icons/io';

const colors = {
  primary: '#00704A',
  secondary: '#27251F',
  accent: '#D4E9E2',
  background: '#F1F8F6',
  text: '#1E3932',
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
const Navbar = ({ isMobile, drawerOpen, toggleDrawer, appBarActions, drawerContent }) => {
  
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: alpha(colors.accent, 0.9),
        backdropFilter: 'blur(10px)',
        boxShadow: 'none',
        width: '100%',
        paddingTop: '5px',
        paddingRight: '20px',
      }}
    >
      <Toolbar sx={{ width: '100%', backgroundColor: alpha(colors.accent, 0.9) }}>
        <Typography
          variant="h6"
          component="div"
          onClick={() => window.scrollTo(0, 0)}
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            color: colors.primary,
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '1rem',
            marginLeft: '10px',
            cursor: 'pointer',
          }}
        >
          HOME
        </Typography>
        {isMobile ? (
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            {drawerOpen ? <StyledCloseIcon open={drawerOpen} /> : <StyledMenuIcon open={drawerOpen} />}
          </IconButton>
        ) : (
          appBarActions // This ensures appBarActions are visible on non-mobile devices
        )}
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
  );
};

export default Navbar;
