import axios from 'axios';

// Define the base URL of your API
const API_URL = 'https://localhost:44346'; // Adjust the port and URL if needed

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

export const createUserShop = async (user, shop) => {
    try {
        const response = await axios.post(`${API_URL}/User/CreateUserAndShop`, {
            "user": {
                "username": user.Username,
                "firstName": user.FirstName,
                "lastName": user.LastName,
                "password": user.Password,
                "type": user.Type
            },
            "shop": {
                "name": shop.name,
                "category": shop.category,
                "imageUrl": shop.image_url,
                "themeColor": shop.theme_color
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};