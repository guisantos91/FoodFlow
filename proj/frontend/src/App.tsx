import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./HomePage";
import UserPage from "./UserPage";
import SettingsPage from "./SettingsPage";
import RestaurantStatistics from "./RestaurantStatistics";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/restaurant_statistic" element={<RestaurantStatistics />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
