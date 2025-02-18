import React, { useState } from "react";
import AdminSidebar from "../../components/adminSidebar.jsx";
import axios from "axios"; // Import axios

export default function AddPracticeSession() {
    const [session, setSession] = useState({
        instrument: "Guitar", // Default to Guitar
        day: "Day 1", // Default to Day 1
        title: "",
        description: "",
        duration: "",
        instructions: "",
        mediaUrl: "", // Renamed to mediaUrl for image/video URL
    });

    const [loading, setLoading] = useState(false); // State to handle form submission loading
    const [error, setError] = useState(""); // Error message state
    const [success, setSuccess] = useState(""); // Success message state

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSession({ ...session, [name]: value });
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Basic form validation
        if (!session.title || !session.description || !session.duration || !session.instructions) {
            setError("Please fill in all required fields.");
            return;
        }
        if (session.duration <= 0) {
            setError("Duration must be greater than 0.");
            return;
        }

        setLoading(true);
        setError(""); // Clear previous error messages

        const formData = {
            instrument: session.instrument,
            day: session.day,
            title: session.title,
            description: session.description,
            duration: session.duration,
            instructions: session.instructions,
            mediaUrl: session.mediaUrl, // Added mediaUrl to form data
        };

        try {
            // Send data as JSON via POST request
            const response = await axios.post("http://localhost:3000/api/sessions/", formData);

            // Log the response to the console
            console.log('Response from server:', response);

            // If the response is successful
            if (response.status === 200) {
                setSuccess(`Practice session for ${session.instrument} - ${session.day} added successfully!`);
                setSession({ // Reset the form after success
                    instrument: "Guitar",
                    day: "Day 1",
                    title: "",
                    description: "",
                    duration: "",
                    instructions: "",
                    mediaUrl: "", // Reset mediaUrl
                });
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            console.error("Error occurred during submission:", err); // Log error to console
        } finally {
            setLoading(false);
        }
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

                            {/* Media URL (Image/Video URL) */}
                            <div>
                                <label className="block font-medium">Enter Image/Video URL</label>
                                <input
                                    type="url"
                                    name="mediaUrl"
                                    value={session.mediaUrl}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Paste image or video URL here"
                                />
                            </div>

                            {/* Error or Success Message */}
                            {error && <p className="text-red-500">{error}</p>}
                            {success && (
                                <div className="text-green-500">
                                    <p>{success}</p>
                                    {/* Conditionally render the mediaUrl if it's available */}
                                    {session.mediaUrl && session.mediaUrl !== "" ? (
                                        <div>
                                            <p>Media URL: {session.mediaUrl}</p>
                                            {/* If the URL is an image/video, display it as well */}
                                            {session.mediaUrl.includes("http") && (
                                                <div>
                                                    <h3>Preview:</h3>
                                                    {session.mediaUrl.includes("youtube.com") || session.mediaUrl.includes("youtu.be") ? (
                                                        // If the media is a video, embed it
                                                        <iframe
                                                            src={session.mediaUrl}
                                                            frameBorder="0"
                                                            width="500"
                                                            height="300"
                                                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                            title="Video Preview"
                                                        ></iframe>
                                                    ) : (
                                                        // If it's an image, display the image
                                                        <img src={session.mediaUrl} alt="Practice Session Media" width="300" />
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ) : null}
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
