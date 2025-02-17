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
                console.log("Fetched Song Data:", response.data); // ✅ Debugging API response
                setSong(response.data);
            } catch (error) {
                console.error("Error fetching song details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSong();
    }, [songId]);

    if (loading) return <div>Loading...</div>;
    if (!song) return <div>Song not found.</div>;

    // ✅ Function to render lyrics safely
    const renderLyrics = (lyrics) => (
        <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
            {lyrics}
        </pre>
    );

    return (
        <div style={{ padding: '20px' }}>
            {/* ✅ Highlighted Song Title */}
            <h1 style={{
                fontSize: '1.8rem',
                fontWeight: 'bold',
                color: '#2c3e50',
                textTransform: 'uppercase',
                letterSpacing: '2px'
            }}>
                Song - {song.songName}
            </h1>

            {/* ✅ Instrument Display */}
            <p style={{ marginBottom: '20px' }}>
                <strong>Instrument:</strong> {song.selectedInstrument}
            </p>

            {/* ✅ Chord Diagrams */}
            <h2 style={{ marginTop: '20px' }}>Chord Diagrams:</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                {song.chordDiagrams && song.chordDiagrams.length > 0 ? (
                    song.chordDiagrams.map((chord, index) => (
                        <img
                            key={index}
                            src={`http://localhost:3000/${chord}`} // ✅ Ensure valid URL
                            alt={`Chord Diagram ${index + 1}`}
                            style={{ maxWidth: "100px", height: "auto", margin: "5px" }}
                            onError={(e) => { e.target.style.display = "none"; }} // Hide broken images
                        />
                    ))
                ) : (
                    <p>No chord diagrams available.</p>
                )}
            </div>

            {/* ✅ Lyrics Section */}
            <h2 style={{ marginTop: '20px' }}>Lyrics:</h2>
            {song.lyrics && song.lyrics.length > 0 ? (
                song.lyrics.map((lyric, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <h3>{lyric.section}</h3>
                        <div>
                            {/* ✅ Check if parsedDocxFile is an array */}
                            {Array.isArray(lyric.parsedDocxFile) && lyric.parsedDocxFile.length > 0 ? (
                                lyric.parsedDocxFile.map((doc, docIndex) => (
                                    <div key={docIndex}>
                                        {renderLyrics(doc.lyrics)}
                                    </div>
                                ))
                            ) : (
                                <p>No lyrics available.</p>
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
