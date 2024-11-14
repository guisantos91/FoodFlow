import FoodChainCard from "./components/FoodChaindCard";
import Layout from "./Layout";

const HomePage = () => {
    return (
        <Layout>
            <div className="flex justify-center h-screen">
                <div className="text-center">
                    <h2 className="text-2xl mb-4">User Page</h2>
                    <p>User page url</p>
                    <FoodChainCard />
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
