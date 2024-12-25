import 'dotenv/config'; // For loading environment variables
import express from 'express'; // Using ESM imports
import fetch from 'node-fetch';  // Use import instead of require

const app = express();
const port = 5000;

// Middleware
app.use(express.json());

// POST request to fetch Twitter data
app.post('/api/twitter', async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  const url = `https://twitter241.p.rapidapi.com/user?username=${username}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,  // Use your RapidAPI key from .env file
      'x-rapidapi-host': 'twitter241.p.rapidapi.com'
    }
  };

  try {
    // Fetch Twitter data
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const result = await response.json();  // Parse the JSON response

    // Structure the user data
    const userData = {
      username: result.username,
      followers: result.followers_count,
      following: result.following_count,
      profileImageUrl: result.profile_image_url,
    };

    // Send the data back to the frontend
    res.json(userData);
  } catch (error) {
    console.error('Error fetching Twitter data:', error);
    res.status(500).json({ error: 'Error fetching user data from Twitter API' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
