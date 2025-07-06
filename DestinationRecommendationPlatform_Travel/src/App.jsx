import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./utills/firebase";
import { updateUser, clearUser } from "./apps/slices/authSlice";

import PrivateRoute from "./components/common/privateRoute";
import NavBar from "./components/common/NavBar";

import Home from "./pages/Home";
import Survey from "./pages/Surveys";
import Recommendations from "./pages/Recommendations";
import DestinationDetails from "./pages/DestinationDetails";
import MapExplorer from "./pages/MapExplorer";
import Compare from "./pages/Compare";
import Itinerary from "./pages/Itinerary";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const safeUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || null,
          photoURL: user.photoURL || null,
        };
        dispatch(updateUser(safeUser));
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/destination/:id" element={<DestinationDetails />} />
        <Route path="/map" element={<MapExplorer />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/itinerary"
          element={
            <PrivateRoute>
              <Itinerary />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
