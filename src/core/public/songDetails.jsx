import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function SongDetails() {
    const { id } = useParams(); // Get the song ID from the URL
    const [song, setSong] = useState(null);

    useEffect(() => {
        const fetchSongDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/songs/${id}`);
                setSong(response.data.song); // Set the song data
            } catch (error) {
                console.error("Error fetching song details:", error);
            }
        };

        fetchSongDetails();
    }, [id]); // Fetch the song details whenever the ID changes

    if (!song) return <p>Loading song details...</p>;

    return (
        <div className="bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen flex items-start justify-center">
            <div className="flex-1 p-6 flex flex-col items-start ml-4">
                <div className="p-6 bg-white rounded-lg shadow-md w-[87%] min-h-[640px] ml-4 mt-4">
                    <h2 className="text-3xl font-bold mb-4">{song.songName}</h2>
                    <p className="text-sm text-gray-600">Instrument: {song.selectedInstrument}</p>
                    <div className="mt-4">
                        <h3 className="font-semibold">Lyrics and Chords:</h3>
                        {song.lyrics.map((item, index) => (
                            <div key={index} className="mt-2">
                                <p className="text-gray-700">
                                    <strong>{item.section}:</strong> {item.lyric} - <strong>{item.chord}</strong>
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Chord Diagrams */}
                    <div className="mt-4">
                        {song.chordDiagrams.length > 0 && (
                            <div>
                                <h4 className="text-sm font-semibold">Chord Diagrams:</h4>
                                {song.chordDiagrams.map((imagePath, idx) => (
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
                    {song.docxFile && (
                        <div className="mt-4">
                            <h4 className="font-semibold">DOCX File:</h4>
                            <a
                                href={`http://localhost:3000/${song.docxFile}`}
                                className="text-blue-500 underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Download DOCX File
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
