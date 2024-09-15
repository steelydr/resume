import React from "react";
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
  overflow: "hidden",
});

export default function HomeContainerComponent({ userData }) {
  return (
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
                  margin-right: 27rem;
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
                  animation: slideFromTop 1.5s ease-out;
                }
                @keyframes slideFromTop {
                  0% {
                    opacity: 0;
                    transform: translateY(-100%);
                  }
                  100% {
                    opacity: 1;
                    transform: translateY(0);
                  }
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
                  margin-right: 12.5rem;
                  animation: slideFromRight 1.5s ease-out;
                }
                @keyframes slideFromRight {
                  0% {
                    opacity: 0;
                    transform: translateX(100%);
                  }
                  100% {
                    opacity: 1;
                    transform: translateX(0);
                  }
                }
                .summary-text {
                  font-size: 1rem;
                  font-weight: normal;
                  color: ${colors.text};
                  text-align: justify;
                  max-width: 600px;
                  margin: 0 auto;
                  line-height: 1.6;
                  z-index: 2;
                  margin-left: auto;
                  margin-right: auto;
                  animation: slideFromLeft 1.5s ease-out;
                }
                @keyframes slideFromLeft {
                  0% {
                    opacity: 0;
                    transform: translateX(-100%);
                  }
                  100% {
                    opacity: 1;
                    transform: translateX(0);
                  }
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
                  bottom: 100%;
                  width: 100px;
                  height: 100px;
                  background-color: rgba(218, 112, 214, 0.4);
                  opacity: 0.6;
                  border-radius: 50%;
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
                    bottom: -100px;
                    opacity: 0;
                    transform: scale(1.2);
                  }
                }

                @media (max-width: 768px) {
                  .intro-text {
                    margin-right: 1rem;
                  }
                  .main-title {
                    font-size: 2.5rem;
                    margin-right: 1rem;
                  }
                  .job-title {
                    font-size: 1.5rem;
                    margin-right: 1rem;
                    margin-left: 1rem;
                  }
                  .summary-text {
                    font-size: 0.875rem;
                    line-height: 1.5;
                    padding: 0 1rem;
                    text-align: justify; 
                  }
                  .bubble {
                    width: 40px;
                    height: 40px;
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
        <></>
      )}
    </HomeContainer>
  );
}