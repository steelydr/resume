import React, { useState } from "react";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";

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

const HomeContainer = styled(motion.div)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: colors.background,
  fontFamily: fonts.primary,
  padding: "20px",
  boxSizing: "border-box",
  position: "relative",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    height: "auto",
    padding: "40px 20px",
  },
}));

const ContentContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  maxWidth: "1200px",
  zIndex: 5,
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const LeftColumn = styled("div")(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  paddingTop:"4rem",
  paddingRight: "2rem",
  [theme.breakpoints.down("md")]: {
    paddingRight: 0,
    alignItems: "center",
  },
}));

const RightColumn = styled("div")(({ theme }) => ({
  flex: "0 0 auto",
  display: "flex",
  justifyContent: "left",
  alignItems: "center",
  marginLeft: "2rem",
  [theme.breakpoints.down("md")]: {
    marginLeft: 0,
    marginTop: "1rem",
    justifyContent: "center",
  },
}));

const IntroText = styled(motion.p)(({ theme }) => ({
  color: colors.text,
  fontFamily: fonts.primary,
  fontSize: "1.5rem",
  textAlign: "left",
  margin: "0 0 1rem 0",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
    textAlign: "center",
  },
}));

const MainTitle = styled(motion.h1)(({ theme }) => ({
  fontSize: "4rem",
  fontWeight: "bold",
  color: colors.accent,
  textAlign: "left",
  marginTop: 0,
  marginBottom: "10px",
  [theme.breakpoints.down("md")]: {
    fontSize: "3rem",
    textAlign: "center",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2.5rem",
  },
}));

const JobTitle = styled(motion.h2)(({ theme }) => ({
  fontSize: "3rem",
  fontWeight: "normal",
  color: colors.text,
  paddingTop: "5px",
  marginTop: "0px",
  textAlign: "left",
  marginBottom: "1rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "2rem",
    textAlign: "center",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.8rem",
  },
}));

const SummaryText = styled(motion.p)(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "normal",
  color: colors.text,
  textAlign: "justify",
  maxWidth: "600px",
  lineHeight: 1.6,
  [theme.breakpoints.down("md")]: {
    fontSize: "0.95rem",
    maxWidth: "90%",
    textAlign: "left",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
    lineHeight: 1.4,
  },
}));

/** 
 * This little styled component uses the “▼” character,
 * rotates it 90 degrees to point right, and colors it with the accent color.
 */
const Arrow = styled("span")({
  display: "inline-block",
  transform: "rotate(270deg)",
  color: colors.accent,
  marginRight: "0.4rem",
});

const ProfileImage = styled(motion.img, {
  shouldForwardProp: (prop) => prop !== 'permanentHover',
})(({ theme, permanentHover }) => ({
  height: "350px",
  width: "500px",
  objectFit: "cover",
  border: `5px solid ${colors.white}`,
  borderRadius: "8px",
  filter: permanentHover
    ? "contrast(1.3) brightness(1) saturate(1) hue-rotate(0deg) blur(0)"
    : "contrast(1.5) brightness(0.8) saturate(1.2) hue-rotate(25deg) blur(0px)",
  transition: "filter 0.3s ease-in-out",
  [theme.breakpoints.down("md")]: {
    width: "400px",
    height: "280px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "300px",
    height: "210px",
  },
}));

const BubbleContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  paddingLeft: "100px",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    paddingLeft: "50px",
  },
}));

const Bubble = styled(motion.div)(({ theme }) => ({
  position: "absolute",
  bottom: "100%",
  width: "100px",
  height: "100px",
  backgroundColor: "rgba(218, 112, 214, 0.4)",
  opacity: 0.6,
  borderRadius: "50%",
  [theme.breakpoints.down("md")]: {
    width: "60px",
    height: "60px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "40px",
    height: "40px",
  },
}));

const mockedData = {
  firstName: "Rajeswari",
  lastName: "Depala",
  jobTitle: "Software Developer",
  summary:"I’m passionate about crafting solutions that simplify complexity and create real impact.",
  about1:"My journey kicked off at The Sparks Foundation as a Business Analytics Intern, uncovering data insights to solve real-world problems with impact.",
  about2:"At Virtusa, I thrived as a Software Engineer, building full-stack applications and mastering cloud tech to create scalable, functional solutions.",
  about3:"Then, at SoundSafe.AI, I engineered AI-driven applications as a Software Engineer, crafting intelligent systems that anticipate and innovate.",
  about4:"With a Bachelor’s from VJIT, India, I completed my Master’s in AI at Illinois Tech, Chicago, ready to transform complexity into solutions.",
  imageUrl: "image.jpg",
};

export default function HomeContainerComponent() {
  const [hovered, setHovered] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const bubbleVariants = {
    initial: { y: "100%", opacity: 0.7, scale: 0.5 },
    animate: {
      y: "-100%",
      opacity: [0.7, 0.9, 0],
      scale: 1.2,
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <HomeContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Floating bubble animation */}
      <BubbleContainer>
        <Bubble variants={bubbleVariants} initial="initial" animate="animate" />
      </BubbleContainer>

      {/* Main content */}
      <ContentContainer>
        <LeftColumn>
          <IntroText variants={itemVariants}>Hi, my name is</IntroText>
          <MainTitle variants={itemVariants}>
            {mockedData.firstName} {mockedData.lastName}
          </MainTitle>
          <JobTitle variants={itemVariants}>A {mockedData.jobTitle}</JobTitle>
          <SummaryText variants={itemVariants}>
            {mockedData.summary}
            <br />
            {/* Here we insert the rotated “▼” in front of about1, about2, about3, etc. */}
            <Arrow>▼</Arrow>{mockedData.about1}
            <br />
            <Arrow>▼</Arrow>{mockedData.about2}
            <br />
            <Arrow>▼</Arrow>{mockedData.about3}
            <br />
            <Arrow>▼</Arrow>{mockedData.about4}
          </SummaryText>
        </LeftColumn>

        <RightColumn>
          <ProfileImage
            src={mockedData.imageUrl}
            alt="Profile"
            variants={itemVariants}
            permanentHover={hovered}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          />
        </RightColumn>
      </ContentContainer>
    </HomeContainer>
  );
}
