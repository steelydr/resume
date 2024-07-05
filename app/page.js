"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Education from "../components/Education";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Certificates from "../components/Certificates";
import Section from "../components/Section";
import Footer from "../components/Footer";
import { List, ListItemButton, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import { alpha } from "@mui/system";
import { styled } from '@mui/material';

const colors = {
  primary: "#00704A",
  secondary: "#27251F",
  background: "#F1F8F6",
};
const NoLineSection = styled(Section)({
  '& svg': {
    display: 'none',
  },
});
const fonts = {
  primary: "Helvetica, Arial, sans-serif",  // Primary font
  secondary: "Georgia, serif",  // Secondary font for quotes or highlights
};

// Styled components
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

const Heading = styled('h1')({
  fontSize: "3rem",
  fontWeight: "bold",
  color: colors.accent,
  marginBottom: "0.5rem",
});

const SubText = styled('p')({
  fontSize: "1.5rem",
  fontWeight: "normal",
  color: "inherit",
  marginBottom: "2rem",
});

const DetailText = styled('p')({
  fontSize: "1rem",
  fontWeight: "normal",
  color: "inherit",
  textAlign: "center",
  maxWidth: "600px", // Max width for the paragraph
  margin: "0 auto", // Centering the paragraph horizontally
  lineHeight: "1.6" // Line height for better readability
});

const ErrorText = styled('p')({
  fontSize: "1rem",
  color: colors.accent, // Accent color for error messages
  textAlign: "center",
  width: "100%", // Full width to ensure it occupies its own line
  marginTop: "20px" // Space above the error message
});

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row', // Default flex direction is row
  width: '100%',
  '@media (max-width: 768px)': {
    flexDirection: 'column', // On mobile devices, set flex direction to column
  },
});

export default function Home() {
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          //"http://localhost:3000/api/users?firstName=Depala&lastName=Rajeswari"
          "https://rajeswari-depala.netlify.app/api/users?firstName=Depala&lastName=Rajeswari"
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
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
              fontWeight: 700,
              color: colors.primary,
              fontFamily: "Montserrat, sans-serif",
              fontSize: "1rem",
              textAlign: "center",
            },
          }}
        />
      </ListItemButton>
      <ListItemButton onClick={() => { toggleDrawer(false)(); scrollToSection(educationRef); }} sx={{ justifyContent: "center" }}>
        <ListItemText
          primary="EDUCATION"
          primaryTypographyProps={{
            style: {
              fontWeight: 700,
              color: colors.primary,
              fontFamily: "Montserrat, sans-serif",
              fontSize: "1rem",
              textAlign: "center",
            },
          }}
        />
      </ListItemButton>
      <ListItemButton onClick={() => { toggleDrawer(false)(); scrollToSection(experienceRef); }} sx={{ justifyContent: "center" }}>
        <ListItemText
          primary="EXPERIENCE"
          primaryTypographyProps={{
            style: {
              fontWeight: 700,
              color: colors.primary,
              fontFamily: "Montserrat, sans-serif",
              fontSize: "1rem",
              textAlign: "center",
            },
          }}
        />
      </ListItemButton>
      <ListItemButton onClick={() => { toggleDrawer(false)(); scrollToSection(projectsRef); }} sx={{ justifyContent: "center" }}>
        <ListItemText
          primary="PROJECTS"
          primaryTypographyProps={{
            style: {
              fontWeight: 700,
              color: colors.primary,
              fontFamily: "Montserrat, sans-serif",
              fontSize: "1rem",
              textAlign: "center",
            },
          }}
        />
      </ListItemButton>
      <ListItemButton onClick={() => { toggleDrawer(false)(); scrollToSection(certificationRef); }} sx={{ justifyContent: "center" }}>
        <ListItemText
          primary="CERTIFICATION"
          primaryTypographyProps={{
            style: {
              fontWeight: 700,
              color: colors.primary,
              fontFamily: "Montserrat, sans-serif",
              fontSize: "1rem",
              textAlign: "center",
            },
          }}
        />
      </ListItemButton>
    </List>
  );

  const appBarActions = (
    <List component="nav" sx={{ display: "flex" }}>
      <ListItemButton onClick={() => scrollToSection(educationRef)}>
        <ListItemText
          primary="EDUCATION"
          primaryTypographyProps={{
            sx: {
              fontWeight: 770,
              color: colors.primary,
              fontFamily: "Montserrat, sans-serif",
              fontSize: "1rem",
            },
          }}
        />
      </ListItemButton>
      <ListItemButton onClick={() => scrollToSection(experienceRef)}>
        <ListItemText
          primary="EXPERIENCE"
          primaryTypographyProps={{
            sx: {
              fontWeight: 770,
              color: colors.primary,
              fontFamily: "Montserrat, sans-serif",
              fontSize: "1rem",
            },
          }}
        />
      </ListItemButton>
      <ListItemButton onClick={() => scrollToSection(projectsRef)}>
        <ListItemText
          primary="PROJECTS"
          primaryTypographyProps={{
            sx: {
              fontWeight: 790,
              color: colors.primary,
              fontFamily: "Montserrat, sans-serif",
              fontSize: "1rem",
            },
          }}
        />
      </ListItemButton>
      <ListItemButton onClick={() => scrollToSection(certificationRef)}>
        <ListItemText
          primary="CERTIFICATION"
          primaryTypographyProps={{
            sx: {
              fontWeight: 790,
              color: colors.primary,
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
      {!showContent && <Loader showR={showR} />}
      {showContent && (
        <>
          <Navbar
            sx={{ position: 'sticky', top: 0, width: '100%', zIndex: 1000 }} // Apply fixed positioning
            isMobile={isMobile}
            drawerOpen={drawerOpen}
            toggleDrawer={toggleDrawer}
            appBarActions={appBarActions}
            drawerContent={drawerContent}
          />
           <HomeContainer>
      <Heading>Hi there! I am</Heading>
      {userData ? (
        <>
          <Heading>
            {userData.firstName} {userData.lastName}
          </Heading>
          <SubText>A {userData.jobTitle}</SubText>
          <DetailText>{userData.summary}</DetailText>
        </>
      ) : (
        <ErrorText>{error || "Loading..."}</ErrorText>
      )}
    </HomeContainer>
          <p ref={educationRef}></p>
          <Education userData={userData} activeIndex={activeIndex} setActiveIndex={setActiveIndex} sx={{width: '100%'}}/>
          <Section ref={experienceRef}>
            <p>Where I&apos;ve worked</p>
          </Section>
          <Experience userData={userData} />
          <Section ref={projectsRef}>
            <p>Skills I&apos;ve applied</p>
          </Section>
          <Projects userData={userData} />
          <Section ref={certificationRef}>
            <p>Credentials earned</p>
          </Section>
          <Certificates userData={userData} handleClick={() => {}} />
          <Footer />
        </>
      )}
    </React.Fragment>
  );
}
