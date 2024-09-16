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
import styled from "@emotion/styled";
import { GrContact } from "react-icons/gr";
import { motion, AnimatePresence } from "framer-motion";
const GitHubContributions = React.lazy(() => import("../components/GitHubContributions"));
const Navbar = React.lazy(() => import("../components/Navbar"));
const Loader = React.lazy(() => import("../components/Loader"));
const Experience = React.lazy(() => import("../components/Experience"));
const Projects = React.lazy(() => import("../components/Projects"));
const Certificates = React.lazy(() => import("../components/Certificates"));
const Section = React.lazy(() => import("../components/Section"));
const Footer = React.lazy(() => import("../components/Footer"));
const HomeContainer = React.lazy(() => import("./HomeContainer"));

const colors = {
  primary: "#8A2BE2",
  secondary: "#4B0082",
  accent: "#DA70D6",
  text: "#E9E9E9",
  background: "#1F1F1F",
  white: "#FFFFFF",
};

const fadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeInOut" } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeInOut" } },
};

const slideUpVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeInOut" } },
};

const ResumeButton = styled(Button)`
  color: ${colors.text};
  border-color: ${colors.accent};
  font-weight: 300;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  text-transform: none;
  &:hover {
    border-color: ${colors.accent};
    background-color: ${alpha(colors.accent, 0.1)};
  }
`;

const Container = styled(motion.div)`
  display: flex;
  flex-direction: row;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SectionText = styled(motion.p)`
  color: ${colors.white};
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
`;

const ContactIconContainer = styled(motion.div)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  cursor: pointer;
  transition: opacity 0.3s;
  &.hidden {
    opacity: 0;
    pointer-events: none;
  }
`;

const ContactIcon = styled(GrContact)`
  color: ${colors.accent};
  font-size: 2rem;
`;

const StyledList = styled(List)`
  width: 250px;
  background-color: ${colors.background};
  & .MuiListItemButton-root:hover {
    background-color: ${alpha(colors.primary, 0.25)};
  }
`;

const StyledListItemText = styled(ListItemText)`
  & .MuiTypography-root {
    font-weight: ${(props) => (props.primary === "HOME" ? 400 : 300)};
    color: ${(props) => (props.primary === "HOME" ? colors.accent : colors.text)};
    font-family: "Montserrat", sans-serif;
    font-size: 1rem;
    text-align: center;
  }
`;

const NavList = styled(List)`
  display: flex;
`;

const NavListItemText = styled(ListItemText)`
  & .MuiTypography-root {
    font-weight: 300;
    color: ${colors.text};
    font-family: "Montserrat", sans-serif;
    font-size: 1rem;
  }
`;

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
  const githubRef = useRef(null);

  const homeRef = useRef(null);
  const educationRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const certificationRef = useRef(null);
  const contactRef = useRef(null);
  const footerRef = useRef(null);
  const contactIconRef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          //"http://localhost:3000/api/users?firstName=Depala&lastName=Rajeswari",
          "https://rajeswaridepalav.netlify.app/api/users?firstName=Depala&lastName=Rajeswari",
          {
            headers: {
              "Cache-Control": "no-cache",
            },
          }
        );
        if (response.status === 200) {
          setUserData(response.data);
        } else if (response.status === 304) {
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
    }, 2000);

    const handleScroll = () => {
      if (footerRef.current && contactIconRef.current) {
        const footerRect = footerRef.current.getBoundingClientRect();
        const contactIconRect = contactIconRef.current.getBoundingClientRect();
        if (footerRect.top < window.innerHeight && contactIconRect.top < footerRect.top) {
          contactIconRef.current.classList.add("hidden");
        } else {
          contactIconRef.current.classList.remove("hidden");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
    <StyledList>
      <ListItemButton
        onClick={() => {
          toggleDrawer(false)();
          scrollToSection(homeRef);
        }}
        sx={{ justifyContent: "center" }}
      >
        <StyledListItemText primary="HOME" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          toggleDrawer(false)();
          scrollToSection(educationRef);
        }}
        sx={{ justifyContent: "center" }}
      >
        
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          toggleDrawer(false)();
          scrollToSection(experienceRef);
        }}
        sx={{ justifyContent: "center" }}
      >
        <StyledListItemText primary="Career" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          toggleDrawer(false)();
          scrollToSection(projectsRef);
        }}
        sx={{ justifyContent: "center" }}
      >
        <StyledListItemText primary="Endeavors" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          toggleDrawer(false)();
          scrollToSection(certificationRef);
        }}
        sx={{ justifyContent: "center" }}
      >
        <StyledListItemText primary="Credentials" />
      </ListItemButton>
      <ResumeButton
        variant="outlined"
        sx={{ marginLeft: "77px", marginTop: "50px" }}
      >
        Resume
      </ResumeButton>
    </StyledList>
  );

  const appBarActions = (
    <NavList component="nav">
      
<ListItemButton onClick={() => scrollToSection(githubRef)}>
  <NavListItemText primary="GitHub" />
</ListItemButton>
      <ListItemButton onClick={() => scrollToSection(experienceRef)}>
        <NavListItemText primary="Career" />
      </ListItemButton>
      <ListItemButton onClick={() => scrollToSection(projectsRef)}>
        <NavListItemText primary="Endeavors" />
      </ListItemButton>
      <ListItemButton onClick={() => scrollToSection(certificationRef)}>
        <NavListItemText primary="Credentials" />
      </ListItemButton>
    </NavList>
  );

  return (
    <React.Fragment>
      <Suspense fallback={<Loader showR={showR} />}>
        <AnimatePresence>
          {!showContent && <Loader showR={showR} />}
          {showContent && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={fadeInVariants}
            >
              <Navbar
                sx={{ position: "sticky", top: 0, width: "100%", zIndex: 1000 }}
                isMobile={isMobile}
                drawerOpen={drawerOpen}
                toggleDrawer={toggleDrawer}
                appBarActions={appBarActions}
                drawerContent={drawerContent}
              />
              <HomeContainer ref={homeRef} userData={userData} />
              <ContactIconContainer
                ref={contactIconRef}
                onClick={() => scrollToSection(contactRef)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <ContactIcon />
              </ContactIconContainer>

              {/* GitHub Contributions Section */}
<motion.div ref={githubRef} variants={slideUpVariants}>
  <Section>
    <SectionText>My GitHub Activity</SectionText>
  </Section>
  <Suspense fallback={<div>Loading GitHub contributions...</div>}>
    <GitHubContributions username="steelydr" />
  </Suspense>
</motion.div>

              {/* SectionText Animation */}
              <motion.div
                ref={experienceRef}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={slideInLeft}
              >
                <Section>
                  <SectionText variants={slideInLeft}>
                    Where I've Worked
                  </SectionText>
                </Section>
              </motion.div>

              {/* Experience Animation */}
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={slideInRight}
              >
                <Experience userData={userData} />
              </motion.div>

              {/* Projects Section */}
              <motion.div ref={projectsRef} variants={slideUpVariants}>
                <Section>
                  <SectionText>Skills I've Applied</SectionText>
                </Section>
                <Projects userData={userData} />
              </motion.div>

              <motion.div ref={certificationRef}  variants={slideInLeft}>
                <Section>
                  <SectionText>Credentials Earned</SectionText>
                </Section>
                <Certificates userData={userData} handleClick={() => {}} />
              </motion.div>

              <motion.div ref={contactRef} variants={fadeInVariants}>
                <Footer ref={footerRef} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Suspense>
    </React.Fragment>
  );
}
