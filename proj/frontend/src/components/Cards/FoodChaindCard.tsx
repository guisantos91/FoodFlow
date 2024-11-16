import React from 'react';

interface FoodChainCardProps {
    name: string;
    image: string;
}

const FoodChainCard: React.FC<FoodChainCardProps> = ({ name, image }) => {
    return (
        <div className="w-96 h-40 bg-orange-500 rounded-2xl flex border-4 border-orange-500 m-8">
            {/* Container da imagem */}
            <div className="bg-white w-36 h-full rounded-l-2xl flex items-center justify-center p-2">
                <img
                    src={image}
                    alt={name}
                    className="max-w-full max-h-full object-contain rounded-2xl"
                />
            </div>
            <div className="flex flex-col justify-center p-4 ml-7">
                <h1 className="text-2xl font-extrabold text-white">{name}</h1>
                <button
                    className="mt-4 w-28 h-10 bg-green-800 text-white text-lg font-semibold rounded-xl hover:bg-green-600"
                >
                    See More
                </button>
            </div>
        </div>
    );
};

export default FoodChainCard;
