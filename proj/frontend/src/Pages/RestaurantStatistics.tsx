import Layout from "../components/Layout";
import { Tabs } from "flowbite-react";
import userIcon from "../assets/images/icons/user.png";
import DonutChart from '../components/Statistics/DonutChart';
import LineGraph from '../components/Statistics/LineGraph';
import CardComponent from "../components/Cards/Card";
import Table from "../components/Statistics/Table";
import { HiSortDescending } from "react-icons/hi";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Order {
    id: number;
    createdAt: string; 
}

interface MenuData {
    name: string;
    values: number[];
}

interface DonutData {
    name: string;
    value: number;
}

interface Menu {
    id: number;
    name: string;
    price: number;
}

const RestaurantStatistics = () => {
    const { foodchainId, restaurantId } = useParams<{ foodchainId: string; restaurantId: string }>();
    const foodchainID = Number(foodchainId);
    const restID = Number(restaurantId);
    const [orders_todo, setOrders_todo] = useState<Order[]>([]);
    const [orders_preparing, setOrders_preparing] = useState<Order[]>([]);
    const [orders_ready, setOrders_ready] = useState<Order[]>([]);
    const [graphData, setGraphData] = useState<MenuData[]>([]);
    const [donutGraphData, setDonutGraphData] = useState<DonutData[]>([]);
    const [menus, setMenus] = useState<Menu[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const baseUrl = `http://localhost:8080/api/v1/restaurants/${restID}/orders`;

                // Fetch and sort "to-do" orders
                const responseTodo = await axios.get(`${baseUrl}?status=to-do`);
                const sortedTodo = responseTodo.data.sort(
                    (a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                setOrders_todo(sortedTodo);

                // Fetch and sort "in-progress" orders
                const responsePreparing = await axios.get(`${baseUrl}?status=in-progress`);
                const sortedPreparing = responsePreparing.data.sort(
                    (a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                setOrders_preparing(sortedPreparing);

                // Fetch and sort "done" orders
                const responseReady = await axios.get(`${baseUrl}?status=done`);
                const sortedReady = responseReady.data.sort(
                    (a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                setOrders_ready(sortedReady);

                const responseGraph = await axios.get(`${baseUrl}/statistics`);
                const formattedGraphData = Object.keys(responseGraph.data).map((menu) => {
                    return {
                        name: menu,
                        values: responseGraph.data[menu].values
                    };
                });
                setGraphData(formattedGraphData);
                const formattedDonutData = Object.keys(responseGraph.data).map((menu) => {
                    return {
                        name: menu,
                        value: responseGraph.data[menu].values.reduce((acc: number, val: number) => acc + val, 0)
                    };
                });
                setDonutGraphData(formattedDonutData);

            } catch (err) {
                console.error("Error fetching orders:", err);
            }
        };

        const fetchMenus = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/foodchains/${foodchainID}/menus`);
                setMenus(response.data);
            } catch (err) {
                console.error("Error fetching menus:", err);
            }
        }

        // Initial fetch
        fetchMenus();
        fetchOrders();

        // Fetch data every 10 seconds
        const interval = setInterval(() => {
            fetchOrders();
        }, 10000);

        // Cleanup on unmount
        return () => clearInterval(interval);
    }, []);

    const todo = orders_todo.map((order) => order.id);
    const preparing = orders_preparing.map((order) => order.id);
    const ready = orders_ready.map((order) => order.id);

    const dataNames = [...new Set([...graphData.map(item => item.name), ...donutGraphData.map(item => item.name)])];
    const colorMapping = dataNames.reduce<{ [key: string]: string }>((acc, name, index) => {
        acc[name] = `hsl(${(index * 360) / dataNames.length}, 70%, 50%)`;
        return acc;
      }, {});

    return (
        <Layout>
            <div className="flex min-h-screen">
                <div className="flex-1 ml-4">
                    <h4 className="text-orange-300 text-lg mb-2 mt-4">Hello</h4>
                    <h2 className="text-black text-2xl">Restaurant</h2>
                    <div className="bg-gray-100 mt-8 mb-8 mx-auto p-8 rounded-lg shadow-xl max-w-5xl">
                        <h1 className="text-4xl font-bold text-center mb-8">Trending Orders</h1>
                        <div className="p-4">
                            <LineGraph data={graphData} colorMapping={colorMapping} />
                        </div>
                    </div>
                    <Tabs aria-label="Default tabs" variant="default">
                        <Tabs.Item active title="Menus">
                            <div className="flex items-center justify-between mt-4 ml-4 mr-6 mb-8">
                                <h2 className="text-xl font-bold">Available Orders: </h2>
                                <button className="flex items-center space-x-2 p-2 border-2 border-orange-500 bg-gray-200 text-black rounded-xl">
                                    Sort
                                    <HiSortDescending className="ml-3 mt-1 h-4 w-4" />
                                </button>
                            </div>
                            <div className="flex space-x-4 flex-wrap">
                              {menus.map((menu) => (
                                <CardComponent
                                  key={menu.id}
                                  image={"https://via.placeholder.com/150"}
                                  name={menu.name}
                                  price={menu.price.toFixed(2)}
                                />
                              ))}
                            </div>
                        </Tabs.Item>
                        <Tabs.Item title="Current Orders">
                            <DonutChart data={donutGraphData} colorMapping={colorMapping}/>
                        </Tabs.Item>
                    </Tabs>
                </div>
                <div className="w-3/12 flex flex-col bg-gray-300 text-white p-4 shadow-2xl">
                    <div className="flex items-center mt-8 ml-4 space-x-2">
                        <div className="flex items-center justify-center w-8 h-8 border-2 border-orange-500 rounded-full">
                            <img src={userIcon} alt="User Icon" className="w-4 h-4" />
                        </div>
                        <h3 className="text-xl font-bold text-black">Login</h3>
                    </div>
                    <h2 className="text-2xl text-black font-bold mt-8 ml-4">Live Orders</h2>
                    <Table todo={todo} preparing={preparing} ready={ready} />
                </div>
            </div>
        </Layout>
    );
};

export default RestaurantStatistics;