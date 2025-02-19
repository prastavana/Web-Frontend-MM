import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar.jsx";

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: "", email: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate("/login");
                    return;
                }

                const response = await fetch("http://localhost:3000/api/auth/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch profile");
                }

                const data = await response.json();
                setUser(data);
            } catch (error) {
                setError("Error fetching profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        // Check if new passwords match
        if (newPassword && newPassword !== confirmPassword) {
            setError("New passwords do not match!");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/auth/update-password", { // Updated endpoint
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    newPassword: newPassword || undefined, // Only send new password if it's provided
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update profile");
            }

            const data = await response.json();
            setSuccess(data.message || "Profile updated successfully!");
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError(err.message || "Error updating profile");
        }
    };

    return (
        <div className="h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex">
            <Sidebar />

            <main className="flex-1 p-6 flex justify-center items-center">
                <div className="bg-white bg-opacity-60 backdrop-blur-lg rounded-3xl shadow-lg p-8 w-full max-w-3xl h-[70vh] flex flex-col items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Profile</h2>

                    {loading ? (
                        <p className="mt-4 text-gray-600">Loading...</p>
                    ) : error ? (
                        <p className="mt-4 text-red-500">{error}</p>
                    ) : (
                        <>
                            <form onSubmit={handleUpdate} className="w-full flex flex-col gap-4 mt-4">
                                <div>
                                    <label className="text-gray-700 font-semibold">Name</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 rounded-lg bg-gray-200 bg-opacity-70"
                                        value={user.name}
                                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="text-gray-700 font-semibold">Email</label>
                                    <input
                                        type="email"
                                        className="w-full p-2 rounded-lg bg-gray-200 bg-opacity-70"
                                        value={user.email}
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="text-gray-700 font-semibold">New Password</label>
                                    <input
                                        type="password"
                                        className="w-full p-2 rounded-lg bg-gray-200 bg-opacity-70"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="text-gray-700 font-semibold">Confirm New Password</label>
                                    <input
                                        type="password"
                                        className="w-full p-2 rounded-lg bg-gray-200 bg-opacity-70"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>

                                <button type="submit" className="py-2 px-4 rounded text-white bg-blue-500 hover:bg-blue-700 shadow-md">
                                    Update Profile
                                </button>
                            </form>

                            {success && <p className="mt-4 text-green-500">{success}</p>}
                        </>
                    )}

                    <button
                        onClick={() => navigate(-1)}
                        className="mt-6 py-2 px-4 rounded text-white bg-gray-500 hover:bg-gray-700 shadow-md"
                    >
                        Go Back
                    </button>
                </div>
            </main>
        </div>
    );
}
