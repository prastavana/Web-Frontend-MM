import React, { useState } from "react";
import * as mammoth from "mammoth"; // Import Mammoth.js for DOCX parsing
import '@fortawesome/fontawesome-free/css/all.min.css';
import AdminSidebar from "../../components/adminSidebar.jsx";
import axios from 'axios'; // Assuming Axios is used for API calls

const AddChord = () => {
    const [songName, setSongName] = useState("");
    const [selectedInstrument, setSelectedInstrument] = useState("ukulele");
    const [lyrics, setLyrics] = useState([
        { section: "Verse 1", lyric: "This is a verse.", chord: "C", docxFile: null }
    ]);
    const [isOpen, setIsOpen] = useState(true);
    const [docxFiles, setDocxFiles] = useState([]); // Store multiple DOCX files
    const [chordDiagrams, setChordDiagrams] = useState([]);

    const handleInstrumentChange = (e) => {
        setSelectedInstrument(e.target.value);
    };

    const handleChordDiagramUpload = (e) => {
        const files = Array.from(e.target.files);
        setChordDiagrams((prevFiles) => [...prevFiles, ...files]);
    };

    const handleDocxUpload = (e, index) => {
        const files = Array.from(e.target.files); // Handling multiple file uploads

        if (files.length > 0) {
            const updatedDocxFiles = [...docxFiles];
            files.forEach((file, idx) => {
                updatedDocxFiles[index + idx] = file; // Update with new files
            });
            setDocxFiles(updatedDocxFiles);

            files.forEach((file) => {
                // Read DOCX content for each file
                const reader = new FileReader();
                reader.onload = () => {
                    const arrayBuffer = reader.result;
                    mammoth.extractRawText({ arrayBuffer })
                        .then((result) => {
                            const extractedText = result.value;
                            const lyricsLines = parseDocxText(extractedText);
                            updateLyricsWithDocx(index, lyricsLines, file);
                        })
                        .catch((err) => console.log("Error parsing DOCX:", err));
                };
                reader.readAsArrayBuffer(file);
            });
        }
    };

    const parseDocxText = (text) => {
        const lines = text.split("\n").filter(line => line.trim() !== "");
        const parsedLyrics = lines.map(line => {
            const parts = line.split(":");
            if (parts.length === 2) {
                const [section, rest] = parts;
                const [lyric, chord] = rest.split(" ");
                return { section, lyric, chord };
            }
            return { section: "Unknown", lyric: line, chord: "" };
        });
        return parsedLyrics;
    };

    const updateLyricsWithDocx = (index, parsedLyrics, file) => {
        const updatedLyrics = [...lyrics];
        updatedLyrics[index] = { ...updatedLyrics[index], ...parsedLyrics[0], docxFile: file.name };
        setLyrics(updatedLyrics);
    };

    const handleLyricsChange = (index, field, value) => {
        const updatedLyrics = [...lyrics];
        updatedLyrics[index][field] = value;
        setLyrics(updatedLyrics);
    };

    const addLine = () => {
        setLyrics([...lyrics, { section: "", lyric: "", chord: "", docxFile: null }]);
    };

    const removeLine = (index) => {
        setLyrics(lyrics.filter((_, i) => i !== index));
        setDocxFiles(docxFiles.filter((_, i) => i !== index));
    };

    const copyLine = (index) => {
        // Create a copy of the lyric line, ensuring the docxFile is not copied
        const newLine = {
            section: lyrics[index].section,  // Copy the section
            lyric: lyrics[index].lyric,      // Copy the lyric
            chord: lyrics[index].chord,      // Copy the chord
            docxFile: null                   // Reset docxFile to null
        };

        // Add the new line to the lyrics state
        setLyrics([...lyrics, newLine]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for song name
        if (!songName.trim()) {
            alert("Song title is required.");
            return;
        }

        const formData = new FormData();
        formData.append("songName", songName);
        formData.append("selectedInstrument", selectedInstrument);
        formData.append("lyrics", JSON.stringify(lyrics));

        chordDiagrams.forEach((file) => {
            formData.append("chordDiagrams", file);
        });

        docxFiles.forEach((file) => {
            if (file) formData.append("docxFiles", file);
        });

        try {
            const response = await axios.post("http://localhost:3000/api/songs/create", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 200 || response.status === 201) {
                alert("Chords Added Successfully!");
                // Reset form
                setSongName("");
                setLyrics([{ section: "Verse 1", lyric: "This is a verse.", chord: "C", docxFile: null }]);
                setChordDiagrams([]);
                setDocxFiles([]);
            }
        } catch (error) {
            console.error("Error submitting chord data:", error);
            alert("An error occurred while adding the chord.");
        }
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
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Song Title</label>
                            <input
                                type="text"
                                value={songName}
                                onChange={(e) => setSongName(e.target.value)}
                                className="w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter song title"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Select Instrument</label>
                            <select
                                value={selectedInstrument}
                                onChange={handleInstrumentChange}
                                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="ukulele">Ukulele</option>
                                <option value="guitar">Guitar</option>
                                <option value="piano">Piano</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Upload Chord Diagram(s)</label>
                            <input type="file" accept="image/*" multiple onChange={handleChordDiagramUpload} />
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-4">
                                Lyrics and Chords
                                <button onClick={toggleSection} className="ml-20 text-gray-600 hover:underline">
                                    <i className={`fa ${isOpen ? "fa-chevron-down" : "fa-chevron-up"}`}></i>
                                </button>
                            </h2>
                            {isOpen && lyrics.map((item, index) => (
                                <div key={index} className="mb-4 p-4 bg-white shadow rounded-lg">
                                    <input
                                        type="text"
                                        value={item.section}
                                        onChange={(e) => handleLyricsChange(index, "section", e.target.value)}
                                        className="w-full p-2 border rounded-lg"
                                        placeholder="Enter section name"
                                    />
                                    <input
                                        type="file"
                                        accept=".docx"
                                        multiple
                                        onChange={(e) => handleDocxUpload(e, index)}
                                    />
                                    {item.docxFile && <p className="text-gray-700">Uploaded: {item.docxFile}</p>}
                                    <button type="button" onClick={() => removeLine(index)}>Remove</button>
                                    <button type="button" onClick={() => copyLine(index)}>Copy</button>
                                </div>
                            ))}
                        </div>

                        <button type="submit" className="px-4 py-2 bg-blue-300 text-white rounded-lg">
                            Submit Chord
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AddChord;
