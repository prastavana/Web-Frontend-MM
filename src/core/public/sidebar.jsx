import "react";
const Sidebar = () => {
    return (
    <aside className="w-1/6 bg-white bg-opacity-10 backdrop-blur-lg p-6 flex flex-col">
        <h1 className="text-xl font-bold mb-8">🎵 Melody Mentor</h1>
        <nav className="flex flex-col gap-4">
            <div className="space-y-4">
                <h2 className="text-sm font-semibold text-gray-500 uppercase">
                    Features
                </h2>
                <ul className="space-y-4">
                    <li>Home</li>
                    <li>Lessons</li>
                    <li>Practice sections</li>
                    <li>Chords & Lyrics</li>
                    <li>Tuner</li>
                </ul>
            </div>
            <div className="mt-8 space-y-4">
                <h2 className="text-sm font-semibold text-gray-500 uppercase">
                    Favourites
                </h2>
                <ul className="space-y-4">
                    <li>Liked Lesson</li>
                    <li>Liked Song</li>
                </ul>
            </div>
        </nav>
    </aside>
    );
};

export default Sidebar;