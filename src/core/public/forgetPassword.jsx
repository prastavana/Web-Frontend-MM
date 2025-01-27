import { useState } from 'react';
import axios from 'axios';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Making the POST request to the backend API
            const response = await axios.post('http://localhost:3000/api/auth/forgotPassword', { email });

            // Display success message
            setMessage(response.data.msg);
        } catch (error) {
            console.error('Error:', error);
            setMessage('Something went wrong. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
                <form onSubmit={handleForgotPassword}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 px-4 bg-gradient-to-r from-[#99CCFF] via-[#C6B7FE] to-[#766E98] text-white font-semibold rounded-md hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            {loading ? 'Processing...' : 'Reset Password'}
                        </button>
                    </div>
                    {message && (
                        <div className="text-center text-sm text-gray-700">
                            {message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;
