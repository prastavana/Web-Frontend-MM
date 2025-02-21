import React, { useState, useEffect } from "react";
import Tuner from "../../components/tuner.js";
import Meter from "../../components/meter.jsx";
import Note from "../../components/note.jsx";
import Sidebar from "../../components/sidebar.jsx";

const instruments = {
    guitar: ["E (Low)", "A", "D", "G", "B", "E (High)"],
    ukulele: ["G", "C", "E", "A"],
};

const tuningFrequencies = {
    guitar: {
        "E (Low)": 82.41,
        A: 110.00,
        D: 146.83,
        G: 196.00,
        B: 246.94,
        "E (High)": 329.63,
    },
    ukulele: {
        G: 196.00,
        C: 261.63,
        E: 329.63,
        A: 440.00,
    },
};

const TunerComponent = () => {
    const [instrument, setInstrument] = useState("guitar");
    const [selectedString, setSelectedString] = useState(0);
    const [note, setNote] = useState({ name: "A", octave: 4, frequency: 440, cents: 0 });
    const [tuningComplete, setTuningComplete] = useState(false);

    const stringNotes = instruments[instrument];
    const currentStringNote = stringNotes[selectedString];

    useEffect(() => {
        const tuner = new Tuner();
        tuner.start(setNote);
    }, []);

    useEffect(() => {
        const correctFrequency = tuningFrequencies[instrument][currentStringNote];
        setTuningComplete(Math.abs(note.frequency - correctFrequency) <= 1);
    }, [note, currentStringNote, instrument]);

    const handleNextString = () => {
        if (selectedString < stringNotes.length - 1) {
            setSelectedString(selectedString + 1);
            setTuningComplete(false);
        } else {
            alert("Tuning complete for all strings!");
        }
    };

    return (
        <div className="h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex">
            <Sidebar />
            <div className="flex justify-center items-center w-[70%] mt-4">
                <div className="p-2 bg-white rounded-lg shadow-md min-h-[400px] w-full max-w-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Instrument Tuner</h2>
                    <div className="flex gap-2 mb-4 justify-center">
                        {Object.keys(instruments).map((inst) => (
                            <button
                                key={inst}
                                onClick={() => setInstrument(inst)}
                                className={`px-4 py-2 rounded-lg text-lg font-medium transition-all duration-300 shadow-md ${
                                    instrument === inst
                                        ? "bg-light-blue-300 text-white"
                                        : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                                }`}
                            >
                                {inst.charAt(0).toUpperCase() + inst.slice(1)}
                            </button>
                        ))}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2 text-center">Select String</h3>
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {stringNotes.map((stringNote, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedString(index)}
                                className={`px-4 py-2 rounded-lg text-lg font-medium transition-all duration-300 shadow-md ${
                                    selectedString === index
                                        ? "bg-purple-300 text-white"
                                        : "bg-gray-500 text-white hover:bg-gray-600"
                                }`}
                            >
                                {stringNote}
                            </button>
                        ))}
                    </div>
                    <Meter cents={note.cents} />
                    <Note name={note.name} octave={note.octave} />
                    <p className="text-xl text-gray-900 mt-2 font-semibold text-center">{note.frequency.toFixed(1)} Hz</p>
                    {tuningComplete && (
                        <div className="mt-4 text-center">
                            <p className="text-green-500 font-semibold text-lg">Tuning completed for this string!</p>
                            <button
                                onClick={handleNextString}
                                className="mt-2 px-4 py-2 rounded-lg text-lg font-medium bg-green-500 text-white hover:bg-green-600 transition-all duration-300 shadow-md"
                            >
                                Next String
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <aside className="w-24 bg-white bg-opacity-10 backdrop-blur-lg p-2 flex flex-col items-center">
                <img
                    src="/src/assets/images/nezuko.jpg"
                    alt="Profile"
                    className="w-14 h-14 rounded-full border border-gray-300 cursor-pointer mt-2"
                />
            </aside>
        </div>
    );
};

export default TunerComponent;
