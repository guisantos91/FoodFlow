import  { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Map from '../components/Map.tsx';
import axios from "axios";



const ChainFoodPage: React.FC = () => {
    const [zoomLevel, setZoomLevel] = useState(13);
    interface FoodChain {
        id: number;
        name: string;
      }
      
      interface Restaurant {
        id: number;
        name: string;
        address: string;
        latitude: number;
        longitude: number;
        foodchain: FoodChain;
        manager: string | null; // Pode ser null
      }
    
    const foodChain:FoodChain={id:1,name:"Mc Donalds"}
    const [restaurants, setRestaurant] = useState<Restaurant[]>([]);
    
        useEffect(() => {
            const fetchRestaurant = async () => {
                try {
                    const response = await axios.get("http://localhost:8080/api/v1/foodchains/1/restaurants");
                    setRestaurant(response.data);
                    console.log("Restaurants Data:", response.data);
                } catch (err) {
                    console.error("Error fetching Restaurants:", err);
                }
            };
    
            fetchRestaurant();
        }, []);
    return (
        <Layout>
            <div>
                <h1>Hello MC.</h1>
            </div>
            <div>
        <button onClick={() => setZoomLevel((zoomLevel<19?zoomLevel + 1:zoomLevel))}>+</button>
        <button onClick={() => setZoomLevel(zoomLevel - 1)}>-</button>
        <hr />
        <Map zoomLevel={zoomLevel} markers={ restaurants.map((restaurant) => ({
    lat: restaurant.latitude,
    lon: restaurant.longitude,
    label: restaurant.name,
  }))}/>
            </div>
        </Layout>
    );
};

export default ChainFoodPage;