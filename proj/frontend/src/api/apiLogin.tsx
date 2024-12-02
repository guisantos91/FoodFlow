import axios from "axios";
import API_BASE_URL from "./apiConfig";

export const login = async ( email: string, password: string ) => {
    try {
      await axios.post(`${API_BASE_URL}/auth/login`, { email, password }, { withCredentials: true });
    } catch (error) {
      console.error("Error loggin in:", error);
      throw error;
    }
};

export const submitForm = async (formData: any) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/form`, formData, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error("Error submitting a form:", error);
      throw error;
    }
}