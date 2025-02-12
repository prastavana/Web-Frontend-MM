import React, { useState } from "react";
import * as mammoth from "mammoth"; // Import Mammoth.js for DOCX parsing
import '@fortawesome/fontawesome-free/css/all.min.css';
import AdminSidebar from "./adminSidebar.jsx";

const AddChord = () => {
    const [songName, setSongName] = useState("");
    const [selectedInstrument, setSelectedInstrument] = useState("ukulele");
    const [lyrics, setLyrics] = useState([
        { section: "Verse 1", lyric: "This is a verse.", chord: "C" }
    ]);
    const [isOpen, setIsOpen] = useState(true);
    const [docxFile, setDocxFile] = useState(null);
    // These states for uploaded lyrics are defined but not used in this example
    const [setUploadedLyrics] = useState([]);
    const [uploadedLyrics] = useState([]);
    const [chordDiagrams, setChordDiagrams] = useState([]);

    const handleInstrumentChange = (e) => {
        setSelectedInstrument(e.target.value);
    };

    const handleChordDiagramUpload = (e) => {
        const files = Array.from(e.target.files);
        setChordDiagrams((prevFiles) => [...prevFiles, ...files]);
    };

    const handleDocxUpload = (e) => {
        const file = e.target.files[0];
        setDocxFile(file);

        const reader = new FileReader();
        reader.onload = () => {
            const arrayBuffer = reader.result;
            mammoth.extractRawText({ arrayBuffer })
                .then((result) => {
                    const extractedText = result.value;
                    const lyricsLines = parseDocxText(extractedText);
                    setUploadedLyrics(lyricsLines);
                })
                .catch((err) => console.log(err));
        };
        reader.readAsArrayBuffer(file);
    };

    const parseDocxText = (text) => {
        const lines = text.split("\n");
        const parsedLyrics = [];
        lines.forEach((line) => {
            const parts = line.split(":");
            if (parts.length === 2) {
                const [section, rest] = parts;
                const [lyric, chord] = rest.split(" ");
                parsedLyrics.push({ section, lyric, chord });
            }
        });
        return parsedLyrics;
    };

    const handleLyricsChange = (index, field, value) => {
        const updatedLyrics = [...lyrics];
        updatedLyrics[index][field] = value;
        setLyrics(updatedLyrics);
    };

    const addLine = () => {
        setLyrics([...lyrics, { section: "", lyric: "", chord: "" }]);
    };

    const removeLine = (index) => {
        const updatedLyrics = lyrics.filter((_, i) => i !== index);
        setLyrics(updatedLyrics);
    };

    const copyLine = (index) => {
        const newLine = { ...lyrics[index] };
        // Add the new line at the beginning (above the copied line)
        setLyrics([newLine, ...lyrics]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Display success message
        alert("Chords Added");

        // Optionally, you can clear the form data or log the song data
        console.log("Song Data:", { songName, lyrics, docxFile, chordDiagrams });

        // Optionally, reset the form (if you want to clear the input fields after submission)
        setSongName("");
        setLyrics([{ section: "Verse 1", lyric: "This is a verse.", chord: "C" }]);
        setChordDiagrams([]);
        setDocxFile(null);
    };



    const toggleSection = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex">
            <AdminSidebar />
            <main className="flex-1 p-1 flex justify-center items-center">
                <div className="w-11/12 max-xl bg-white bg-opacity-65 backdrop-blur-lg p-8 rounded-lg shadow-lg h-full flex flex-col">
                    <h1 className="text-2xl font-bold mb-4">Add Chord</h1>
                    <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-6">
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
                                className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                className="w-full p-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="ukulele">Ukulele</option>
                                <option value="guitar">Guitar</option>
                                <option value="piano">Piano</option>
                            </select>
                        </div>

                        {/* Chord Diagram Upload */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Upload Chord Diagram(s) (Max 10)
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleChordDiagramUpload}
                                className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {chordDiagrams.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-gray-700">
                                        {chordDiagrams.length} file{chordDiagrams.length > 1 ? "s" : ""} selected:
                                    </p>
                                    <ul className="list-disc list-inside">
                                        {chordDiagrams.map((file, idx) => (
                                            <li key={idx} className="text-gray-700">{file.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Lyrics and Chords Section */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">
                                Lyrics and Chords
                                <button
                                    type="button"
                                    onClick={toggleSection}
                                    className="ml-20 text-gray-600 hover:underline"
                                >
                                    <i className={`fa ${isOpen ? "fa-chevron-down" : "fa-chevron-up"}`}></i>
                                </button>
                            </h2>

                            {/* Scrollable lyrics section */}
                            <div className="overflow-y-auto max-h-[400px]">
                                {isOpen &&
                                    lyrics.map((item, index) => (
                                        <div key={index} className="mb-4 p-4 bg-white shadow rounded-lg">
                                            <div className="mb-2">
                                                <label className="block text-gray-700 font-medium">
                                                    Section {index + 1} (e.g., Intro, Verse 1, Chorus)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.section}
                                                    onChange={(e) =>
                                                        handleLyricsChange(index, "section", e.target.value)
                                                    }
                                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Enter section name (e.g., Verse 1)"
                                                />
                                            </div>
                                            <div>
                                                <h2 className="block text-gray-700 font-medium">
                                                    Upload DOCX File with Lyrics and Chords
                                                </h2>

                                                <input
                                                    type="file"
                                                    accept=".docx"
                                                    onChange={handleDocxUpload}
                                                    className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />

                                                {/* Display Parsed Lyrics */}
                                                <div className="overflow-y-auto max-h-[400px] mt-4">
                                                    {uploadedLyrics.length > 0 &&
                                                        uploadedLyrics.map((item, index) => (
                                                            <div
                                                                key={index}
                                                                className="mb-4 p-4 bg-white shadow rounded-lg"
                                                            >
                                                                <div className="mb-2">
                                                                    <label className="block text-gray-700 font-medium">
                                                                        Lyrics
                                                                    </label>
                                                                    <p className="text-gray-700">{item.lyric}</p>
                                                                </div>
                                                                <div>
                                                                    <label className="block text-gray-700 font-medium">
                                                                        Chords
                                                                    </label>
                                                                    <p className="text-gray-700">
                                                                        {item.chord1} {item.chord2}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                </div>
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
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="w-fit px-4 py-2 bg-blue-300 text-white rounded-lg hover:bg-blue-700"
                            >
                                Submit Chord
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AddChord;
