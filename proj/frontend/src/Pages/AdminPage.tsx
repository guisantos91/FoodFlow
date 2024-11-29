import Layout from '../components/Layout';
import AdminTable from '../components/Statistics/AdminTable';
import userIcon from '../assets/images/icons/user.png';
import SearchSVG from '../assets/images/icons/search.svg';

const AdminPage = () => {
    return (
        <Layout>
            <div className="bg-white min-h-screen py-10 px-20">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-orange-500">Hello Alice Martins</h1>
                        <p className="text-black text-xl">Welcome Back</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center justify-center w-8 h-8 border-2 border-orange-500 rounded-full">
                            <img src={userIcon} alt="User Icon" className="w-4 h-4" />
                        </div>
                        <span className="text-black font-medium">Alice Martins</span>
                    </div>
                </div>

                <div className="relative mb-6 flex items-center justify-between mx-40 mt-10">
                    <div className="flex items-center space-x-4 w-1/2">
                        <div className="relative flex-grow">
                            <input
                                type="text"
                                placeholder="Search Managers"
                                className="p-2 pl-10 border-4 border-orange-500 rounded-xl w-full bg-gray-100 text-black placeholder-black"
                            />
                            <img
                                src={SearchSVG}
                                alt="Search"
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
                            />
                        </div>
                        <button className="text-orange-500 font-medium hover:underline text-xl">
                            See All
                        </button>
                    </div>

                    <div>
                        <button className="bg-orange-500 text-white text-lg px-10 py-2 rounded-lg shadow-md hover:bg-orange-600 transition-all">
                            See Requests
                        </button>
                    </div>
                </div>

                <div className="flex justify-center items-center">
                    <AdminTable />
                </div>
            </div>
        </Layout>
    );
};

export default AdminPage;
