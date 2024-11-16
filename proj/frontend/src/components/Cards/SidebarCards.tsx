import React from 'react';

interface SideBarCardProps {
    name: string;
    image: string;
}

const SideBarCard: React.FC<SideBarCardProps> = ({ name, image }) => {
    return (
        <div className="card card-side bg-gray-300 shadow-md h-20 mb-6">
            <figure className="flex items-center justify-center">
                <img
                    src={image}
                    alt={name}
                    className="w-14 h-14 object-contain rounded-lg bg-white p-2 ml-4" />
            </figure>
            <div className="card-body p-2 mt-2">
                <h2 className="text-sm font-bold text-black">{name}</h2>
                <h2 className="text-xs font-base text-black">{name}</h2>
            </div>
        </div>
    );
};

export default SideBarCard;
