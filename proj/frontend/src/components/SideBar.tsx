const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4">
            <h3 className="text-xl font-bold mb-6">Sidebar</h3>
            <ul className="space-y-4">
                <li className="hover:text-gray-300 cursor-pointer">Menu Item 1</li>
                <li className="hover:text-gray-300 cursor-pointer">Menu Item 2</li>
                <li className="hover:text-gray-300 cursor-pointer">Menu Item 3</li>
                <li className="hover:text-gray-300 cursor-pointer">Menu Item 4</li>
            </ul>
        </div>
    );
};

export default Sidebar;
