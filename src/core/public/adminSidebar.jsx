import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const AdminSidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform logout logic (e.g., clear tokens, redirect to login)
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg rounded-lg ml-4 mt-6 mb-7">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-blue-600">Melody Mentor</h1>
                </div>
                <nav className="mt-8">
                    <ul>
                        <li>
                            <Link
                                to="/addChord"
                                className="flex items-center p-4 text-gray-700 hover:bg-blue-100"
                            >
                                <span className="material-icons-outlined">queue_music</span>
                                <span className="ml-4">Add Chord</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/addLesson"
                                className="flex items-center p-4 text-gray-700 hover:bg-blue-100"
                            >
                                <span className="material-icons-outlined">library_books</span>
                                <span className="ml-4">Add Lesson</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/addPracticeSession"
                                className="flex items-center p-4 text-gray-700 hover:bg-blue-100"
                            >
                                <span className="material-icons-outlined">playlist_add_check</span>
                                <span className="ml-4">Add Practice Session</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="absolute bottom-12 left-7">
                    <button
                        onClick={handleLogout}
                        className="flex items-center text-red-600 hover:text-red-800"
                    >
                        <span className="material-icons-outlined">logout</span>
                        <span className="ml-2">Logout</span>
                    </button>
                </div>
            </aside>
        </div>
    );
};

export default AdminSidebar;
