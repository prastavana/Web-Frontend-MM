import React from 'react';
import AdminSidebar from "./adminSidebar.jsx";

const AdminDashboard = () => {
    return (
        <div className="h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex">
            <AdminSidebar/>
                <div className="absolute bottom-12 left-7">
                    <button className="flex items-center text-red-600 hover:text-red-800">
                        <span className="material-icons-outlined">logout</span>
                        <span className="ml-2">Logout</span>
                    </button>
                </div>


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
