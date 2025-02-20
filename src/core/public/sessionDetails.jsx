import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar.jsx";
import { FaCheckCircle } from 'react-icons/fa'; // Import tick icon

export default function SessionDetails() {
    const { day, instrument } = useParams();
    const [sessions, setSessions] = useState([]);
    const [completed, setCompleted] = useState(false);
    const [canMarkComplete, setCanMarkComplete] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/sessions`);
                const data = await response.json();

                // Log the fetched data
                console.log("Fetched sessions data:", data);

                // Filter sessions based on day and instrument
                const filtered = data.filter(session => session.day === day && session.instrument === instrument);

                // Log the filtered session data
                console.log("Filtered sessions:", filtered);

                setSessions(filtered);
                // Set the duration time for enabling the button
                if (filtered.length > 0) {
                    setTimeLeft(filtered[0].duration * 60); // Set time left in seconds

                    // Check local storage for completion status
                    const completedSessionKey = `session_${filtered[0]._id}_completed`;
                    const isCompleted = localStorage.getItem(completedSessionKey) === "true";
                    setCompleted(isCompleted); // Set completed state from local storage
                }
            } catch (error) {
                console.error("Error fetching sessions:", error);
            }
        };

        fetchSessions();
    }, [day, instrument]);

    useEffect(() => {
        // Timer to track duration
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        setCanMarkComplete(true); // Enable the button after the time is up
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [timeLeft]);

    // Function to convert YouTube URLs to embeddable format
    const getYouTubeEmbedUrl = (url) => {
        if (!url) return "";
        // Extract video ID from the URL
        const match = url.match(/(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=))([^&\n]{11})/);
        return match ? `https://www.youtube.com/embed/${match[1]}` : "";
    };

    // Function to mark the session as complete
    const markAsComplete = () => {
        if (!canMarkComplete) {
            alert("Finish the practice first."); // Message if button is clicked too early
            return;
        }

        setCompleted(true); // Mark the session as completed

        // Store completion status in local storage
        const completedSessionKey = `session_${sessions[0]._id}_completed`;
        localStorage.setItem(completedSessionKey, "true");
    };

    return (
        <div className="h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex">
            <Sidebar />

            <div className="flex justify-center items-center w-full">
                <div className="p-6 bg-white rounded-lg shadow-md w-[65%] ml-[-5%] h-[90vh] flex flex-col">
                    <h2 className="text-2xl font-bold mb-4">Sessions for {day} - {instrument}</h2>

                    <div className="overflow-y-auto flex-grow p-2 space-y-4">
                        {sessions.length === 0 ? (
                            <p className="text-center text-gray-500">No sessions available.</p>
                        ) : (
                            sessions.map((session) => (
                                <div key={session._id} className="p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200">
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
                                            <FaCheckCircle className="mr-2" />
                                            <span>Session Completed</span>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={markAsComplete}
                                            disabled={!canMarkComplete} // Disable button until duration is complete
                                            className={`mt-4 ${canMarkComplete ? 'bg-light-purple-500' : 'bg-gray-300 cursor-not-allowed'} text-white px-4 py-2 rounded-md hover:bg-purple-600`}
                                        >
                                            {canMarkComplete ? "Mark as Complete" : `Practice for ${timeLeft} seconds`}
                                        </button>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
