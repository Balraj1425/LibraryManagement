import React, { useEffect, useRef, useState } from "react";
import "../addBooks/AddBooks.css";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddBooks = (props) => {
  const bookNameInputRef = useRef();
  const authorInputRef = useRef();
  const publisherInputRef = useRef();
  const genreInputRef = useRef();
  const noOfCopiesInputRef = useRef();
  const imgFile = useRef();
  const searchKeyInputRef = useRef();
  const [file, setFile] = useState();

  const albooksData = [];

  const imgHandler = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const [open, setOpen] = React.useState(false);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const config = {
    headers: {
      "jwt-token": sessionStorage.getItem("jwtToken"),
    },
  };

  const addBookHandler = (e) => {
    e.preventDefault();
    // action="http://localhost:3004/addBook"
    const data = new FormData();
    data.append("bookName", bookNameInputRef.current.value);
    data.append("author", authorInputRef.current.value);
    data.append("publisher", publisherInputRef.current.value);
    data.append("genre", genreInputRef.current.value);
    data.append("noOfCopies", noOfCopiesInputRef.current.value);
    data.append("searchKey", searchKeyInputRef.current.value);
    data.append("file", file);

    console.log(data);
    axios.post("http://localhost:3004/addBook", data, config).then((res) => {
      console.log(res);
      bookNameInputRef.current.value = "";
      authorInputRef.current.value = "";
      publisherInputRef.current.value = "";
      genreInputRef.current.value = "";
      noOfCopiesInputRef.current.value = "";
      searchKeyInputRef.current.value = "";
      setFile("");
      setOpen(true);
    });
  };



  return (
    <>
      <div className="container">
        <h1 className="addBook mb-4">Add Book</h1>
        <div className="row">
          <div className="col-md-6 mb-4">
            <label>Book Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Book Name"
              ref={bookNameInputRef}
            />
          </div>
          <div className="col-md-6 mb-4">
            <label>Author</label>
            <input
              type="text"
              className="form-control"
              placeholder="Author"
              ref={authorInputRef}
            />
          </div>
          <div className="col-md-6 mb-4">
            <label>Publisher</label>
            <input
              type="text"
              className="form-control"
              placeholder="Publisher"
              ref={publisherInputRef}
            />
          </div>
          <div className="col-md-6 mb-4">
            <label>Genre</label>
            <select className="form-control" ref={genreInputRef}>
              <option selected>Select Genre</option>
              <option>Comedy</option>
              <option>Drama</option>
              <option>Action</option>
              <option>Horror</option>
              <option>Thriller</option>
              <option>Science Fiction</option>
              <option>Crime</option>
              <option>Romance</option>
              <option>Documentary</option>
              <option>Mystery</option>
              <option>History</option>
              <option>Sports</option>
              <option>Animation</option>
            </select>
          </div>
          <div className="col-md-6 mb-4">
            <label>No Of Copies</label>
            <input
              type="Number"
              className="form-control"
              placeholder="No Of Copies"
              ref={noOfCopiesInputRef}
            />
          </div>
          <div className="col-md-6 mb-4 bookImage">
            <label className="mb-4 ">Book Image</label>
            <input
              type="file"
              name="imgFile"
              id="imgFile"
              class="form-control-file"
              onChange={imgHandler}
            />
          </div>
          <div className="col-md-6 mb-4">
            <label>Serach Keys</label>
            <input
              type="text"
              className="form-control"
              placeholder="Serach Keys"
              ref={searchKeyInputRef}
            />
          </div>
        </div>
        <div className="addBook">
          {/* <input type="submit"/> */}
          <button className="btn btn-primary" onClick={addBookHandler}>
            Add
          </button>
        </div>
        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Book Added Successfully
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default AddBooks;
