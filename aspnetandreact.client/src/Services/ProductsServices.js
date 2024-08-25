import axios from 'axios';

// Define the base URL of your API
const API_URL = 'https://localhost:7031'; // Adjust the port and URL if needed

export const getProductsByShopId = async (shopId) => {
    try {
        const id = parseInt(shopId, 10)
        const response = await axios.get(`${API_URL}/Product/GetByShop`, {
            params: {shopId: id}
        });
        return response.data;
    } catch (error) {
        console.error('Error getting products:', error);
        throw error;
    }
};
export const deleteProduct = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/Product/Delete`, id);
        return response.data;
    } catch (error) {
        console.error('Error deleteing product:', error);
        throw error;
    }
};

