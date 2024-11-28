import Layout from '../components/Layout';
import AdminTable from '../components/Statistics/AdminTable';

const AdminPage = () => {
    return (
        <Layout>
            <div className='flex justify-center items-center h-screen'>
                <AdminTable />
            </div>
        </Layout>
    );
};

export default AdminPage;