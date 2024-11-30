import Layout from '../components/Layout';
import axios from "axios";
import ApplicationForm from '../components/ApplicationForm';
import { useNavigate } from 'react-router-dom';

const ManagerForm = () => {
    const navigate = useNavigate();

    const handleFormSubmit = async (formData: any) => {
        try {
          const baseUrl = `http://localhost:8080/api/v1/auth`;
          const response = await axios.post(`${baseUrl}/form`, formData);
          console.log("Form submitted successfully:", response.data);
          navigate('/login');
        } catch (error) {
          console.error("Failed to submit form:", error);
        }
    };

    return (
        <Layout>
            <ApplicationForm handleSubmit={handleFormSubmit} />
        </Layout>
    );
};

export default ManagerForm;