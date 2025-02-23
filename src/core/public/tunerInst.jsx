import React, { useState, useEffect } from "react";
import Tuner from "../../components/tuner.js"; // Ensure the path is correct
import Meter from "../../components/meter.jsx";
import Note from "../../components/note.jsx";
import Sidebar from "../../components/sidebar.jsx";
import {useNavigate} from "react-router-dom";

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
    const [tuningMessage, setTuningMessage] = useState("");
    const [messageVisible, setMessageVisible] = useState(false);
    const navigate = useNavigate();
    const stringNotes = instruments[instrument];
    const currentStringNote = stringNotes[selectedString];
    const [userProfile, setUserProfile] = useState(null); // State to hold user profile data

    useEffect(() => {
        const tuner = new Tuner();
        tuner.start(setNote);
        return () => {
            tuner.stop(); // Ensure to stop the tuner when the component unmounts
        };
    }, []);

    useEffect(() => {
        const correctFrequency = tuningFrequencies[instrument][currentStringNote];
        if (Math.abs(note.frequency - correctFrequency) <= 1) {
            setTuningComplete(true);
            setTuningMessage(`${currentStringNote} is in tune!`);
            setMessageVisible(true);

            // Keep the message visible for 10 seconds
            const timer = setTimeout(() => {
                setMessageVisible(false);
                setTuningMessage(""); // Optionally clear the message
                handleNextString(); // Automatically move to the next string
            }, 10000);

            return () => clearTimeout(timer); // Clean up the timer
        } else {
            setTuningComplete(false);
            setMessageVisible(false);
            setTuningMessage("");
        }
    }, [note, currentStringNote, instrument]);

    const handleNextString = () => {
        if (selectedString < stringNotes.length - 1) {
            setSelectedString(selectedString + 1);
            setTuningComplete(false);
            setTuningMessage(""); // Clear message when moving to the next string
            setMessageVisible(false); // Hide the message immediately when switching strings
        } else {
            alert("Tuning complete for all strings!");
        }
    };

    const handleSelectString = (index) => {
        setSelectedString(index);
        setTuningComplete(false); // Reset tuning for the selected string
        setTuningMessage(""); // Clear message for the new string
        setMessageVisible(false); // Hide the message when selecting a new string
    };
    const fetchUserProfile = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/auth/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch profile");
            }

            const data = await response.json();
            setUserProfile(data);
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    fetchUserProfile();

    return (
        <div className="h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex">
            <Sidebar/>
            <main className="flex-1 p-6 flex justify-center items-start mt-4">
                <div
                    className="bg-white bg-opacity-60 backdrop-blur-lg rounded-3xl shadow-lg p-8 w-full max-w-7xl h-[85vh]">
                    <h2 className="text-2xl font-bold text-gray-400 mb-4 text-center">Instrument Tuner</h2>
                    <div className="flex gap-2 mb-4 justify-center">
                        {Object.keys(instruments).map((inst) => (
                            <button
                                key={inst}
                                onClick={() => setInstrument(inst)}
                                className={`px-4 py-2 rounded-lg text-lg font-medium transition-all duration-300 shadow-md ${
                                    instrument === inst
                                        ? "bg-blue-200 text-black"
                                        : "bg-gray-300 text-gray-700 hover:bg-purple-400"
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
                                onClick={() => handleSelectString(index)}
                                className={`px-4 py-2 rounded-lg text-lg font-medium transition-all duration-300 shadow-md ${
                                    selectedString === index
                                        ? "bg-purple-300 text-white"
                                        : "bg-gray-400 text-white hover:bg-gray-600"
                                }`}
                            >
                                {stringNote}
                            </button>
                        ))}
                    </div>
                    <Meter cents={note.cents}/>
                    <Note name={note.name} octave={note.octave}/>
                    <p className="text-xl text-gray-900 mt-2 font-semibold text-center">{note.frequency.toFixed(1)} Hz</p>
                    {messageVisible && (
                        <div className="mt-4 text-center">
                            <p className="text-green-500 font-semibold text-lg">{tuningMessage}</p>
                            {tuningComplete && (
                                <button
                                    onClick={handleNextString}
                                    className="mt-2 px-4 py-2 rounded-lg text-lg font-medium bg-green-500 text-white hover:bg-green-600 transition-all duration-300 shadow-md"
                                >
                                    Next String
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </main>
            <aside className="w-36 bg-white bg-opacity-10 backdrop-blur-lg p-2 flex flex-col items-center">
                {userProfile && userProfile.profilePicture ? (
                    <img
                        src={`http://localhost:3000/${userProfile.profilePicture}`}
                        alt="Profile"
                        className="w-16 h-16 rounded-full border border-gray-300 cursor-pointer mt-4"
                        onClick={() => navigate("/profile")}
                    />
                ) : (
                    <img
                        src="src/assets/images/nezuko.jpg"
                        alt="Profile"
                        className="w-16 h-16 rounded-full border border-gray-300 cursor-pointer mt-4"
                        onClick={() => navigate("/profile")}
                    />
                )}
            </aside>
        </div>
    );
};

export default TunerComponent;
