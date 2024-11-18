import React, { useEffect, useState } from "react";
import FoodChainCard from "../components/Cards/FoodChaindCard";
import Layout from "../components/Layout";
import Sidebar from "../components/SideBar";
import axios from "axios";
import MCImage from "../assets/images/logos/mcdonalds.png";
import SearchSVG from "../assets/images/icons/search.svg";
import LineGraph from "../components/Statistics/LineGraph";

interface FoodChain {
    id: number;
    name: string;
}

interface FoodChainData{
    name: string;
    values: number[];
}

const HomePage: React.FC = () => {
    const [foodChains, setFoodChains] = useState<FoodChain[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [graphData, setGraphData] = useState<FoodChainData[]>([]);

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

        const fetchOrders = async () => {
            try {
                const responseGraph = await axios.get("http://localhost:8080/api/v1/foodchains/orders/statistics");
                console.log("Orders Data:", responseGraph.data);
                const formattedGraphData = Object.keys(responseGraph.data).map((chain) => {
                    return {
                        name: chain,
                        values: responseGraph.data[chain].values
                    };
                });
                setGraphData(formattedGraphData);
            } catch (err) {
                console.error("Error fetching orders:", err);
            }
        }

        fetchFoodChains();
        fetchOrders();

        const interval = setInterval(() => {
            fetchOrders();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const filteredFoodChains = foodChains.filter(chain =>
        chain.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSeeAll = () => {
        setSearchTerm("");
    };

    const dataNames = [...new Set([...graphData.map(item => item.name)])];

    const colorMapping = dataNames.reduce<{ [key: string]: string }>((acc, name, index) => {
        acc[name] = `hsl(${(index * 360) / dataNames.length}, 70%, 50%)`;
        return acc;
      }, {});

    return (
        <Layout>
            <div className="flex min-h-screen">
                <div className="flex-1 flex justify-center bg-white">
                    <div className="text-center">
                        <div className="bg-gray-100 mt-8 mb-8 mx-auto p-8 rounded-lg shadow-xl max-w-5xl">
                            <h1 className="text-4xl font-bold text-center mb-8">Trending Restaurants</h1>
                            <div className="p-4">
                                <LineGraph data={graphData} colorMapping={colorMapping}/>
                            </div>
                        </div>
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