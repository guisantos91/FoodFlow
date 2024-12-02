import axios from "axios";
import API_BASE_URL from "./apiConfig";

export interface FoodChain {
  id: number;
  name: string;
  food_type: string;
}

export interface Restaurant {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  foodchain: FoodChain;
  manager: string | null;
}

interface FoodChainData {
  name: string;
  values: number[];
}

export interface DonutData {
  name: string;
  value: number;
}

interface FoodChainTopOrders {
  id: number;
  name: string;
  price: number;
  foodchain: {
      id: number;
      name: string;
      food_type: string;
  };
}

interface Menu {
  id: number;
  name: string;
  price: number;
}

export const getChains = async (): Promise<FoodChain[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/foodchains/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching food chains:", error);
    throw error;
  }
};

export const getRestaurants = async (id: number): Promise<Restaurant[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/foodchains/${id}/restaurants`);
    return response.data;
  } catch (error) {
    console.error("Error fetching food chains:", error);
    throw error;
  }
};

export const getMenus = async (id: number): Promise<Menu[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/foodchains/${id}/menus`);
    return response.data;
  } catch (error) {
    console.error("Error fetching food chains:", error);
    throw error;
  }
};

export const getOrdersStatistics = async (): Promise<FoodChainData[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/foodchains/orders/statistics`);
    return response.data;
  } catch (error) {
    console.error("Error fetching food chains:", error);
    throw error;
  }
};

export const getMenusStatistics = async (): Promise<FoodChainTopOrders[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/foodchains/menus/statistics`);
    return response.data;
  } catch (error) {
    console.error("Error fetching food chains:", error);
    throw error;
  }
};

export const getOrdersStatisticsById = async ( id: number ): Promise<DonutData[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/foodchains/${id}/orders/statistics`);
    return response.data;
  } catch (error) {
    console.error("Error fetching food chains:", error);
    throw error;
  }
};