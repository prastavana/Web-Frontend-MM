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

    const [loading, setLoading] = useState(false); // State to handle form submission loading
    const [error, setError] = useState(""); // Error message state
    const [success, setSuccess] = useState(""); // Success message state

    // Allowed file types for upload
    const allowedFileTypes = ["image/png", "video/mp4", "application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    const maxFileSize = 10 * 1024 * 1024; // 10 MB file size limit

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSession({ ...session, [name]: value });
    };

    // Handle file upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type and size
            if (!allowedFileTypes.includes(file.type)) {
                setError("Invalid file type. Only .png, .mp4, .pdf, .docx are allowed.");
                return;
            }
            if (file.size > maxFileSize) {
                setError("File size exceeds the 10 MB limit.");
                return;
            }
            setSession({ ...session, file: file });
            setError(""); // Clear any previous error
        }
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
        try {
            // Simulating form submission
            console.log("Practice Session Data:", session);

            // Here you would make an API call to save the session in the database

            setSuccess(`Practice session for ${session.instrument} - ${session.day} added successfully!`);
            setSession({ // Reset the form after success
                instrument: "Guitar",
                day: "Day 1",
                title: "",
                description: "",
                duration: "",
                instructions: "",
                file: null,
            });
        } catch (err) {
            setError("An error occurred. Please try again.");
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

                            {/* File Upload (For Backing Tracks, PDFs, etc.) */}
                            <div>
                                <label className="block font-medium">Upload File (Optional)</label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="w-full p-2 border rounded-md"
                                    accept="image/png, video/mp4, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                />
                            </div>

                            {/* Error or Success Message */}
                            {error && <p className="text-red-500">{error}</p>}
                            {success && <p className="text-green-500">{success}</p>}

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
