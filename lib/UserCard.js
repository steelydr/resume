import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, CardContent, Container, TextField, Typography } from '@mui/material';

const UserCard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    jobTitle: '',
    summary: '',
    experiences: [],
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data);
      } catch (error) {
        setError('Error fetching users');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/users?id=${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      setError('Error deleting user');
      console.error(error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setFormData({ ...user });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/users?id=${editingUser}`, formData);
      setUsers(users.map((user) => (user._id === editingUser ? response.data : user)));
      setEditingUser(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        jobTitle: '',
        summary: '',
        experiences: [],
      });
    } catch (error) {
      setError('Error updating user');
      console.error(error);
    }
  };

  const styles = {
    saveButton: {
      backgroundImage: 'url(/a.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      paddingLeft: '20px', // Adjust as needed based on the SVG dimensions
    },
  };

  return (
    <Container maxWidth="md">
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginTop: '20px' }}>
        {loading ? (
          <Typography variant="h5" align="center">Loading...</Typography>
        ) : error ? (
          <Typography variant="h5" align="center" style={{ color: 'red' }}>{error}</Typography>
        ) : (
          users.map((user) => (
            <Card key={user._id} sx={{ maxWidth: 300, margin: '10px' }}>
              <CardContent>
                {editingUser === user._id ? (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <TextField
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      label="First Name"
                      required
                    />
                    <TextField
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      label="Last Name"
                      required
                    />
                    <TextField
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      label="Email"
                      required
                    />
                    <TextField
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      label="Username"
                      required
                    />
                    <TextField
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      label="Job Title"
                      required
                    />
                    <TextField
                      type="text"
                      name="summary"
                      value={formData.summary}
                      onChange={handleChange}
                      label="Summary"
                      required
                      multiline
                      rows={4}
                    />
                    <Button variant="contained" type="submit" style={styles.saveButton}>Save</Button>
                    <Button variant="contained" onClick={() => setEditingUser(null)}>Cancel</Button>
                  </form>
                ) : (
                  <>
                     <Typography variant="h6">{user.username}</Typography>
                    <Typography variant="body1">{user.email}</Typography>
                    <Typography variant="body1">{user.firstName}</Typography>
                    <Typography variant="body1">{user.lastName}</Typography>
                    <Typography variant="body1">{user.jobTitle}</Typography>
                    <Typography variant="body1">{user.summary}</Typography>
                    <Typography variant="h6">Experiences:</Typography>
                    <Button onClick={() => handleEdit(user)} variant="outlined">Update</Button>
                    <Button onClick={() => deleteUser(user._id)} variant="outlined">Delete</Button>
                  </>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </Container>
  );
};

export default UserCard;
