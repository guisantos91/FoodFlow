import FoodChainCard from "./components/FoodChaindCard";
import Layout from "./Layout";
import Sidebar from "./components/SideBar";

const HomePage = () => {
    return (
        <Layout>
            <div className="flex h-screen">
                {/* Conteúdo principal */}
                <div className="flex-1 flex justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl mb-4">User Page</h2>
                        <p>User page url</p>
                        <div>
                            <FoodChainCard />
                            <FoodChainCard />
                            <FoodChainCard />
                            <FoodChainCard />
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <Sidebar />
            </div>
        </Layout>
    );
};

export default HomePage;
