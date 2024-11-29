import React, { useEffect } from 'react';
import axios from "axios";
import McImage from "../../assets/images/logos/mcdonalds.png";

interface Manager {
    id: number;
    fname: string;
    lname: string;
}

interface FoodChain {
    id: number;
    name: string;
}

interface Restaurant {
    id: number;
    name: string;
    foodchain: FoodChain;
    manager: number | null;
}

const AdminTable: React.FC = () => {
    const [managers, setManagers] = React.useState<Manager[]>([]);
    const [restaurants, setRestaurants] = React.useState<Restaurant[]>([]);

    useEffect(() => {
        const fetchManagers = async () => {
            try {
                const baseUrl = 'http://localhost:8080/api/v1/admin';
                const response = await axios.get(`${baseUrl}/managers `, { //O espaço e, `${baseUrl}/managers ` é obrigatório
                    withCredentials: true,
                });
                setManagers(response.data)
                console.log(response.data);
            } catch (error) {
                console.error("Failed to fetch managers: ", error);
            }
        };
        fetchManagers();
    }, []);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:8080/api/v1/foodchains/restaurants'
                );
                const restaurantsWithDistance = response.data.map((restaurant: Restaurant) => {
                    return { ...restaurant, manager: 2 };   // change later
                });
                setRestaurants(restaurantsWithDistance);
                //   setRestaurants(response.data);
                console.log("Restaurants Data:", response.data);
                console.log("Restaurants Data2:", restaurantsWithDistance);

            } catch (err) {
                console.error("Error fetching Restaurants:", err);
            }
        };

        fetchRestaurants();
    }, []);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-9/12">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-lg text-white uppercase bg-orange-400 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-12 py-3">
                            Manager
                        </th>
                        <th scope="col" className="px-14 py-3">
                            Restaurant
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants.map((restaurant) => (
                        <tr
                            key={restaurant.id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            <td className="px-12 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {managers.find((manager) => manager.id === restaurant.manager)?.fname}
                            </td>
                            <td className="px-14 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {restaurant.name}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Olá
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default AdminTable;