import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar.jsx";
import { FaCheckCircle } from 'react-icons/fa'; // Import tick icon

export default function PracticeSession() {
    const [sessions, setSessions] = useState([]);
    const [selectedInstrument, setSelectedInstrument] = useState("Guitar");
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState(null); // State to hold user profile data

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
    const fetchUserProfile = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/auth/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch profile");
            }

            const data = await response.json();
            setUserProfile(data);
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    fetchUserProfile();
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
        <main className="h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex">
            <Sidebar/>

            <main className="flex-1 p-6 flex justify-center items-start mt-4">
                <div
                    className="bg-white bg-opacity-60 backdrop-blur-lg rounded-3xl shadow-lg p-8 w-full max-w-7xl h-[85vh]">
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
                            <p className="text-center text-gray-500">No practice sessions available for this
                                instrument.</p>
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
                                        {isCompleted && <FaCheckCircle
                                            className="text-green-600 ml-2"/>} {/* Show checkmark if completed */}
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
                                style={{width: `${completionPercentage}%`}}
                            ></div>
                        </div>
                        <p className="text-left text-sm font-medium mt-1">{Math.round(completionPercentage)}%
                            Completed</p>
                    </div>
                </div>
            </main>
            <aside className="w-36 bg-white bg-opacity-10 backdrop-blur-lg p-2 flex flex-col items-center">
                {userProfile && userProfile.profilePicture ? (
                    <img
                        src={`http://localhost:3000/${userProfile.profilePicture}`}
                        alt="Profile"
                        className="w-16 h-16 rounded-full border border-gray-300 cursor-pointer mt-4"
                        onClick={() => navigate("/profile")}
                    />
                ) : (
                    <img
                        src="src/assets/images/nezuko.jpg"
                        alt="Profile"
                        className="w-16 h-16 rounded-full border border-gray-300 cursor-pointer mt-4"
                        onClick={() => navigate("/profile")}
                    />
                )}
            </aside>
        </main>
    );
}
