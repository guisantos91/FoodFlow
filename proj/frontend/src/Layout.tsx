import React from "react";
import "./index.css";
import "./output.css";


const SideBarLayout = () => {
    return (
        <aside className="fixed top-0 left-0 w-64 h-full bg-white p-4 shadow-md">
            <h2 className="text-lg text-red-600 font-bold mb-4">Menu</h2>
            <ul>
                <li className="mb-2 hover:text-gray-300">Item 1</li>
                <li className="mb-2 hover:text-gray-300">Item 2</li>
                <li className="mb-2 hover:text-gray-300">Item 3</li>
            </ul>
        </aside>
    );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="flex-1">
                <SideBarLayout />
            </div>

            <div className="ml-64">
                <main className="flex-grow p-4 bg-gray-100">
                    {children}
                </main>
                <footer className="bg-gray-800 text-white p-4 text-center">
                    &copy; 2024 Meu Site. Todos os direitos reservados.
                </footer>
            </div>
        </>

    );
};

export default Layout;
