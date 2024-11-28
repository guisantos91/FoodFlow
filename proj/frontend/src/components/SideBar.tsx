import SideBarCard from './Cards/SidebarCards';
import userIcon from '../assets/images/icons/user.png';
import MCImage from '../assets/images/logos/mcdonalds.png';
import { Link } from 'react-router-dom';

interface Data {
  name: string;
  data: any[];
  navigateBool?: boolean;
  foodchainId: number;
}

const Sidebar = ({ name, data, foodchainId, navigateBool }: Data) => {
  return (
    <div className="w-3/12 flex flex-col bg-gray-300 text-white p-4 shadow-2xl">
      <div className="flex items-center mt-8 space-x-2">
        <div className="flex items-center justify-center w-8 h-8 border-2 border-orange-500 rounded-full">
          <img src={userIcon} alt="User Icon" className="w-4 h-4" />
        </div>
        <Link to="/login" className="text-xl font-bold text-black hover:text-orange-500 hover:underline">
          Login
        </Link>
      </div>
      <div className="flex items-center mb-4 mt-8">
        <h2 className="text-2xl text-black font-bold">{name}</h2>
      </div>
      <div>
        {data.map((restaurant) => (
          <SideBarCard
            restId={restaurant.id}
            foodchainId={foodchainId}
            item1={restaurant.name}
            item2={restaurant.address||restaurant.foodchain.name}
            item3={restaurant.distance}
            image={MCImage}
            naveTrue={navigateBool}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
