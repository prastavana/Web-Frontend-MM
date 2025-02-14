import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bgImage from "../../assets/images/bg.jpg"; // Import your background image

// eslint-disable-next-line react/prop-types
const LoginPage = ({ setIsAuthenticated, setIsAdmin }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        setIsAnimating(true);
        setTimeout(() => {
            navigate("/register");
        }, 1000); // Delay to allow animation to complete
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage(""); // Reset error message

        if (!email || !password) {
            setErrorMessage("Please fill in both fields.");
            return;
        }

        try {
            // API request to authenticate user
            const response = await axios.post(
                "http://localhost:3000/api/auth/login", // Backend API endpoint
                { email, password }
            );

            const { token, role } = response.data;

            // Store token and role in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            // Update state based on role
            setIsAuthenticated(true);
            setIsAdmin(role === "admin");

            // Redirect user based on role
            navigate(role === "admin" ? "/admindash" : "/dashboard");
        } catch (error) {
            console.error("Login error: ", error);
            const errorMsg = error?.response?.data?.message || "Error logging in. Please try again.";
            setErrorMessage(errorMsg);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="bg-white bg-opacity-90 rounded-3xl shadow-md flex w-full max-w-5xl h-[490px] overflow-hidden">
                {/* Left Section - Login Form */}
                <div
                    className={`w-[62%] p-8 flex flex-col justify-center items-center transition-transform duration-[1800ms] ease-in-out ${
                        isAnimating ? "translate-x-[75%]" : ""
                    }`}
                >
                    <h2 className="text-[1.8rem] font-bold text-blue-600 mb-6 text-center">
                        Sign in to Melody Mentor
                    </h2>
                    <form className="space-y-5 w-full flex flex-col items-center" onSubmit={handleLogin}>
                        <div className="relative w-[65%]">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10 py-2 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                                required
                            />
                            <FontAwesomeIcon
                                icon={faUser}
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
                                required
                            />
                            <FontAwesomeIcon
                                icon={faLock}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            />
                        </div>
                        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
                        <div className="text-center mt-6">
                            <a href="#" className="text-sm font-bold text-gray-600 hover:underline">
                                Forgot your password?
                            </a>
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-[#99CCFF] via-[#C6B7FE] to-[#766E98] text-white py-2 px-8 w-[180px] rounded-full font-semibold hover:shadow-md transition-all duration-200"
                            >
                                Login Now
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Section - Sign Up Prompt */}
                <div
                    className={`w-[40%] bg-gradient-to-r from-[#99CCFF] via-[#C6B7FE] to-[#766E98] text-white rounded-r-3xl flex flex-col items-center justify-center p-6 transition-transform duration-[1200ms] ease-in-out ${
                        isAnimating ? "translate-x-[-157%]" : ""
                    }`}
                >
                    <h2 className="text-xl font-bold mb-3.5 text-center">Hello, Friend!</h2>
                    <p className="text-sm mb-3.5 text-center">
                        Enter your personal details
                        <br />
                        and start your journey with us
                    </p>
                    <button
                        className="px-4 py-2 mb-3.5 border-2 border-white rounded-full text-white hover:bg-white hover:text-blue-500 font-semibold transition-all duration-200"
                        onClick={handleSignUpClick}
                    >
                        SIGN UP
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
