import React, { useState } from "react";
import "../login/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = (props) => {
  console.log(props);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [open, setOpen] = useState(false);
  const [ message, setMessage] = useState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const navigate = useNavigate();

  const handleEmail = (e) => {
    console.log("email handler");
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
    console.log("login called");
    axios.post("http://localhost:3004/login", data).then((res) => {
      console.log({ res });
      if(res.data === 'User ID is Banned'){
        setMessage(res.data)
        setOpen(true)
      } else {
        sessionStorage.setItem("jwtToken", res.data.token);
        sessionStorage.setItem("userId", res.data.result._id);
        sessionStorage.setItem("userEmail", res.data.result.email);
        sessionStorage.setItem("userType", res.data.result.userType);
  
        props.onLogin({
          isLoggedIn: true,
          userDetails: res.data.result,
        });
        if (res.data.result.userType === "user") {
          navigate("/userDashboard");
        } else {
          navigate("/adminDashboard");
        }
      }
    })
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
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
          {/* <div className="mb-3">
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
          </div> */}
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleLogin}
            >
              Submit
            </button>
          </div>
          {/* <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p> */}
        </form>
      </div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>    
  );
};
export default Login;
