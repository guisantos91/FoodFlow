import React from 'react';
import SideBarCard from './Cards/SidebarCards';

import MCImage from '../assets/images/logos/mcdonalds.png';
import BGImage from '../assets/images/logos/burgerking.png';
import KFCImage from '../assets/images/logos/KFC_logo.png';
import DominosImage from '../assets/images/logos/dominos_pizza_logo.png';
import TacoBellImage from '../assets/images/logos/Taco_Bell.png';
import TelepizzaImage from '../assets/images/logos/telepizza.png';
import PizzaHutImage from '../assets/images/logos/Pizza_Hut_logo.png';

// Lista de cadeias de fast-food
const foodChains = [
    { name: "McDonald's", image: MCImage },
    { name: "Burger King", image: BGImage },
    { name: "KFC", image: KFCImage },
    { name: "Domino's Pizza", image: DominosImage },
    { name: "Taco Bell", image: TacoBellImage },
    { name: "Telepizza", image: TelepizzaImage },
    { name: "Pizza Hut", image: PizzaHutImage },
];

const Sidebar: React.FC = () => {
    return (
        <div className="w-3/12 flex flex-col bg-white text-white p-4 border-4 border-orange-500 rounded-l-xl">
            <h3 className="text-xl text-black font-bold mb-20">Sidebar</h3>
            {foodChains.map((chain, index) => (
                <SideBarCard key={index} name={chain.name} image={chain.image} />
            ))}
        </div>
    );
};

export default Sidebar;
