import axios from 'axios';

// Define the base URL of your API
const API_URL = 'https://localhost:44346'; // Adjust the port and URL if needed

export const getShopInventory = async (shopId) => {
    try {
        const response = await axios.get(`${API_URL}/Sales/Inventory`, {
            params: { shopId: shopId }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting orders:', error);
        throw error;
    }
};
export const getOrders = async (shopId) => {
    try {
        const response = await axios.get(`${API_URL}/Sales/Orders`, {
            params: { shopId: shopId }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting orders:', error);
        throw error;
    }
};
export const getOrdersStatus = async (shopId) => {
    try {
        const response = await axios.get(`${API_URL}/Sales/OrdersStatus`, {
            params: { shopId: shopId }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting orders:', error);
        throw error;
    }
};
export const getOrdersLocations = async (shopId) => {
    try {
        const response = await axios.get(`${API_URL}/Sales/OrdersLocation`, {
            params: { shopId: shopId }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting orders:', error);
        throw error;
    }
};
export const getTotalSales = async (shopId) => {
    try {
        const response = await axios.get(`${API_URL}/Sales/TotalSales`, {
            params: { shopId: shopId }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting orders:', error);
        throw error;
    }
};
export const getSalesByProduct = async (shopId) => {
    try {
        const response = await axios.get(`${API_URL}/Sales/SalesByProduct`, {
            params: { shopId: shopId }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting sales by prod:', error);
        throw error;
    }
};
export const getMonthlySales = async (shopId) => {
    try {
        const response = await axios.get(`${API_URL}/Sales/MonthlySales`, {
            params: { shopId: shopId }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting orders:', error);
        throw error;
    }
};
export const getBestSellingProducts = async (shopId) => {
    try {
        const response = await axios.get(`${API_URL}/Sales/BestSellingProducts`, {
            params: { shopId: shopId }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting orders:', error);
        throw error;
    }
};