import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!name || !email || !password) {
            setError("All fields are required!");
            return;
        }

        setError(""); // Clear previous errors
        setLoading(true); // Set loading state

        try {
            // Send POST request to the backend
            const response = await axios.post("http://localhost:3000/api/auth/register", {
                name,
                email,
                password,
                role: "user", // Default role is 'user'
            });

            // If successful, display success message and navigate to login
            if (response.status === 201) {
                setSuccess("User registered successfully!");
                setError(""); // Clear any previous errors
                setTimeout(() => navigate("/login"), 2000); // Redirect to login page after 2 seconds
            }
        } catch (err) {
            // Handle error response from backend
            const message = err.response?.data?.message || "Error registering user. Please try again.";
            setError(message);
            setSuccess(""); // Clear success message in case of error
        } finally {
            setLoading(false); // Stop loading state
        }
    };

    const handleSignInClick = () => {
        setIsAnimating(true);
        setTimeout(() => {
            navigate("/login");
        }, 1000); // Delay to allow animation to complete
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('src/assets/images/bg.jpg')" }}
        >
            <div className="bg-white bg-opacity-90 rounded-3xl shadow-md flex w-full max-w-5xl h-[490px] overflow-hidden">
                {/* Left Section - Sign In Prompt */}
                <div
                    className={`w-[40%] bg-gradient-to-r from-[#99CCFF] via-[#C6B7FE] to-[#766E98] text-white rounded-l-3xl flex flex-col items-center justify-center p-6 transition-all duration-[1200ms] ease-in-out ${
                        isAnimating ? "transform translate-x-[157%]" : ""
                    }`}
                    style={{ zIndex: 10 }}
                >
                    <h2 className="text-xl font-bold mb-3.5 text-center">Welcome Back!</h2>
                    <p className="text-sm mb-3.5 text-center">
                        To keep connected with us please <br /> login with your personal info
                    </p>
                    <button
                        className="px-4 py-2 mb-3.5 border-2 border-white rounded-full text-white hover:bg-white hover:text-blue-500 font-semibold transition-all duration-200"
                        onClick={handleSignInClick} // Trigger animation and navigate to login
                    >
                        SIGN IN
                    </button>
                </div>

                {/* Right Section - Registration Form */}
                <div
                    className={`w-[62%] p-8 flex flex-col justify-center items-center transition-all duration-[1800ms] ease-in-out ${
                        isAnimating ? "transform translate-x-[-75%]" : ""
                    }`}
                    style={{ zIndex: 5 }}
                >
                    <h2 className="text-[1.8rem] font-bold text-blue-600 mb-12 text-center">Create Account</h2>

                    {error && <p className="text-red-600">{error}</p>}
                    {success && <p className="text-green-600">{success}</p>}

                    <form className="space-y-5 w-full flex flex-col items-center" onSubmit={handleSubmit}>
                        <div className="relative w-[65%]">
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="pl-10 py-2 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                            <FontAwesomeIcon
                                icon={faUser}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            />
                        </div>

                        <div className="relative w-[65%]">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10 py-2 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            />
                        </div>

                        <div className="relative w-[65%]">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10 py-2 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                            <FontAwesomeIcon
                                icon={faLock}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            />
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-[#99CCFF] via-[#C6B7FE] to-[#766E98] text-white py-2 px-8 w-[180px] rounded-full font-semibold hover:shadow-md transition-all duration-200"
                            >
                                {loading ? "Registering..." : "Register Now"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
