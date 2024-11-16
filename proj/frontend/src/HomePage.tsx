import React, { useEffect, useState } from "react";
import FoodChainCard from "./components/Cards/FoodChaindCard";
import Layout from "./Layout";
import Sidebar from "./components/SideBar";
import axios from 'axios';

const HomePage: React.FC = () => {
    const [foodChains, setFoodChains] = useState([]);

    useEffect(() => {
        const fetchFoodChains = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/foodchains/");
                setFoodChains(response.data);
                console.log("Food Chains Data:", response.data);
            } catch (err) {
                console.error("Error fetching food chains:", err);
            }
        };

        fetchFoodChains();
    }, []);

    return (
        <Layout>
            <div className="flex min-h-screen">
                <div className="flex-1 flex justify-center bg-white">
                    <div className="text-center">
                        <h2 className="text-2xl mb-4">User Page</h2>
                        <p>User page url</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8 mb-8">
                            {foodChains.map((chain, index) => (
                                <FoodChainCard key={index} name={chain.name} image={chain.image} />
                            ))}
                        </div>
                    </div>
                </div>
                <Sidebar />
            </div>
        </Layout>
    );
};

export default HomePage;