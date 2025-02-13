import React, { useState } from "react";
import AdminSidebar from "../../components/adminSidebar.jsx";

export default function AddPracticeSession() {
    const [session, setSession] = useState({
        instrument: "Guitar", // Default to Guitar
        day: "Day 1", // Default to Day 1
        title: "",
        description: "",
        duration: "",
        instructions: "",
        file: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSession({ ...session, [name]: value });
    };

    const handleFileChange = (e) => {
        setSession({ ...session, file: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Practice Session Data:", session);
        alert(`Practice session for ${session.instrument} - ${session.day} added successfully!`);
        // Here you can add API call to save session in the database
    };

    return (
        <div className="h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main content area with centered box */}
            <div className="flex justify-center items-center w-full">
                <div className="p-6 bg-white rounded-lg shadow-md w-[65%] ml-[-5%] h-[90vh] flex flex-col">
                    <h2 className="text-2xl font-bold mb-4">Add a New Practice Session</h2>

                    <div className="overflow-y-auto flex-grow p-2">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Select Instrument */}
                            <div>
                                <label className="block font-medium">Select Instrument</label>
                                <select
                                    name="instrument"
                                    value={session.instrument}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="Guitar">Guitar</option>
                                    <option value="Piano">Piano</option>
                                    <option value="Ukulele">Ukulele</option>
                                </select>
                            </div>

                            {/* Select Day (Day 1 to Day 7) */}
                            <div>
                                <label className="block font-medium">Select Practice Day</label>
                                <select
                                    name="day"
                                    value={session.day}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="Day 1">Day 1</option>
                                    <option value="Day 2">Day 2</option>
                                    <option value="Day 3">Day 3</option>
                                    <option value="Day 4">Day 4</option>
                                    <option value="Day 5">Day 5</option>
                                    <option value="Day 6">Day 6</option>
                                    <option value="Day 7">Day 7</option>
                                </select>
                            </div>

                            {/* Session Title */}
                            <div>
                                <label className="block font-medium">Session Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={session.title}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                    required
                                />
                            </div>

                            {/* Session Description */}
                            <div>
                                <label className="block font-medium">Description</label>
                                <textarea
                                    name="description"
                                    value={session.description}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                    rows="3"
                                    required
                                ></textarea>
                            </div>

                            {/* Duration */}
                            <div>
                                <label className="block font-medium">Duration (in minutes)</label>
                                <input
                                    type="number"
                                    name="duration"
                                    value={session.duration}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                    min="5"
                                    required
                                />
                            </div>

                            {/* Instructions */}
                            <div>
                                <label className="block font-medium">Instructions</label>
                                <textarea
                                    name="instructions"
                                    value={session.instructions}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                    rows="5"
                                    placeholder="Write detailed instructions for the session..."
                                    required
                                ></textarea>
                            </div>

                            {/* File Upload (For Backing Tracks, PDFs, etc.) */}
                            <div>
                                <label className="block font-medium">Upload File (Optional)</label>
                                <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded-md" />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
                            >
                                Add Practice Session
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
