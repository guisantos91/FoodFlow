import { useEffect, useState } from "react";
import Layout from "../components/Layout.tsx";
import Map from "../components/Map.tsx";
import axios from "axios";
import Sidebar from "../components/SideBar.tsx";
import * as L from "leaflet"; 
import { useParams } from "react-router-dom";
import { fetchFoodChains } from "../api/fetchFoodChains.tsx";
// import DonutChartToFoodChain from "../components/Statistics/DonutChartToFoodChain.tsx";

const FoodChainPage: React.FC = ({}) => {
  const { id } = useParams<{ id: string }>();
  const foodChainID = Number(id);
  console.log(foodChainID);

  const [zoomLevel, setZoomLevel] = useState(13);
  const [userLocation, setUserLocation] = useState({});

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



  const [foodChain, setFoodChain] = useState<FoodChain | null>(null);
  const [restaurants, setRestaurant] = useState<Restaurant[]>([]);

  useEffect(() => {
    const map = L.map(document.createElement("div"));
    map.locate({
      setView: false,
      enableHighAccuracy: true,
    });

    map.on("locationfound", (e: L.LocationEvent) => {
      setUserLocation({ lat: e.latlng.lat, lon: e.latlng.lng });
      console.log("User Location:", userLocation);
    });

    map.on("locationerror", (e: L.ErrorEvent) => {
      console.error("Location error:", e.message);
    });
  }, []);

  useEffect(() => {
    console.log("Updated User Location:", userLocation);

  }, [userLocation]);
  

  useEffect(() => {
    const fetchFoodChains = async () => {
      try {
        const response = await fetchFoodChains();
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

  function distance(userLocation: any, lat: number, lon: number): number {
    const R = 6378.137; // Raio da Terra em km
    const dLat = (lat - userLocation.lat) * Math.PI / 180; // Diferença de latitude em radianos
    const dLon = (lon - userLocation.lon) * Math.PI / 180; // Diferença de longitude em radianos
    const lat1 = userLocation.lat * Math.PI / 180; // Latitude inicial em radianos
    const lat2 = lat * Math.PI / 180; // Latitude final em radianos

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distância em km

    return Math.round(d * 100000)/100; // Retorna a distância em metros
}

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/foodchains/${foodChainID}/restaurants`
        );
        if (Object.keys(userLocation).length !== 0) {
          const restaurantsWithDistance = response.data.map((restaurant: any) => {
            const dist = distance(userLocation, restaurant.latitude, restaurant.longitude);
            return { ...restaurant, distance: dist };
          });
          restaurantsWithDistance.sort((a:any, b:any) => a.distance - b.distance);
          setRestaurant(restaurantsWithDistance);
          console.log("Restaurants Data with Distance:", restaurantsWithDistance);
        } else {
          setRestaurant(response.data);
          console.log("Restaurants Data:", response.data);
        }
      } catch (err) {
        console.error("Error fetching Restaurants:", err);
      }
    };

    fetchRestaurant();
  }, [foodChainID,userLocation]);



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
            {/* <DonutChartToFoodChain foodChainID={foodChainID} /> */}
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

export default FoodChainPage;
