import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function ProtectedRoute() {
    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        // Not logged in, redirect to login page
        return <Navigate to="/admin/login" replace />;
    }

    // Logged in, render the child routes (AdminLayout)
    return <Outlet />;
}
