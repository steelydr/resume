"use client";
import dynamic from 'next/dynamic';
import React, { useState, useEffect, useRef, Suspense } from "react";
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

const GitHubContributions = dynamic(() => import("../components/GitHubContributions"), { ssr: false });
const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false });
const Loader = dynamic(() => import("../components/Loader"), { ssr: false });
const Experience = dynamic(() => import("../components/Experience"), { ssr: false });
const Projects = dynamic(() => import("../components/Projects"), { ssr: false });
const Certificates = dynamic(() => import("../components/Certificates"), { ssr: false });
const Section = dynamic(() => import("../components/Section"), { ssr: false });
const Footer = dynamic(() => import("../components/Footer"), { ssr: false });
const HomeContainer = dynamic(() => import("./HomeContainer"), { ssr: false });

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
  // Ensure that the component renders only on the client
  const [mounted, setMounted] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showD, setShowD] = useState(false);
  const [showR, setShowR] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [smallLoader, setSmallLoader] = useState(false);

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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), { noSsr: true });

  useEffect(() => {
    setMounted(true);
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
        {/* Additional text can be added here if needed */}
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
        onClick={() => window.open('https://1drv.ms/b/s!Ar51jB7fiEKQrcsp1q8vT-CYrjfmUQ?e=Z5YTeS', '_blank')}
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

  // Do not render any dynamic content until mounting is complete
  if (!mounted) {
    return null;
  }

  return (
    <React.Fragment>
      <Suspense fallback={<Loader showR={showR} />}>
        <AnimatePresence>
          {!showContent && <Loader showR={showR} />}
          {showContent && (
            <motion.div initial="hidden" animate="visible" exit="hidden" variants={fadeInVariants}>
              <Navbar
                sx={{ position: "sticky", top: 0, width: "100%", zIndex: 1000 }}
                isMobile={isMobile}
                drawerOpen={drawerOpen}
                toggleDrawer={toggleDrawer}
                appBarActions={appBarActions}
                drawerContent={drawerContent}
              />
              <HomeContainer ref={homeRef} />
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

              {/* Experience Section */}
              <motion.div ref={experienceRef} initial="hidden" animate="visible" exit="hidden" variants={slideInLeft}>
                <Section>
                  <SectionText>Where I've Worked</SectionText>
                </Section>
              </motion.div>
              <motion.div initial="hidden" animate="visible" exit="hidden" variants={slideInRight}>
                <Experience />
              </motion.div>

              {/* Projects Section */}
              <motion.div ref={projectsRef} variants={slideUpVariants}>
                <Section>
                  <SectionText>Skills I've Applied</SectionText>
                </Section>
                <Projects />
              </motion.div>

              {/* Certificates Section */}
              <motion.div ref={certificationRef} variants={slideInLeft}>
                <Section>
                  <SectionText>Credentials Earned</SectionText>
                </Section>
                <Certificates />
              </motion.div>

              {/* Footer */}
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
