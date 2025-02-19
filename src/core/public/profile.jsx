import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar.jsx";

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser ] = useState({ name: "", email: "", profilePicture: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.warn("No token found, redirecting to login.");
                    navigate("/login");
                    return;
                }

                const response = await fetch("http://localhost:3000/api/auth/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Error fetching profile:", errorData);
                    throw new Error(errorData.message || "Failed to fetch profile");
                }

                const data = await response.json();
                console.log("Fetched user profile data:", data);
                setUser ((prevUser ) => ({
                    ...prevUser ,
                    name: data.name || "",
                    email: data.email || "",
                    profilePicture: data.profilePicture ? `http://localhost:3000/${data.profilePicture}` : "",
                }));
                if (data.profilePicture) {
                    setImagePreview(`http://localhost:3000/${data.profilePicture}`);
                }
            } catch (error) {
                console.error("Error in fetchProfile:", error);
                setError("Error fetching profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    useEffect(() => {
        if (image) {
            const objectUrl = URL.createObjectURL(image);
            setImagePreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [image]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        if (newPassword && newPassword !== confirmPassword) {
            setError("New passwords do not match!");
            return;
        }

        const formData = new FormData();
        formData.append("name", user.name);
        formData.append("email", user.email);
        if (newPassword) formData.append("newPassword", newPassword);
        if (image) formData.append("profilePicture", image);

        try {
            const response = await fetch("http://localhost:3000/api/auth/update-profile", {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update profile");
            }

            const data = await response.json();
            setSuccess(data.message || "Profile updated successfully!");
            setUser ((prevUser ) => ({
                ...prevUser ,
                name: data.name || "",
                email: data.email || "",
                profilePicture: data.profilePicture ? `http://localhost:3000/${data.profilePicture}` : "",
            }));
            setNewPassword("");
            setConfirmPassword("");
            setImage(null);
            setImagePreview(data.profilePicture ? `http://localhost:3000/${data.profilePicture}` : null);
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
                            <div className="relative mt-4">
                                <div
                                    onClick={() => document.getElementById("fileInput").click()}
                                    className="w-32 h-32 rounded-full border-4 border-blue-500 cursor-pointer overflow-hidden"
                                >
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <img
                                            src="src/assets/images/default-avatar.png" // Default avatar image
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>
                                <input id="fileInput" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                            </div>

                            <form onSubmit={handleUpdate} className="w-full flex flex-col gap-4 mt-4">
                                <div>
                                    <label className="text-gray-700 font-semibold">Name</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 rounded-lg bg-gray-200 bg-opacity-70"
                                        value={user.name}
                                        onChange={(e) => setUser ((prevUser ) => ({ ...prevUser , name: e.target.value }))}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="text-gray-700 font-semibold">Email</label>
                                    <input
                                        type="email"
                                        className="w-full p-2 rounded-lg bg-gray-200 bg-opacity-70"
                                        value={user.email}
                                        onChange={(e) => setUser ((prevUser ) => ({ ...prevUser , email: e.target.value }))}
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

                    <button onClick={() => navigate(-1)} className="mt-6 py-2 px-4 rounded text-white bg-gray-500 hover:bg-gray-700 shadow-md">
                        Go Back
                    </button>
                </div>
            </main>
        </div>
    );
}