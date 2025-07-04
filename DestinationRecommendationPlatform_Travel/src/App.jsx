import { useState } from "react";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Register /> */}
      <Login />
    </>
  );
}

export default App;
