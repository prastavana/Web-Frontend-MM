import { useState } from "react";
import Sidebar from "./Sidebar"; // Adjust the path if needed
import * as mammoth from "mammoth"; // Import Mammoth.js for DOCX parsing

const AddChord = () => {
    const [songName, setSongName] = useState("");
    const [selectedInstrument, setSelectedInstrument] = useState("ukulele");
    const [lyrics, setLyrics] = useState([
        { section: "Verse 1", lyric: "This is a verse.", chord: "C" }
    ]);
    const [isOpen, setIsOpen] = useState(true); // Control collapsible section state
    const [docxFile, setDocxFile] = useState(null); // Handle docx file upload
    const [ setUploadedLyrics] = useState([]); // Store lyrics and chords extracted from docx

    // Handle instrument selection change
    const handleInstrumentChange = (e) => {
        setSelectedInstrument(e.target.value);
    };

    // Handle docx file upload and extract lyrics/chords from the file
    const handleDocxUpload = (e) => {
        const file = e.target.files[0];
        setDocxFile(file); // Set the selected docx file

        // Read and extract text from the DOCX file using Mammoth
        const reader = new FileReader();
        reader.onload = () => {
            const arrayBuffer = reader.result;
            mammoth.extractRawText({ arrayBuffer })
                .then((result) => {
                    const extractedText = result.value;
                    const lyricsLines = parseDocxText(extractedText);
                    setUploadedLyrics(lyricsLines); // Save extracted lyrics
                })
                .catch((err) => console.log(err));
        };
        reader.readAsArrayBuffer(file);
    };

    // Example of how to parse the DOCX text into lyric and chord lines
    const parseDocxText = (text) => {
        const lines = text.split("\n");
        const parsedLyrics = [];
        lines.forEach((line) => {
            // Assuming that the DOCX file has a pattern like "Verse 1: [lyric] [chord]"
            const parts = line.split(":");
            if (parts.length === 2) {
                const [section, rest] = parts;
                const [lyric, chord] = rest.split(" ");
                parsedLyrics.push({ section, lyric, chord });
            }
        });
        return parsedLyrics;
    };

    // Handle lyrics and chords updates
    const handleLyricsChange = (index, field, value) => {
        const updatedLyrics = [...lyrics];
        updatedLyrics[index][field] = value;
        setLyrics(updatedLyrics);
    };

    // Add new lyric and chord line
    const addLine = () => {
        setLyrics([
            ...lyrics,
            { section: "", lyric: "", chord: "" }
        ]);
    };

    // Remove lyric and chord line
    const removeLine = (index) => {
        const updatedLyrics = lyrics.filter((_, i) => i !== index);
        setLyrics(updatedLyrics);
    };

    // Copy an existing line
    const copyLine = (index) => {
        const newLine = { ...lyrics[index] };
        setLyrics([...lyrics, newLine]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Song Data:", {
            songName,
            lyrics,
            docxFile, // Include the docx file in the submission
        });
        // Add backend submission logic here
    };

    // Toggle collapsible section visibility
    const toggleSection = () => {
        setIsOpen(!isOpen);
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

                    {/* Instrument Selection */}
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

                    {/* Lyrics and Chords Lines */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">
                            Lyrics and Chords
                            <button
                                type="button"
                                onClick={toggleSection}
                                className="ml-4 text-blue-600 hover:underline"
                            >
                                {isOpen ? "Hide" : "Show"} Sections
                            </button>
                        </h2>

                        {isOpen && lyrics.map((item, index) => (
                            <div key={index} className="mb-4 p-4 bg-white shadow rounded-lg">
                                <div className="mb-2">
                                    <label className="block text-gray-700 font-medium">
                                        Section {index + 1} (e.g., Intro, Verse 1, Chorus)
                                    </label>
                                    <input
                                        type="text"
                                        value={item.section}
                                        onChange={(e) => handleLyricsChange(index, "section", e.target.value)}
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter section name (e.g., Verse 1)"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="docxFile">
                                        Upload Chords and Lyrics (DOCX)
                                    </label>
                                    <input
                                        type="file"
                                        id="docxFile"
                                        onChange={handleDocxUpload}
                                        className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mt-3 space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => removeLine(index)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Remove Line
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => copyLine(index)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Copy Line
                                    </button>
                                </div>
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

                    {/* Updated File Upload Section */}


                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Submit Chord
                    </button>
                </form>
            </main>
        </div>
    );
};

export default AddChord;
