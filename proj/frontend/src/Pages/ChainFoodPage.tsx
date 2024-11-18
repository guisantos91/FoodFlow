import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Map from "../components/Map.tsx";
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
    manager: string | null;
  }

  const foodChainID: number = 1;
  const [foodChain, setFoodChain] = useState<FoodChain | null>(null);
  const [restaurants, setRestaurant] = useState<Restaurant[]>([]);

  useEffect(() => {
    const fetchFoodChains = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/foodchains/"
        );
        const allFoodChains: FoodChain[] = response.data;
        const targetFoodChain = allFoodChains.find(
          (fc) => fc.id === foodChainID
        );
        setFoodChain(targetFoodChain || null);
        console.log("Food Chain Data:", targetFoodChain);
      } catch (err) {
        console.error("Error fetching food chains:", err);
      }
    };

    fetchFoodChains();
  }, []);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/foodchains/${foodChainID}/restaurants`
        );
        setRestaurant(response.data);
        console.log("Restaurants Data:", response.data);
      } catch (err) {
        console.error("Error fetching Restaurants:", err);
      }
    };

    fetchRestaurant();
  }, [foodChainID]);

  const handleScroll = (event: React.WheelEvent) => {
    if (event.deltaY > 0) {
      setZoomLevel((prevZoom) => Math.max(1, prevZoom - 1));
    } else {
      setZoomLevel((prevZoom) => Math.min(19, prevZoom + 1));
    }
  };

  return (
    <Layout>
      <div>
        <h1>Hello {foodChain?.name}</h1>
      </div>
      <div>
        <div
          onWheel={handleScroll}
          style={{ width: "100%", height: "500px", overflow: "hidden" }}
        >
          <Map
            zoomLevel={zoomLevel}
            markers={restaurants.map((restaurant) => ({
              lat: restaurant.latitude,
              lon: restaurant.longitude,
              label: restaurant.name,
            }))}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ChainFoodPage;
