import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function LessonDetails() {
    const { day } = useParams();
    const navigate = useNavigate(); // Hook to navigate
    const [quizzes, setQuizzes] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [isCorrect, setIsCorrect] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [userProfile, setUserProfile] = useState(null); // State to hold user profile data

    useEffect(() => {
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
        const fetchQuizzes = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/quiz/getquiz");
                const data = await response.json();
                console.log("Fetched quiz data:", data);

                const filteredQuizzes = data.find(quiz => quiz.day === day);
                console.log("Filtered quiz data for day:", day, filteredQuizzes);

                setQuizzes(filteredQuizzes ? filteredQuizzes.quizzes : []);
            } catch (error) {
                console.error("Error fetching quizzes:", error);
            }
        };

        fetchQuizzes();
    }, [day]);

    const handleOptionClick = (option, correctAnswer) => {
        const correct = option === correctAnswer;
        setIsCorrect(correct);
        setFeedbackMessage(correct ? "Correct!" : "Incorrect answer!");

        // Update selected answer in the array
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[currentIndex] = { answer: option, correct: correct };
        setSelectedAnswers(updatedAnswers);
    };

    const nextQuiz = () => {
        if (currentIndex < quizzes.length - 1) {
            setCurrentIndex(currentIndex + 1);
            resetState();
        }
    };

    const prevQuiz = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            resetState();
        }
    };

    const resetState = () => {
        setIsCorrect(null);
        setFeedbackMessage("");
    };

    const handleSubmit = () => {
        // Check if any selected answer is incorrect
        const hasIncorrectAnswers = selectedAnswers.some(answer => answer && !answer.correct);
        if (hasIncorrectAnswers) {
            alert("You cannot submit the quiz with incorrect answers.");
            return; // Prevent submission
        }

        // Save selected answers to localStorage
        localStorage.setItem(`quizResults_${day}`, JSON.stringify(selectedAnswers));

        // Mark the day as completed
        const completedDays = JSON.parse(localStorage.getItem("completedDays")) || [];
        if (!completedDays.includes(day)) {
            completedDays.push(day);
            localStorage.setItem("completedDays", JSON.stringify(completedDays));
        }

        // Navigate to /lessons page
        navigate("/lesson");
    };

    return (
        <div className="bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen flex">
            <Sidebar/>
            <main className="flex-1 p-12 flex flex-col items-start ml-4">
                {quizzes.length > 0 ? (
                    <div
                        className="bg-white bg-opacity-60 backdrop-blur-lg rounded-3xl shadow-lg p-8 w-full max-w-7xl h-[85vh]">
                        <h2 className="text-xl font-bold mb-3">Lesson for {day}</h2>
                        <h3 className="text-lg font-semibold mb-2">
                            Quiz {currentIndex + 1}: {quizzes[currentIndex].question}
                        </h3>
                        <img
                            src={`http://localhost:3000/uploads/${quizzes[currentIndex].chordDiagram}`}
                            alt="Chord Diagram"
                            className="w-full h-36 object-contain mb-4"
                        />

                        <ul className="space-y-2">
                            {quizzes[currentIndex].options.map((option, i) => {
                                const selectedAnswer = selectedAnswers[currentIndex];
                                const isSelected = selectedAnswer?.answer === option;
                                const isCorrectOption = selectedAnswer?.correct && isSelected;
                                const isIncorrectOption = !selectedAnswer?.correct && isSelected;
                                return (
                                    <li
                                        key={i}
                                        onClick={() => handleOptionClick(option, quizzes[currentIndex].correctAnswer)}
                                        className={`p-2 rounded-md cursor-pointer transition-all duration-150 
                                            ${isCorrectOption
                                            ? "bg-green-500 opacity-70 text-white"
                                            : isIncorrectOption
                                                ? "bg-red-500 opacity-70 text-white"
                                                : "bg-gray-200 hover:bg-gray-300"
                                        }`}
                                    >
                                        {option}
                                    </li>
                                );
                            })}
                        </ul>

                        {feedbackMessage && (
                            <p className={`text-lg font-semibold mt-3 ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                                {feedbackMessage}
                            </p>
                        )}

                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={prevQuiz}
                                disabled={currentIndex === 0}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
                            >
                                <ChevronLeft size={18}/>
                            </button>

                            <button
                                onClick={nextQuiz}
                                disabled={currentIndex === quizzes.length - 1}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
                            >
                                <ChevronRight size={18}/>
                            </button>
                        </div>

                        {/* Show submit button after the last quiz */}
                        {currentIndex === quizzes.length - 1 && (
                            <button
                                onClick={handleSubmit}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                            >
                                Submit
                            </button>
                        )}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No quizzes available for this day.</p>
                )}
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
                        src="/src/assets/images/nezuko.jpg"
                        alt="Profile"
                        className="w-16 h-16 rounded-full border border-gray-300 cursor-pointer mt-4"
                        onClick={() => navigate("/profile")}
                    />
                )}
            </aside>
        </div>
    );
}
