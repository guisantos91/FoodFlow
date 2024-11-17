import React from 'react';
import SideBarCard from './Cards/SidebarCards';
import UserImage from '../assets/images/icons/user.png';

import MCImage from '../assets/images/logos/mcdonalds.png';
import BGImage from '../assets/images/logos/burgerking.png';
import KFCImage from '../assets/images/logos/KFC_logo.png';
import DominosImage from '../assets/images/logos/dominos_pizza_logo.png';
import TacoBellImage from '../assets/images/logos/Taco_Bell.png';
import TelepizzaImage from '../assets/images/logos/telepizza.png';
import PizzaHutImage from '../assets/images/logos/Pizza_Hut_logo.png';

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
        <div className="w-3/12 flex flex-col bg-gray-300 text-white p-4">
            <div className="flex items-center mb-6">
                <img
                    src={UserImage}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-black object-contain"
                />
                <div className="ml-4">
                    {/* <h1 className='text-xl text-black font-extrabold'>Login</h1> */}
                    <button>
                        <h1 className='text-xl text-black font-extrabold hover:underline'>Login</h1>
                    </button>
                </div>
            </div>
            <div className="flex items-center mb-4">
                <h1 className='text-3xl text-black font-extrabold font-serif mb-4 mt-1'>Trending</h1>
                <div className="ml-20">
                    <button className="text-orange-500 font-medium hover:underline text-xl mb-2">
                        See More
                    </button>
                </div>
            </div>

            {foodChains.slice(0, 6).map((chain, index) => (
                <SideBarCard key={index} name={chain.name} image={chain.image} />
            ))}
        </div>
    );
};

export default Sidebar;
