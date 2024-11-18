import React, { useEffect, useState } from "react";
import SideBarCard from "./Cards/SidebarCards";
import UserImage from "../assets/images/icons/user.png";
import MCImage from "../assets/images/logos/mcdonalds.png";
import axios from "axios";

interface Data {
  name: string;
  data: any[];
}

const Sidebar = ({ name, data }: Data) => {
  return (
    <div className="w-3/12 flex flex-col bg-gray-300 text-white p-4">
      <div className="flex items-center mb-6">
        <img
          src={UserImage}
          alt="User"
          className="w-10 h-10 rounded-full border-2 border-black object-contain"
        />
        <div className="ml-4">
          <button>
            <h1 className="text-xl text-black font-extrabold hover:underline">
              Login
            </h1>
          </button>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <h2 className="text-lg text-black font-bold">{name}</h2>
      </div>
      <div>
        {data.map((item) => (
          <div key={item.id} >
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
