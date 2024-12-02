import axios from "axios";
import API_BASE_URL from "./apiConfig";

export interface Order {
    id: number;
    createdAt: string; 
    orderId: number;
    status: string;
    restaurantId: number;
}

export const getOrdersToDo = async (): Promise<Order[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/orders?status=to-do`);
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};

export const getOrdersInProgress = async (): Promise<Order[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/orders?status=in-progress`);
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};

export const getOrdersDone = async (): Promise<Order[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/orders?status=done`);
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};