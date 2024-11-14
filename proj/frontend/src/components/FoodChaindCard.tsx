import MCImage from '../assets/images/logos/mcdonalds.png';

const FoodChainCard = () => {
    return (
        <>
            <div className="w-96 h-40 bg-orange-500 rounded-2xl flex border-2 border-orange-500">
                <div className="bg-white w-36 h-full rounded-l-2xl">
                    <img src={MCImage} alt="McDonalds" className="w-full h-full object-cover rounded-l-2xl" />
                </div>
                <div className="flex flex-col justify-center p-4 ml-7">
                    <h1 className="text-3xl font-extrabold text-green-800">McDonald's</h1>
                    <button className="mt-7 px-4 py-2 bg-green-800 text-white text-lg font-semibold rounded-xl hover:bg-green-600">
                        See More
                    </button>
                </div>
            </div>
        </>
    );
}

export default FoodChainCard;
