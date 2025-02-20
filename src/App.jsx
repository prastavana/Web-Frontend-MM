import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { Suspense } from "react";
import LoginPage from "./core/public/loginpage.jsx";
import RegisterPage from "./core/public/register.jsx";
import Dashboard from "./core/public/dashboard.jsx";
import ForgetPassword from "./core/public/forgetPassword.jsx";
import ResetPasswordPage from "./core/public/resetPassword.jsx";
import Lesson from "./core/public/lesson.jsx";
import PracticeSession from "./core/public/practiceSessions.jsx";
import ChordAndLyricPage from "./core/public/chordAndLyric.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";
import AdminDashboard from "./core/private/adminDashboard.jsx";
import AddChord from "./core/private/addChord.jsx";
import AddPracticeSession from "./core/private/addPracticeSessions.jsx";
import AddLesson from "./core/private/addLesson.jsx";
import Gettingstarted from "./core/public/gettingstarted.jsx";
import SongDetails from "./core/public/songDetails.jsx";
import TunerInst from "./core/public/tunerInst.jsx";
import Profile from "./core/public/profile.jsx";
import SessionDetails from "./core/public/sessionDetails.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check localStorage for token and role
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      setIsAuthenticated(true);
      setIsAdmin(role === "admin"); // Ensure that role is set as 'admin' for admin routes
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  }, []);

  // Public Routes (Always accessible)
  const publicRoutes = [
    { path: "/", element: <Gettingstarted /> },
    { path: "/login", element: <LoginPage setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/forgetPassword", element: <ForgetPassword /> },
    { path: "/resetPassword", element: <ResetPasswordPage /> },
    { path: "/lesson", element: <Lesson /> },
    { path: "/practiceSessions", element: <PracticeSession /> },
    { path: "/chords", element: <ChordAndLyricPage /> },
    { path: "/song/:songId", element: <SongDetails /> }, // Added dynamic route for SongDetails
    { path: "/tuner", element: <TunerInst /> },
    { path: "/profile", element: < Profile/> },
    { path: "/session-details/:day/:instrument", element: <SessionDetails /> },
    { path: "*", element: <>Page not found</> },
  ];

  // Private/Admin Routes (Require authentication and admin role)
  const privateRoutes = [
    {
      path: "/admindash",
      element: (
          <ProtectedRoute isAdminRoute={true} isAuthenticated={isAuthenticated} isAdmin={isAdmin}>
            <AdminDashboard />
          </ProtectedRoute>
      ),
    },
    {
      path: "/addChord",
      element: (
          <ProtectedRoute isAdminRoute={true} isAuthenticated={isAuthenticated} isAdmin={isAdmin}>
            <AddChord />
          </ProtectedRoute>
      ),
    },
    {
      path: "/addPracticeSessions",
      element: (
          <ProtectedRoute isAdminRoute={true} isAuthenticated={isAuthenticated} isAdmin={isAdmin}>
            <AddPracticeSession/>
          </ProtectedRoute>
      ),
    },
    {
      path: "/addLesson",
      element: (
          <ProtectedRoute isAdminRoute={true} isAuthenticated={isAuthenticated} isAdmin={isAdmin}>
            <AddLesson />
99          </ProtectedRoute>
      ),
    },
  ];

  // Combine all routes
  const routes = [...publicRoutes, ...privateRoutes];

  // Router
  const router = createBrowserRouter(routes);

  return (
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
  );
}

export default App;
