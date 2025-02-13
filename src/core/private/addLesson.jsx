import React, { useState } from "react";
import AdminSidebar from "../../components/adminSidebar.jsx";

export default function AddLesson() {
    const [lesson, setLesson] = useState({
        title: "",
        description: "",
        level: "Beginner",
        content: "",
        file: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLesson({ ...lesson, [name]: value });
    };

    const handleFileChange = (e) => {
        setLesson({ ...lesson, file: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Lesson Data:", lesson);
        alert("Lesson added successfully!");
        // Here you can add API call to save lesson in the database
    };

    return (
        <div className="h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main content area with centered box */}
            <div className="flex justify-center items-center w-full">
                <div className="p-6 bg-white rounded-lg shadow-md w-[65%] ml-[-5%] h-[90vh] flex flex-col">
                    <h2 className="text-2xl font-bold mb-4">Add a New Lesson</h2>

                    <div className="overflow-y-auto flex-grow p-2">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Lesson Title */}
                            <div>
                                <label className="block font-medium">Lesson Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={lesson.title}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                    required
                                />
                            </div>

                            {/* Lesson Description */}
                            <div>
                                <label className="block font-medium">Description</label>
                                <textarea
                                    name="description"
                                    value={lesson.description}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                    rows="3"
                                    required
                                ></textarea>
                            </div>

                            {/* Difficulty Level */}
                            <div>
                                <label className="block font-medium">Difficulty Level</label>
                                <select
                                    name="level"
                                    value={lesson.level}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>

                            {/* Lesson Content */}
                            <div>
                                <label className="block font-medium">Lesson Content</label>
                                <textarea
                                    name="content"
                                    value={lesson.content}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                    rows="5"
                                    placeholder="Write lesson details here..."
                                    required
                                ></textarea>
                            </div>

                            {/* File Upload (For PDFs/Videos) */}
                            <div>
                                <label className="block font-medium">Upload File (PDF/Video)</label>
                                <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded-md" />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
                            >
                                Add Lesson
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
