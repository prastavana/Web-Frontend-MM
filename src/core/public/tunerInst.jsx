import React, { useState, useEffect } from "react";
import Tuner from "../../components/tuner.js";
import Meter from "../../components/meter.jsx";
import Note from "../../components/note.jsx";

const instruments = {
    guitar: ["E (Low)", "A", "D", "G", "B", "E (High)"], // Correct order for guitar strings
    ukulele: ["G", "C", "E", "A"],
};

const tuningFrequencies = {
    guitar: {
        "E (Low)": 82.41,  // E2 (Low E)
        A: 110.00,        // A2
        D: 146.83,        // D3
        G: 196.00,        // G3
        B: 246.94,        // B3
        "E (High)": 329.63, // E4 (High E)
    },
    ukulele: {
        G: 196.00, // G4
        C: 261.63, // C4
        E: 329.63, // E4
        A: 440.00, // A4
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
        if (Math.abs(note.frequency - correctFrequency) <= 1) {
            setTuningComplete(true);
        } else {
            setTuningComplete(false);
        }
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
        <div className="text-center p-6">
            <h2 className="text-2xl font-semibold mb-4">Select Instrument</h2>
            <div>
                <button
                    onClick={() => setInstrument("guitar")}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md mx-2"
                >
                    Guitar
                </button>
                <button
                    onClick={() => setInstrument("ukulele")}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md mx-2"
                >
                    Ukulele
                </button>
            </div>

            <h3 className="text-xl font-medium mt-6 mb-4">Select String</h3>
            <div>
                {stringNotes.map((stringNote, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedString(index)}
                        className={`py-2 px-4 rounded-md mx-2 mb-2 ${
                            selectedString === index ? "bg-orange-500" : "bg-gray-600"
                        } text-white`}
                    >
                        {stringNote} String
                    </button>
                ))}
            </div>

            <Meter cents={note.cents} />
            <Note name={note.name} octave={note.octave} />
            <p className="text-2xl text-gray-800 mt-4">{note.frequency.toFixed(1)} Hz</p>

            {tuningComplete && (
                <div className="mt-4">
                    <p className="text-green-500 font-semibold">Tuning completed for this string!</p>
                    <button
                        onClick={handleNextString}
                        className="bg-green-500 text-white py-2 px-4 rounded-md mt-2"
                    >
                        Next String
                    </button>
                </div>
            )}
        </div>
    );
};

export default TunerComponent;
