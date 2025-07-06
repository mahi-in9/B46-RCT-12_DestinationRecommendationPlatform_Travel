import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg font-semibold text-gray-600">
        Checking authentication...
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
