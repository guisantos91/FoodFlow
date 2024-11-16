import Layout from "./Layout";
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell} from 'recharts';
import { Tabs, Card } from "flowbite-react";
import userIcon from './assets/images/icons/user_white.png';
import DonutChart from './components/DonutChart';

const data = [
    { name: 'Sep 25', BigMac: 413, McChicken: 221, CBO: 279, HappyMeal: 125 },
    { name: 'Sep 30', BigMac: 344, McChicken: 209, CBO: 137, HappyMeal: 289 },
    { name: 'Oct 5', BigMac: 487, McChicken: 327, CBO: 182, HappyMeal: 256 },
    { name: 'Oct 10', BigMac: 563, McChicken: 447, CBO: 334, HappyMeal: 223 },
  ];

const donut_data = [
    { name: 'Chicken Nuggets', value: 32, color: '#FF0404' }, 
    { name: 'Big Mac', value: 44, color: '#0426FF' }, 
    { name: 'McVeggie', value: 16, color: '#FFAE00' }, 
    { name: 'Others', value: 8, color: '#22C55E' },       
  ];

const MyLineChart = () => (
    <div className="flex flex-col items-center">
        <ResponsiveContainer width="80%" height={400}>
            <LineChart data={data}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="BigMac" stroke="#FFAE00" />
                <Line type="monotone" dataKey="McChicken" stroke="#0426FF" />
                <Line type="monotone" dataKey="CBO" stroke="#FF0404" />
                <Line type="monotone" dataKey="HappyMeal" stroke="#22C55E" />
            </LineChart>
        </ResponsiveContainer>
    </div>
  ); 

const RestaurantStatistics = () => {
    return (
        <Layout>
            <div className="flex h-full gap-4">
                <div className="flex-1">
                    <h4 className="text-orange-300 text-lg mb-2">Hello</h4>
                    <h2 className="text-black text-2xl">McDonald's - Universidade</h2>
                    <div className="mt-8 mb-8">
                        <MyLineChart />
                    </div>
                    <Tabs aria-label="Default tabs" variant="default">
                        <Tabs.Item title="Menus">
                        </Tabs.Item>
                        <Tabs.Item active title="Current Orders">
                            <DonutChart data={donut_data} />
                        </Tabs.Item>
                    </Tabs>
                </div>
                <div className="w-1/4 bg-gray-100 flex flex-col">
                    <div className="flex items-center mt-4 ml-4 space-x-2">
                        <div className="flex items-center justify-center w-8 h-8 border-2 border-orange-500 rounded-full">
                            <img src={userIcon} alt="User Icon" className="w-4 h-4" />
                        </div>
                        <h3 className="text-xl font-bold">Login</h3>
                    </div>
                    <h2 className="text-2xl font-bold mt-4 ml-4">Live Orders</h2>
                </div>
                <table>
                    <thead></thead>
                </table>
            </div>
        </Layout>
    );
};

export default RestaurantStatistics;