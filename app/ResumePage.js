"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import axios from "axios";
import { List, ListItemButton, ListItemText, useMediaQuery, useTheme, Button } from "@mui/material";
import { alpha } from "@mui/system";
import { styled } from "@mui/material";
import { GrContact } from "react-icons/gr";

const Navbar = React.lazy(() => import("../components/Navbar"));
const Loader = React.lazy(() => import("../components/Loader"));
const Education = React.lazy(() => import("../components/Education"));
const Experience = React.lazy(() => import("../components/Experience"));
const Projects = React.lazy(() => import("../components/Projects"));
const Certificates = React.lazy(() => import("../components/Certificates"));
const Section = React.lazy(() => import("../components/Section"));
const Footer = React.lazy(() => import("../components/Footer"));

const colors = {
  primary: '#8A2BE2',
  secondary: '#4B0082',
  accent: '#DA70D6',
  text: '#E9E9E9',
  background: '#1F1F1F',
  white: '#FFFFFF',
};

const fonts = {
  primary: "Helvetica, Arial, sans-serif",
  secondary: "Georgia, serif",
};

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

const HomeContainer = styled('div')({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: colors.background,
  color: colors.primary,
  fontFamily: fonts.primary,
  padding: "20px",
  boxSizing: "border-box",
  position: "relative",
});

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
  },
});

const SectionText = styled('p')({
  color: colors.white,
});

const ContactIconContainer = styled('div')({
  position: 'fixed',
  bottom: '30px',
  right: '30px',
  zIndex: 1000,
  cursor: 'pointer',
});

const ContactIcon = styled(GrContact)({
  color: colors.accent,
  fontSize: '2rem',
});

export default function ResumePage() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showD, setShowD] = useState(false);
  const [showR, setShowR] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [smallLoader, setSmallLoader] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const homeRef = useRef(null);
  const educationRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const certificationRef = useRef(null);
  const contactRef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/users?firstName=Depala&lastName=Rajeswari"
          //"https://rajeswaridepalav.netlify.app/api/users?firstName=Depala&lastName=Rajeswari"
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error);
      } finally {
        setLoading(false);
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
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const drawerContent = (
    <List
      sx={{
        width: 250,
        bgcolor: colors.background,
        "& .MuiListItemButton-root:hover": {
          bgcolor: alpha(colors.primary, 0.25),
        },
      }}
    >
      <ListItemButton onClick={() => { toggleDrawer(false)(); scrollToSection(homeRef); }} sx={{ justifyContent: "center" }}>
        <ListItemText
          primary="HOME"
          primaryTypographyProps={{
            style: {
              fontWeight: 400,
              color: colors.accent,
              fontFamily: "Montserrat, sans-serif",
              fontSize: "1rem",
              textAlign: "center",
            },
          }}
        />
      </ListItemButton>
      <ListItemButton onClick={() => { toggleDrawer(false)(); scrollToSection(educationRef); }} sx={{ justifyContent: "center" }}>
        <ListItemText
          primary="Background"
          primaryTypographyProps={{
            sx: {
              fontWeight: 300,
              color: colors.text,
              fontFamily: "Montserrat, sans-serif",
              fontSize: "1rem",
              textAlign: "center",
            },
          }}
        />
      </ListItemButton>
      <ListItemButton onClick={() => { toggleDrawer(false)(); scrollToSection(experienceRef); }} sx={{ justifyContent: "center" }}>
        <ListItemText
          primary="Career"
          primaryTypographyProps={{
            sx: {
              fontWeight: 300,
              color: colors.text,
              fontFamily: "Montserrat, sans-serif",
              fontSize: "1rem",
              textAlign: "center",
            },
          }}
        />
      </ListItemButton>
      <ListItemButton onClick={() => { toggleDrawer(false)(); scrollToSection(projectsRef); }} sx={{ justifyContent: "center" }}>
        <ListItemText
          primary="Endeavors"
          primaryTypographyProps={{
            sx: {
              fontWeight: 300,
              color: colors.text,
              fontFamily: "Montserrat, sans-serif",
              fontSize: "1rem",
              textAlign: "center",
            },
          }}
        />
      </ListItemButton>
      <ListItemButton onClick={() => { toggleDrawer(false)(); scrollToSection(certificationRef); }} sx={{ justifyContent: "center" }}>
        <ListItemText
          primary="Credentials"
          primaryTypographyProps={{
            sx: {
              fontWeight: 300,
              color: colors.text,
              fontFamily: "Montserrat, sans-serif",
              fontSize: "1rem",
              textAlign: "center",
            },
          }}
        />
      </ListItemButton>
      <ResumeButton variant="outlined" sx={{ marginLeft: '77px', marginTop: '50px', }}>Resume</ResumeButton>
    </List>
  );

  const appBarActions = (
    <List component="nav" sx={{ display: "flex" }}>
      <ListItemButton onClick={() => scrollToSection(educationRef)}>
        <ListItemText
          primary="Background"
          primaryTypographyProps={{
            sx: {
              fontWeight: 300,
              color: colors.text,
              fontFamily: "Montserrat, sans-serif",
              fontSize: "1rem",
            },
          }}
        />
      </ListItemButton>
      <ListItemButton onClick={() => scrollToSection(experienceRef)}>
        <ListItemText
          primary="Career"
          primaryTypographyProps={{
            sx: {
              fontWeight: 300,
              color: colors.text,
              fontFamily: "Montserrat, sans-serif",
              fontSize: "1rem",
            },
          }}
        />
      </ListItemButton>
      <ListItemButton onClick={() => scrollToSection(projectsRef)}>
        <ListItemText
          primary="Endeavors"
          primaryTypographyProps={{
            sx: {
              fontWeight: 300,
              color: colors.text,
              fontFamily: "Montserrat, sans-serif",
              fontSize: "1rem",
            },
          }}
        />
      </ListItemButton>
      <ListItemButton onClick={() => scrollToSection(certificationRef)}>
        <ListItemText
          primary="Credentials"
          primaryTypographyProps={{
            sx: {
              fontWeight: 300,
              color: colors.text,
              fontFamily: "Montserrat, sans-serif",
              fontSize: "1rem",
            },
          }}
        />
      </ListItemButton>
    </List>
  );

  return (
    <React.Fragment>
      <Suspense fallback={<Loader showR={showR} />}>
        {!showContent && <Loader showR={showR} />}
        {showContent && (
          <>
            <Navbar
              sx={{ position: 'sticky', top: 0, width: '100%', zIndex: 1000 }}
              isMobile={isMobile}
              drawerOpen={drawerOpen}
              toggleDrawer={toggleDrawer}
              appBarActions={appBarActions}
              drawerContent={drawerContent}
            />
            <HomeContainer>
              {userData ? (
                <>
                  <p style={{ color: colors.text, fontFamily: fonts.primary, fontSize: "1.5rem", textAlign: "center" }}>Hi, my name is</p>
                  <h1 style={{ fontSize: "4rem", fontWeight: "bold", color: colors.accent, textAlign: "center", marginTop: '0px' }}>{userData.firstName} {userData.lastName}</h1>
                  <h2 style={{ fontSize: "3rem", fontWeight: "normal", color: colors.text, textAlign: "center", marginLeft: '2rem', marginRight: '2rem', marginTop: '10px' }}> A {userData.jobTitle}</h2>
                  <p style={{ fontSize: "1rem", fontWeight: "normal", color: colors.text, textAlign: "center", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
                    {userData.summary}
                  </p>
                </>
              ) : (
                <></>  // Removed the loading text
              )}
            </HomeContainer>
            <ContactIconContainer onClick={() => scrollToSection(contactRef)}>
              <ContactIcon />
            </ContactIconContainer>
            <p sx={{ color: colors.background }} ref={educationRef}></p>
            <Suspense fallback={<Loader showR={showR} />}>
              <Education userData={userData} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
            </Suspense>
            <Suspense fallback={<Loader showR={showR} />}>
              <Section ref={experienceRef}>
                <SectionText>Where I&apos;ve Worked</SectionText>
              </Section>
              <Experience userData={userData} sx={{ color: colors.white }} />
            </Suspense>
            <Suspense fallback={<Loader showR={showR} />}>
              <Section ref={projectsRef}>
                <SectionText>Skills I&apos;ve Applied</SectionText>
              </Section>
              <Projects userData={userData} sx={{ color: colors.white }} />
            </Suspense>
            <Suspense fallback={<Loader showR={showR} />}>
              <Section ref={certificationRef}>
                <SectionText>Credentials Earned</SectionText>
              </Section>
              <Certificates userData={userData} handleClick={() => { }} sx={{ color: colors.white }} />
            </Suspense>
            <p ref={contactRef}></p>
            <Suspense fallback={<Loader showR={showR} />}>
              <Footer />
            </Suspense>
          </>
        )}
      </Suspense>
    </React.Fragment>
  );
}
