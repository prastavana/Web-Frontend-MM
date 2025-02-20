import React, { useState } from "react";
import AdminSidebar from "../../components/adminSidebar.jsx";
import axios from "axios";

export default function AddPracticeSession() {
    const [session, setSession] = useState({
        instrument: "Guitar",
        day: "Day 1",
        title: "",
        description: "",
        duration: "",
        instructions: "",
        mediaUrl: "", // For YouTube URL
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSession({ ...session, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!session.title || !session.description || !session.duration || !session.instructions) {
            setError("Please fill in all required fields.");
            return;
        }
        if (session.duration <= 0) {
            setError("Duration must be greater than 0.");
            return;
        }

        setLoading(true);
        setError("");

        const formData = {
            instrument: session.instrument,
            day: session.day,
            title: session.title,
            description: session.description,
            duration: session.duration,
            instructions: session.instructions,
            mediaUrl: session.mediaUrl, // Send YouTube URL
        };



        try {
            const response = await axios.post("http://localhost:3000/api/sessions/", formData);
            console.log('Response from server:', response);

            if (response.status === 201) {
                setSuccess(`Practice session for ${session.instrument} - ${session.day} added successfully!`);
                const formData = {
                    instrument: session.instrument,
                    day: session.day,
                    title: session.title,
                    description: session.description,
                    duration: session.duration,
                    instructions: session.instructions,
                    mediaUrl: session.mediaUrl, // Send YouTube URL
                };
                setSession({ // Reset the form after success
                    instrument: "Guitar",
                    day: "Day 1",
                    title: "",
                    description: "",
                    duration: "",
                    instructions: "",
                    mediaUrl: "",
                });
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            console.error("Error occurred during submission:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex">
            <AdminSidebar />
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

                            {/* Select Day */}
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
                                    min="1"
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

                            {/* Media URL (YouTube URL) */}
                            <div>
                                <label className="block font-medium">Enter YouTube URL</label>
                                <input
                                    type="url"
                                    name="mediaUrl"
                                    value={session.mediaUrl}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Paste YouTube URL here"
                                />
                            </div>

                            {/* Error or Success Message */}
                            {error && <p className="text-red-500">{error}</p>}
                            {success && (
                                <div className="text-green-500">
                                    <p>{success}</p>
                                    {/* Conditionally render the mediaUrl if it's available */}
                                    {session.mediaUrl && session.mediaUrl.includes("youtube.com") && (
                                        <div>
                                            <h3>Video Preview:</h3>
                                            <iframe
                                                src={session.mediaUrl.replace("watch?v=", "embed/")}
                                                frameBorder="0"
                                                width="500"
                                                height="300"
                                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                title="Video Preview"
                                            ></iframe>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
                                disabled={loading}
                            >
                                {loading ? "Submitting..." : "Add Practice Session"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
