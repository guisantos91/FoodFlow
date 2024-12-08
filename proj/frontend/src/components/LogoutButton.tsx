import React from "react";
import { useUserContext } from "../context/UserContextFile";

const LogoutButton: React.FC = () => {
  const { contextLogout, isAuthenticated } = useUserContext();

  if (!isAuthenticated) return null;

  return (
    <button onClick={contextLogout}>Logout</button>
  );
};

export default LogoutButton;
