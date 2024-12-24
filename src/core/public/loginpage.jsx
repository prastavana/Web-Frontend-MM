import "react";

const LoginPage = () => {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('src/assets/images/bg.jpg')" }}
        >
            <div className="bg-white bg-opacity-90 rounded-3xl shadow-md flex w-full max-w-5xl h-[490px]">
                {/* Left Section - Login Form */}
                <div className="w-[70%] p-8 flex flex-col justify-center">
                    <h2 className="text-[1.8rem] font-bold text-blue-600 mb-12 text-center">Sign in to Melody Mentor</h2>
                    <form className="space-y-4">
                        <div className="flex justify-center">
                            <input
                                type="text"
                                placeholder="Username"
                                className="px-4 py-2 border border-gray-300 rounded-full w-[65%] focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                        </div>
                        <div className="flex justify-center">
                            <input
                                type="password"
                                placeholder="Password"
                                className="px-4 py-2 border border-gray-300 rounded-full w-[65%] focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                        </div>
                        <div className="text-center">
                            <a href="#" className="text-sm font-bold text-gray-600 hover:underline">
                                Forgot your password?
                            </a>
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-[#99CCFF] via-[#C6B7FE] to-[#766E98] text-white py-2 px-6 rounded-full font-semibold hover:shadow-md transition-all duration-200"
                            >
                                Login Now
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Section - Sign Up Prompt */}
                <div className="w-[40%] bg-gradient-to-r from-[#99CCFF] via-[#C6B7FE] to-[#766E98] text-white rounded-r-3xl flex flex-col items-center justify-center p-6">
                    <h2 className="text-xl font-bold mb-4 text-center">Hello, Friend!</h2>
                    <p className="text-sm mb-4 text-center">
                        Enter your personal details and start your journey with us
                    </p>
                    <button
                        className="px-4 py-2 border-2 border-white rounded-full text-white hover:bg-white hover:text-blue-500 font-semibold transition-all duration-200"
                    >
                        SIGN UP
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
