import Layout from "./Layout";
import { Tabs, Card } from "flowbite-react";
import userIcon from './assets/images/icons/user_white.png';
import DonutChart from './components/DonutChart';
import LineGraph from './components/LineGraph';
import CardComponent from "./components/Card";


const RestaurantStatistics = () => {
    return (
        <Layout>
            <div className="flex h-full gap-4">
                <div className="flex-1">
                    <h4 className="text-orange-300 text-lg mb-2">Hello</h4>
                    <h2 className="text-black text-2xl">McDonald's - Universidade</h2>
                    <div className="mt-8 mb-8">
                        <LineGraph />
                    </div>
                    <Tabs aria-label="Default tabs" variant="default">
                        <Tabs.Item title="Menus">
                            <CardComponent image="https://via.placeholder.com/150" name="Big Mac" price="€3.99" />
                            <CardComponent image="https://via.placeholder.com/150" name="McChicken" price="€2.99" />
                        </Tabs.Item>
                        <Tabs.Item active title="Current Orders">
                            <DonutChart />
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