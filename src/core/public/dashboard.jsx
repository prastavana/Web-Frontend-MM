import React from 'react';
// Import the image
import untitledDesign from '../../assets/images/Untitled_design.png';

const Dashboard = () => {
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
                            <span className="material-icons-outlined">home</span>
                            <span className="ml-4">Home</span>
                        </li>
                        <li className="flex items-center p-4 text-gray-700 hover:bg-blue-100">
                            <span className="material-icons-outlined">menu_book</span>
                            <span className="ml-4">Lessons</span>
                        </li>
                        <li className="flex items-center p-4 text-gray-700 hover:bg-blue-100">
                            <span className="material-icons-outlined">music_note</span>
                            <span className="ml-4">Practice Sessions</span>
                        </li>
                        <li className="flex items-center p-4 text-gray-700 hover:bg-blue-100">
                            <span className="material-icons-outlined">queue_music</span>
                            <span className="ml-4">Chords & Lyrics</span>
                        </li>
                        <li className="flex items-center p-4 text-gray-700 hover:bg-blue-100">
                            <span className="material-icons-outlined">tune</span>
                            <span className="ml-4">Tuner</span>
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
                    Hello, Pasta! 👋
                </div>
                <p className="text-gray-500">Welcome back, explore the lessons</p>

                <div className="relative mt-6 h-64 w-full rounded-l-3xl overflow-hidden bg-gradient-to-r from-purple-400 to-purple-500 text-white shadow-lg">
                    {/* Background Image */}
                    <img
                        src={untitledDesign}
                        alt="Guitar and amplifier"
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    />

                    {/* Text Content */}
                    <div
                        className="absolute inset-0 flex flex-col justify-center items-start p-8 bg-black bg-opacity-50">
                        <h2 className="text-xl font-bold">Have not tried the lessons yet?</h2>
                        <p className="mt-2">
                            Dive into the world of music at free, learn different instruments at our ease.
                        </p>
                        <button
                            className="mt-4 py-2 px-4 rounded text-white bg-gradient-to-r from-[#99CCFF] via-[#C6B7FE] to-[#766E98] hover:from-purple-500 hover:to-purple-700 shadow-md">
                            Get Started
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
