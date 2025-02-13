import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar.jsx";

export default function PracticeSession() {
    const [sessions, setSessions] = useState([]);
    const [selectedInstrument, setSelectedInstrument] = useState("Guitar");

    useEffect(() => {
        // Fetch available practice sessions from an API or local storage
        const fetchSessions = async () => {
            try {
                const response = await fetch("/api/practice-sessions"); // Replace with your API endpoint
                const data = await response.json();
                setSessions(data);
            } catch (error) {
                console.error("Error fetching practice sessions:", error);
            }
        };

        fetchSessions();
    }, []);

    // Filter sessions based on selected instrument
    const filteredSessions = sessions.filter((session) => session.instrument === selectedInstrument);

    return (
        <div className="h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex">
            {/* Sidebar */}
            <Sidebar/>

            {/* Main content area with centered box */}
            <div className="flex justify-center items-center w-full">
                <div className="p-6 bg-white rounded-lg shadow-md w-[65%] ml-[-5%] h-[90vh] flex flex-col">
                    <h2 className="text-2xl font-bold mb-4">Practice Sessions for {selectedInstrument}</h2>

                    {/* Instrument Selector */}
                    <div className="flex justify-start space-x-8 mb-6">
                        {["Guitar", "Piano", "Ukulele"].map((instrument) => (
                            <span
                                key={instrument}
                                onClick={() => setSelectedInstrument(instrument)}
                                className={`${
                                    selectedInstrument === instrument
                                        ? "text-blue-500 underline font-semibold"
                                        : "text-gray-700 cursor-pointer"
                                } hover:text-blue-600`}
                            >
                                {instrument}
                            </span>
                        ))}
                    </div>

                    {/* Sessions List */}
                    <div className="overflow-y-auto flex-grow p-2 space-y-4">
                        {filteredSessions.length === 0 ? (
                            <p className="text-center text-gray-500">No practice sessions available for this
                                instrument.</p>
                        ) : (
                            filteredSessions.map((session) => (
                                <div
                                    key={session.id}
                                    className="p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200"
                                >
                                    <h3 className="text-xl font-semibold">{session.title}</h3>
                                    <p className="text-sm text-gray-600">{session.description}</p>
                                    <div className="mt-2">
                                        <span className="text-sm font-medium">Duration:</span>
                                        <span className="text-sm text-gray-500"> {session.duration} minutes</span>
                                    </div>
                                    <div className="mt-2">
                                        <span className="text-sm font-medium">Day:</span>
                                        <span className="text-sm text-gray-500"> {session.day}</span>
                                    </div>
                                    <div className="mt-2">
                                        <span className="text-sm font-medium">Instructions:</span>
                                        <p className="text-sm text-gray-500">{session.instructions.slice(0, 100)}...</p>
                                    </div>

                                    {/* View/Download button for file */}
                                    {session.file && (
                                        <a
                                            href={session.file}
                                            download
                                            className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                        >
                                            Download File
                                        </a>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
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
