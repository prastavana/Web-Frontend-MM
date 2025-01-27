import React from 'react';

const AdminDashboard = () => {
    return (
        <div
            className="min-h-screen flex"
            style={{
                background: "linear-gradient(to bottom right, #CCE6FF 35%, #E0D9FF, #D9D4E6, #BFBACD)"
            }}
        >
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg rounded-lg ml-4 mt-6 mb-7">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-blue-600">Melody Mentor</h1>
                </div>
                <nav className="mt-8">
                    <ul>
                        <li className="flex items-center p-4 text-gray-700 hover:bg-blue-100">
                            <span className="material-icons-outlined">queue_music</span>
                            <span className="ml-4">Add Chord</span>
                        </li>
                        <li className="flex items-center p-4 text-gray-700 hover:bg-blue-100">
                            <span className="material-icons-outlined">library_books</span>
                            <span className="ml-4">Add Lesson</span>
                        </li>
                        <li className="flex items-center p-4 text-gray-700 hover:bg-blue-100">
                            <span className="material-icons-outlined">playlist_add_check</span>
                            <span className="ml-4">Add Practice Session</span>
                        </li>
                    </ul>
                </nav>
                <div className="absolute bottom-12 left-7">
                    <button className="flex items-center text-red-600 hover:text-red-800">
                        <span className="material-icons-outlined">logout</span>
                        <span className="ml-2">Logout</span>
                    </button>
                </div>
            </aside>

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
