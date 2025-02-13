import React from "react";
import Sidebar from "../../components/sidebar.jsx";

export default function Dashboard() {
    return (
        <div className="h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex">
            {/* Sidebar */}
           <Sidebar/>

            {/* Main Content */}
            <main className="flex-1 p-6 flex justify-center items-start mt-6">
                <div className="bg-white bg-opacity-60 backdrop-blur-lg rounded-3xl shadow-lg p-8 w-full max-w-7xl h-[85vh]">

                    {/* Header with Search */}
                    <header className="flex justify-between items-center mb-6">
                        <input
                            type="text"
                            placeholder="Search"
                            className="px-4 py-2 rounded-lg bg-gray-200 bg-opacity-70 w-1/3"
                        />
                        <span className="text-gray-700">Hello, Prasta</span>
                    </header>

                    {/* Promo Section */}
                    <div className="relative mt-8 h-52 w-full rounded-l-3xl overflow-hidden bg-gradient-to-r from-purple-400 to-purple-500 text-white shadow-lg">
                        <img
                            src="src/assets/images/untitled_design.png"
                            alt="Guitar and amplifier"
                            className="absolute top-0 left-0 w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 flex flex-col justify-center items-start p-8 bg-black bg-opacity-50">
                            <h2 className="text-xl font-bold">Have not tried the lessons yet?</h2>
                            <p className="mt-2">
                                Dive into the world of music for free, learn different instruments at your own pace.
                            </p>
                            <button className="mt-4 py-2 px-4 rounded text-white bg-gradient-to-r from-[#99CCFF] via-[#C6B7FE] to-[#766E98] hover:from-purple-500 hover:to-purple-700 shadow-md">
                                Get Started
                            </button>
                        </div>
                    </div>
                    {/* Flex Container for the two boxes */}
                    <div className="mt-12 flex gap-8">
                        {/* Play Along Song with Chords - Increased width */}
                        <div className="relative h-48 w-1/2 rounded-xl overflow-hidden bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-lg">
                            <img
                                src="src/assets/images/guitar2.jpg"
                                alt="Play along song"
                                className="absolute top-0 left-0 w-full h-full object-cover object-center"
                            />

                            <div className="absolute inset-0 flex flex-col justify-center items-start p-6 bg-black bg-opacity-50">
                                <h2 className="text-lg font-bold">Play along song with chords</h2>
                            </div>
                        </div>

                        {/* Tune Your Instruments - Increased width */}
                        <div className="relative h-48 w-1/2 rounded-xl overflow-hidden bg-gradient-to-r from-green-400 to-green-500 text-white shadow-lg">
                            <img
                                src="src/assets/images/pick.jpg"
                                alt="Tune your instrument"
                                className="absolute top-0 left-0 w-full h-full object-cover object-center"
                            />

                            <div className="absolute inset-0 flex flex-col justify-center items-start p-6 bg-black bg-opacity-50">
                                <h2 className="text-lg font-bold">Tune your instruments easily</h2>
                            </div>
                        </div>
                    </div>




                </div>
            </main>

            {/* Right Sidebar with Profile Icon */}
            <aside className="w-36 bg-white bg-opacity-10 backdrop-blur-lg p-2 flex flex-col items-center">
                <img
                    src="src/assets/images/nezuko.jpg"
                    alt="Profile"
                    className="w-16 h-16 rounded-full border border-gray-300 cursor-pointer mt-4"
                />
            </aside>
        </div>
    );
}
