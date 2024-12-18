import axios from 'axios';

// Define the base URL of your API
const API_URL = 'https://localhost:44346'; // Adjust the port and URL if needed

export const getShops = async () => {
    try {
        const response = await axios.get(`${API_URL}/Shop/Get`, );
        return response.data;
    } catch (error) {
        console.error('Error getting shops:', error);
        throw error;
    }
};
export const getShopById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/Shop/GetById`, {
            params: { id: id }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting shops:', error);
        throw error;
    }
};

export const deleteShop = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/Shop/Delete?id=${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting shop:', error);
        throw error;
    }
};

export const editShop = async (id, shop) => {
    try {
        const shopId = parseInt(id, 10)
        const response = await axios.put(`${API_URL}/Shop/Put?id=${shopId}`, {
            Name: shop.name,
            Category: shop.category,
            ImageUrl: shop.image_url,
            ThemeColor: shop.theme_color
        });
        return response.data;
    } catch (error) {
        console.error('Error updating shop:', error);
        throw error;
    }
};
export const createShop = async (shop) => {
    try {
        const response = await axios.post(`${API_URL}/Shop/Post`, {
            Name: shop.name,
            Category: shop.category,
            ImageUrl: shop.image_url,
            ThemeColor: shop.theme_color,
            UserID: shop.user_id
        });
        return response.data;
    } catch (error) {
        console.error('Error creating shop:', error);
        throw error;
    }
};

