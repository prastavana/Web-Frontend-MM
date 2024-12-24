import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'; // Importing icons

const LoginPage = () => {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('src/assets/images/bg.jpg')" }}
        >
            <div className="bg-white bg-opacity-90 rounded-3xl shadow-md flex w-full max-w-5xl h-[490px]">
                {/* Left Section - Login Form */}
                <div className="w-[62%] p-8 flex flex-col justify-center items-center"> {/* Centering the content here */}
                    <h2 className="text-[1.8rem] font-bold text-blue-600 mb-12 text-center">Sign in to Melody Mentor</h2>
                    <form className="space-y-5 w-full flex flex-col items-center"> {/* Centering the form */}
                        {/* Username Field */}
                        <div className="relative w-[65%]"> {/* Set width of input field */}
                            <input
                                type="text"
                                placeholder="Username"
                                className="pl-10 py-2 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                            <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>

                        {/* Password Field */}
                        <div className="relative w-[65%]"> {/* Set width of input field */}
                            <input
                                type="password"
                                placeholder="Password"
                                className="pl-10 py-2 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                            <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>

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
                <div className="w-[40%] bg-gradient-to-r from-[#99CCFF] via-[#C6B7FE] to-[#766E98] text-white rounded-r-3xl flex flex-col items-center justify-center p-6">
                    <h2 className="text-xl font-bold mb-3.5  text-center">Hello, Friend!</h2>
                    <p className="text-sm mb-3.5 text-center">
                        Enter your personal details
                        <br />
                        and start your journey with us
                    </p>
                    <button
                        className="px-4 py-2 mb-3.5 border-2 border-white rounded-full text-white hover:bg-white hover:text-blue-500 font-semibold transition-all duration-200"
                    >
                        SIGN UP
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
