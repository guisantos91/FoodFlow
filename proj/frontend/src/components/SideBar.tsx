import React, { useEffect, useState } from 'react';
import SideBarCard from './Cards/SidebarCards';
import UserImage from '../assets/images/icons/user.png';
import MCImage from '../assets/images/logos/mcdonalds.png';
import axios from 'axios';

interface FoodChainData {
    id: number;
    name: string;
    price: number;
    foodchain: {
        id: number;
        name: string;
        food_type: string;
    };
}

const Sidebar: React.FC = () => {
    const [foodChains, setFoodChains] = useState<FoodChainData[]>([]);

    useEffect(() => {
        const fetchFoodChains = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/foodchains/menus/statistics');
                setFoodChains(response.data); // Aqui está a correção
                console.log('Food Chains Data:', response.data);
            } catch (err) {
                console.error('Error fetching food chains:', err);
            }
        };

        fetchFoodChains();
    }, []);


    return (
        <div className="w-3/12 flex flex-col bg-gray-300 text-white p-4">
            <div className="flex items-center mb-6">
                <img
                    src={UserImage}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-black object-contain"
                />
                <div className="ml-4">
                    <button>
                        <h1 className="text-xl text-black font-extrabold hover:underline">Login</h1>
                    </button>
                </div>
            </div>
            <div className="flex items-center mb-4">
                <h2 className="text-lg text-black font-bold">Food Chains</h2>
            </div>
            <div>
                {foodChains.map((item) => (
                    <SideBarCard
                        key={item.id}
                        name={item.name}
                        foodchainName={item.foodchain.name}
                        image={MCImage}
                    />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;