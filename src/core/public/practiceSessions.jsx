import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar.jsx";
import { FaCheckCircle } from 'react-icons/fa'; // Import tick icon

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

    // Calculate completion percentage
    const totalDays = uniqueDays.length; // Total number of unique days
    const completedDays = uniqueDays.filter(day => {
        const completedSessionKey = `session_${sessions.find(session => session.day === day && session.instrument === selectedInstrument)._id}_completed`;
        return localStorage.getItem(completedSessionKey) === "true";
    }).length; // Count of completed days

    const completionPercentage = totalDays > 0 ? (completedDays / totalDays) * 100 : 0; // Calculate percentage

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
                            uniqueDays.map((day) => {
                                // Check local storage for completion status
                                const completedSessionKey = `session_${sessions.find(session => session.day === day && session.instrument === selectedInstrument)._id}_completed`;
                                const isCompleted = localStorage.getItem(completedSessionKey) === "true";

                                return (
                                    <div
                                        key={day}
                                        className="p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 cursor-pointer flex justify-between items-center"
                                        onClick={() => navigate(`/session-details/${day}/${selectedInstrument}`)}
                                    >
                                        <h3 className="text-xl font-semibold">{day}</h3>
                                        {isCompleted && <FaCheckCircle className="text-green-600 ml-2" />} {/* Show checkmark if completed */}
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                        <div className="w-1/3 h-2.5 bg-gray-300 rounded-full shadow-md">
                            <div
                                className="h-full bg-gradient-to-r from-[#99CCFF] via-[#C6B7FE] to-[#766E98] rounded-full"
                                style={{ width: `${completionPercentage}%` }}
                            ></div>
                        </div>
                        <p className="text-left text-sm font-medium mt-1">{Math.round(completionPercentage)}% Completed</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
