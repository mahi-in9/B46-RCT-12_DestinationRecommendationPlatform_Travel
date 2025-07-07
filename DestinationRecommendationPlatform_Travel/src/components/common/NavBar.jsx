import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../apps/slices/authSlice";
import { seedDestinations } from "../../utills/seedDestinations";

function NavBar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const handleSeedClick = async () => {
    await seedDestinations();
  };

  return (
    <nav className="bg-amber-300 py-3 px-4 shadow-md border-b border-amber-400">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        <div className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">
          <Link to="/">✈️ Destination Platform</Link>
        </div>
        <ul className="flex gap-4 flex-wrap items-center text-md font-medium text-gray-700">
          {user ? (
            <>
              <li>
                <Link
                  to="/"
                  className={`hover:text-blue-600 transition ${
                    isActive("/") ? "text-blue-800 font-bold" : ""
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/survey"
                  className={`hover:text-blue-600 transition ${
                    isActive("/survey") ? "text-blue-800 font-bold" : ""
                  }`}
                >
                  Survey
                </Link>
              </li>
              <li>
                <Link
                  to="/recommendations"
                  className={`hover:text-blue-600 transition ${
                    isActive("/recommendations")
                      ? "text-blue-800 font-bold"
                      : ""
                  }`}
                >
                  Recommendations
                </Link>
              </li>
              <li>
                <Link
                  to="/map"
                  className={`hover:text-blue-600 transition ${
                    isActive("/map") ? "text-blue-800 font-bold" : ""
                  }`}
                >
                  Map
                </Link>
              </li>
              <li>
                <Link
                  to="/compare"
                  className={`hover:text-blue-600 transition ${
                    isActive("/compare") ? "text-blue-800 font-bold" : ""
                  }`}
                >
                  Compare
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className={`hover:text-blue-600 transition ${
                    isActive("/profile") ? "text-blue-800 font-bold" : ""
                  }`}
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleSeedClick}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Add Dummy Data
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className={`hover:text-blue-600 transition ${
                    isActive("/login") ? "text-blue-800 font-bold" : ""
                  }`}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className={`hover:text-blue-600 transition ${
                    isActive("/register") ? "text-blue-800 font-bold" : ""
                  }`}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
