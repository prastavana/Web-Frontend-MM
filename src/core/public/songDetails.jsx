import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "../../components/sidebar.jsx";

const SongDetails = () => {
    const { songId } = useParams();
    const [song, setSong] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fontSize, setFontSize] = useState(16);
    const [autoScroll, setAutoScroll] = useState(false);
    const [scrollSpeed, setScrollSpeed] = useState(5);
    const lyricsRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Fetch song details
    useEffect(() => {
        const fetchSong = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/songs/${songId}`);
                console.log("Fetched Song Data:", response.data);
                setSong(response.data);
            } catch (error) {
                console.error("Error fetching song details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSong();
    }, [songId]);

    // Auto Scroll Effect
    useEffect(() => {
        let scrollInterval;
        if (autoScroll && lyricsRef.current) {
            scrollInterval = setInterval(() => {
                if (lyricsRef.current.scrollTop + lyricsRef.current.clientHeight < lyricsRef.current.scrollHeight) {
                    lyricsRef.current.scrollTop += scrollSpeed;
                } else {
                    setAutoScroll(false); // Stop scrolling at the end
                }
            }, 100);
        }
        return () => clearInterval(scrollInterval);
    }, [autoScroll, scrollSpeed]);

    // Scroll Progress Bar
    useEffect(() => {
        const handleScroll = () => {
            if (lyricsRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = lyricsRef.current;
                const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
                setScrollProgress(progress);
            }
        };
        if (lyricsRef.current) {
            lyricsRef.current.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (lyricsRef.current) {
                lyricsRef.current.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!song) return <div>Song not found.</div>;

    const renderLyrics = (lyrics) => (
        <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', fontSize: `${fontSize}px` }}>
            {lyrics}
        </pre>
    );

    return (
        <div className="h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex">
            <Sidebar />
            <div className="flex-1 flex flex-col justify-start items-start p-6">
                {/* Song Container */}
                <div className="bg-white p-8 rounded-2xl shadow-lg w-[87%] h-[640px] overflow-y-auto relative" ref={lyricsRef}>
                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 h-1 bg-blue-500" style={{ width: `${scrollProgress}%` }}></div>

                    <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-wider text-center">
                        Song - {song.songName}
                    </h1>
                    <p className="text-lg text-gray-700 mt-4"><strong>Instrument:</strong> {song.selectedInstrument}</p>

                    {/* Chord Diagrams */}
                    <h2 className="text-xl font-semibold mt-4">Chord Diagrams:</h2>
                    <div className="flex flex-wrap gap-4 mt-2">
                        {song.chordDiagrams && song.chordDiagrams.length > 0 ? (
                            song.chordDiagrams.map((chord, index) => (
                                <img
                                    key={index}
                                    src={`http://localhost:3000/${chord}`}
                                    alt={`Chord Diagram ${index + 1}`}
                                    className="w-24 h-auto rounded shadow-md"
                                    onError={(e) => { e.target.src = "/images/placeholder.png"; }}
                                />
                            ))
                        ) : (
                            <p className="text-gray-600">No chord diagrams available.</p>
                        )}
                    </div>

                    {/* Lyrics */}
                    <h2 className="text-xl font-semibold mt-4">Lyrics:</h2>
                    <div className="max-h-[800px] overflow-y-auto">
                        {song.lyrics && song.lyrics.length > 0 ? (
                            song.lyrics.map((lyric, index) => (
                                <div key={index} className="mt-2">
                                    <h3 className="text-lg font-semibold text-gray-800">{lyric.section}</h3>
                                    <div>
                                        {Array.isArray(lyric.parsedDocxFile) && lyric.parsedDocxFile.length > 0 ? (
                                            lyric.parsedDocxFile.map((doc, docIndex) => (
                                                <div key={docIndex} className="mt-1 bg-gray-100 p-4 rounded-lg">
                                                    {renderLyrics(doc.lyrics)}
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-600">No lyrics available.</p>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No lyrics available.</p>
                        )}
                    </div>
                </div>

                {/* Controls */}
                <div className="flex justify-between items-center mt-6 bg-white p-1 rounded-lg shadow-md ml-56 w-[50%]">
                    {/* Font Size Controls */}
                    <div className="flex items-center space-x-4 flex-1 justify-center">
                        <button onClick={() => setFontSize(fontSize + 1)} className="bg-gray-200 px-3 py-2 rounded-md">+1</button>
                        <span className="text-gray-700">{fontSize}px</span>
                        <button onClick={() => setFontSize(fontSize - 1)} className="bg-gray-200 px-3 py-2 rounded-md">-1</button>
                    </div>

                    {/* Auto Scroll Button */}
                    <div className="flex-1 flex justify-center">
                        <button
                            onClick={() => setAutoScroll(!autoScroll)}
                            className={`px-4 py-2 rounded-md text-white ${autoScroll ? "bg-red-500" : "bg-blue-400"}`}
                        >
                            {autoScroll ? "Stop Scroll" : "Auto Scroll"}
                        </button>
                    </div>

                    {/* Scroll Speed Control */}
                    <div className="flex items-center space-x-3 flex-1 justify-center">
                        <span className="text-gray-700">Speed:</span>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={scrollSpeed}
                            onChange={(e) => setScrollSpeed(Number(e.target.value))}
                            className="cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SongDetails;
