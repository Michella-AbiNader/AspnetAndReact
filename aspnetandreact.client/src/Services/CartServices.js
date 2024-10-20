import axios from 'axios';

// Define the base URL of your API
const API_URL = 'https://localhost:7031'; // Adjust the port and URL if needed

export const getCart = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/Cart/Get`, {
            params: { userId: userId }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting cart:', error);
        throw error;
    }
};

export const upsertCart = async (cart) => {
    try {
        const response = await axios.post(`${API_URL}/Cart/Post`, {
            UserId: cart.user_id,
            ProductId: cart.product_id,
            ShopId: cart.shop_id,
            Quantity: cart.quantity
        });
        return response.data;
    } catch (error) {
        console.error('Error creating cart:', error);
        throw error;
    }
};

export const updateCart = async (quantity) => {
    try {
        const response = await axios.post(`${API_URL}/Cart/Put`, {
            quantity: quantity
        });
        return response.data;
    } catch (error) {
        console.error('Error updating cart:', error);
        throw error;
    }
};
export const deleteCart = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/Cart/Delete?id=${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleteing cart:', error);
        throw error;
    }
};