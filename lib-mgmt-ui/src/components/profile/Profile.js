import React, { useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

const Profile = (props) => {
  const [isEditable, setIsEditable] = useState(false);

  const handleEdit = () => {
    setIsEditable(!isEditable);
  };
  return (
    <>
      <section style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle mb-4"
                    style={{ width: "150px" }}
                    fluid
                  />
                  <div className="d-flex justify-content-center mb-2">
                    <MDBBtn outline className="ms-1">
                      Upload Image
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Full Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      {isEditable && (
                        <input type="text" value="Jonathan Smith" />
                      )}
                      {!isEditable && (
                        <MDBCardText className="text-muted">
                          Johnatan Smith
                        </MDBCardText>
                      )}
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      {isEditable && (
                        <input type="text" value="example@example.com" />
                      )}
                      {!isEditable && (
                        <MDBCardText className="text-muted">
                          example@example.com
                        </MDBCardText>
                      )}
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Phone</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      {isEditable && (
                        <input type="text" value="(097) 234-5678" />
                      )}
                      {!isEditable && (
                        <MDBCardText className="text-muted">
                          (097) 234-5678
                        </MDBCardText>
                      )}
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Mobile</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      {isEditable && (
                        <input type="text" value="(097) 234-5678" />
                      )}
                      {!isEditable && (
                        <MDBCardText className="text-muted">
                          (098) 765-4321
                        </MDBCardText>
                      )}
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Address</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      {isEditable && (
                        <input
                          type="text"
                          value="Bay Area, San Francisco, CA"
                        />
                      )}
                      {!isEditable && (
                        <MDBCardText className="text-muted">
                          Bay Area, San Francisco, CA
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
      </section>
    </>
  );
};

export default Profile;
