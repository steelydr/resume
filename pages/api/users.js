// pages/api/users.js
import dbConn from '@/lib/mongoose';
import User from '@/models/User';

export default async function handler(req, res) {
  await dbConn();

  switch (req.method) {
    case 'GET':
      return handleGetRequest(req, res);
    case 'POST':
      return handlePostRequest(req, res);
    case 'PUT':
      return handlePutRequest(req, res);
    case 'DELETE':
      return handleDeleteRequest(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function handleGetRequest(req, res) {
  if (req.query.firstName && req.query.lastName) {
    try {
      const { firstName, lastName } = req.query;
      const user = await User.findOne({ firstName, lastName });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      console.log('User:', user);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    try {
      const users = await User.find({});
      console.log('Users:', users);
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

async function handlePostRequest(req, res) {
  try {
    const { userId, firstName, lastName, jobTitle, summary, experiences, educations, projects, certifications, contact, skills } = req.body;
    if (!userId || !firstName || !lastName || !jobTitle || !summary || !contact) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newUser = new User({
      userId,
      firstName,
      lastName,
      jobTitle,
      summary,
      experiences,
      educations,
      projects,
      certifications,
      contact,
      skills
    });

    await newUser.save();

    console.log('New User:', newUser);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function handlePutRequest(req, res) {
  try {
    const { id } = req.query;
    const { userId, firstName, lastName, jobTitle, summary, experiences, educations, projects, certifications, contact, skills } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { userId, firstName, lastName, jobTitle, summary, experiences, educations, projects, certifications, contact, skills },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('Updated User:', updatedUser);
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function handleDeleteRequest(req, res) {
  try {
    const { id } = req.query;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
