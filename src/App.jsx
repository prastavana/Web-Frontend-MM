import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoginPage from "./core/public/loginpage.jsx";
import RegisterPage from "./core/public/register.jsx";
import Gettingstarted from "./core/public/gettingstarted.jsx";
import Dashboard from "./core/public/dashboard.jsx";
import AdminDashboard from "./core/public/adminDashboard.jsx";
import ForgetPassword from "./core/public/forgetPassword.jsx";
import ResetPassword from "./core/public/resetPassword.jsx";
import FirstPage from "./core/public/firstPage.jsx";
// import AddChord from "./core/public/addChord.jsx";


const Layout = lazy(() => import("./core/private/layout"));

function App() {
  // Placeholder for authentication state; replace with actual logic
  const isAuthenticated = false; // Replace with your auth logic
  const isAdmin = false; // Replace with actual admin detection logic

  // Public Routes
  const publicRoutes = [
    { path: "/", element: <Gettingstarted /> },
    { path: "/firstpage", element: <FirstPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/admindash", element: <AdminDashboard /> },
    { path: "/forgetPassword", element: <ForgetPassword /> },
    { path: "/resetPassword", element: <ResetPassword /> },
    // { path: "/addChord", element: <AddChord /> },
    { path: "*", element: <>Page not found</> },
  ];

  // Private/Admin Routes
  const privateRoutes = [
    { path: "/admin", element: <Layout /> },
    { path: "*", element: <>Unauthorized</> },
  ];

  // Route selection based on authentication and role
  const routes = isAuthenticated ? (isAdmin ? privateRoutes : publicRoutes) : publicRoutes;

  // Router
  const router = createBrowserRouter(routes);

  return (
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
  );
}

export default App;
