import axios from "axios";
import API_BASE_URL from "./apiConfig";

export interface Form {
    fname: string;
    lname: string;
    email: string;
    birthDate: string;
    restaurantName: string;
    restaurantAddress: string;
}

interface FoodChain {
    id: number;
    name: string;
}

interface FormData {
    id: number;
    foodchain: FoodChain;
    fname: string;
    lname: string;
    email: string;
    birthDate: string;
    restaurantName: string;
    restaurantAddress: string;
    latitude: number;
    longitude: number;
    restaurantEndpoint: string;
    password: string;
}

export const getForm = async ( id: string | undefined ): Promise<Form> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/forms/${id}`, { withCredentials: true, });
      return response.data;
    } catch (error) {
      console.error("Error fetching food chains:", error);
      throw error
    }
};

export const getAcceptedForms = async (): Promise<FormData[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/admin/forms?state=accepted`, { withCredentials: true, });
        return response.data;
    } catch (error) {
        console.error("Error fetching food chains:", error);
        throw error;
    }
};

export const getDeclinedForms = async (): Promise<FormData[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/admin/forms?state=declined`, { withCredentials: true, });
        return response.data;
    } catch (error) {
        console.error("Error fetching food chains:", error);
        throw error;
    }
}

export const getPendingForms = async (): Promise<FormData[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/admin/forms?state=pending`, { withCredentials: true, });
        return response.data;
    } catch (error) {
        console.error("Error fetching food chains:", error);
        throw error;
    }
}

export const changeForm = async( id: number, newForm: FormData ): Promise<FormData> => {
    try {
        const response = await axios.put(`${API_BASE_URL}/admin/forms/${id}`, newForm, { withCredentials: true, });
        return response.data;
    } catch (error) {
        console.error("Error fetching food chains:", error);
        throw error;
    }
}