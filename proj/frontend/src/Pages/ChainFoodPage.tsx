import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Map from "../components/Map.tsx";
import axios from "axios";
import Sidebar from "../components/SideBar";
import * as L from "leaflet"; 
import { useParams } from "react-router-dom";
import DonutChart from "../components/Statistics/DonutChart.tsx";

const ChainFoodPage: React.FC = ({}) => {
  const { id } = useParams<{ id: string }>();
  const foodChainID = Number(id);
  console.log(foodChainID);

  const [zoomLevel, setZoomLevel] = useState(13);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

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

  interface DonutData {
    name: string;
    value: number;
  }

  const [foodChain, setFoodChain] = useState<FoodChain | null>(null);
  const [restaurants, setRestaurant] = useState<Restaurant[]>([]);
  const [donutGraphData, setDonutGraphData] = useState<DonutData[]>([]);

  useEffect(() => {
    const map = L.map(document.createElement("div"));
    map.locate({
      setView: false,
      enableHighAccuracy: true,
    });

    map.on("locationfound", (e: L.LocationEvent) => {
      const { lat, lng } = e.latlng;
      setUserLocation({ lat, lon: lng });
      console.log("User Location:", userLocation);
    });

    map.on("locationerror", (e: L.ErrorEvent) => {
      console.error("Location error:", e.message);
    });
  }, []);

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

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/foodchains/${foodChainID}/orders/statistics`
        );
        console.log("Stats Data:", response.data);

        const formattedDonutData = Object.keys(response.data).map((menu) => {
          return {
            name: menu,
            value: response.data[menu].values.reduce((acc: number, val: number) => acc + val, 0)
          }
        });

        setDonutGraphData(formattedDonutData);
      } catch (err) {
        console.error("Error fetching Stats:", err);
      }
    };

    fetchStats();
  })

  const useBlockScroll = (shouldBlock: boolean) => {
    useEffect(() => {
      if (shouldBlock) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
  
      return () => {
        document.body.style.overflow = "";
      };
    }, [shouldBlock]);
  };
  const [isScrollBlocked, setIsScrollBlocked] = useState(false); // Estado para controle de scroll
  useBlockScroll(isScrollBlocked);

  const handleScroll = (event: React.WheelEvent) => {
    if (event.deltaY > 0) {
      setZoomLevel((prevZoom) => Math.max(1, prevZoom - 1));
    } else {
      setZoomLevel((prevZoom) => Math.min(19, prevZoom + 1));
    }
  };

  const dataNames = [...new Set([...donutGraphData.map(item => item.name), ...donutGraphData.map(item => item.name)])];
  const colorMapping = dataNames.reduce<{ [key: string]: string }>((acc, name, index) => {
    acc[name] = `hsl(${(index * 360) / dataNames.length}, 70%, 50%)`;
    return acc;
  }, {});

  return (
    <Layout>
      <div className="flex min-h-screen">
        <div className="flex-1 flex justify-center bg-white">
          <div className="text-center">
            <div className="bg-gray-100 mt-8 mb-8 mx-auto p-8 rounded-lg shadow-xl max-w-5xl">
              <h1 className="text-4xl font-bold text-center mb-8">
                Welcome to {foodChain?.name || "Loading..."}
              </h1>
              <div
                className="p-4  rounded-lg"
                style={{ height: "500px", overflow: "hidden" }}
                onWheel={handleScroll}
                onMouseEnter={()=>setIsScrollBlocked(true)}   
                onMouseLeave={()=>setIsScrollBlocked(false)}   
              >
                <Map
                  zoomLevel={zoomLevel}
                  markers={restaurants.map((restaurant) => ({
                    lat: restaurant.latitude,
                    lon: restaurant.longitude,
                    label: restaurant.name,
                    id:restaurant.id,
                    chainId:foodChainID,
                  }))}
                />
              </div>
            </div>
            <DonutChart data={donutGraphData} colorMapping={colorMapping} />
          </div>
        </div>
        <Sidebar
          name="Restaurants"
          data={restaurants}
          navigateBool={true}
          foodchainId={foodChainID}
        />
      </div>
    </Layout>
  );
};

export default ChainFoodPage;
