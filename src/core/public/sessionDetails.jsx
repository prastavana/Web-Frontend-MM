import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import Sidebar from "../../components/sidebar.jsx";
import { FaCheckCircle } from 'react-icons/fa'; // Import tick icon

export default function SessionDetails() {
    const { day, instrument } = useParams();
    const [sessions, setSessions] = useState([]);
    const [completed, setCompleted] = useState(false);
    const [canMarkComplete, setCanMarkComplete] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [userProfile, setUserProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
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
        const fetchSessions = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/sessions`);
                const data = await response.json();

                console.log("Fetched sessions data:", data);

                const filtered = data.filter(session => session.day === day && session.instrument === instrument);

                console.log("Filtered sessions:", filtered);

                setSessions(filtered);
                if (filtered.length > 0) {
                    setTimeLeft(filtered[0].duration * 60); // Set time left in seconds

                    const completedSessionKey = `session_${filtered[0]._id}_completed`;
                    const isCompleted = localStorage.getItem(completedSessionKey) === "true";
                    setCompleted(isCompleted);
                }
            } catch (error) {
                console.error("Error fetching sessions:", error);
            }
        };

        fetchSessions();
    }, [day, instrument]);


    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        setCanMarkComplete(true);
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [timeLeft]);

    const getYouTubeEmbedUrl = (url) => {
        if (!url) return "";
        const match = url.match(/(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=))([^&\n]{11})/);
        return match ? `https://www.youtube.com/embed/${match[1]}` : "";
    };

    const markAsComplete = () => {
        if (!canMarkComplete) {
            alert("Finish the practice first.");
            return;
        }

        setCompleted(true);

        const completedSessionKey = `session_${sessions[0]._id}_completed`;
        localStorage.setItem(completedSessionKey, "true");
    };

    return (
        <div className="h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex">
            <Sidebar/>

            <main className="flex-1 p-12 flex flex-col items-start ml-4">
                <div
                    className="bg-white bg-opacity-60 backdrop-blur-lg rounded-3xl shadow-lg p-8 w-full max-w-7xl h-[85vh]">
                    <h2 className="text-2xl font-bold mb-4">Sessions for {day} - {instrument}</h2>

                    <div className="overflow-y-auto flex-grow p-2 space-y-4">
                        {sessions.length === 0 ? (
                            <p className="text-center text-gray-500">No sessions available.</p>
                        ) : (
                            sessions.map((session) => (
                                <div key={session._id}
                                     className="p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200">
                                    <h3 className="text-xl font-semibold">{session.title}</h3>
                                    <p className="text-sm text-gray-600">{session.description}</p>
                                    <div className="mt-2">
                                        <span className="text-sm font-medium">Duration:</span>
                                        <span className="text-sm text-gray-500"> {session.duration} minutes</span>
                                    </div>
                                    <div className="mt-2">
                                        <span className="text-sm font-medium">Instructions:</span>
                                        <p className="text-sm text-gray-500">{session.instructions}</p>
                                    </div>

                                    {/* YouTube Video Preview */}
                                    {session.file && (
                                        <div className="mt-4">
                                            <iframe
                                                src={getYouTubeEmbedUrl(session.file)}
                                                frameBorder="0"
                                                width="500"
                                                height="300"
                                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                title="Video Preview"
                                                className="mt-2 rounded-md"
                                            ></iframe>
                                        </div>
                                    )}

                                    {/* Mark as Complete Button */}
                                    {completed ? (
                                        <div className="mt-4 flex items-center text-green-600">
                                            <FaCheckCircle className="mr-2"/>
                                            <span>Session Completed</span>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={markAsComplete}
                                            disabled={!canMarkComplete}
                                            className={`mt-4 text-white px-4 py-2 rounded-md transition-all duration-500 ${
                                                canMarkComplete
                                                    ? 'bg-gradient-to-r from-[#99CCFF] via-[#C6B7FE] to-[#766E98] hover:opacity-90'
                                                    : 'bg-[#CDC2F5] cursor-not-allowed'
                                            }`}
                                        >
                                            {canMarkComplete ? "Mark as Complete" : `Practice for ${timeLeft} seconds`}
                                        </button>
                                    )}
                                </div>
                            ))
                        )}
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
                        src="/src/assets/images/nezuko.jpg"
                        alt="Profile"
                        className="w-16 h-16 rounded-full border border-gray-300 cursor-pointer mt-4"
                        onClick={() => navigate("/profile")}
                    />
                )}
            </aside>
        </div>
    );
}
