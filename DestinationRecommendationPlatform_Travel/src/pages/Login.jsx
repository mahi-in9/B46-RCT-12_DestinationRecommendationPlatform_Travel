import { useState } from "react";
import { loginUser } from "../apps/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser({ email, password }));
    setEmail("");
    setPassword("");
    navigate("/");
  };

  return (
    <>
      <h2>Please Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button>login</button>
      </form>
    </>
  );
}

export default Login;
