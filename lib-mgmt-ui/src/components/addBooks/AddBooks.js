import React from "react";
import "../addBooks/AddBooks.css";

const AddBooks = (props) => {
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
            />
          </div>
          <div className="col-md-6 mb-4">
            <label>Author</label>
            <input type="text" className="form-control" placeholder="Author" />
          </div>
          <div className="col-md-6 mb-4">
            <label>Publisher</label>
            <input
              type="text"
              className="form-control"
              placeholder="Publisher"
            />
          </div>
          <div className="col-md-6 mb-4">
            <label>Genre</label>
            <select className="form-control">
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
            />
          </div>
          <div className="col-md-6 mb-4 bookImage">
            <label className="mb-4 ">Book Image</label>
            <input type="file" class="form-control-file" />
          </div>
          <div className="col-md-6 mb-4">
            <label>Serach Keys</label>
            <input
              type="text"
              className="form-control"
              placeholder="Serach Keys"
            />
          </div>
        </div>
        <div className="addBook">
          <button className="btn btn-primary">Add</button>
        </div>
      </div>
    </>
  );
};

export default AddBooks;
