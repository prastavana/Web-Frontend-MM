import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar.jsx";

export default function Lesson() {
    const [quizzes, setQuizzes] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("Ukulele");

    useEffect(() => {
        // Fetch quizzes data from the API
        const fetchQuizzes = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/quiz/getquiz"); // Your API endpoint
                const data = await response.json();
                console.log("Fetched quizzes data:", data); // Log fetched data
                setQuizzes(data);
            } catch (error) {
                console.error("Error fetching quizzes:", error);
            }
        };

        fetchQuizzes();
    }, []);

    // Get unique days for the selected category
    const uniqueDays = [...new Set(quizzes
        .filter(quiz => quiz.instrument.toLowerCase() === selectedCategory.toLowerCase()) // Convert to lowercase for comparison
        .map(quiz => quiz.day)
    )];

    return (
        <div className="bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen flex items-start justify-center">
            <Sidebar />
            <main className="flex-1 p-6 flex justify-center items-start mt-4">
                <div className="p-6 bg-white rounded-lg shadow-md w-[90%] mt-8 min-h-[550px] ml-32">
                    <h2 className="text-2xl font-bold mb-4">Available {selectedCategory} Lessons</h2>

                    {/* Category Text Links */}
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

                    {/* Day Selection */}
                    <div className="flex justify-start space-x-8 mb-6">
                        {uniqueDays.length === 0 ? (
                            <p className="text-center text-gray-500">No days available for this category.</p>
                        ) : (
                            <div className="flex flex-wrap space-x-4">
                                {uniqueDays.map((day) => (
                                    <div
                                        key={day}
                                        onClick={() => setSelectedDay(day)}
                                        className={`p-4 w-32 bg-gray-200 rounded-lg shadow-md cursor-pointer hover:bg-gray-300 transition duration-200 ${
                                            selectedDay === day ? "bg-gray-300 font-semibold" : ""
                                        }`}
                                    >
                                        <p className="text-center">{day}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Quizzes List */}
                    <div className="space-y-4">
                        {selectedDay ? (
                            quizzes
                                .filter(quiz => quiz.day === selectedDay && quiz.instrument.toLowerCase() === selectedCategory.toLowerCase())
                                .map((quiz) => (
                                    <div key={quiz._id} className="p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200">
                                        <h3 className="text-xl font-semibold">{quiz.day} - Quizzes</h3>
                                        {quiz.quizzes.map((q, index) => (
                                            <div key={index} className="mt-2">
                                                <p className="font-medium">{q.question}</p>
                                                <p className="text-sm text-gray-500">{q.options.join(", ")}</p>
                                            </div>
                                        ))}
                                        <a
                                            href={`/quiz/${quiz._id}`}
                                            className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                        >
                                            View Quiz
                                        </a>
                                    </div>
                                ))
                        ) : null}
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
