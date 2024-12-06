import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAct } from "../redux/async/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { login, loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [formErrors, setFormErrors] = useState(false);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.email.trim() === "" || form.password.trim() === "") {
      setFormErrors(true);
    } else {
      setFormErrors(false);
      dispatch(
        loginAct({
          email: form.email,
          password: form.password,
          remember_me: form.rememberMe,
        })
      );
    }
    setForm({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <h2 className="text-4xl text-white font-bold mb-10 px-3">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96 px-3">
        <div className="flex flex-col">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            className="bg-dark-yellow h-8 border-b focus:border-b-2 border-black focus:outline-none"
          />
        </div>
        <div className="group flex flex-col">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            className="bg-dark-yellow h-8 border-b focus:border-b-2 border-black focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="remember_me">Remember Me</label>
          <input
            name="rememberMe"
            id="remember_me"
            type="checkbox"
            checked={form.rememberMe}
            onChange={handleChange}
          />
        </div>
        <button
          className="bg-black text-white py-2"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {formErrors && (
          <p style={{ color: "red" }}>Please fill in all fields.</p>
        )}
        {error && <p style={{ color: "red" }}>Wrong email or password.</p>}
      </form>
    </div>
  );
};

export default Login;
