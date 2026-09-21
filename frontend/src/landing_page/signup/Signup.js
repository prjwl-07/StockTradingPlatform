import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError("");

    // Stop here if validation fails
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:3002/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        // Allow cookie-based authentication
        credentials: "include",

        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.message || "Signup failed");
        return;
      }

      console.log("Signup successful:", data);

      // Clear form
      setName("");
      setEmail("");
      setPassword("");
      setErrors({});

      // User is already logged in
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
      setServerError("Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="text-center mb-4">
          <div className="brand-icon mb-3">
            <i className="fa-solid fa-chart-line"></i>
          </div>

          <h2 className="fw-semibold">Create your account</h2>

          <p className="text-muted">Start your investing journey today</p>
        </div>

        {serverError && (
          <div className="alert alert-danger py-2">{serverError}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Full name</label>

            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          {/* Email */}
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

          {/* Password */}
          <div className="mb-4">
            <label className="form-label">Password</label>

            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-100 signup-btn"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className="text-center text-muted mt-4 mb-0">
            Already have an account?{" "}
            <a href="/login" className="login-link">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
