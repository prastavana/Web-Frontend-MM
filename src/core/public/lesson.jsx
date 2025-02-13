import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar.jsx";

export default function Lesson() {
    const [lessons, setLessons] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Ukulele");

    useEffect(() => {
        // Fetch lessons data from an API or local storage
        const fetchLessons = async () => {
            try {
                const response = await fetch("/api/lessons"); // Replace with your API endpoint
                const data = await response.json();
                setLessons(data);
            } catch (error) {
                console.error("Error fetching lessons:", error);
            }
        };

        fetchLessons();
    }, []);

    // Filter lessons based on selected category
    const filteredLessons = lessons.filter((lesson) => lesson.category === selectedCategory);

    return (
        <div className="bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen flex items-start justify-center">
            <Sidebar />
            <main className="flex-1 p-6 flex justify-center items-start mt-4">
                <div className="p-6 bg-white rounded-lg shadow-md w-[90%] mt-8 min-h-[550px] ml-32"> {/* Increased margin to ml-32 */}
                    <h2 className="text-2xl font-bold mb-4">Available {selectedCategory} Lessons</h2>

                    {/* Category Text Links below the title, aligned to the left */}
                    <div className="flex justify-start space-x-8 mb-6">
                        {["Ukulele", "Guitar", "Piano"].map((category) => (
                            <span
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`${
                                    selectedCategory === category
                                        ? "text-blue-500 underline font-semibold"
                                        : "text-gray-700 cursor-pointer"
                                } hover:text-blue-600`}
                            >
                                {category}
                            </span>
                        ))}
                    </div>

                    {/* Lessons List */}
                    <div className="space-y-4">
                        {filteredLessons.length === 0 ? (
                            <p className="text-center text-gray-500">No lessons available in this category.</p>
                        ) : (
                            filteredLessons.map((lesson) => (
                                <div
                                    key={lesson.id}
                                    className="p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200"
                                >
                                    <h3 className="text-xl font-semibold">{lesson.title}</h3>
                                    <p className="text-sm text-gray-600">{lesson.description}</p>
                                    <div className="mt-2">
                                        <span className="text-sm font-medium">Level:</span>
                                        <span className="text-sm text-gray-500"> {lesson.level}</span>
                                    </div>
                                    <div className="mt-2">
                                        <span className="text-sm font-medium">Content:</span>
                                        <p className="text-sm text-gray-500">{lesson.content.slice(0, 100)}...</p>
                                    </div>

                                    {/* View button (Optional) */}
                                    <a
                                        href={`/lesson/${lesson.id}`}
                                        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    >
                                        View Lesson
                                    </a>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                {/* Right Sidebar with Profile Icon */}
                <aside className="w-36 bg-white bg-opacity-10 backdrop-blur-lg p-2 flex flex-col items-center">
                    <img
                        src="src/assets/images/nezuko.jpg"
                        alt="Profile"
                        className="w-16 h-16 rounded-full border border-gray-300 cursor-pointer mt-4"
                    />
                </aside>
            </main>
        </div>
    );
}
