import React, { useState } from "react";
import Sidebar from "./adminSidebar.jsx";

const UserViewChord = () => {

    const [isOpen, setIsOpen] = useState(true);

    const toggleSection = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex">
            <main className="flex-1 p-1 flex justify-center items-center">
                <div className="w-11/12 max-xl bg-white bg-opacity-65 backdrop-blur-lg p-8 rounded-lg shadow-lg h-full flex flex-col">
                    <h1 className="text-2xl font-bold mb-4">{songName}</h1>

                    {/* Lyrics and Chords Section */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">
                            Lyrics and Chords
                            <button
                                type="button"
                                onClick={toggleSection}
                                className="ml-20 text-gray-600 hover:underline"
                            >
                                <i className={`fa ${isOpen ? "fa-chevron-down" : "fa-chevron-up"}`}></i>
                            </button>
                        </h2>

                        {/* Scrollable lyrics section */}
                        <div className="overflow-y-auto max-h-[400px]">
                            {isOpen &&
                                lyrics.map((item, index) => (
                                    <div key={index} className="mb-4 p-4 bg-white shadow rounded-lg">
                                        <div className="mb-2">
                                            <label className="block text-gray-700 font-medium">
                                                {item.section}
                                            </label>
                                            <p className="text-gray-700">{item.lyric}</p>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-medium">
                                                Chord
                                            </label>
                                            <p className="text-gray-700">{item.chord}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* Chord Diagrams */}
                    <div className="mt-4">
                        {item.chord && (
                            <div className="mt-4">
                                <p className="text-gray-700">Chord Diagram for {item.chord}:</p>
                                <img
                                    src={`path/to/${item.chord}-diagram.png`} // Example of rendering a chord diagram image
                                    alt={`${item.chord} chord diagram`}
                                    className="w-40 h-40 mx-auto mt-2"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserViewChord;
