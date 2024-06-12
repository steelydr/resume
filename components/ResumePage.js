import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/system';
import { Container, Grid, Card, CardContent, CircularProgress, Typography, AppBar, Toolbar, Box } from '@mui/material';

// Define styled components
const RootContainer = styled('div')({
  minHeight: '100vh', // Set minimum height to fill the viewport
  display: 'flex', // Use flexbox to allow children to fill the height
  flexDirection: 'column', // Arrange children vertically
});

const ContentContainer = styled('div')({
  flex: 1, // Allow content to grow and fill available space
});

const EducationContainer = styled(Box)({
  display: 'flex',
  margin : '0px 100px 0px 100px',
  height :'300px',
  margin : '0px 10%',
  overflowX: 'auto', // Changed from 'scroll' to 'auto' to show scrollbar
  scrollSnapType: 'x mandatory',
  '& > *': {
    scrollSnapAlign: 'center',
    flexShrink: 0, // Prevent children from shrinking
  },
  // Optional: Customize scrollbar for WebKit browsers
  '&::-webkit-scrollbar': {
    height: '8px', // Adjust the height of the scrollbar
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#888', // Set the color of the scrollbar thumb
    borderRadius: '4px', // Make the scrollbar thumb rounded
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#555', // Change color on hover
  },
});

const EducationCard = styled(Card)({
  minWidth: '80%', // Make the card take most of the container's width
  flex: '0 0 auto', // Prevent cards from shrinking
  margin: '0 0', // Add some margin to center the card in the view
});

const ResumePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const educationContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/users?firstName=John&lastName=Doe');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleWheel = (event) => {
    if (educationContainerRef.current) {
      const cardWidth = educationContainerRef.current.firstChild.getBoundingClientRect().width;
      educationContainerRef.current.scrollBy({
        left: event.deltaY < 0 ? -cardWidth : cardWidth,
        behavior: 'smooth',
      });
    }
  };

  if (loading) {
    return (
      <RootContainer>
        <AppBar position="sticky">
          <Toolbar>
            {/* Add any appbar content here */}
          </Toolbar>
        </AppBar>
        <CircularProgress color="secondary" />
      </RootContainer>
    );
  }

  if (error) {
    return (
      <RootContainer>
        <AppBar position="sticky">
          <Toolbar>
            {/* Add any appbar content here */}
          </Toolbar>
        </AppBar>
        <Typography variant="h6" color="error">
          Error: {error.message}
        </Typography>
      </RootContainer>
    );
  }

  return (
    <RootContainer>
      <AppBar position="sticky">
        <Toolbar>
          {/* Add any appbar content here */}
        </Toolbar>
      </AppBar>
      <ContentContainer>
        {userData && (
          <Container>
            <Grid container spacing={4}>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="primary" gutterBottom>
                  {userData.firstName} {userData.lastName}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  {userData.jobTitle}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {userData.summary}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4" color="primary" gutterBottom>
                  Education
                </Typography>
                <EducationContainer ref={educationContainerRef} onWheel={handleWheel}>
                  {userData.educations.map((edu, index) => (
                    <EducationCard key={index}>
                      <CardContent>
                        <Typography variant="h5">{edu.institution}</Typography>
                        <Typography variant="body1">
                          {edu.degree} in {edu.fieldOfStudy}
                        </Typography>
                        <Typography variant="body1">GPA: {edu.gpa ? edu.gpa : 'N/A'}</Typography>
                        <Typography variant="body1">
                          From: {new Date(edu.startDate).toLocaleDateString()} To: {new Date(edu.endDate).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body1">{edu.description}</Typography>
                        <Typography variant="h6">Courses Taken:</Typography>
                        <ul>
                          {edu.coursestaken.map((course, idx) => (
                            <li key={idx}>
                              {course.name} ({course.code})
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </EducationCard>
                  ))}
                </EducationContainer>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4" color="primary" gutterBottom>
                  Experience
                </Typography>
                {userData.experiences.map((exp, index) => (
                  <Card key={index} style={{ marginBottom: '32px' }}>
                    <CardContent>
                      <Typography variant="h5">
                        {exp.jobTitle} at {exp.company}
                      </Typography>
                      <Typography variant="body1">
                        From: {new Date(exp.startDate).toLocaleDateString()} To: {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
                      </Typography>
                      <Typography variant="body1">{exp.description}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </Grid>
          </Container>
        )}
      </ContentContainer>
    </RootContainer>
  );
};

export default ResumePage;
