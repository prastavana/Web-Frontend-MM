import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Sidebar from "../../components/sidebar.jsx";
import { FaCheckCircle } from "react-icons/fa"; // Import the FaCheckCircle icon

export default function Lesson() {
    const [quizzes, setQuizzes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Ukulele");
    const [incorrectAnswers, setIncorrectAnswers] = useState([]); // Track incorrect answers
    const navigate = useNavigate(); // Initialize useNavigate
    const [userProfile, setUserProfile] = useState(null); // State to hold user profile data

    useEffect(() => {
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
    }, []);

    // Get unique days for the selected category
    const uniqueDays = [...new Set(quizzes
        .filter(quiz => quiz.instrument.toLowerCase() === selectedCategory.toLowerCase())
        .map(quiz => quiz.day)
    )];

    // Check completed days from localStorage
    const completedDays = JSON.parse(localStorage.getItem("completedDays")) || [];

    // Handle day click to navigate to lesson details page
    const handleDayClick = (day) => {
        navigate(`/lesson-details/${day}`); // Navigate to lesson details page with selected day
    };

    // Check if the selected answer is incorrect
    const isDayWrong = (day) => {
        return incorrectAnswers.includes(day);
    };

    return (
        <div className="bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen flex items-start justify-center">
            <Sidebar/>
            <main className="flex-1 p-6 flex justify-center items-start mt-4">
                <div
                    className="bg-white bg-opacity-60 backdrop-blur-lg rounded-3xl shadow-lg p-8 w-full max-w-7xl h-[85vh]">
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
                                        onClick={() => handleDayClick(day)} // Handle day click
                                        className={`p-4 w-32 rounded-lg shadow-md cursor-pointer hover:bg-gray-300 transition duration-200 relative ${
                                            isDayWrong(day) ? "bg-red-200 opacity-40" : "bg-gray-200"
                                        }`}
                                    >
                                        <p className="text-center">{day}</p>
                                        {/* Show styled green checkmark if the day is completed and not wrong */}
                                        {completedDays.includes(day) && !isDayWrong(day) && (
                                            <span className="absolute top-2 right-2 text-green-600 ml-2">
                                                <FaCheckCircle/>
                                            </span>
                                        )}
                                        {/* Logic for displaying incorrect answers can be added here */}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
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
}