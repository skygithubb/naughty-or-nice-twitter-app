// utils/fetchTwitterData.js

import axios from 'axios';

const fetchTwitterData = async (username) => {
  try {
    const response = await axios.post('http://localhost:5000/api/twitter', { username });
    return response.data;  // Assuming the response contains the necessary user data
  } catch (error) {
    console.error('Error fetching Twitter data:', error);
    return null;  // Return null if an error occurs
  }
};

export default fetchTwitterData;
