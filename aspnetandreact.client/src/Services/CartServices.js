import axios from 'axios';

// Define the base URL of your API
const API_URL = 'https://localhost:44346'; // Adjust the port and URL if needed

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

export const updateCart = async (id, UpdatedQuantity) => {
    try {
        const response = await axios.put(`${API_URL}/Cart/Put?id=${id}`, UpdatedQuantity, {
            headers: { 'Content-Type': 'application/json' }
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
export const clearCart = async (userId) => {
    try {
        const response = await axios.delete(`${API_URL}/Cart/ClearCart?userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleteing cart:', error);
        throw error;
    }
};
export const CheckOut = async (order) => {
    try {
        const response = await axios.post(`${API_URL}/Order/Post`, {
            UserId: order.user_id,
            ProductId: order.product_id,
            ShopId: order.shop_id,
            Quantity: order.quantity,
            Location: order.location,
            DateOfOrder: order.date_order,
            Status: order.status
        });
        return response.data;
    } catch (error) {
        console.error('Error creating cart:', error);
        throw error;
    }
};