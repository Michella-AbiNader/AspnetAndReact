import axios from 'axios';

// Define the base URL of your API
const API_URL = 'https://localhost:7031'; // Adjust the port and URL if needed

// Register function
export const registerUser = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/auth`, user);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

// Login function
export const loginUser = async (username, password) => {
    try {
        console.log(username, password)
        const response = await axios.get(`${API_URL}/auth`, {
            params: { username, password }
        });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};