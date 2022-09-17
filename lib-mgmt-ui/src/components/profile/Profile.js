import React, { useRef, useState, useEffect } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import "../profile/Profile.css";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Profile = (props) => {
  const [isEditable, setIsEditable] = useState(false);
  const fileInputRef = useRef();
  const [file, setFile] = useState();

  // const imageCondition = props.userData.userImage
  //   ? "images/" + props.userData.userImage
  //   : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp";

  const [profilImage, setProfileImage] = useState(
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
  );
  const [userDataUpdated, setUserDataUpdated] = useState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setaddress] = useState();
  const [open, setOpen] = useState(false);

  console.log({ userDataUpdated });

  const userNameHandler = (e) => {
    setUserName(e.target.value);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const phoneHandler = (e) => {
    setPhone(e.target.value);
  };
  const addressHandler = (e) => {
    setaddress(e.target.value);
  };

  useEffect(() => {
    axios
      .post("http://localhost:3004/getUserProfileData", {
        email: sessionStorage.getItem("userEmail"),
      })
      .then((userRes) => {
        console.log({ userRes });
        setUserDataUpdated(userRes.data);
        setUserName(userRes.data.username);
        setEmail(userRes.data.email);
        setPhone(userRes.data.phoneNo);
        setaddress(userRes.data.address);
        if (userRes.data.userImage && userRes.data.userImage !== "") {
          setProfileImage("images/" + userRes.data.userImage);
        }
      });
  }, []);

  const triggerFileSelector = () => {
    fileInputRef.current.click();
  };

  const updateHandler = () => {
    const payload = {
      username: userName,
      phoneNo: phone,
      address: address,
      userId: userDataUpdated._id,
    };
    axios
      .put("http://localhost:3004/updateDetails", payload)
      .then((res) => {
        console.log({ res });
        setOpen(true);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleEdit = () => {
    setIsEditable(!isEditable);
  };

  const config = {
    headers: {
      "jwt-token": sessionStorage.getItem("jwtToken"),
    },
  };

  //getting error, ctx gets empty and page gets reloaded
  const imgHandler = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFile(file);
    const data = new FormData();
    data.append("file", file);
    //add user id from context
    data.append("userId", sessionStorage.getItem("userId"));
    data.append("email", sessionStorage.getItem("userEmail"));
    console.log({ data });

    axios
      .post("http://localhost:3004/uploadProfilPic", data, config)
      .then((res) => {
        console.log({ res });
        setProfileImage("images/" + res.data.userImage);
        // setUserDataUpdated(res.data);
      });
  };

  return (
    <>
      <section style={{ backgroundColor: "#eee" }}>
        {userDataUpdated && (
          <MDBContainer className="py-5">
            <MDBRow>
              <MDBCol lg="4">
                <MDBCard className="mb-4">
                  <MDBCardBody className="text-center">
                    <MDBCardImage
                      src={profilImage}
                      alt="avatar"
                      className="rounded-circle mb-4"
                      style={{ width: "150px" }}
                      fluid
                    />
                    <div className="d-flex justify-content-center mb-2">
                      <MDBBtn
                        outline
                        className="ms-1"
                        onClick={triggerFileSelector}
                      >
                        Upload Image
                      </MDBBtn>
                      <input
                        type="file"
                        name="imgFile"
                        id="imgFile"
                        className="form-control-file hide-element"
                        ref={fileInputRef}
                        onChange={imgHandler}
                      />
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol lg="8">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <MDBRow className="inputFields">
                      <MDBCol sm="3">
                        <MDBCardText>Full Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        {isEditable && (
                          <MDBInput
                            label="Name"
                            id="typeText"
                            type="text"
                            value={userName}
                            onChange={userNameHandler}
                            // value="uhdjisdjdj"
                          />
                        )}
                        {!isEditable && (
                          <MDBCardText className="text-muted">
                            {userName}
                            {/* jhjjk */}
                          </MDBCardText>
                        )}
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow className="inputFields">
                      <MDBCol sm="3">
                        <MDBCardText>Email</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {email}
                          {/* value="uhdjisdjdj" */}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow className="inputFields">
                      <MDBCol sm="3">
                        <MDBCardText>Phone</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        {isEditable && (
                          <MDBInput
                            label="Phone"
                            id="typeText"
                            type="text"
                            value={phone}
                            onChange={phoneHandler}
                            // value="uhdjisdjdj"
                          />
                        )}
                        {!isEditable && (
                          <MDBCardText className="text-muted">
                            {phone}
                            {/* uhdjisdjdj */}
                          </MDBCardText>
                        )}
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    {/* <MDBRow className="inputFields">
                    <MDBCol sm="3">
                      <MDBCardText>Mobile</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      {isEditable && (
                        <MDBInput
                          label="Mobile"
                          id="typeText"
                          type="text"
                          value="(098) 765-4321"
                        />
                      )}
                      {!isEditable && (
                        <MDBCardText className="text-muted">
                          (098) 765-4321
                        </MDBCardText>
                      )}
                    </MDBCol>
                  </MDBRow>
                  <hr /> */}
                    <MDBRow className="inputFields">
                      <MDBCol sm="3">
                        <MDBCardText>Address</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        {isEditable && (
                          <MDBInput
                            label="Address"
                            id="typeText"
                            type="text"
                            value={address}
                            onChange={addressHandler}

                            // value="uhdjisdjdj"
                          />
                        )}
                        {!isEditable && (
                          <MDBCardText className="text-muted">
                            {address}
                            {/* ioioioioioio */}
                          </MDBCardText>
                        )}
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                  <div className="d-flex justify-content-center mb-2">
                    {isEditable && (
                      <MDBBtn outline className="ms-1" onClick={updateHandler}>
                        Update
                      </MDBBtn>
                    )}
                    <MDBBtn outline className="ms-1" onClick={handleEdit}>
                      {isEditable ? "Cancel" : "Edit"}
                    </MDBBtn>
                  </div>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        )}
      </section>
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          User Data Updated Successfully
        </Alert>
      </Snackbar>
    </>
  );
};

export default Profile;
