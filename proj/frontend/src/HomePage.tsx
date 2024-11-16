import React from "react";
import FoodChainCard from "./components/Cards/FoodChaindCard";
import Layout from "./Layout";
import Sidebar from "./components/SideBar";
import MCImage from './assets/images/logos/mcdonalds.png';
import BGImage from './assets/images/logos/burgerking.png';
import KFCImage from './assets/images/logos/KFC_logo.png';
import DominosImage from './assets/images/logos/dominos_pizza_logo.png';
import TacoBellImage from './assets/images/logos/Taco_Bell.png';
import TelepizzaImage from './assets/images/logos/telepizza.png';
import PizzaHutImage from './assets/images/logos/Pizza_Hut_logo.png';

const foodChains = [
    { name: "McDonald's", image: MCImage },
    { name: "Burger King", image: BGImage },
    { name: "KFC", image: KFCImage },
    { name: "Domino's Pizza", image: DominosImage },
    { name: "Taco Bell", image: TacoBellImage },
    { name: "Telepizza", image: TelepizzaImage },
    { name: "Pizza Hut", image: PizzaHutImage },
];

const HomePage: React.FC = () => {
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
