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
export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/Product/GetById`, {
            params: { id: id }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting products:', error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/Product/Delete?id=${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleteing product:', error);
        throw error;
    }
};
export const editProduct = async (id, product) => {
    try {
        const response = await axios.put(`${API_URL}/Product/Put?id=${id}`, {
            Name: product.name,
            Description: product.description,
            Price: product.price,
            Qunatity: product.quantity,
            ImageUrl: product.image_url,
            CategoryId: product.category_id
        });
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

export const createProduct = async (product) => {
    try {
        const response = await axios.post(`${API_URL}/Product/Post`, {
            Name: product.name,
            Description: product.description,
            Price: product.price,
            Quantity: product.quantity,
            ImageUrl: product.image_url,
            CategoryId: product.category_id,
            ShopId: product.shop_id
        });
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};
export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/Product/Get`);
        return response.data;
    } catch (error) {
        console.error('Error getting products:', error);
        throw error;
    }
};