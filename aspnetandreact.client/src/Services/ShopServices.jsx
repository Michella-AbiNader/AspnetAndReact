import axios from 'axios';

// Define the base URL of your API
const API_URL = 'https://localhost:7031'; // Adjust the port and URL if needed

// Register function
export const getShops = async () => {
    try {
        const response = await axios.get(`${API_URL}/Shop/Get`, );
        return response.data;
    } catch (error) {
        console.error('Error getting shops:', error);
        throw error;
    }
};


