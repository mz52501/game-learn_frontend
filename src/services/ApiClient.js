// src/services/apiClient.js
import axios from 'axios';

// Function to fetch real data from an API endpoint
export const fetchDataFromAPI = async (endpoint) => {
    try {
        // Make a GET request to the provided endpoint
        const response = await axios.get('http://localhost:8080' + endpoint);

        // Assuming the response data contains the data you need
        return response.data;
    } catch (error) {
        // Handle errors (e.g., network error, server error)
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error so it can be handled elsewhere
    }
};

// General function to send a POST request with data to the API
export const postDataToAPI = async (endpoint, data) => {
    try {
        // Make a POST request to the provided endpoint with the given data
        const response = await axios.post('http://localhost:8080' + endpoint, data);
        return response.data; // Return the data from the response (assuming successful response)
    } catch (error) {
        console.error('Error posting data:', error);
        throw error; // Rethrow the error for handling in other parts of the application
    }
};
