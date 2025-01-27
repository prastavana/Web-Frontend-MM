import { useState, useEffect } from 'react';
import axios from 'axios';

const ResetPasswordPage = () => {
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // Added to track message type

    // Get token from URL
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setToken(urlParams.get('token'));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match.');
            setMessageType('error');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/auth/reset-password', {
                token,
                newPassword,
            });
            setMessage(response.data.msg); // Success or error message
            setMessageType('success'); // Set message type to 'success' for successful password reset
        } catch (error) {
            setMessage(error.response.data.msg);
            setMessageType('error'); // Set message type to 'error' for failure
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Reset Your Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 rounded-md text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gradient-to-r from-[#99CCFF] via-[#C6B7FE] to-[#766E98]"
                    >
                        Reset Password
                    </button>
                </form>
                {message && (
                    <p className={`mt-4 text-center text-sm ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ResetPasswordPage;
