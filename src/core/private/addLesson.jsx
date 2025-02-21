import React, { useState } from "react";
import AdminSidebar from "../../components/adminSidebar.jsx";

export default function AddQuiz() {
    const [day, setDay] = useState(""); // Store the selected day
    const [quizzes, setQuizzes] = useState([]); // Store quizzes in an array
    const [docxFiles, setDocxFiles] = useState([]);
    const [instrument, setInstrument] = useState("guitar"); // Store selected instrument

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
        updatedQuizzes[index].chordDiagram = e.target.files[0]; // Store the file object
        setQuizzes(updatedQuizzes);
    };

    const handleDocxFileChange = (event) => {
        setDocxFiles([...event.target.files]);
    };

    const addQuiz = () => {
        if (quizzes.length < 5) {
            setQuizzes([
                ...quizzes,
                {
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

        // Create a single quiz object with the selected day and the quizzes array
        const quizData = {
            day,
            instrument,
            quizzes: quizzes.map((quiz) => ({
                question: quiz.question,
                options: quiz.options,
                correctAnswer: quiz.correctAnswer,
                chordDiagram: quiz.chordDiagram ? quiz.chordDiagram.name : null, // Store the filename or path
            })),
        };

        formData.append("quizData", JSON.stringify(quizData));

        quizzes.forEach((quiz) => {
            if (quiz.chordDiagram) {
                formData.append("chordDiagrams", quiz.chordDiagram);
            }
        });

        docxFiles.forEach((file) => {
            formData.append("docxFiles", file);
        });

        try {
            const response = await fetch("http://localhost:3000/api/quiz/addquiz", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to add quizzes");
            }

            alert("Quizzes added successfully!");
            setQuizzes([]); // Reset quizzes after submission
            setDocxFiles([]);
            setDay(""); // Reset the day selection after submission
            setInstrument("guitar"); // Reset the instrument selection after submission
        } catch (error) {
            console.error("Error:", error);
            alert("Error adding quizzes. Please try again.");
        }
    };

    return (
        <div className="h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex">
            <AdminSidebar />
            <div className="flex justify-center items-center w-full">
                <div className="p-6 bg-white rounded-lg shadow-md w-[65%] ml-[-5%] h-[90vh] flex flex-col">
                    <h2 className="text-2xl font-bold mb-4">Add New Quizzes</h2>
                    <div className="overflow-y-auto flex-grow p-2">
                        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                            <div>
                                <label className="block font-medium">Select Day</label>
                                <select
                                    value={day}
                                    onChange={(e) => setDay(e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                    required
                                >
                                    <option value="" disabled>Select a day</option>
                                    {Array.from({ length: 7 }, (_, i) => (
                                        <option key={i} value={`Day ${i + 1}`}>{`Day ${i + 1}`}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium">Select Instrument</label>
                                <select
                                    value={instrument}
                                    onChange={(e) => setInstrument(e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                    required
                                >
                                    <option value="guitar">Guitar</option>
                                    <option value="ukulele">Ukulele</option>
                                    <option value="piano">Piano</option>
                                </select>
                            </div>
                            {quizzes.map((quiz, index) => (
                                <div key={index} className="mb-4 p-4 border rounded-md">
                                    <h3 className="font-bold mb-2">{`Quiz ${index + 1}`}</h3>
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
                                    <div>
                                        <label className="block font-medium">Upload Chord Diagram</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleDiagramChange(index, e)}
                                            className="w-full p-2 border rounded-md"
                                        />
                                    </div>
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
                            <button
                                type="button"
                                onClick={addQuiz}
                                className="bg-blue-300 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full"
                            >
                                Add Another Quiz
                            </button>
                            <button
                                type="submit"
                                className="bg-purple-300 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
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
