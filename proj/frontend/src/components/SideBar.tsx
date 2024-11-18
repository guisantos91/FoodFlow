import SideBarCard from './Cards/SidebarCards';
import userIcon from '../assets/images/icons/user.png';
import MCImage from '../assets/images/logos/mcdonalds.png';
import { useNavigate } from "react-router-dom";

interface Data {
  name: string;
  data: any[];
  navigate?:boolean
}





const Sidebar = ({ name, data,navigate }: Data) => {
  const nav = useNavigate(); // Hook para navegação

  const handleRestaurantClick = (restaurantId: number) => {
    if (navigate) {
      nav("/restaurant_statistic", { state: { restaurantId } }); // Redireciona com ID
    }
  };
  return (
    <div className="w-3/12 flex flex-col bg-gray-300 text-white p-4 shadow-2xl">
        <div className="flex items-center mt-8 space-x-2">
            <div className="flex items-center justify-center w-8 h-8 border-2 border-orange-500 rounded-full">
                <img src={userIcon} alt="User Icon" className="w-4 h-4" />
            </div>
            <h3 className="text-xl font-bold text-black">Login</h3>
        </div>
        <div className="flex items-center mb-4 mt-8">
            <h2 className="text-2xl text-black font-bold">{name}</h2>
        </div>
        <div>
        {data.map((item) => (
          <div key={item.id} onClick={()=>handleRestaurantClick(item.id)} >
            <SideBarCard
              item1={item.name}
              item2={item.foodchain.name}
              image={MCImage}
              />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
