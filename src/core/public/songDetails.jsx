import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SongDetails = () => {
    const { songId } = useParams();
    const [song, setSong] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSong = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/songs/${songId}`);
                setSong(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching song details:", error);
                setLoading(false);
            }
        };

        fetchSong();
    }, [songId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!song) {
        return <div>Song not found.</div>;
    }

    // ✅ Preserve exact format as stored in the backend
    const renderLyrics = (lyrics) => {
        return (
            <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                {lyrics}
            </pre>
        );
    };

    return (
        <div>
            {/* Highlight song name */}
            <h1 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#2c3e50',
                textTransform: 'uppercase',
                letterSpacing: '2px'
            }}>
                Song - {song.songName}
            </h1>

            {/* Space between instrument and chord diagrams */}
            <p style={{ marginBottom: '20px' }}><strong>Instrument:</strong> {song.selectedInstrument}</p>

            {/* Space between chord diagrams and lyrics */}
            <h2 style={{ marginTop: '20px' }}>Chord Diagrams:</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                {song.chordDiagrams && song.chordDiagrams.length > 0 ? (
                    song.chordDiagrams.map((chord, index) => (
                        <img
                            key={index}
                            src={`http://localhost:3000/${chord}`} // ✅ Add base URL
                            alt={`Chord Diagram ${index + 1}`}
                            style={{ maxWidth: "100px", height: "auto", margin: "5px" }} // Optional styling
                            onError={(e) => {
                                e.target.style.display = "none";
                            }} // Hide broken images
                        />
                    ))
                ) : (
                    <p>No chord diagrams available.</p>
                )}
            </div>

            {/* Space between lyrics heading and lyrics content */}
            <h2 style={{ marginTop: '20px' }}>Lyrics:</h2>
            {song.lyrics && song.lyrics.length > 0 ? (
                song.lyrics.map((lyric, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <h3>{lyric.section}</h3>
                        <div>
                            {lyric.parsedDocxFile && lyric.parsedDocxFile.length > 0 ? (
                                lyric.parsedDocxFile.map((doc, docIndex) => (
                                    <div key={docIndex}>
                                        {renderLyrics(doc.lyrics)}
                                    </div>
                                ))
                            ) : (
                                <p>No parsed lyrics available.</p>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p>No lyrics available.</p>
            )}
        </div>
    );
};

export default SongDetails;
