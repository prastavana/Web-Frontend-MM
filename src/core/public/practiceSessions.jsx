import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar.jsx";

export default function PracticeSession() {
    const [sessions, setSessions] = useState([]);
    const [selectedInstrument, setSelectedInstrument] = useState("Guitar");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/sessions"); // API call
                const data = await response.json();
                setSessions(data);
            } catch (error) {
                console.error("Error fetching practice sessions:", error);
            }
        };

        fetchSessions();
    }, []);

    // Filter sessions by selected instrument
    const filteredSessions = sessions.filter(session => session.instrument === selectedInstrument);

    // Extract unique days
    const uniqueDays = [...new Set(filteredSessions.map(session => session.day))];

    return (
        <div className="h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex">
            <Sidebar />

            <div className="flex justify-center items-center w-full">
                <div className="p-6 bg-white rounded-lg shadow-md w-[65%] ml-[-5%] h-[90vh] flex flex-col">
                    <h2 className="text-2xl font-bold mb-4">Practice Sessions for {selectedInstrument}</h2>

                    {/* Instrument Selector */}
                    <div className="flex justify-start space-x-8 mb-6">
                        {["Guitar", "Piano", "Ukulele"].map((instrument) => (
                            <span
                                key={instrument}
                                onClick={() => setSelectedInstrument(instrument)}
                                className={`cursor-pointer ${
                                    selectedInstrument === instrument
                                        ? "text-blue-500 underline font-semibold"
                                        : "text-gray-700 hover:text-blue-600"
                                }`}
                            >
                                {instrument}
                            </span>
                        ))}
                    </div>

                    {/* Display Days */}
                    <div className="overflow-y-auto flex-grow p-2 space-y-4">
                        {uniqueDays.length === 0 ? (
                            <p className="text-center text-gray-500">No practice sessions available for this instrument.</p>
                        ) : (
                            uniqueDays.map((day) => (
                                <div
                                    key={day}
                                    className="p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 cursor-pointer"
                                    onClick={() => navigate(`/session-details/${day}/${selectedInstrument}`)}
                                >
                                    <h3 className="text-xl font-semibold">{day}</h3>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
