import React, { useState } from "react";
import Sidebar from "./Sidebar"; // Adjust the path if needed

const AddChord = () => {
    const [songName, setSongName] = useState("");
    const [selectedInstrument, setSelectedInstrument] = useState("ukulele");
    const [chords, setChords] = useState({ ukulele: "", guitar: "", piano: "" });
    const [lyrics, setLyrics] = useState([{ line: "", chords: "" }]);
    const [bulkInput, setBulkInput] = useState("");

    // Handle bulk input parsing
    const handleBulkInput = () => {
        const lines = bulkInput.split("\n").map((line) => {
            const [lyric, chords] = line.split("|"); // Adjust the delimiter if needed
            return { line: lyric?.trim() || "", chords: chords?.trim() || "" };
        });
        setLyrics(lines);
    };

    // Handle file upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                const lines = content.split("\n").map((line) => {
                    const [lyric, chords] = line.split("|");
                    return { line: lyric?.trim() || "", chords: chords?.trim() || "" };
                });
                setLyrics(lines);
            };
            reader.readAsText(file);
        }
    };

    // Handle individual lyrics and chords updates
    const handleLyricsChange = (index, field, value) => {
        const updatedLyrics = [...lyrics];
        updatedLyrics[index][field] = value;
        setLyrics(updatedLyrics);
    };

    const handleInstrumentChange = (e) => {
        setSelectedInstrument(e.target.value);
    };

    const handleChordsChange = (e) => {
        setChords({ ...chords, [selectedInstrument]: e.target.value });
    };

    const addLine = () => {
        setLyrics([...lyrics, { line: "", chords: "" }]);
    };

    const removeLine = (index) => {
        const updatedLyrics = lyrics.filter((_, i) => i !== index);
        setLyrics(updatedLyrics);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Song Data:", {
            songName,
            chords,
            lyrics,
        });
        // Add backend submission logic here
    };

    return (
        <div
            className="flex min-h-screen"
            style={{
                background: "linear-gradient(to bottom right, #CCE6FF 35%, #E0D9FF, #D9D4E6, #BFBACD)",
            }}
        >
            <Sidebar />
            <main className="flex-1 p-6">
                <h1 className="text-3xl font-bold mb-6">Add Chord</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Song Name */}
                    <div>
                        <label htmlFor="songName" className="block text-gray-700 font-medium mb-2">
                            Song Title
                        </label>
                        <input
                            type="text"
                            id="songName"
                            value={songName}
                            onChange={(e) => setSongName(e.target.value)}
                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter song title"
                        />
                    </div>

                    {/* Dropdown for Instrument Selection */}
                    <div>
                        <label htmlFor="instrument" className="block text-gray-700 font-medium mb-2">
                            Select Instrument
                        </label>
                        <select
                            id="instrument"
                            value={selectedInstrument}
                            onChange={handleInstrumentChange}
                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="ukulele">Ukulele</option>
                            <option value="guitar">Guitar</option>
                            <option value="piano">Piano</option>
                        </select>
                    </div>

                    {/* Chords for Selected Instrument */}
                    <div>
                        <label htmlFor="chords" className="block text-gray-700 font-medium mb-2">
                            Chords for {selectedInstrument.charAt(0).toUpperCase() + selectedInstrument.slice(1)}
                        </label>
                        <textarea
                            id="chords"
                            value={chords[selectedInstrument]}
                            onChange={handleChordsChange}
                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={`Enter chords for ${selectedInstrument}`}
                        />
                    </div>

                    {/* Bulk Lyrics and Chords Input */}
                    <div>
                        <label htmlFor="bulkInput" className="block text-gray-700 font-medium mb-2">
                            Bulk Lyrics and Chords (e.g., "Lyric | Chord")
                        </label>
                        <textarea
                            id="bulkInput"
                            value={bulkInput}
                            onChange={(e) => setBulkInput(e.target.value)}
                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter lines in 'Lyric | Chord' format"
                        />
                        <button
                            type="button"
                            onClick={handleBulkInput}
                            className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            Parse Input
                        </button>
                    </div>

                    {/* Lyrics and Chords Lines */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Lyrics and Chords</h2>
                        {lyrics.map((item, index) => (
                            <div key={index} className="mb-4 p-4 bg-white shadow rounded-lg">
                                <div className="mb-2">
                                    <label className="block text-gray-700 font-medium">
                                        Lyric Line {index + 1}
                                    </label>
                                    <input
                                        type="text"
                                        value={item.line}
                                        onChange={(e) => handleLyricsChange(index, "line", e.target.value)}
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter lyric line"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Chords</label>
                                    <input
                                        type="text"
                                        value={item.chords}
                                        onChange={(e) => handleLyricsChange(index, "chords", e.target.value)}
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter chords for this line"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeLine(index)}
                                    className="mt-3 text-red-500 hover:underline"
                                >
                                    Remove Line
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addLine}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            Add Line
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Submit Song
                    </button>
                </form>
            </main>
        </div>
    );
};

export default AddChord;
