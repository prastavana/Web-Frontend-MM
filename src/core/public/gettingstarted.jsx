import { useState } from "react";

// Importing images
import GuitarImage from "../../assets/images/guitarwobg.png";
import UkuleleImage from "../../assets/images/ukulele.png";
import PianoImage from "../../assets/images/piano.png";

const MusicSelection = () => {
    const [currentPage, setCurrentPage] = useState(1); // Toggle between pages
    const genres = [
        "Country", "Electronic", "Funk", "Hip hop",
        "Jazz", "Latin", "Pop", "Punk",
        "R&B", "Rock", "Metal", "Soul music"
    ];

    const instruments = [
        { name: "Guitar", image: GuitarImage, color: "#C4EAFA", width: "w-80", height: "h-64" }, // Fixed height for Guitar
        { name: "Ukulele", image: UkuleleImage, color: "#C8E3FF", width: "w-64", height: "h-64" }, // Fixed height for Ukulele
        { name: "Piano", image: PianoImage, color: "#ADCCFF", width: "w-72", height: "h-64" }, // Fixed height for Piano
    ];

    return (
        <div className="text-center p-10 flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-4xl px-2">
                {/* Page Content */}
                <div
                    className="w-full transition-transform duration-500"
                    style={{
                        transform: currentPage === 1 ? "translateX(0)" : "translateX(-100%)",
                    }}
                >
                    {/* Page 1 Content */}
                    {currentPage === 1 && (
                        <div className="flex flex-col items-center">
                            <h1 className="text-3xl font-bold mb-3 text-left w-full">Choose your interest..</h1>
                            <p className="text-gray-600 mb-6 text-left w-full">What rises the fuzziness in you</p>
                            <div className="grid grid-cols-4 gap-10 w-full px-4">
                                {genres.map((genre, index) => (
                                    <button
                                        key={index}
                                        className="px-10 py-6 border border-gray-300 rounded-lg hover:bg-gray-200 transition-all duration-200 text-lg"
                                    >
                                        {genre}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div
                    className="w-full transition-transform duration-500"
                    style={{
                        transform: currentPage === 2 ? "translateX(0)" : "translateX(100%)",
                    }}
                >
                    {/* Page 2 Content */}
                    {currentPage === 2 && (
                        <div className="flex flex-col items-center">
                            <h1 className="text-2xl font-bold mb-4 mt-10 text-center w-full">Choose an instrument...</h1>
                            <p className="text-gray-600 mb-10 mt-2 text-center w-full">Which sound moves you</p>
                            <div className="grid grid-cols-3 gap-8 w-full relative z-10">
                                {instruments.map((instrument, index) => (
                                    <div key={index} className="text-center">
                                        <div
                                            className={`w-[260px] ${instrument.height} mx-auto rounded-md flex justify-center items-center`}
                                            style={{ backgroundColor: instrument.color }}
                                        >
                                            <img
                                                src={instrument.image}
                                                alt={instrument.name}
                                                className={`object-contain ${instrument.width} ${instrument.height}`} // Ensure image fits within the container
                                            />
                                        </div>
                                        <p className="mt-3 font-semibold text-gray-700">{instrument.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sliding Toggles */}
                <div className="mt-12 flex justify-center gap-4">
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
                <div className="mt-10 flex justify-end">
                    <button
                        className="px-14 py-5 text-sm font-bold text-white bg-gradient-to-r from-[#99CCFF] to-[#C6B7FF] rounded-full"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MusicSelection;
