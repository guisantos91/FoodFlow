// import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../index.css";
import "../output.css";
import homeIcon from '../assets/images/icons/casa_grey.png';
import userIcon from '../assets/images/icons/user_grey.png';
import settingsIcon from '../assets/images/icons/setting_grey.png';
import homeIconWhite from '../assets/images/icons/casa_white.png';
import userIconWhite from '../assets/images/icons/user_white.png';
import settingsIconWhite from '../assets/images/icons/setting_white.png';
import logoutIcon from '../assets/images/icons/logout_grey.png';
import logoutIconWhite from '../assets/images/icons/logout.png';
import { useLocation } from "react-router-dom";

const SideBarLayout = () => {
    // const [selected, setSelected] = useState<string>("");

    const icons = [
        { id: "home", path: "/", grey: homeIcon, white: homeIconWhite },
        { id: "user", path: "/user", grey: userIcon, white: userIconWhite },
        { id: "settings", path: "/settings", grey: settingsIcon, white: settingsIconWhite },
        { id: "logout", path: "/ ", grey: logoutIcon, white: logoutIconWhite },
    ];

    return (
        <aside className="fixed top-0 left-0 w-20 h-full bg-orange-500 p-5 shadow-md">
            <ul className="flex flex-col items-center">
                {icons.map((icon, index) => (
                    <li
                        key={icon.id}
                        className={`mb-2 ${index === 0 ? "mt-16" : "mt-8"}`}
                    >
                        <NavLink
                            to={icon.path}
                            className={({ isActive }) =>
                                `flex items-center justify-center w-14 h-14 rounded-lg transition ${isActive ? "bg-orange-400 shadow-lg" : "hover:bg-orange-600"}`
                            }
                        >
                            <img
                                src={icon.white}
                                alt={icon.id}
                                className="h-10 w-10"
                            />
                        </NavLink>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const excludeRoutes = ["/login"];

    if (excludeRoutes.includes(location.pathname)) {
        return <>{children}</>;
    }

    return (
        <>
            <div className="flex flex-col h-full bg-white bg-scroll">
                <SideBarLayout />
            </div>

            <div className="h-full bg-white bg-scroll">
                <main className="flex-grow ml-10">
                    {children}
                </main>
            </div>
        </>
    );
};

export default Layout;