import React, { useEffect, useState } from 'react';
import axios from "axios";
import MCImage from '../../assets/images/logos/mcdonalds.png';
import EditSVG from '../../assets/images/icons/edit.svg';
import DeleteSVG from '../../assets/images/icons/delete.svg';

interface managerName{
    name:string;
}

interface FoodChain {
    id: number;
    name: string;
}

interface Form {
    id: number; 
    foodchain: FoodChain;
    fname: string;
    lname: string;
    // email: string;
    // birthDate: string;
    restaurantName: string;
    // restaurantAddress: string;
    // latitude: number;
    // longitude: number;
    restaurantEndpoint: string;
    // password: string;
  }

const AdminTable = ({name}:managerName) => {
    const [forms, setForms] = React.useState<Form[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const baseUrl = `http://localhost:8080/api/v1/admin`;
                const response = await axios.get(`${baseUrl}/forms?state=accepted`, {
                    withCredentials: true,
                });
                // const FormsWithDistance = response.data.map((restaurant: Restaurant) => {
                //     return { ...restaurant, manager: 2 }; // change later
                // });
                const filteredForms = response.data.filter(
                    (form: Form) => (  !name || (`${form.fname} ${form.lname}`.toLowerCase().includes(name.toLowerCase())))
                  );
          
                  setForms(filteredForms);
            } catch (err) {
                console.error("Error fetching Forms:", err);
            }
        };

        fetchForms();
    }, [name]);


    // const handleDelete = async (managerId: number | null) => {
    //     if (!managerId) return;

    //     try {
    //         await axios.delete(`http://localhost:8080/api/v1/admin/managers/${managerId} `, {
    //             withCredentials: true,
    //         });
    //         alert("Manager deleted successfully");

    //         setRestaurants((prev) =>
    //             prev.map((restaurant) =>
    //                 restaurant.manager?.id === managerId
    //                     ? { ...restaurant, manager: null }
    //                     : restaurant
    //             )
    //         );
    //     } catch (err) {
    //         console.error("Error deleting manager:", err);
    //         alert("Failed to delete manager");
    //     }
    // };

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentForms = forms.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(forms.length / rowsPerPage);

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
                    {currentForms.map((restaurant) => (
                        <tr
                            key={restaurant.id}
                            className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            <td className="px-12 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {restaurant.fname+' '+restaurant.lname}
                            </td>
                            <td className="px-14 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center space-x-2">
                                <img src={MCImage} alt="Restaurant Logo" className="w-8 h-8 rounded" />
                                <span>{restaurant.restaurantName}</span>
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="flex items-center space-x-2">
                                    <img src={EditSVG} alt="Edit" className="w-5 h-5 cursor-pointer" />
                                    <img src={DeleteSVG} alt="Delete" className="w-5 h-5 cursor-pointer" 
                                    // onClick={() => handleDelete(restaurant.manager?.id || null)} 
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}

                    {currentForms.length < rowsPerPage &&
                        Array.from({ length: rowsPerPage - currentForms.length }).map((_, index) => (
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