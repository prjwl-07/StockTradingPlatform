import { useState } from "react";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError("");

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:3002/auth/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.message || "Login failed");
        return;
      }

      console.log("Login successful:", data);
      navigate("/dashboard");

    } catch (error) {
      console.error("Login failed:", error);
      setServerError("Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="text-center mb-4">
          <div className="brand-icon mb-3">
            <i className="fa-solid fa-chart-line"></i>
          </div>

          <h2 className="fw-semibold">Welcome back</h2>

          <p className="text-muted">
            Log in to continue your investing journey
          </p>
        </div>

        {serverError && (
          <div className="alert alert-danger py-2">{serverError}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label">Email address</label>

            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>

            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 login-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <p className="text-center text-muted mt-4 mb-0">
            Don't have an account?{" "}
            <NavLink to="/signup" className="signup-link">
              Sign up
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
