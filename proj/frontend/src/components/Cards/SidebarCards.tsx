import React from 'react';
import { useNavigate } from "react-router-dom";

interface SideBarCardProps {
    restId: number;
    foodchainId: number;
    item1: string;
    item2: string;
    image: string;
    naveTrue?:boolean;
}

const SideBarCard: React.FC<SideBarCardProps> = ({ restId, foodchainId, item1, item2, image,naveTrue }) => {
    const navigate = useNavigate();
    const handleCardClick = () => {
        if (naveTrue) {
       navigate(`/foodchain/${foodchainId}/restaurant/${restId}`);
            
        }
    };

    return (
        <div className="card card-side bg-gray-400 shadow-md h-20 mb-6 cursor-pointer" onClick={handleCardClick}>
            <figure className="flex items-center justify-center">
                <img
                    src={image}
                    alt={item1}
                    className="w-14 h-14 object-contain rounded-lg bg-white p-2 ml-4" />
            </figure>
            <div className="card-body p-2 mt-2">
                <h2 className="text-sm font-bold text-black">{item1}</h2>
                <h2 className="text-xs font-base text-black">{item2}</h2>
            </div>
        </div>
    );
};

export default SideBarCard;
