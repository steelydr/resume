import React, { useState } from "react";
import { motion } from "framer-motion";
import { styled } from "@mui/material";

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

const HomeContainer = styled(motion.div)({
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
});

const ContentContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  maxWidth: "1200px",
  zIndex: 5,
  "@media (max-width: 768px)": {
    flexDirection: "column",
    alignItems: "center",
  },
});

const LeftColumn = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  paddingRight: "2rem",
  "@media (max-width: 768px)": {
    paddingRight: 0,
    alignItems: "center",
  },
});

const RightColumn = styled("div")({
  flex: "0 0 auto",
  display: "flex",
  justifyContent: "left",
  alignItems: "center",
  "@media (max-width: 768px)": {
    marginTop: "1rem",
  },
});

const IntroText = styled(motion.p)({
  color: colors.text,
  fontFamily: fonts.primary,
  fontSize: "1.5rem",
  textAlign: "left",
  margin: "0 0 1rem 0",
});

const MainTitle = styled(motion.h1)({
  fontSize: "4rem",
  fontWeight: "bold",
  color: colors.accent,
  textAlign: "left",
  marginTop: 0,
  marginBottom: "10px",
});

const JobTitle = styled(motion.h2)({
  fontSize: "3rem",
  fontWeight: "normal",
  color: colors.text,
  paddingTop: "5px",
  marginTop: "0px",
  textAlign: "left",
  marginBottom: "1rem",
});

const SummaryText = styled(motion.p)({
  fontSize: "1rem",
  fontWeight: "normal",
  color: colors.text,
  textAlign: "justify",
  maxWidth: "600px",
  lineHeight: 1.6,
});

const ProfileImage = styled(motion.img, {
  shouldForwardProp: (prop) => prop !== 'permanentHover',
})(({ permanentHover }) => ({
  height: "350px",
  width: "500px",
  objectFit: "cover",
  border: "5px solid white", // adds a frame
  borderRadius: "8px",
  filter: permanentHover
    ? "contrast(1.3) brightness(1) saturate(1) hue-rotate(0deg) blur(0)"
    : "contrast(1.5) brightness(0.8) saturate(1.2) hue-rotate(25deg) blur(0px)",
  transition: "filter 0.3s ease-in-out",
}));


const BubbleContainer = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  paddingLeft: "100px",
  width: "100%",
  height: "100%",
  overflow: "hidden",
});

const Bubble = styled(motion.div)({
  position: "absolute",
  bottom: "100%",
  width: "100px",
  height: "100px",
  backgroundColor: "rgba(218, 112, 214, 0.4)",
  opacity: 0.6,
  borderRadius: "50%",
  "@media (max-width: 768px)": {
    width: "40px",
    height: "40px",
  },
});

const mockedData = {
  firstName: "Rajeswari",
  lastName: "Depala",
  jobTitle: "Software Developer",
  summary:
    "I am a passionate developer with experience in creating modern, responsive web applications. I love working on challenging projects that require creative problem-solving and collaboration.",
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
      <BubbleContainer>
        <Bubble variants={bubbleVariants} initial="initial" animate="animate" />
      </BubbleContainer>
      <ContentContainer>
        <LeftColumn>
          <IntroText variants={itemVariants}>Hi, my name is</IntroText>
          <MainTitle variants={itemVariants}>
            {mockedData.firstName} {mockedData.lastName}
          </MainTitle>
          <JobTitle variants={itemVariants}>A {mockedData.jobTitle}</JobTitle>
          <SummaryText variants={itemVariants}>
            {mockedData.summary}
          </SummaryText>
        </LeftColumn>
        <RightColumn>
          <ProfileImage
            src={mockedData.imageUrl}
            alt="Profile"
            variants={itemVariants}
            permanentHover={hovered}
            onMouseEnter={() => setHovered(true)}
          />
        </RightColumn>
      </ContentContainer>
    </HomeContainer>
  );
}
