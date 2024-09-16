import React from "react";
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
  overflow: "hidden",
});

const IntroText = styled(motion.p)({
  color: colors.text,
  fontFamily: fonts.primary,
  fontSize: "1.5rem",
  textAlign: "center",
  zIndex: 5,
  marginRight: "27rem",
  "@media (max-width: 768px)": {
    marginRight: "1rem",
  },
});

const MainTitle = styled(motion.h1)({
  fontSize: "4rem",
  fontWeight: "bold",
  color: colors.accent,
  textAlign: "center",
  marginTop: 0,
  marginBottom: "10px",
  zIndex: 5,
  marginRight: "5rem",
  "@media (max-width: 768px)": {
    fontSize: "2.5rem",
    marginRight: "1rem",
  },
});

const JobTitle = styled(motion.h2)({
  fontSize: "3rem",
  fontWeight: "normal",
  color: colors.text,
  paddingTop: "5px",
  marginTop: "0px",
  textAlign: "center",
  marginLeft: "2rem",
  zIndex: 5,
  marginRight: "12.5rem",
  "@media (max-width: 768px)": {
    fontSize: "1.5rem",
    marginRight: "1rem",
    marginLeft: "1rem",
  },
});

const SummaryText = styled(motion.p)({
  fontSize: "1rem",
  fontWeight: "normal",
  color: colors.text,
  textAlign: "justify",
  maxWidth: "600px",
  margin: "0 auto",
  lineHeight: 1.6,
  zIndex: 2,
  "@media (max-width: 768px)": {
    fontSize: "0.875rem",
    lineHeight: 1.5,
    padding: "0 1rem",
  },
});

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
  zIndex: 1,
  "@media (max-width: 768px)": {
    width: "40px",
    height: "40px",
  },
});

export default function HomeContainerComponent({ userData }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.6,
        delayChildren: 0.3,
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
      {userData ? (
        <>
          <BubbleContainer>
            <Bubble variants={bubbleVariants} initial="initial" animate="animate" />
          </BubbleContainer>
          <IntroText variants={itemVariants}>Hi, my name is</IntroText>
          <MainTitle variants={itemVariants}>
            {userData.firstName} {userData.lastName}
          </MainTitle>
          <JobTitle variants={itemVariants}>A {userData.jobTitle}</JobTitle>
          <SummaryText variants={itemVariants}>{userData.summary}</SummaryText>
        </>
      ) : (
        <></>
      )}
    </HomeContainer>
  );
}