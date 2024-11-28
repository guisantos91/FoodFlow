import { Form } from '../components/Form';
import Layout from '../components/Layout';
import userIcon from "../assets/images/icons/user.png";
import axios from "axios";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Form {
    fname: string;
    lname: string;
    email: string;
    birthDate: string;
    restaurantName: string;
    restaurantAddress: string;
}

const UserForm = () => {
    const formId = useParams<{ formId: string }>().formId;
    const [form, setForm] = useState<Form>();
    console.log(formId);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const baseUrl = `http://localhost:8080/api/v1/admin`;
                const response = await axios.get(`${baseUrl}/forms/${formId}`, {
                    withCredentials: true,
                });
                setForm(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Failed to fetch users: ", error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <Layout>
            <div>
                <div className="flex items-center justify-between mt-8 ml-4 mr-24">
                    <div>
                        <h2 className="text-orange-300 text-lg mb-2 ml-8">Hello Admin</h2>
                        <h1 className="text-black text-2xl ml-8">Welcome Back</h1>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center justify-center w-8 h-8 border-2 border-orange-500 rounded-full">
                            <img src={userIcon} alt="User Icon" className="w-4 h-4" />
                        </div>
                        <h3 className="text-xl font-bold text-black">Admin</h3>
                    </div>
                </div>
                {form && <Form data={form} />}
            </div>
        </Layout>
    );
};

export default UserForm;