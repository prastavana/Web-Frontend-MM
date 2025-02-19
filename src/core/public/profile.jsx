import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Sidebar from "../../components/sidebar.jsx";

export default function Profile() {
    const navigate = useNavigate(); // Initialize navigate function

    return (
        <div className="h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 p-6 flex justify-center items-center">
                <div className="bg-white bg-opacity-60 backdrop-blur-lg rounded-3xl shadow-lg p-8 w-full max-w-3xl h-[70vh] flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold text-gray-800">Profile Page</h2>
                    <p className="mt-2 text-gray-600">Welcome to your profile!</p>

                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)} // Navigate back to the previous page
                        className="mt-6 py-2 px-4 rounded text-white bg-blue-500 hover:bg-blue-700 shadow-md"
                    >
                        Go Back
                    </button>
                </div>
            </main>
        </div>
    );
}
