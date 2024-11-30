import Layout from "../components/Layout";
import userIcon from '../assets/images/icons/user.png';
import SearchSVG from '../assets/images/icons/search.svg';
import { useState } from 'react';
import { Tabs } from "flowbite-react";

const Requests = () => {
    const [searchName, setSearchName] = useState("");

    return (
        <Layout>
            <div className="bg-white min-h-screen py-10 px-20">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-orange-500">Hello Alice Martins</h1>
                        <p className="text-black text-xl">Welcome Back</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center justify-center w-8 h-8 border-2 border-orange-500 rounded-full">
                            <img src={userIcon} alt="User Icon" className="w-4 h-4" />
                        </div>
                        <span className="text-black font-medium">Alice Martins</span>
                    </div>
                </div>

                <div className="relative flex items-center justify-between mr-40 ml-20 mt-10">
                    <Tabs className="mt-10" aria-label="Default tabs" variant="default">
                        <Tabs.Item active title="Pending">
                            
                        </Tabs.Item>
                        <Tabs.Item title="Rejected">
                            
                        </Tabs.Item>
                    </Tabs>

                    <div className="relative flex items-center mb-6">
                        <img
                            src={SearchSVG}
                            alt="Search"
                            className="absolute left-3 w-6 h-6"
                        />
                        <input
                            type="text"
                            placeholder="Search"
                            className="p-2 pl-10 border-4 border-orange-500 rounded-xl w-64 bg-gray-100 text-black placeholder-black"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-center items-center">
                    {/* Something here */}
                </div>
            </div>
        </Layout>
    );
};

export default Requests;