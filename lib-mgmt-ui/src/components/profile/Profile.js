import React, { useRef, useState, useContext, useEffect } from "react";
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
import AuthContext from "../../Context/auth-context";
import axios from "axios";

const Profile = (props) => {
  const ctx = useContext(AuthContext);
  console.log({ ctx });
  const [isEditable, setIsEditable] = useState(false);
  const fileInputRef = useRef();
  const [file, setFile] = useState();
  const [profilImage, setProfileImage] = useState(
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
  );
  const [userDataUpdated, setUserDataUpdated] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:3004/getUserProfileData", {
        email: ctx.loggedInUserData.email,
      })
      .then((userRes) => {
        console.log({ userRes });
        setUserDataUpdated(userRes.data);
        if(userRes.data.userImage && userRes.data.userImage !== ""){
          setProfileImage("images/"+userRes.data.userImage)
        }
      });
  }, []);

  const triggerFileSelector = () => {
    fileInputRef.current.click();
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
    data.append("userId", ctx.loggedInUserData._id);
    data.append("email", ctx.loggedInUserData.email);
    console.log({ data });
    console.log(ctx.loggedInUserData);
    axios
      .post("http://localhost:3004/uploadProfilPic", data, config)
      .then((res) => {
        console.log({ res });
        // setProfileImage("images/"+res.data.userImage)
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
                            value={userDataUpdated.username}
                          />
                        )}
                        {!isEditable && (
                          <MDBCardText className="text-muted">
                            {userDataUpdated.username}
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
                        {isEditable && (
                          <MDBInput
                            label="Email"
                            id="typeText"
                            type="text"
                            value={userDataUpdated.email}
                          />
                        )}
                        {!isEditable && (
                          <MDBCardText className="text-muted">
                            {userDataUpdated.email}
                          </MDBCardText>
                        )}
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
                            value={userDataUpdated.phoneNo}
                          />
                        )}
                        {!isEditable && (
                          <MDBCardText className="text-muted">
                            {userDataUpdated.phoneNo}
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
                            value={userDataUpdated.address}
                          />
                        )}
                        {!isEditable && (
                          <MDBCardText className="text-muted">
                            {userDataUpdated.address}
                          </MDBCardText>
                        )}
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                  <div className="d-flex justify-content-center mb-2">
                    {isEditable && (
                      <MDBBtn outline className="ms-1" onClick={handleEdit}>
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
    </>
  );
};

export default Profile;
