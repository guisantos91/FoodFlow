import axios from "axios";
import API_BASE_URL from "./apiConfig";

export interface Order {
    id: number;
    createdAt: string; 
    orderId: number;
    status: string;
    restaurantId: number;
}

interface MenuData {
    name: string;
    values: number[];
}

export const getOrdersToDo = async ( id: number ): Promise<Order[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/restaurants/${id}/orders?status=to-do`);
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};

export const getOrdersInProgress = async ( id: number ): Promise<Order[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/restaurants/${id}/orders?status=in-progress`);
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};

export const getOrdersDone = async ( id: number ): Promise<Order[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/restaurants/${id}/orders?status=done`);
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};

export const getOrdersStatistics = async ( id: number ): Promise<MenuData[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/restaurants/${id}/orders/statistics`);
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};
