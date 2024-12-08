import React, { createContext, useState, ReactNode, useContext } from "react";

interface User {
    role: string;
    fname: string;
    lname: string;
    RestaurantID: number|undefined;
    ChainFoodID: number|undefined;

}

interface UserContextType {
  isAuthenticated: boolean;
  contextLogin: (role: string, fname: string, lname: string, RestaurantID: number|undefined, ChainFoodID: number|undefined) => void;
  contextLogout: () => void;
  user: User|undefined;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsUserenticated] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  const contextLogin = (role: string, fname: string, lname: string, RestaurantID: number|undefined, ChainFoodID: number|undefined) => {
    setIsUserenticated(true);
    setUser({role,fname,lname,RestaurantID,ChainFoodID,});
  };

  const contextLogout = () => {
    setIsUserenticated(false);
    setUser(undefined);
  };

  return (
    <UserContext.Provider value={{ isAuthenticated, contextLogin, contextLogout, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser deve ser usado dentro de um UserProvider");
  }
  return context;
};
