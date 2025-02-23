import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar.jsx";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function ChordAndLyric() {
    const [songs, setSongs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Ukulele");
    const [userProfile, setUserProfile] = useState(null);
    const navigate = useNavigate();
    const [likedSongs, setLikedSongs] = useState(new Set());

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/songs/getsongs?instrument=${selectedCategory.toLowerCase()}`);
                setSongs(response.data.songs);
            } catch (error) {
                console.error("Error fetching songs:", error);
            }
        };

        fetchSongs();
    }, [selectedCategory]);

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
    }, []);

    // Function to handle liking a song
    const handleLikeSong = async (songId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/favorites/songs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ songId }),
            });

            if (!response.ok) {
                throw new Error("Failed to toggle favorite");
            }

            // Update the liked songs set based on the response
            if (likedSongs.has(songId)) {
                likedSongs.delete(songId);
            } else {
                likedSongs.add(songId);
            }
            setLikedSongs(new Set(likedSongs)); // Update state
        } catch (error) {
            console.error("Error liking song:", error);
        }
    };

    return (
        <div className="bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen flex items-start justify-center">
            <Sidebar />
            <main className="flex-1 p-12 flex flex-col items-start ml-4">
                <div className="bg-white bg-opacity-60 backdrop-blur-lg rounded-3xl shadow-lg p-8 w-full max-w-7xl h-[85vh]">
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
                                    key={song._id}
                                    className="p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 flex justify-between items-center"
                                >
                                    <Link to={`/song/${song._id}`} className="text-xl font-semibold cursor-pointer">
                                        {song.songName}
                                    </Link>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleLikeSong(song._id);
                                        }}
                                        className="text-red-500 ml-4"
                                    >
                                        {likedSongs.has(song._id) ? <FaHeart /> : <FaRegHeart />}
                                    </button>
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
