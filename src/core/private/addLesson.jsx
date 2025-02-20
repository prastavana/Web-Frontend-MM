import React, { useState } from "react";
import AdminSidebar from "../../components/adminSidebar.jsx";

export default function AddQuiz() {
    const [quizzes, setQuizzes] = useState([
        {
            day: "",
            question: "",
            chordDiagram: null,
            options: ["", "", "", ""],
            correctAnswer: "",
        },
    ]);

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedQuizzes = [...quizzes];
        updatedQuizzes[index] = { ...updatedQuizzes[index], [name]: value };
        setQuizzes(updatedQuizzes);
    };

    const handleOptionChange = (index, optionIndex, value) => {
        const updatedQuizzes = [...quizzes];
        updatedQuizzes[index].options[optionIndex] = value;
        setQuizzes(updatedQuizzes);
    };

    const handleDiagramChange = (index, e) => {
        const updatedQuizzes = [...quizzes];
        updatedQuizzes[index].chordDiagram = e.target.files[0];
        setQuizzes(updatedQuizzes);
    };

    const addQuiz = () => {
        if (quizzes.length < 5) {
            setQuizzes([
                ...quizzes,
                {
                    day: "",
                    question: "",
                    chordDiagram: null,
                    options: ["", "", "", ""],
                    correctAnswer: "",
                },
            ]);
        } else {
            alert("You can only add up to 5 quizzes.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        quizzes.forEach((quiz) => {
            formData.append('quizzes', JSON.stringify({
                day: quiz.day,
                question: quiz.question,
                options: quiz.options,
                correctAnswer: quiz.correctAnswer,
            }));
            formData.append('chordDiagram', quiz.chordDiagram); // Append the chord diagram file
        });

        try {
            const response = await fetch('http://localhost:3000/api/quiz', { // Updated URL to match your backend
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to add quizzes');
            }

            const data = await response.json();
            console.log("Quizzes Data:", data);
            alert("Quizzes added successfully!");
            // Reset quizzes or handle after submission
            setQuizzes([{ day: "", question: "", chordDiagram: null, options: ["", "", "", ""], correctAnswer: "" }]);
        } catch (error) {
            console.error("Error:", error);
            alert("Error adding quizzes. Please try again.");
        }
    };

    return (
        <div className="h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main content area with centered box */}
            <div className="flex justify-center items-center w-full">
                <div className="p-6 bg-white rounded-lg shadow-md w-[65%] ml-[-5%] h-[90vh] flex flex-col">
                    <h2 className="text-2xl font-bold mb-4">Add New Quizzes</h2>

                    <div className="overflow-y-auto flex-grow p-2">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {quizzes.map((quiz, index) => (
                                <div key={index} className="mb-4 p-4 border rounded-md">
                                    <h3 className="font-bold mb-2">{`Quiz ${index + 1}`}</h3>
                                    {/* Day Selection only for the first quiz */}
                                    {index === 0 && (
                                        <div>
                                            <label className="block font-medium">Select Day</label>
                                            <select
                                                name="day"
                                                value={quiz.day}
                                                onChange={(e) => handleChange(index, e)}
                                                className="w-full p-2 border rounded-md"
                                                required
                                            >
                                                <option value="" disabled>Select a day</option>
                                                {Array.from({ length: 7 }, (_, i) => (
                                                    <option key={i} value={`Day ${i + 1}`}>{`Day ${i + 1}`}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}

                                    {/* Quiz Question */}
                                    <div>
                                        <label className="block font-medium">Quiz Question</label>
                                        <input
                                            type="text"
                                            name="question"
                                            value={quiz.question}
                                            onChange={(e) => handleChange(index, e)}
                                            className="w-full p-2 border rounded-md"
                                            required
                                        />
                                    </div>

                                    {/* Chord Diagram Upload */}
                                    <div>
                                        <label className="block font-medium">Upload Chord Diagram</label>
                                        <input
                                            type="file"
                                            onChange={(e) => handleDiagramChange(index, e)}
                                            className="w-full p-2 border rounded-md"
                                            required
                                        />
                                    </div>

                                    {/* Options for the Quiz */}
                                    {quiz.options.map((option, optionIndex) => (
                                        <div key={optionIndex} className="flex items-center">
                                            <label className="block font-medium">{`Option ${optionIndex + 1}`}</label>
                                            <input
                                                type="text"
                                                value={option}
                                                onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                                                className="w-full p-2 border rounded-md ml-2"
                                                required
                                            />
                                        </div>
                                    ))}

                                    {/* Correct Answer */}
                                    <div>
                                        <label className="block font-medium">Correct Answer</label>
                                        <input
                                            type="text"
                                            name="correctAnswer"
                                            value={quiz.correctAnswer}
                                            onChange={(e) => handleChange(index, e)}
                                            className="w-full p-2 border rounded-md"
                                            placeholder="Enter the correct answer"
                                            required
                                        />
                                    </div>
                                </div>
                            ))}

                            {/* Add Quiz Button */}
                            <button
                                type="button"
                                onClick={addQuiz}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full"
                            >
                                Add Another Quiz
                            </button>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
                            >
                                Submit All Quizzes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
