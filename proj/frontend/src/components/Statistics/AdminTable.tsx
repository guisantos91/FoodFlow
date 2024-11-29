import React, { useEffect, useState } from 'react';
import axios from "axios";
import MCImage from '../../assets/images/logos/mcdonalds.png';

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

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    useEffect(() => {
        const fetchManagers = async () => {
            try {
                const baseUrl = 'http://localhost:8080/api/v1/admin';
                const response = await axios.get(`${baseUrl}/managers `, {
                    withCredentials: true,
                });
                setManagers(response.data);
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
                // const restaurantsWithDistance = response.data.map((restaurant: Restaurant) => {
                //     return { ...restaurant, manager: 2 }; // change later
                // });
                setRestaurants(response.data);
                console.log("Restaurants Data:", response.data);
                console.log("Restaurants Data2:", response.data);
            } catch (err) {
                console.error("Error fetching Restaurants:", err);
            }
        };

        fetchRestaurants();
    }, []);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRestaurants = restaurants.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(restaurants.length / rowsPerPage);

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
                <tbody
                    style={{
                        minHeight: `${10 * 48}px`,
                    }}
                    className="bg-white"
                >
                    {currentRestaurants.map((restaurant) => (
                        <tr
                            key={restaurant.id}
                            className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            <td className="px-12 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {managers.find((manager) => manager.id === restaurant.manager)?.fname}
                            </td>
                            <td className="px-14 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center space-x-2">
                                <img src={MCImage} alt="Restaurant Logo" className="w-8 h-8 rounded" />
                                <span>{restaurant.name}</span>
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Olá
                            </td>
                        </tr>
                    ))}

                    {currentRestaurants.length < rowsPerPage &&
                        Array.from({ length: rowsPerPage - currentRestaurants.length }).map((_, index) => (
                            <tr key={`empty-${index}`} className="bg-white">
                                <td className="px-12 py-4">&nbsp;</td>
                                <td className="px-14 py-4">&nbsp;</td>
                                <td className="px-6 py-4">&nbsp;</td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <div className="flex justify-center mt-4 pb-3">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`px-4 py-2 mx-1 text-sm font-medium text-white ${pageNumber === currentPage ? "bg-orange-400" : "bg-gray-500"
                            } rounded hover:bg-orange-500`}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AdminTable;
