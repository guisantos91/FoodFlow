import Layout from "./Layout";
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from 'recharts';
const data = [
    { name: 'Sep 25', BigMac: 413, McChicken: 221, CBO: 279, HappyMeal: 125 },
    { name: 'Sep 30', BigMac: 344, McChicken: 209, CBO: 137, HappyMeal: 289 },
    { name: 'Oct 5', BigMac: 487, McChicken: 327, CBO: 182, HappyMeal: 256 },
    { name: 'Oct 10', BigMac: 563, McChicken: 447, CBO: 334, HappyMeal: 223 },
  ];

const MyLineChart = () => (
    <ResponsiveContainer width="100%" height={400}>
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
  );  

const RestaurantStatistics = () => {
    return (
        <Layout>
            <div className="flex h-full gap-4">
                <div className="flex-1">
                    <h4 className="text-orange-300 text-lg mb-2">Hello</h4>
                    <h2 className="text-black text-2xl">McDonald's - Universidade</h2>
                    <div className="mt-4 mr-8">
                        <MyLineChart />
                    </div>
                </div>
                <div className="w-1/4 bg-orange-500 flex flex-col">
                    <h3 className="text-xl font-bold mb-4">Live Orders</h3>
                </div>
            </div>
        </Layout>
    );
};

export default RestaurantStatistics;