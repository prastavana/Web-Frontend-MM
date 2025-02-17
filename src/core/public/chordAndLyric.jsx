import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar.jsx";
import axios from "axios"; // Ensure axios is installed
import { Link } from "react-router-dom"; // For navigation to song details

export default function ChordAndLyric() {
    const [songs, setSongs] = useState([]); // Store songs data
    const [selectedCategory, setSelectedCategory] = useState("Ukulele");
    const [fontSize, setFontSize] = useState(16);
    const [autoScroll, setAutoScroll] = useState(false);
    const [scrollSpeed, setScrollSpeed] = useState(2);

    useEffect(() => {
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
            <Sidebar />
            <main className="flex-1 p-12 flex flex-col items-start ml-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg w-[87%] h-[640px] overflow-y-auto relative">
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
        </div>
    );
}
