import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <aside className="w-1/6 bg-white bg-opacity-10 backdrop-blur-lg p-6 flex flex-col">
            <h1 className="text-xl font-bold mb-8">🎵 Melody Mentor</h1>
            <nav className="flex flex-col gap-4">
                <div className="space-y-4">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase">
                        Features
                    </h2>
                    <ul className="space-y-4">
                        <li>
                            <button
                                className="text-gray-500 hover:text-purple-300"
                                onClick={() => navigate("/dashboard")}
                            >
                                Home
                            </button>
                        </li>
                        <li>
                            <button
                                className="text-gray-500 hover:text-purple-300"
                                onClick={() => navigate("/lesson")}
                            >
                                Lessons
                            </button>
                        </li>
                        <li>
                            <button
                                className="text-gray-500 hover:text-purple-300"
                                onClick={() => navigate("/practiceSessions")}
                            >
                                Practice Sessions
                            </button>
                        </li>
                        <li>
                            <button
                                className="text-gray-500 hover:text-purple-300"
                                onClick={() => navigate("/chords")}
                            >
                                Chords & Lyrics
                            </button>
                        </li>
                        <li>
                            <button
                                className="text-gray-500 hover:text-purple-300"
                                onClick={() => navigate("/tuner")}
                            >
                                Tuner
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="mt-8 space-y-4">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase">
                        Favourites
                    </h2>
                    <ul className="space-y-4">
                        <li>
                            <button
                                className="text-gray-500 hover:text-purple-300"
                                onClick={() => navigate("/liked-songs")}
                            >
                                Liked Songs
                            </button>
                        </li>

                    </ul>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;
