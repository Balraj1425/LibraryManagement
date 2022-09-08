import React, { useState } from "react";
import "../login/Login.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleEmail = (e) => {
    console.log("email handler")
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let data = {
      email: email,
      password: password,
    };
    console.log(data)
    axios.post("http://localhost:3004/login", data).then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      <form>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={handleEmail}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={handlePassword}
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleLogin}
          >
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    </>
  );
};
export default Login;
