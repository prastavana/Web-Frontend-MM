import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar.jsx";

export default function PracticeSession() {
    const [sessions, setSessions] = useState([]);
    const [selectedInstrument, setSelectedInstrument] = useState("Guitar");
    const [expandedDay, setExpandedDay] = useState(null); // Track which day's lessons are expanded

    useEffect(() => {
        // Fetch available practice sessions from API
        const fetchSessions = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/sessions"); // Your API endpoint
                const data = await response.json();
                setSessions(data);
            } catch (error) {
                console.error("Error fetching practice sessions:", error);
            }
        };

        fetchSessions();
    }, []);

    // Filter sessions by selected instrument
    const filteredSessions = sessions.filter((session) => session.instrument === selectedInstrument);

    // Group sessions by day
    const groupedSessions = filteredSessions.reduce((acc, session) => {
        if (!acc[session.day]) acc[session.day] = [];
        acc[session.day].push(session);
        return acc;
    }, {});

    // Convert YouTube URLs to embeddable format
    const getYouTubeEmbedUrl = (url) => {
        if (!url) return "";
        if (url.includes("youtu.be")) {
            return `https://www.youtube.com/embed/${url.split("youtu.be/")[1].split("?")[0]}`;
        }
        return url.replace("watch?v=", "embed/");
    };

    return (
        <div className="h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
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

                    {/* Day Widgets */}
                    <div className="overflow-y-auto flex-grow p-2 space-y-4">
                        {Object.keys(groupedSessions).length === 0 ? (
                            <p className="text-center text-gray-500">No practice sessions available.</p>
                        ) : (
                            Object.keys(groupedSessions).map((day) => (
                                <div key={day} className="bg-gray-100 rounded-lg shadow-md p-4">
                                    <div
                                        className="flex justify-between items-center cursor-pointer"
                                        onClick={() => setExpandedDay(expandedDay === day ? null : day)}
                                    >
                                        <h3 className="text-xl font-semibold">{day}</h3>
                                        <span className="text-gray-500">{expandedDay === day ? "▲" : "▼"}</span>
                                    </div>

                                    {/* Display lessons when clicked */}
                                    {expandedDay === day && (
                                        <div className="mt-4 space-y-4">
                                            {groupedSessions[day].map((session) => (
                                                <div key={session._id} className="p-4 bg-white rounded-lg shadow-md">
                                                    <h4 className="text-lg font-semibold">{session.title}</h4>
                                                    <p className="text-sm text-gray-600">{session.description}</p>
                                                    <div className="mt-2">
                                                        <span className="text-sm font-medium">Duration:</span>
                                                        <span className="text-sm text-gray-500"> {session.duration} minutes</span>
                                                    </div>
                                                    <div className="mt-2">
                                                        <span className="text-sm font-medium">Instructions:</span>
                                                        <p className="text-sm text-gray-500">{session.instructions}</p>
                                                    </div>

                                                    {/* Display YouTube Video or Download File */}
                                                    {session.file && (
                                                        session.file.includes("youtube.com") || session.file.includes("youtu.be") ? (
                                                            <div className="mt-4">
                                                                <h3 className="text-sm font-semibold">Watch Video:</h3>
                                                                <iframe
                                                                    src={getYouTubeEmbedUrl(session.file)}
                                                                    frameBorder="0"
                                                                    width="100%"
                                                                    height="250"
                                                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                                    allowFullScreen
                                                                    title="Practice Video"
                                                                ></iframe>
                                                            </div>
                                                        ) : (
                                                            <a
                                                                href={session.file}
                                                                download
                                                                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                                            >
                                                                Download File
                                                            </a>
                                                        )
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Profile Section */}
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
