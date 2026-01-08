// In your backend index.ts or routes file

import express from 'express';
import { prismaClient } from "db";

const app = express();

// Important: Add this middleware to parse JSON bodies
app.use(express.json());

// POST route to create a user
app.post('/users', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Create user in database
    const user = await prismaClient.user.create({
      data: {
        username,
        password
      }
    });
    
    res.json({
      message: "User created successfully",
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      error: "Failed to create user" 
    });
  }
});

// GET route to fetch all users
app.get('/users', async (req, res) => {
  try {
    const users = await prismaClient.user.findMany();
    res.json({users});
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      error: "Failed to fetch users" 
    });
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});