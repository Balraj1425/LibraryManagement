import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  // const [username, setUsername] = useState();
  // const [phone, setPhone] = useState();
  // const [email, setEmail] = useState();
  // const [address, setAddress] = useState();
  // const [password, setPassword] = useState();
  const nameInputRef = useRef();
  const phoneInputRef = useRef();
  const emailInputRef = useRef();
  const addressInputRef = useRef();
  const passwordInputRef = useRef();

  const registerHandler = (event) => {
    event.preventDefault();
    let payload = {
      username: nameInputRef.current.value,
      phoneNo: phoneInputRef.current.value,
      email: emailInputRef.current.value,
      address: addressInputRef.current.value,
      password: passwordInputRef.current.value,
      userType: "user",
    };

    console.log({ payload });
    axios.post("http://localhost:3004/register", payload).then((res) => {
      console.log(res);
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
              onClick={registerHandler}
            >
              Submit
            </button>
          </div>
          <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
