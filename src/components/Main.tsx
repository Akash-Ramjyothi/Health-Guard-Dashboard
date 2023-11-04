import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./Login.css";
import healthGuardLogo from "./safety.png";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import {
  AccountCircle,
  Visibility,
  VisibilityOff,
  Lock,
} from "@mui/icons-material";
import { Route, Outlet, Link } from "react-router-dom";

interface PasswordInputProps {
  label: string;
}

function Main() {
  const navigate = useNavigate();

  const goToDashboardPage = () => {
    // This will navigate to first component
    navigate("/dashboard");
  };

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="App">
      {/* <header className="App-header">
        <p>Main components</p>
        <button onClick={goToDashboardPage}>go to 1st </button>
      </header> */}
      <div className="product-title">
        <img src={healthGuardLogo} width="100px" height="100px" alt="Logo" />
        <div className="product-text">Health Guard</div>
      </div>
      <div className="login-container">
        <div className="login-banner">
          <div className="login-text">Admin Login</div>
        </div>
        <div className="input-fields-wrapper">
          <div className="username-wrapper">
            <AccountCircle
              style={{
                color: "#088f8f",
                fontSize: "40px",
                marginRight: "10px",
              }}
            />
            {/* Username Input Field */}
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              placeholder="Enter Username"
              style={{ width: "280px" }}
            />
          </div>
          <div className="password-wrapper">
            <Lock
              style={{
                color: "#088f8f",
                fontSize: "40px",
                marginRight: "10px",
              }}
            />
            {/* Password Input Field */}
            <TextField
              label={"Password"}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              style={{ width: "280px" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          {/* Use the "to" prop to navigate to the /dashboard route */}
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              onClick={goToDashboardPage}
              style={{
                width: "250px",
                height: "50px",
                fontWeight: "600",
                fontSize: "18px",
                background: "#088f8f",
                borderRadius: "10px",
                marginTop: "100px",
              }}
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Main;
