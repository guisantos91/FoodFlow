import { Button, Label, TextInput } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface FoodChain {
    id: number;
    name: string;
}

export function ApplicationForm({ handleSubmit }: { handleSubmit: (formData: any) => void }) {
    const navigate = useNavigate();

    const [foodChains, setFoodChains] = useState<FoodChain[]>([]);

    useEffect(() => {
    const fetchFoodChains = async () => {
        try {
        const response = await axios.get("http://localhost:8080/api/v1/foodchains/");
        const chains = response.data.map((chain: { id: number; name: string; food_type: string }) => ({
                id: chain.id,
                name: chain.name,
            })
        );
        setFoodChains(chains);
        } catch (error) {
        console.error("Failed to fetch food chains:", error);
        }
    };
    fetchFoodChains();
    }, []);

    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        foodchain: { id: 0 },
        birthDate: "",
        restaurantName: "",
        restaurantAddress: "",
        latitude: "",
        longitude: "",
        restaurantEndpoint: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        if (id === "foodchain") {
          setFormData((prev) => ({ ...prev, foodchain: { id: parseInt(value, 10) } }));
        } else {
          setFormData((prev) => ({ ...prev, [id]: value }));
        }
      };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit(formData);
    };

    const handleNavigation = () => {
        navigate('/login');
    };

  return (
    <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center justify-center mt-8 rounded-3xl w-2/3 shadow-lg bg-gray-200">
            <form className="flex w-full flex-col gap-6 mt-8 mb-4" onSubmit={onSubmit} >
                <div className="flex flex-col border-b-2 border-gray-400">
                    <h2 className="flex text-2xl font-bold mb-2 ml-12">Apply for Manager</h2>
                    <h4 className="flex text-xl text-gray mb-8 ml-12">Please fill all the information</h4>
                </div>
                <div className="flex items-center justify-center mt-8 ml-4 space-x-20">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="fname" value="Name" />
                        </div>
                        <TextInput className="w-96" id="fname" type="text" placeholder="Name" value={formData.fname} onChange={handleChange} required shadow />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="lname" value="Surname" />
                        </div>
                        <TextInput className="w-96" id="lname" type="text" placeholder="Surname" value={formData.lname} onChange={handleChange} required shadow />
                    </div>
                </div>
                <div className="flex items-center justify-center ml-4 space-x-20">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Email" />
                        </div>
                        <TextInput className="w-96" id="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required shadow />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Password" />
                        </div>
                        <TextInput className="w-96" id="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required shadow />
                    </div>
                </div>
                <div className="flex items-center justify-center ml-4 space-x-20">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="date" value="Chain" />
                        </div>
                        <select id="foodchain" className="w-96 p-2 border rounded-md shadow" value={formData.foodchain.id || ""} onChange={handleChange} required>
                            <option value="" disabled>
                                -- Select a Food Chain --
                            </option>
                            {foodChains.map((chain) => (
                                <option key={chain.id} value={chain.id}>
                                    {chain.name}
                                </option>
                                ))}
                        </select>
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="date" value="Birth Date" />
                        </div>
                        <TextInput className="w-96" id="birthDate" type="text" placeholder="YYYY-MM-DD" value={formData.birthDate} onChange={handleChange} required shadow />
                    </div>
                </div>
                <div className="flex items-center justify-center ml-4 space-x-20">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="restname" value="Restaurant Name" />
                        </div>
                        <TextInput className="w-96" id="restaurantName" type="text" placeholder="Restaurant Name" value={formData.restaurantName} onChange={handleChange} required shadow />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="restAddress" value="Address" />
                        </div>
                        <TextInput className="w-96" id="restaurantAddress" type="text" placeholder="Address" value={formData.restaurantAddress} onChange={handleChange} required shadow />
                    </div>
                </div>
                <div className="flex items-center justify-center ml-4 space-x-20">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="lat" value="Latitude" />
                        </div>
                        <TextInput className="w-96" id="latitude" type="number" placeholder="Latitude" value={formData.latitude} onChange={handleChange} required shadow />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="longitude" value="Longitude" />
                        </div>
                        <TextInput className="w-96" id="longitude" type="number" placeholder="Longitude" value={formData.longitude} onChange={handleChange} required shadow />
                    </div>
                </div>
                <div className="flex items-center justify-center ml-4 space-x-20">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="restaurantEndpoint" value="Endpoint" />
                        </div>
                        <TextInput className="w-96" id="restaurantEndpoint" type="text" placeholder="Endpoint" value={formData.restaurantEndpoint} onChange={handleChange} required shadow />
                    </div>
                </div>
                <div className="flex items-center justify-center mt-4 gap-12">
                    <Button className="bg-red-500 w-48 rounded-2xl" type="button" onClick={handleNavigation} >Back</Button>
                    <Button className="bg-green-500 w-48 rounded-2xl" type="submit" >Submit</Button>
                </div>
            </form>
        </div>
    </div>
  );
}

export default ApplicationForm;