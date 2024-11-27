import { Form } from '../components/Form';
import Layout from '../components/Layout';
import userIcon from "../assets/images/icons/user.png";

const UserForm = () => {

    return (
        <Layout>
            <div>
                <div className="flex items-center justify-between mt-8 ml-4 mr-24">
                    <div>
                        <h2 className="text-orange-300 text-lg mb-2 ml-8">Hello Admin</h2>
                        <h1 className="text-black text-2xl ml-8">Welcome Back</h1>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center justify-center w-8 h-8 border-2 border-orange-500 rounded-full">
                            <img src={userIcon} alt="User Icon" className="w-4 h-4" />
                        </div>
                        <h3 className="text-xl font-bold text-black">Admin</h3>
                    </div>
                </div>
                <Form />
            </div>
        </Layout>
    );
};

export default UserForm;