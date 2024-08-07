import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
 element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
 const { isAuthenticated } = useAuth();
console.log('aquii', isAuthenticated)
 return isAuthenticated ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
