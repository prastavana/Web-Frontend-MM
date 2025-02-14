import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar.jsx";


export default function ChordAndLyric() {
    const [lessons] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Ukulele");
    const [fontSize, setFontSize] = useState(16);
    const [autoScroll, setAutoScroll] = useState(false);
    const [scrollSpeed, setScrollSpeed] = useState(2);

    useEffect(() => {
        let scrollInterval;
        if (autoScroll) {
            scrollInterval = setInterval(() => {
                window.scrollBy(0, scrollSpeed);
            }, 50);
        }
        return () => clearInterval(scrollInterval);
    }, [autoScroll, scrollSpeed]);

    const filteredLessons = lessons.filter((lesson) => lesson.category === selectedCategory);

    return (
        <div className="bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen flex items-start justify-center">
            <Sidebar />
            <main className="flex-1 p-6 flex flex-col items-start ml-4">
                <div className="p-6 bg-white rounded-lg shadow-md w-[87%] min-h-[640px] ml-4 mt-4">
                    <h2 className="text-2xl font-bold mb-4">Available {selectedCategory} Chords</h2>
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
                    <div className="space-y-4">
                        {filteredLessons.length === 0 ? (
                            <p className="text-center text-gray-500">No lessons available in this category.</p>
                        ) : (
                            filteredLessons.map((lesson) => (
                                <div
                                    key={lesson.id}
                                    className="p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200"
                                    style={{ fontSize: `${fontSize}px` }}
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

                {/* Controls Box */}
                <div className="flex justify-between items-center mt-6 bg-white p-1 rounded-lg shadow-md ml-64 w-[50%]">
                    {/* Font Size Control */}
                    <div className="flex items-center space-x-4 flex-1 justify-center">
                        <button onClick={() => setFontSize(fontSize + 1)} className="bg-gray-200 px-3 py-2 rounded-md">+1</button>
                        <span className="text-gray-700">{fontSize}px</span> {/* Display current font size */}
                        <button onClick={() => setFontSize(fontSize - 1)} className="bg-gray-200 px-3 py-2 rounded-md">-1</button>
                    </div>

                    {/* Auto Scroll Button */}
                    <div className="flex-1 flex justify-center">
                        <button
                            onClick={() => setAutoScroll(!autoScroll)}
                            className="px-4 py-2 rounded-md text-white"
                            style={{ backgroundColor: autoScroll ? "#ff5050" : "#87CEFA" }}
                        >
                            {autoScroll ? "Stop Scroll" : "Auto Scroll"}
                        </button>
                    </div>

                    {/* Speed Control */}
                    <div className="flex items-center space-x-3 flex-1 justify-center">
                        <span className="text-gray-700">Speed:</span>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={scrollSpeed}
                            onChange={(e) => setScrollSpeed(e.target.value)}
                            className="cursor-pointer"
                        />
                    </div>
                </div>

            </main>
        </div>
    );
}
