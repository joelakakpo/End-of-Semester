// src/apiService.js
import axios from 'axios';

const API_URL = 'http://localhost:5001/'; 

// Function to get the menu from backend
export const getMenu = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching menu:', error);
    return [];
  }
};
