import axios from "axios";
import API_BASE_URL from "./apiConfig";

export interface FoodChain {
  id: number;
  name: string;
}

export const fetchFoodChains = async (): Promise<FoodChain[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/foodchains/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching food chains:", error);
    throw error;
  }
};