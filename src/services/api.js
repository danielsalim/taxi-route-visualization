import axios from 'axios';

const API_URL = 'http://localhost:5000/api/trips'; // Change to your backend URL

export const fetchTrips = async (filters) => {
  try {
    const response = await axios.get(API_URL, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching trips:', error);
    throw error;
  }
};
