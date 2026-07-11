import React, { useState } from "react";

function Signup() {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!mobile || (isLoginMode ? !password : (!email || !name || !password))) {
      setError("Please fill in all the required fields.");
      return;
    }

    if (mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    // Mock API call
    setSuccess(true);
    localStorage.setItem("user_authenticated", "true");
    localStorage.setItem("user_name", name || "Investor");
  };

  const handleModeToggle = () => {
    setIsLoginMode(!isLoginMode);
    setError("");
    setSuccess(false);
  };

  return (
    <div className="container p-5" style={{ minHeight: "80vh" }}>
      <div className="row align-items-center justify-content-center mt-4">
        {/* Left Side: Mock Banner / Illustration */}
        <div className="col-md-6 text-center mb-5 mb-md-0">
          <img
            src="media/images/signup.png"
            alt="Invest with Zerodha"
            style={{ maxWidth: "85%", height: "auto" }}
          />
          <h2 className="mt-4 font-weight-normal text-muted" style={{ fontSize: "1.8rem" }}>
            Invest in everything
          </h2>
          <p className="text-muted mt-2">
            Online platform to invest in stocks, derivatives, mutual funds, and more.
          </p>
        </div>

        {/* Right Side: Signup / Login Form Card */}
        <div className="col-md-5 offset-md-1">
          <div className="card shadow-sm border-0 p-4" style={{ borderRadius: "10px", backgroundColor: "#fff" }}>
            {success ? (
              <div className="text-center p-3">
                <div style={{ fontSize: "4rem", color: "#4caf50" }}>✓</div>
                <h3 className="mt-3">
                  {isLoginMode ? "Logged In Successfully!" : "Account Created!"}
                </h3>
                <p className="text-muted mt-2">
                  Welcome to Zerodha's investment portal. You can now access your trading dashboard.
                </p>
                <a
                  href="http://localhost:3001"
                  className="btn btn-primary btn-block mt-4 w-100 p-2"
                  style={{
                    backgroundColor: "#387ed1",
                    border: "none",
                    fontWeight: "600",
                    fontSize: "1.05rem",
                    borderRadius: "4px"
                  }}
                >
                  Go to Kite Dashboard
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="mb-4 font-weight-normal" style={{ color: "#444" }}>
                  {isLoginMode ? "Login to Kite" : "Open a free demat account"}
                </h3>
                <p className="text-muted mb-4 small">
                  {isLoginMode
                    ? "Enter your registered credentials to access your terminal."
                    : "Join 1.5+ crore investors trading with Zerodha."}
                </p>

                {error && (
                  <div className="alert alert-danger py-2 small" role="alert">
                    {error}
                  </div>
                )}

                {!isLoginMode && (
                  <div className="form-group mb-3">
                    <label className="text-muted small mb-1">Full Name</label>
                    <input
                      type="text"
                      className="form-control p-2"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                )}

                {!isLoginMode && (
                  <div className="form-group mb-3">
                    <label className="text-muted small mb-1">Email Address</label>
                    <input
                      type="email"
                      className="form-control p-2"
                      placeholder="name@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                )}

                <div className="form-group mb-3">
                  <label className="text-muted small mb-1">10-Digit Mobile Number</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-muted small">+91</span>
                    <input
                      type="tel"
                      className="form-control p-2"
                      placeholder="e.g. 9876543210"
                      maxLength="10"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                    />
                  </div>
                </div>

                <div className="form-group mb-4">
                  <label className="text-muted small mb-1">Password</label>
                  <input
                    type="password"
                    className="form-control p-2"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 p-2"
                  style={{
                    backgroundColor: "#387ed1",
                    border: "none",
                    fontWeight: "600",
                    fontSize: "1.05rem",
                    borderRadius: "4px"
                  }}
                >
                  {isLoginMode ? "Login" : "Continue"}
                </button>

                <div className="text-center mt-4">
                  <span className="text-muted small">
                    {isLoginMode ? "New to Zerodha? " : "Already have an account? "}
                  </span>
                  <button
                    type="button"
                    className="btn btn-link p-0 small font-weight-bold"
                    style={{ color: "#387ed1", textDecoration: "none" }}
                    onClick={handleModeToggle}
                  >
                    {isLoginMode ? "Sign up now" : "Log in here"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
