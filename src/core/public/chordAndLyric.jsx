import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar.jsx";
import axios from "axios"; // Ensure axios is installed

export default function ChordAndLyric() {
    const [songs, setSongs] = useState([]);  // Store songs data
    const [selectedCategory, setSelectedCategory] = useState("Ukulele");
    const [fontSize, setFontSize] = useState(16);
    const [autoScroll, setAutoScroll] = useState(false);
    const [scrollSpeed, setScrollSpeed] = useState(2);
    const [selectedSong, setSelectedSong] = useState(null);  // Store the selected song for details view

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

    // Handle clicking on a song title
    const handleSongClick = (song) => {
        console.log(song);  // Debugging: check if the song data is correct
        setSelectedSong(song);  // Set the selected song to display its details
    };

    return (
        <div className="bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen flex items-start justify-center">
            <Sidebar />
            <main className="flex-1 p-6 flex flex-col items-start ml-4">
                <div className="p-6 bg-white rounded-lg shadow-md w-[87%] min-h-[640px] ml-4 mt-4">
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
                                    onClick={() => handleSongClick(song)} // Display song details when clicked
                                >
                                    <h3 className="text-xl font-semibold cursor-pointer">{song.songName}</h3> {/* Song title clickable */}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Display selected song details */}
                {selectedSong ? (
                    <div className="p-6 mt-6 bg-white rounded-lg shadow-md w-[87%] min-h-[640px] ml-4">
                        <h3 className="text-2xl font-semibold">{selectedSong.songName}</h3>
                        <p className="text-sm text-gray-600">Instrument: {selectedSong.selectedInstrument}</p>
                        <div className="mt-4">
                            <h4 className="font-semibold">Lyrics and Chords:</h4>
                            {selectedSong.lyrics.map((item, index) => (
                                <div key={index} className="mt-2">
                                    <p className="text-gray-700">
                                        <strong>{item.section}:</strong> {item.lyric} - <strong>{item.chord}</strong>
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Chord Diagrams */}
                        <div className="mt-4">
                            {selectedSong.chordDiagrams.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-semibold">Chord Diagrams:</h4>
                                    {selectedSong.chordDiagrams.map((imagePath, idx) => (
                                        <div key={idx}>
                                            <img
                                                src={`http://localhost:3000/${imagePath}`}
                                                alt={`Chord Diagram ${idx + 1}`}
                                                className="w-48 h-48 object-cover mt-2"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* DOCX File */}
                        {selectedSong.docxFile && (
                            <div className="mt-4">
                                <h4 className="font-semibold">DOCX File:</h4>
                                <a
                                    href={`http://localhost:3000/${selectedSong.docxFile}`}
                                    className="text-blue-500 underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Download DOCX File
                                </a>
                            </div>
                        )}
                    </div>
                ) : (
                    <p>No song selected</p>  // Fallback message if no song is selected
                )}

                {/* Controls Box */}
                <div className="flex justify-between items-center mt-6 bg-white p-1 rounded-lg shadow-md ml-64 w-[50%]">
                    {/* Font Size Control */}
                    <div className="flex items-center space-x-4 flex-1 justify-center">
                        <button onClick={() => setFontSize(fontSize + 1)} className="bg-gray-200 px-3 py-2 rounded-md">+1</button>
                        <span className="text-gray-700">{fontSize}px</span> {/* Display current font size */}
                        <button onClick={() => setFontSize(fontSize - 1)} className="bg-gray-200 px-3 py-2 rounded-md">-1</button>
                    </div>

                    {/* Auto Scroll Button */}
                    <div className="flex-1 flex justify-center">
                        <button
                            onClick={() => setAutoScroll(!autoScroll)}
                            className="px-4 py-2 rounded-md text-white"
                            style={{ backgroundColor: autoScroll ? "#ff5050" : "#87CEFA" }}
                        >
                            {autoScroll ? "Stop Scroll" : "Auto Scroll"}
                        </button>
                    </div>

                    {/* Speed Control */}
                    <div className="flex items-center space-x-3 flex-1 justify-center">
                        <span className="text-gray-700">Speed:</span>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={scrollSpeed}
                            onChange={(e) => setScrollSpeed(e.target.value)}
                            className="cursor-pointer"
                        />
                    </div>
                </div>

            </main>
        </div>
    );
}
