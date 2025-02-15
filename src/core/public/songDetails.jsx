import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SongDetails = () => {
    const { id } = useParams(); // Access song ID from the URL
    const [song, setSong] = useState(null);

    useEffect(() => {
        const fetchSong = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/songs/${id}`);
                console.log('Fetched Song Data:', response.data); // Log the full response
                setSong(response.data);
            } catch (error) {
                console.error('Error fetching song details:', error);
            }
        };

        fetchSong();
    }, [id]);

    if (!song) {
        return <div>Loading...</div>;
    }

    // Function to render the lyrics with chords properly aligned
    const renderFormattedLyrics = (lyricsArray) => {
        return lyricsArray.map((item, index) => {
            const chords = Array.isArray(item.chords) ? item.chords.join(' ') : '';  // Check if chords is an array
            const lyrics = item.lyrics || '';  // Get the lyrics for the current line

            // Render the line with chords and lyrics together
            return (
                <div key={index} style={{ marginBottom: '20px' }}>
                    <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                        {chords && lyrics ? `${chords} ${lyrics}` : chords || lyrics}
                    </pre>
                </div>
            );
        });
    };

    return (
        <div style={{ padding: '20px' }}>
            {/* Song Title */}
            <h1 style={{ fontSize: '2em', marginBottom: '10px' }}>Song: {song.songName}</h1>

            {/* Instrument */}
            <h2 style={{ fontSize: '1.5em', marginBottom: '20px' }}>Instrument: {song.selectedInstrument}</h2>

            {/* Chords and Chord Diagrams */}
            <div style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.3em', marginBottom: '10px' }}>Chords:</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                    {song.chordDiagrams && song.chordDiagrams.length > 0 ? (
                        song.chordDiagrams.map((diagram, index) => (
                            <div key={index} style={{ textAlign: 'center' }}>
                                {/* Display the chords */}
                                <pre>{Array.isArray(song.lyrics[index]?.chords) ? song.lyrics[index].chords.join(' ') : ''}</pre>

                                {/* Correct path to the image */}
                                <img
                                    src={`http://localhost:3000/uploads/${diagram}`} // Ensure the URL is correct
                                    alt={`Chord Diagram ${index + 1}`}
                                    style={{ width: '100px', height: 'auto' }}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No chord diagrams available.</p>
                    )}
                </div>
            </div>

            {/* Section 1: Lyrics and Parsed Content */}
            <div>
                <h3 style={{ fontSize: '1.5em', marginBottom: '10px' }}>Lyrics:</h3>
                {song.lyrics && song.lyrics.length > 0 ? (
                    renderFormattedLyrics(song.lyrics)
                ) : (
                    <p>No lyrics available.</p>
                )}
            </div>

            {/* DOCX Parsed Content */}
            <div>
                <h3 style={{ fontSize: '1.5em', marginTop: '30px' }}></h3>
                {song.docxText && song.docxText.length > 0 ? (
                    renderFormattedLyrics(song.docxText)
                ) : (
                    <p>No DOCX content available.</p>
                )}
            </div>
        </div>
    );
};

export default SongDetails;
