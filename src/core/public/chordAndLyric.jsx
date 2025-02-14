import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../components/sidebar.jsx"; // Ensure Sidebar component exists

export default function ChordAndLyricPage() {
    const [songs, setSongs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Pop");
    const [textSize, setTextSize] = useState(16);
    const [isAutoscrolling, setIsAutoscrolling] = useState(false);
    const [scrollSpeed, setScrollSpeed] = useState(1);
    const lyricsRef = useRef(null);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await fetch("/api/songs");
                const data = await response.json();
                setSongs(data);
            } catch (error) {
                console.error("Error fetching songs:", error);
            }
        };
        fetchSongs();
    }, []);

    const filteredSongs = songs.filter((song) => song.category === selectedCategory);

    useEffect(() => {
        if (isAutoscrolling && lyricsRef.current) {
            const scrollInterval = setInterval(() => {
                lyricsRef.current.scrollBy(0, scrollSpeed);
            }, 100);

            return () => clearInterval(scrollInterval);
        }
    }, [isAutoscrolling, scrollSpeed]);

    return (
        <div className="bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen flex items-start justify-center">
            <Sidebar />
            <main className="flex-1 p-6 flex justify-center items-start mt-0"> {/* Adjusted margin-top */}
                <div className="p-6 bg-white rounded-lg shadow-md w-[95%] mt-4 min-h-[550px] ml-32"> {/* Reduced margin-top */}
                    <h2 className="text-2xl font-bold mb-4">Available {selectedCategory} Songs</h2>
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
                        {filteredSongs.length === 0 ? (
                            <p className="text-center text-gray-500">No songs available in this category.</p>
                        ) : (
                            filteredSongs.map((song) => (
                                <div
                                    key={song.id}
                                    className="p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200"
                                >
                                    <h3 className="text-xl font-semibold">{song.songName}</h3>
                                    <p className="text-sm text-gray-600">{song.artist}</p>
                                    <div className="mt-2">
                                        <span className="text-sm font-medium">Category:</span>
                                        <span className="text-sm text-gray-500"> {song.category}</span>
                                    </div>
                                    <div className="mt-2">
                                        <span className="text-sm font-medium">Chords:</span>
                                        <p className="text-sm text-gray-500">{song.chords.slice(0, 50)}...</p>
                                    </div>
                                    <a
                                        href={`/song/${song.id}`}
                                        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    >
                                        View Chords & Lyrics
                                    </a>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Controls for Text Size and Autoscroll */}
                    <div className="p-2 bg-white rounded-lg shadow-md mt-24 flex items-center justify-between space-x-6"> {/* Reduced padding */}
                        {/* Text Size Controls */}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setTextSize((prevSize) => Math.max(prevSize - 1, 12))}
                                className="px-4 py-2 bg-gray-200 rounded-md"
                            >
                                -1
                            </button>
                            <p className="text-sm text-gray-700">Text Size: {textSize}px</p>
                            <button
                                onClick={() => setTextSize((prevSize) => Math.min(prevSize + 1, 36))}
                                className="px-4 py-2 bg-gray-200 rounded-md"
                            >
                                +1
                            </button>
                        </div>

                        {/* Autoscroll Controls */}
                        <button
                            onClick={() => setIsAutoscrolling(!isAutoscrolling)}
                            className={`px-4 py-2 rounded-md ${isAutoscrolling ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}
                        >
                            {isAutoscrolling ? "Stop Autoscroll" : "Start Autoscroll"}
                        </button>

                        {/* Scroll Speed Dial */}
                        <div className="flex items-center space-x-2">
                            <p className="text-sm text-gray-700">Scroll Speed:</p>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={scrollSpeed}
                                onChange={(e) => setScrollSpeed(Number(e.target.value))}
                                className="w-24"
                            />
                            <span>{scrollSpeed}</span>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar with Profile Icon */}
                <aside className="w-36 bg-white bg-opacity-10 backdrop-blur-lg p-2 flex flex-col items-center">
                    <img
                        src="src/assets/images/nezuko.jpg"
                        alt="Profile"
                        className="w-16 h-16 rounded-full border border-gray-300 cursor-pointer mt-4"
                    />
                </aside>
            </main>
        </div>
    );
}
