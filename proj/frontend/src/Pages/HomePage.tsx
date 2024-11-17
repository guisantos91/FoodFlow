import React, { useEffect, useState } from "react";
import FoodChainCard from "../components/Cards/FoodChaindCard";
import Layout from "../components/Layout";
import Sidebar from "../components/SideBar";
import axios from "axios";
import MCImage from "../assets/images/logos/mcdonalds.png";
import SearchSVG from "../assets/images/icons/search.svg";

interface FoodChain {
    id: number;
    name: string;
}

const HomePage: React.FC = () => {
    const [foodChains, setFoodChains] = useState<FoodChain[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

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

    const filteredFoodChains = foodChains.filter(chain =>
        chain.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSeeAll = () => {
        setSearchTerm("");
    };

    return (
        <Layout>
            <div className="flex min-h-screen">
                <div className="flex-1 flex justify-center bg-white">
                    <div className="text-center">
                        <h2 className="text-2xl mb-4">User Page</h2>
                        <p>User page url</p>
                        <div className="relative mb-4 flex justify-center items-center">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search Food Chains"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="p-2 pl-10 border-4 border-orange-500 rounded-xl w-72 bg-orange-400 text-white placeholder-white"
                                />
                                <img
                                    src={SearchSVG}
                                    alt="Search"
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
                                />
                            </div>
                            <button
                                onClick={handleSeeAll}
                                className="text-orange-500 font-medium hover:underline text-xl mb-1 ml-14"
                            >
                                See All
                            </button>
                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8 mb-8">
                            {filteredFoodChains.map((chain) => (
                                <FoodChainCard key={chain.id} name={chain.name} image={MCImage} />
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