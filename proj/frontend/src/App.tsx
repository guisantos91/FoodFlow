import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./Pages/HomePage";
import UserPage from "./Pages/UserPage";
import SettingsPage from "./Pages/SettingsPage";
import RestaurantStatistics from "./Pages/RestaurantStatistics";
import ChainFoodPage from "./Pages/FoodChainPage";
import LoginPage from "./Pages/LoginPage";
import UserForm from "./Pages/UserForm";
import ManagerForm from "./Pages/ManagerFormPage";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/foodChain/:foodchainId/restaurant/:restaurantId" element={<RestaurantStatistics />} />
          <Route path="/foodChain/:id" element={<ChainFoodPage />} />
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/form/:formId" element={<UserForm/>}/>
          <Route path="/managerForm" element={<ManagerForm/>}/>
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
