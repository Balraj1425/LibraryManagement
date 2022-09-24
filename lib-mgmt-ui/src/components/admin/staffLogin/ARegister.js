import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ARegister = () => {
  const navigate = useNavigate();

  const nameInputRef = useRef();
  const phoneInputRef = useRef();
  const emailInputRef = useRef();
  const addressInputRef = useRef();
  const passwordInputRef = useRef();
  const [open, setOpen] = useState(false);
  const [ message, setMessage] = useState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const registerHandler = (event) => {
    event.preventDefault();
    let payload = {
      username: nameInputRef.current.value,
      phoneNo: phoneInputRef.current.value,
      email: emailInputRef.current.value,
      address: addressInputRef.current.value,
      password: passwordInputRef.current.value,
      userType: "staff",
    };

    console.log({ payload });
    axios.post("http://localhost:3004/registerStaff", payload).then((res) => {
      console.log(res);
      setMessage("Request send to Admin for approval");
      setOpen(true)
      navigate("/sign-in");
    });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form>
          <h3>Sign Up</h3>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              ref={nameInputRef}
            />
          </div>
          <div className="mb-3">
            <label>Phone</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Enter Phone Number"
              ref={phoneInputRef}
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              ref={emailInputRef}
            />
          </div>
          <div className="mb-3">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              ref={addressInputRef}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              ref={passwordInputRef}
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
              onClick={registerHandler}            >
              Submit
            </button>
          </div>
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

export default ARegister;
