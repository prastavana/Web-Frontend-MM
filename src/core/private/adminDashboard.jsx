import React from 'react';
import AdminSidebar from "../../components/adminSidebar.jsx";

const AdminDashboard = () => {
    return (
        <div className="h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex">
            <AdminSidebar/>


            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="text-2xl font-semibold text-gray-700">
                    Hello, Admin! 👋

                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
