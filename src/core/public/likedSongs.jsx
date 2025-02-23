import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar.jsx";
import { FaHeart } from "react-icons/fa";

export default function LikedSongs() {
    const [likedSongs, setLikedSongs] = useState([]);
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

        const fetchLikedSongs = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/favorites/getfav", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch liked songs");
                }

                const data = await response.json();
                setLikedSongs(data.songIds); // Ensure songIds contains populated song data
            } catch (error) {
                console.error("Error fetching liked songs:", error);
            }
        };

        fetchUserProfile();
        fetchLikedSongs();
    }, []);

    return (
        <div className="bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen flex items-start justify-center">
            <Sidebar />
            <main className="flex-1 p-6 flex justify-center items-start mt-4">
                <div className="bg-white bg-opacity-60 backdrop-blur-lg rounded-3xl shadow-lg p-8 w-full max-w-7xl h-[85vh]">
                    <h2 className="text-2xl font-bold mb-4">Liked Songs</h2>
                    {likedSongs.length === 0 ? (
                        <p className="text-center text-gray-500">No liked songs available.</p>
                    ) : (
                        <div className="flex flex-wrap space-x-4">
                            {likedSongs.map((song) => (
                                <div
                                    key={song._id}
                                    className="p-4 w-32 rounded-lg shadow-md bg-gray-200 cursor-pointer hover:bg-gray-300 transition duration-200 relative"
                                    onClick={() => navigate(`/song/${song._id}`)} // Updated navigation URL
                                >
                                    <p className="text-center">{song.songName}</p>
                                    <span className="absolute top-2 right-2 text-red-500">
                                        <FaHeart />
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
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
