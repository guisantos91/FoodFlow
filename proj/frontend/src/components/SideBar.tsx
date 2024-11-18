import React, { useEffect, useState } from 'react';
import SideBarCard from './Cards/SidebarCards';
import userIcon from '../assets/images/icons/user.png';
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
        <div className="w-3/12 flex flex-col bg-gray-300 text-white p-4 shadow-2xl">
            <div className="flex items-center mt-8 space-x-2">
                <div className="flex items-center justify-center w-8 h-8 border-2 border-orange-500 rounded-full">
                    <img src={userIcon} alt="User Icon" className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-bold text-black">Login</h3>
            </div>
            <div className="flex items-center mb-4 mt-8">
                <h2 className="text-2xl text-black font-bold">Trending</h2>
            </div>
            <div>
                {foodChains.map((item) => (
                    <SideBarCard
                        key={item.id}
                        item1={item.name}
                        item2={item.foodchain.name}
                        image={MCImage}
                    />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;