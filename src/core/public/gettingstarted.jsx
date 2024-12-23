import  { useState } from "react";

const MusicSelection = () => {
    const [currentPage, setCurrentPage] = useState(1); // Toggle between pages
    const genres = [
        "Country", "Electronic", "Funk", "Hip hop",
        "Jazz", "Latin", "Pop", "Punk",
        "R&B", "Rock", "Metal", "Soul music"
    ];

    const instruments = [
        { name: "Guitar", image: "/path/to/guitar.png" },
        { name: "Ukulele", image: "/path/to/ukulele.png" },
        { name: "Piano", image: "/path/to/piano.png" },
    ];

    return (
        <div className="text-center p-10 flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-4xl"> {/* Increased max width */}
                {/* Page Content */}
                {currentPage === 1 && (
                    <div className="flex flex-col items-center">
                        <h1 className="text-3xl font-bold mb-3 text-left w-full">Choose your interest..</h1>
                        <p className="text-gray-600 mb-6 text-left w-full">What rises the fuzziness in you</p>
                        <div className="grid grid-cols-4 gap-10 w-full px-4"> {/* Increased gap to 10 for more space between buttons */}
                            {genres.map((genre, index) => (
                                <button
                                    key={index}
                                    className="w-full px-10 py-6 border border-gray-300 rounded-lg hover:bg-gray-200 transition-all duration-200 text-lg"  // Ensured all buttons are same width
                                >
                                    {genre}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {currentPage === 2 && (
                    <div className="flex flex-col items-center">
                        <h1 className="text-2xl font-bold mb-2 text-left w-full">Choose an instrument...</h1>
                        <p className="text-gray-600 mb-4 text-left w-full">Which sound moves you</p>
                        <div className="grid grid-cols-3 gap-12 w-full"> {/* Increased gap to 12 for more space between instruments */}
                            {instruments.map((instrument, index) => (
                                <div key={index} className="text-center">
                                    <div
                                        className="w-32 h-32 bg-cover bg-center rounded-md mx-auto"  // Increased image size for better visuals
                                        style={{ backgroundImage: `url(${instrument.image})` }}
                                    />
                                    <p className="mt-3 font-semibold text-gray-700">{instrument.name}</p>  {/* Increased space between image and name */}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Sliding Toggles */}
                <div className="mt-14 flex justify-center gap-4"> {/* Increased gap between dots */}
                    <div
                        onClick={() => setCurrentPage(1)}
                        className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-200 ${
                            currentPage === 1 ? "bg-black" : "bg-gray-400"
                        }`}
                    />
                    <div
                        onClick={() => setCurrentPage(2)}
                        className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-200 ${
                            currentPage === 2 ? "bg-black" : "bg-gray-400"
                        }`}
                    />
                </div>

                {/* Next Button */}
                <div className="mt-20 flex justify-end">
                    <button
                        className="px-14 py-5 text-sm font-bold text-white bg-gradient-to-r from-[#99CCFF] to-[#C6B7FE] rounded-md hover:bg-gradient-to-r hover:from-[#C6B7FE] hover:to-[#99CCFF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() => setCurrentPage((prev) => (prev === 1 ? 2 : 1))}
                    >
                        NEXT
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MusicSelection;

