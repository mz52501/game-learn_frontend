// src/services/apiClient.js
import axios from 'axios';

// Function to fetch real data from an API endpoint
export const fetchDataFromAPI = async (endpoint) => {
    try {
        // Make a GET request to the provided endpoint
        const response = await axios.get(endpoint);

        // Assuming the response data contains the data you need
        return response.data;
    } catch (error) {
        // Handle errors (e.g., network error, server error)
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error so it can be handled elsewhere
    }
};
