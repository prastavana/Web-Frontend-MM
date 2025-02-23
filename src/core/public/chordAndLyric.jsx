import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar.jsx";
import axios from "axios"; // Ensure axios is installed
import {Link, useNavigate} from "react-router-dom"; // For navigation to song details

export default function ChordAndLyric() {
    const [songs, setSongs] = useState([]); // Store songs data
    const [selectedCategory, setSelectedCategory] = useState("Ukulele");
    const [fontSize, setFontSize] = useState(16);
    const [autoScroll, setAutoScroll] = useState(false);
    const [scrollSpeed, setScrollSpeed] = useState(2);
    const [userProfile, setUserProfile] = useState(null); // State to hold user profile data
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
        // Fetch songs for the selected instrument category
        const fetchSongs = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/songs/getsongs?instrument=${selectedCategory.toLowerCase()}`);
                setSongs(response.data.songs); // Set the fetched songs in state
            } catch (error) {
                console.error("Error fetching songs:", error);
            }
        };

        fetchSongs(); // Fetch songs when the page loads or when category changes
    }, [selectedCategory]);


    useEffect(() => {
        let scrollInterval;
        if (autoScroll) {
            scrollInterval = setInterval(() => {
                window.scrollBy(0, scrollSpeed);
            }, 50);
        }
        return () => clearInterval(scrollInterval);
    }, [autoScroll, scrollSpeed]);

    return (
        <div className="bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen flex items-start justify-center">
            <Sidebar/>
            <main className="flex-1 p-12 flex flex-col items-start ml-4">
                <div
                    className="bg-white bg-opacity-60 backdrop-blur-lg rounded-3xl shadow-lg p-8 w-full max-w-7xl h-[85vh]">
                    <h2 className="text-2xl font-bold mb-4">Available {selectedCategory} Chords</h2>
                    <div className="flex justify-start space-x-8 mb-6">
                        {["Ukulele", "Guitar", "Piano"].map((category) => (
                            <span
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`${
                                    selectedCategory === category
                                        ? "text-blue-500 underline font-semibold"
                                        : "text-gray-700 cursor-pointer"
                                } hover:text-blue-600`}
                            >
                                {category}
                            </span>
                        ))}
                    </div>
                    <div className="space-y-4">
                        {songs.length === 0 ? (
                            <p className="text-center text-gray-500">No lessons available in this category.</p>
                        ) : (
                            songs.map((song) => (
                                <div
                                    key={song._id} // Use song._id for unique keys
                                    className="p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200"
                                >
                                    <Link to={`/song/${song._id}`} className="text-xl font-semibold cursor-pointer">
                                        {song.songName} {/* Make song title clickable */}
                                    </Link>
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
                        src="src/assets/images/nezuko.jpg"
                        alt="Profile"
                        className="w-16 h-16 rounded-full border border-gray-300 cursor-pointer mt-4"
                        onClick={() => navigate("/profile")}
                    />
                )}
            </aside>
        </div>
    );
}
