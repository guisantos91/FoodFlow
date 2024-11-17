import React from 'react';

interface FoodChainCardProps {
    name: string;
    image: string;
}

const FoodChainCard: React.FC<FoodChainCardProps> = ({ name, image }) => {
    return (
        <div className="card card-side bg-orange-500 shadow-xl">
            <figure className="w-36 h-36 flex items-center justify-center">
                <img
                    src={image}
                    alt={name}
                    className="w-32 h-32 object-contain rounded-xl bg-white p-2"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-white">{name}</h2>
                <div className="card-actions justify-end">
                    <button className="bg-green-800 text-white text-lg font-bold px-4 py-2 rounded-lg hover:bg-green-700 -mb-3 mt-3">
                        See More
                    </button>

                </div>
            </div>
        </div>
    );
};

export default FoodChainCard;
