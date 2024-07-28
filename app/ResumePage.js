"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import axios from "axios";
import {
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
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
  primary: "#8A2BE2",
  secondary: "#4B0082",
  accent: "#DA70D6",
  text: "#E9E9E9",
  background: "#1F1F1F",
  white: "#FFFFFF",
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
  textTransform: "none",
  "&:hover": {
    borderColor: colors.accent,
    backgroundColor: alpha(colors.accent, 0.1),
  },
});

const HomeContainer = styled("div")({
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

const Container = styled("div")({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  "@media (max-width: 768px)": {
    flexDirection: "column",
  },
});

const SectionText = styled("p")({
  color: colors.white,
});

const ContactIconContainer = styled("div")({
  position: "fixed",
  bottom: "30px",
  right: "30px",
  zIndex: 1000,
  cursor: "pointer",
});

const ContactIcon = styled(GrContact)({
  color: colors.accent,
  fontSize: "2rem",
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
          "http://localhost:3001/api/users?firstName=Depala&lastName=Rajeswari",
          //"https://rajeswaridepalav.netlify.app/api/users?firstName=Depala&lastName=Rajeswari",
          {
            headers: {
              'Cache-Control': 'no-cache'
            }
          }
        );
        if (response.status === 200) {
          setUserData(response.data);
        } else if (response.status === 304) {
          // Handle the 304 status code
          console.log("Data not modified, using cached data.");
        }
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
      const container = document.createElement('div');
      container.className = 'bubble-container';
      document.body.appendChild(container);
      createBubbles();
    }, 2000);
  }, []);
  
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
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
      <ListItemButton
        onClick={() => {
          toggleDrawer(false)();
          scrollToSection(homeRef);
        }}
        sx={{ justifyContent: "center" }}
      >
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
      <ListItemButton
        onClick={() => {
          toggleDrawer(false)();
          scrollToSection(educationRef);
        }}
        sx={{ justifyContent: "center" }}
      >
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
      <ListItemButton
        onClick={() => {
          toggleDrawer(false)();
          scrollToSection(experienceRef);
        }}
        sx={{ justifyContent: "center" }}
      >
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
      <ListItemButton
        onClick={() => {
          toggleDrawer(false)();
          scrollToSection(projectsRef);
        }}
        sx={{ justifyContent: "center" }}
      >
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
      <ListItemButton
        onClick={() => {
          toggleDrawer(false)();
          scrollToSection(certificationRef);
        }}
        sx={{ justifyContent: "center" }}
      >
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
      <ResumeButton variant="outlined" sx={{ marginLeft: "77px", marginTop: "50px" }}>
        Resume
      </ResumeButton>
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

  function createBubbles() {
    const bubbleContainer = document.querySelector(".bubble-container");
    if (!bubbleContainer) {
      console.error("Bubble container not found");
      return;
    }

    // Clear existing bubbles to avoid accumulation
    while (bubbleContainer.firstChild && bubbleContainer.children.length >= 3) {
      bubbleContainer.removeChild(bubbleContainer.lastChild);
    }

    const numBubbles = 2 + Math.floor(Math.random() * 5); // Generates between 2 and 6 bubbles
    for (let i = 0; i < numBubbles; i++) {
      const isCluster = Math.random() > 0.7; // 30% chance to start a cluster
      const clusterSize = isCluster ? Math.floor(Math.random() * 2) + 2 : 1; // Cluster size 2 or 3

      for (let j = 0; j < clusterSize; j++) {
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        const size = Math.random() * (60 - 40) + 40; // Bubble size between 40px and 60px
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;

        // Clustered bubbles are closer together
        const offset = j * 10; // Slight horizontal offset for clusters
        bubble.style.left = `${Math.random() * (window.innerWidth - size) + offset}px`; // Adjust for clusters

        // Adjust bubble appearance
        bubble.style.borderRadius = "50%";

        // Animation timing
        const animationDelay = Math.random() * 1; // Delay between 0 and 1 seconds
        bubble.style.animationDelay = `${animationDelay}s`;
        bubble.style.animationDuration = `${5 + Math.random() * 3}s`; // Duration between 5 and 8 seconds

        bubbleContainer.appendChild(bubble);
      }
    }

    // Adjust the timing for creating bubbles to synchronize with their animations
    setTimeout(createBubbles, 6000);
  }

  return (
    <React.Fragment>
      <Suspense fallback={<Loader showR={showR} />}>
        {!showContent && <Loader showR={showR} />}
        {showContent && (
          <>
            <Navbar
              sx={{ position: "sticky", top: 0, width: "100%", zIndex: 1000 }}
              isMobile={isMobile}
              drawerOpen={drawerOpen}
              toggleDrawer={toggleDrawer}
              appBarActions={appBarActions}
              drawerContent={drawerContent}
            />
            <HomeContainer>
              {userData ? (
                <>
                  <div>
                    <style>
                      {`
                        .intro-text {
                          color: ${colors.text};
                          font-family: ${fonts.primary};
                          font-size: 1.5rem;
                          text-align: center;
                          z-index: 5;
                          margin-right: 27rem; /* default for large screens */
                        }
                        .main-title {
                          font-size: 4rem;
                          font-weight: bold;
                          color: ${colors.accent};
                          text-align: center;
                          margin-top: 0;
                          margin-bottom: 10px;
                          z-index: 5;
                          margin-right: 5rem;
                        }
                        .job-title {
                          font-size: 3rem;
                          font-weight: normal;
                          color: ${colors.text};
                          padding-top: 5px;
                          margin-top: 0px;
                          text-align: center;
                          margin-left: 2rem;
                          z-index: 5;
                          margin-right: 12.5rem; /* default for large screens */
                        }
                        .summary-text {
                          font-size: 1rem;
                          font-weight: normal;
                          color: ${colors.text};
                          text-align: justify; /* changes alignment to justify */
                          max-width: 600px;
                          margin: 0 auto;
                          line-height: 1.6;
                          z-index: 2;
                          margin-left: auto; /* center horizontally */
                          margin-right: auto; /* center horizontally */
                        }
                        .bubble-container {
                          position: absolute;
                          top: 0;
                          left: 0;
                          padding-left: 100px;
                          width: 100%;
                          height: 100%;
                          overflow: hidden;
                        }
                        .bubble {
                          position: absolute;
                          bottom: 100%; /* Start from above the view */
                          width: 100px;
                          height: 100px; /* Make height larger than width for droplet shape */
                          background-color: rgba(218, 112, 214, 0.4); /* Use the accent color with transparency */
                          opacity: 0.6;
                          border-radius: 50%; /* Adjust border-radius for droplet shape */
                          animation: fall 8s ease-in-out infinite;
                          z-index: 1;
                        }

                        @keyframes fall {
                          0% {
                            bottom: 100%;
                            opacity: 0.7;
                            transform: scale(0.5);
                          }
                          50% {
                            opacity: 9;
                          }
                          100% {
                            bottom: -100px; /* Fall below the view */
                            opacity: 0;
                            transform: scale(1.2);
                          }
                        }

                        @media (max-width: 768px) {
                          .intro-text {
                            margin-right: 1rem; /* adjusted for smaller screens */
                          }
                          .job-title {
                            font-size: 2rem; /* smaller font size for smaller screens */
                            margin-right: 1rem; /* adjusted for smaller screens */
                            margin-left: 1rem;
                          }
                        }
                      `}
                    </style>
                    <div className="bubble-container">
                      <div className="bubble"></div>
                    </div>
                    <p className="intro-text">Hi, my name is</p>
                    <h1 className="main-title">
                      {userData.firstName} {userData.lastName}
                    </h1>
                    <h2 className="job-title">A {userData.jobTitle}</h2>
                    <p className="summary-text">{userData.summary}</p>
                  </div>
                </>
              ) : (
                <></> // Removed the loading text
              )}
            </HomeContainer>
            <ContactIconContainer sx={{ color: colors.background }} onClick={() => scrollToSection(contactRef)}>
              <ContactIcon />
            </ContactIconContainer>
            <p sx={{ color: colors.background }} ref={educationRef}></p>
            <Suspense fallback={<Loader showR={showR} />}>
              <Education
                userData={userData}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            </Suspense>
            <Suspense fallback={<Loader showR={showR} sx={{ color: colors.background }}/>}>
              <Section sx={{ color: colors.background }} ref={experienceRef}>
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
              <Certificates
                userData={userData}
                handleClick={() => {}}
                sx={{ color: colors.white }}
              />
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
