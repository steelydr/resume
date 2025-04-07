import React, { useState } from 'react';
import { styled } from '@mui/material';
import Image from 'next/image';
import { FiGithub } from "react-icons/fi";

const colors = {
  primary: '#8A2BE2', // Violet
  secondary: 'green', // Indigo
  accent: '#DA70D6', // Orchid
  text: '#E9E9E9', // Light Grey
  background: '#1F1F1F', // Almost Black
  white: '#FFFFFF', // White
};

const Container = styled('div')`
  html, body {
    height: 100%;
    width: 100%;
    margin: 0;
    overflow: hidden;
    background-color: ${colors.background};
    font-family: 'Montserrat, sans-serif';
    color: ${colors.text};
  }
  body {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .popup {
    margin: 20px auto;
    width: 78%;
    height: auto;
    border-radius: 8px;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-color: ${colors.background};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
      width: 95%;
      margin: 50px auto;
    }
  }

  .tabs {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    position: relative;
    flex-wrap: nowrap;
    background-color: ${colors.background};
    padding: 0;
    box-sizing: border-box;
    border-bottom: 2px solid ${colors.text};

    @media (max-width: 768px) {
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  label {
    font-size: 17px;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.4s ease-in-out;
    display: inline-block;
    text-align: center;
    z-index: 100;
    user-select: none;
    color: ${colors.text};
    margin: 0;
    padding: 15px 20px;
    border-radius: 8px 8px 0 0;
    position: relative;

    @media (max-width: 768px) {
      font-size: 14px;
      padding: 10px 15px;
    }
  }

  label:hover, input[type="radio"]:checked + label {
    color: ${colors.accent};
  }

  label::before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: ${colors.accent};
    transform: scaleX(0);
    transition: transform 0.4s ease-in-out;
  }

  input[type="radio"]:checked + label::before {
    transform: scaleX(1);
  }

  input[type="radio"] {
    display: none;
  }

  .content-wrapper {
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    box-sizing: border-box;

    @media (max-width: 768px) {
      padding: 10px;
      gap: 10px;
    }
  }

  .content {
    padding: 20px;
    background-color: ${colors.background};
    color: ${colors.text};
    margin-bottom: 20px;
    transition: transform 0.2s ease-in-out;
    width: 100%;
    max-width: 1200px;
    border-radius: 8px;
    box-sizing: border-box;
    display: none;
    position: relative;

    &.active {
      display: block;
    }

    @media (max-width: 768px) {
      padding: 15px;
    }
  }

  .content p {
    margin: 0 0 10px;
    line-height: 1.6;
    font-size: 16px;

    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  .action-row {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 20px;
    margin-right: 160px;
    padding: 0 20px;
    gap: 20px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      margin-top: 10px;
      flex-direction: column;
      align-items: center;
      margin-right: 0px;
      gap: 10px;
    }
  }

  .view-project-link a {
    color: ${colors.white};
    font-size: 40px;
    transition: color 0.3s;

    &:hover {
      color: ${colors.accent};
    }

    @media (max-width: 768px) {
      font-size: 30px;
    }
  }

  .tech-logos {
    display: flex;
    gap: 13px;
    flex-wrap: wrap;
    margin-left: 10px;
    justify-content: flex-start;

    @media (max-width: 768px) {
      justify-content: center;
      margin-top: 10px;
      gap: 10px;
    }
  }
`;

const TechLogo = styled('img')`
  width: 30px;
  height: 30px;

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;

const ProjectContent = styled('div')`
  .carousel {
    width: 100%;
    overflow: hidden;
    margin: 0 auto;
  }

  .carousel__track {
    display: flex;
    width: calc(240px * 16); /* Assuming each image is 240px wide and there are 16 images */
    animation: scroll 30s linear infinite;

    @media (max-width: 768px) {
      width: calc(200px * 16); /* Adjust the width for smaller screens */
    }
  }

  .carousel__images {
    display: flex;
  }

  .carousel__images img {
    width: 240px;
    height: 150px;
    object-fit: cover;
    margin: 15px;
    border-radius: 8px;
    transition: transform 0.3s ease-in-out;
    cursor: pointer;

    @media (max-width: 768px) {
      width: 200px; /* Adjust the size for smaller screens */
      height: 125px;
    }
  }

  .carousel__images img:hover {
    transform: scale(1.2);
  }

  .carousel__images:hover .carousel__track {
    animation-play-state: paused;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-240px * 8)); /* Shift left by 8 images' width */
    }
    @media (max-width: 768px) {
      100% {
        transform: translateX(calc(-200px * 8)); /* Adjust the translation for smaller screens */
      }
    }
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  }

  .overlay img {
    max-width: 80%;
    max-height: 80%;
    border-radius: 8px;
  }

  .overlay.active {
    visibility: visible;
    opacity: 1;
  }

  p {
    font-family: Arial, sans-serif;
  }
`;

const GitHubIcon = styled(FiGithub)`
  color: ${colors.text}; /* Default color */
  font-size: 26px; /* Adjust the size as needed */
  transition: color 0.3s; /* Smooth transition for color change */

  &:hover {
    color: ${colors.accent}; /* Color on hover */
  }
`;

// ---------------------
// Mocked Data
// ---------------------
const mockedData = {
  projects: [
    {
      title: 'Stocks App',
      description:
        'Uses AR to create immersive, interactive stock graphs that enhance data comprehension by approximately 30%, enabling users to visually analyze trends in a 3D space. Provides instant insights with response times under 500ms, delivering timely market updates and analytics with an estimated accuracy rate exceeding 90%. Merges visualization, real-time insights, and predictive modeling into one cohesive tool, empowering investors to make well-informed decisions and potentially increasing investment confidence by up to 20%.',
      technologies: ['Java SpringBoot', 'Flutter', 'Java','Javascript','Dart','Firebase','Azure','Redis'],
      glink: 'https://github.com/steelydr/stock_application_app',
    },
    {
      title: 'Nike ChatBot',
      description:
        'Powered by ChatGPT-4, the app delivers highly contextual responses with an estimated accuracy rate exceeding 90% in understanding user queries, ensuring natural and engaging conversations. Designed with a modern, user-friendly interface that has shown to boost engagement by approximately 25%, with usability tests reporting over 95% user satisfaction. Built to handle high traffic, the application supports thousands of concurrent interactions while maintaining an uptime of around 99.9%, making it robust for large-scale deployment.',
      technologies: ['Nodejs','sql','Reactjs','Express.js'],
      glink: 'https://github.com/steelydr/NikeChatBotApplication4o',
    },
    {
      title: 'Generate QA',
      description:
        'Optimized for performance, the tool can process over 100 documents per minute, ensuring rapid generation of Q&A content for large datasets. Designed as a modular Python package, it easily integrates with existing NLP workflows, potentially reducing development time by up to 30% through its straightforward API and clear documentation.',
      technologies: ['Python', 'HTML', 'CSS','Flask','Docker','Anaconda'],
      glink: 'https://github.com/steelydr/generate_qa_nlp',
    },
    {
      title: 'Blogs',
      description:
        'Integrates a SERP API to recommend local events and activities, leveraging real-time weather data and IP geolocation, resulting in a 15% increase in user interaction by tailoring suggestions to current conditions and location. Merges multiple data sources to track active readership and optimize content delivery, providing comprehensive insights into user behavior that could potentially uplift overall retention and satisfaction by 20%.',
      technologies: ['Npm','Reactjs','Express.js','Docker','Nodejs'],
      glink: 'https://github.com/steelydr/BlogMernStack2025',
    },
  ],
};

const Projects = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [overlayImage, setOverlayImage] = useState(null);
  const projects = mockedData.projects;

  const renderCarousel = (projectTitle, imageCount = 8) => {
    const images = [];
    for (let i = 1; i <= imageCount; i++) {
      const src = `/projects/${projectTitle}/${i}.jpg`;
      images.push(
        <Image
          key={`${i}-original`}
          src={src}
          alt={`${projectTitle} ${i}`}
          width={240}
          height={150}
          onClick={() => setOverlayImage(src)}
        />
      );
    }
    for (let i = 1; i <= imageCount; i++) {
      const src = `/projects/${projectTitle}/${i}.jpg`;
      images.push(
        <Image
          key={`${i}-duplicate`}
          src={src}
          alt={`${projectTitle} ${i}`}
          width={240}
          height={150}
          onClick={() => setOverlayImage(src)}
        />
      );
    }
    return <div className="carousel__images">{images}</div>;
  };

  const getTechLogo = (tech) => {
    switch (tech.toLowerCase()) {
      // Existing cases
      case 'pytorch':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg';
      case 'anaconda':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/anaconda/anaconda-original.svg';
      case 'python':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg';
      case 'java springboot':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg';
      case 'reactjs':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg';
      case 'express.js':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg';
      case 'c':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg';
      case 'linux':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg';
      case 'oracle vm virtualbox':
        return 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Virtualbox_logo.png';
      case 'r':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg';
      case 'api dog':
        return 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg';
  
      // New cases for additional technologies
      case 'html':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg';
      case 'css':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg';
      case 'flutter':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg';
      case 'firebase':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg';
      case 'quarkus':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/quarkus/quarkus-original.svg';
      case 'npm':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg';
      case 'npx':
        // Using the npm logo for NPX as well
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg';
      case 'django':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-original.svg';
      case 'flask':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg';
  
      // Programming Languages
      case 'java':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg';
      case 'dart':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg';
      case 'javascript':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg';
      case 'sql':
        // Optionally you might use a MySQL or PostgreSQL icon for SQL; this uses MySQL as a generic SQL icon
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg';
      case 'mongodb':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg';
      case 'nosql':
        // No standard icon for NoSQL; consider returning a custom icon or null
        return null;
      case 'json':
        // There isn't a widely recognized icon for JSON in devicons, so return null or a custom icon if available
        return null;
      case 'xml':
        // No standard XML icon in devicons; consider returning null or a custom URL
        return null;
  
      // Frameworks/Tools
      case 'nodejs':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg';
      case 'spring boot':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg';
      case 'angularjs':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg';
      case 'nextjs':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg';
      case 'llm’s':
        // No standard logo; return null or a custom URL
        return null;
      case 'gen ai':
        // No standard logo available; return null or a custom URL
        return null;
  
      // Cloud Technologies
      case 'aws':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg';
      case 'azure':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg';
      case 'google cloud':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg';
      case 'kubernetes':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg';
      case 'docker':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg';
      case 'terraform':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg';
      case 'ansible':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg';
      case 'openshift':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/openshift/openshift-original.svg';

      case 'redis':
          return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg';
      case 'apache kafka':
        return 'https://cdn.worldvectorlogo.com/logos/apache-kafka-1.svg';
  
      default:
        return null;
    }
  };
  

  const highlightNumbers = (text) => {
    const phrases = ["1 million", "SHA-256"];
  
    const escapeRegExp = (string) =>
      string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
    const regex = new RegExp(
      `(${phrases.map(escapeRegExp).join('|')})|(\\d+)`,
      'g'
    );
    const parts = text.split(regex);
  
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
  
    return (
      <span>
        {parts.map((part, index) => {
          if (index === 0 && part) {
            // Capitalize and color only the first letter of the entire text
            return (
              <span key={index}>
                <span style={{ color: colors.accent, fontWeight: 'bold', fontSize:'1.3rem' }}>
                  {capitalizeFirstLetter(part.charAt(0))}
                </span>
                {part.slice(1)}
              </span>
            );
          } else if (part && phrases.includes(part.trim())) {
            return (
              <span key={index} style={{ color: colors.accent, fontWeight: 'normal' }}>
                {part}
              </span>
            );
          } else {
            return (
              <span key={index} style={{ color: colors.text, fontWeight: 'normal', letterSpacing: '0.19px' }}>
                {part}
              </span>
            );
          }
        })}
      </span>
    );
  };

  return (
    <Container>
      <div className="popup">
        <div className="tabs">
          {projects.map((project, index) => (
            <React.Fragment key={index}>
              <input
                type="radio"
                id={`tab${index + 1}`}
                name="tab"
                onChange={() => setActiveTab(index)}
                checked={activeTab === index}
              />
              <label htmlFor={`tab${index + 1}`}>{project.title}</label>
            </React.Fragment>
          ))}
        </div>
        <div className="content-wrapper">
          {projects.map((project, index) => (
            <ProjectContent
              key={index}
              className={`content ${activeTab === index ? 'active' : ''}`}
            >
              <div className="carousel">
                <div className="carousel__track">
                  {renderCarousel(project.title)}
                </div>
              </div>
              {overlayImage && (
                <div className="overlay active" onClick={() => setOverlayImage(null)}>
                  <Image src={overlayImage} alt="Overlay" width={800} height={600} />
                </div>
              )}
              <p>{highlightNumbers(project.description)}</p>
            </ProjectContent>
          ))}
        </div>
      </div>
      <div className="action-row">
        <div className="tech-logos">
          {projects[activeTab].technologies.map((tech, techIndex) => (
            <TechLogo key={techIndex} src={getTechLogo(tech)} alt={tech} />
          ))}
        </div>
        <div className="view-project-link">
          <a href={projects[activeTab].glink} target="_blank" rel="noopener noreferrer">
            <GitHubIcon />
          </a>
        </div>
      </div>
    </Container>
  );
};

export default Projects;
