import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import "../allBooks/AllBooks.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const columns = [
  { id: "bookName", label: "Book Name", minWidth: 170 },
  { id: "author", label: "Author", minWidth: 100 },
  {
    id: "noOfCopies",
    label: "No Of Copies",
    minWidth: 170,
    align: "center",
    format: (value) => value,
  },
  {
    id: "availableCopies",
    label: "Available Copies",
    minWidth: 170,
    align: "center",
    format: (value) => value,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "center",
    format: (value) => value,
  },
];

export default function AllBooks(props) {
  // const ctx = useContext(AuthContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState();
  const [show, setShow] = useState(false);
  const [detailData, setDetailData] = useState();
  const [modalShow, setModalShow] = React.useState(false);
  const [reload, setReload] = useState(false);

  // const searchInputRef = useRef();
  const [searchKey, setSearchKey] = useState("");
  const [bookNameInputRef, setbookNameInputRef] = useState();
  const [authorInputRef, setauthorInputRef] = useState();
  const [publisherInputRef, setpublisherInputRef] = useState();
  const [searchKeyInputRef, setsearchKeyInputRef] = useState();
  const [noOfCopiesInputRef, setnoOfCopiesInputRef] = useState();
  const [bookId, setBookId] = useState();
  const [open, setOpen] = useState(false);
  const [ message, setMessage] = useState();

  // const bookNameInputRef = useRef();
  // const authorInputRef = useRef();
  // const publisherInputRef = useRef();
  // const noOfCopiesInputRef = useRef();
  // const searchKeyInputRef = useRef();

  const handelSearch = (e) => {
    e.preventDefault();
    console.log("hh", searchKey);

    axios
      .post("http://localhost:3004/getSearchBook", { searchKey: searchKey })
      .then((res) => {
        setRows(res.data);
        console.log("SEARCHbOOK", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditBook = (row) => {
    console.log({ row });
    setModalShow(true);
    setbookNameInputRef(row.bookName);
    setauthorInputRef(row.author);
    setpublisherInputRef(row.publisher);
    setsearchKeyInputRef(row.searchKey);
    setnoOfCopiesInputRef(row.noOfCopies);
    setBookId(row._id);
  };

  const handleChangeBookName = (e) => {
    setbookNameInputRef(e.target.value);
  };
  const handleChangeAuthor = (e) => {
    setauthorInputRef(e.target.value);
  };
  const handleChangeNoOfCopies = (e) => {
    setnoOfCopiesInputRef(e.target.value);
  };
  const handleChangePublisher = (e) => {
    setpublisherInputRef(e.target.value);
  };
  const handleChangeSearchKey = (e) => {
    setsearchKeyInputRef(e.target.value);
  };

  const handleDeleteBook = (row) => {
    console.log({row});
    axios
      .post("http://localhost:3004/deleteBook", {_id:row._id})
      .then((res) => {
        console.log({ res });
        if (res) {
          setReload(!reload);
          setMessage("Book Deleted Successfully");
          setOpen(true)
        }
      })
      .catch((err) => {
        console.log({ err });
      });

  };

  const updateBookData = (e) => {
    e.preventDefault();
    const payload = {
      _id: bookId,
      bookName: bookNameInputRef,
      author: authorInputRef,
      noOfCopies: noOfCopiesInputRef,
      publisher: publisherInputRef,
      searchKey: searchKeyInputRef,
    };

    axios
      .post("http://localhost:3004/updateBooks", payload)
      .then((res) => {
        console.log({ res });
        if (res) {
          setModalShow(false);
          setReload(!reload);
          setMessage("Book Updated Successfully");
          setOpen(true)
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const handelIssueBooks = (data) => {
    data.bookImage = "images/" + data.bookImage;
    let date = new Date();
    let month = parseInt(date.getMonth()) + 1;
    let strDate = date.getDate() + "-" + month + "-" + date.getFullYear();
    data.issueDate = strDate;
    const returndate = new Date();

    returndate.setDate(returndate.getDate() + 7);
    let returnmonth = parseInt(returndate.getMonth()) + 1;
    data.returnDate =
      returndate.getDate() + "-" + returnmonth + "-" + returndate.getFullYear();
    console.log({ data });
    setDetailData(data);
    setShow(true);
  };
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSearch = (e) => {
    setSearchKey(e.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3004/getallbooks")
      .then((res) => {
        console.log("res", res);
        setRows(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [reload]);

  const issueHandler = () => {
    console.log("issuehandler");
    console.log(detailData);
    let payload = {
      userId: sessionStorage.getItem("userId"),
      bookData: detailData,
    };
    setShow(false);
    axios
      .post("http://localhost:3004/issueBookRequest", payload)
      .then((res) => {
        console.log({res});
        setMessage("Book isse request send to Admin");
        setOpen(true)
      });
  };

  return (
    <>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <div className="row">
            <div className="col-md-6 mb-4">
              <label>Book Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Book Name"
                // ref={bookNameInputRef}
                name="bookName"
                value={bookNameInputRef}
                onChange={handleChangeBookName}
              />
            </div>
            <div className="col-md-6 mb-4">
              <label>Author</label>
              <input
                type="text"
                className="form-control"
                placeholder="Author"
                // ref={authorInputRef}
                name="author"
                value={authorInputRef}
                onChange={handleChangeAuthor}
              />
            </div>
            <div className="col-md-6 mb-4">
              <label>Publisher</label>
              <input
                type="text"
                className="form-control"
                placeholder="Publisher"
                // ref={publisherInputRef}
                name="publisher"
                value={publisherInputRef}
                onChange={handleChangePublisher}
              />
            </div>
            <div className="col-md-6 mb-4">
              <label>No Of Copies</label>
              <input
                type="Number"
                className="form-control"
                placeholder="No Of Copies"
                // ref={noOfCopiesInputRef}
                name="noOfCopies"
                value={noOfCopiesInputRef}
                onChange={handleChangeNoOfCopies}
              />
            </div>
            <div className="col-md-6 mb-4">
              <label>Serach Keys</label>
              <input
                type="text"
                className="form-control"
                placeholder="Serach Keys"
                // ref={searchKeyInputRef}
                name="searchKey"
                value={searchKeyInputRef}
                onChange={handleChangeSearchKey}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>setModalShow(false)}>Cancel</Button>
          <Button onClick={updateBookData}>Update</Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            {detailData && (
              <div className="vh-50">
                <MDBContainer>
                  <MDBRow className="">
                    <MDBCol className="mt-2 mb-2">
                      <MDBCard style={{ borderRadius: "15px" }}>
                        <MDBCardBody className="p-4">
                          <div className="d-flex text-black">
                            <div className="flex-shrink-0">
                              <MDBCardImage
                                style={{ width: "180px", borderRadius: "10px" }}
                                src={detailData.bookImage}
                                alt="Generic placeholder image"
                                fluid
                              />
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <MDBCardTitle>{detailData.bookName}</MDBCardTitle>
                              <MDBCardText>{detailData.author}</MDBCardText>

                              <div
                                className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                style={{ backgroundColor: "#efefef" }}
                              >
                                <div>
                                  <p className="small text-muted mb-1">
                                    Amount
                                  </p>
                                  <p className="mb-0">Rs 20</p>
                                </div>
                                <div className="px-3">
                                  <p className="small text-muted mb-1">
                                    Issue Date
                                  </p>
                                  <p className="mb-0">{detailData.issueDate}</p>
                                </div>
                                <div>
                                  <p className="small text-muted mb-1">
                                    Return Date
                                  </p>
                                  <p className="mb-0">
                                    {detailData.returnDate}
                                  </p>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-8">
                                  <label>Card Holder Name</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Card Holder Name"
                                  />
                                </div>
                                <div className="col-md-10 mb-4">
                                  <label>Card Number</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Card Number"
                                  />
                                </div>
                                <div className="col-md-6 mb-4">
                                  <label>Expiration Date</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="mm/yy"
                                  />
                                </div>
                                <div className="col-md-2 mb-4">
                                  <label>CVV</label>
                                  <input
                                    type="password"
                                    className="form-control"
                                    maxLength="3"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </MDBContainer>
              </div>
            )}
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="btn btn-success" onClick={issueHandler}>
            Pay and Issue Now
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="searchDiv">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search All Books"
            inputProps={{ "aria-label": "Search All Books" }}
            // ref={searchInputRef}
            onChange={handleSearch}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={handelSearch}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
      <div className="allBookTable">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableCell
                      key={index}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows &&
                  rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
                          {columns.map((column, index) => {
                            const value = row[column.id];

                            if (column.id === "action") {
                              if (
                                sessionStorage.getItem("userType") !== "user"
                              ) {
                                return (
                                  <>
                                    <TableCell key={index} align={column.align}>
                                      {/* {userType === ""} */}
                                      <button
                                        className="btn btn-success"
                                        onClick={() => handleEditBook(row)}
                                      >
                                        Edit
                                      </button>
                                      <span>&nbsp;</span>
                                      <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteBook(row)}
                                      >
                                        Delete
                                      </button>
                                    </TableCell>
                                  </>
                                );
                              } else {
                                return (
                                  <TableCell
                                    key={index}
                                    align={column.align}
                                  >
                                    <button
                                      className="btn btn-success"
                                      onClick={() => handelIssueBooks(row)}
                                    >
                                      Issue Book
                                    </button>
                                  </TableCell>
                                );
                              }
                            } else {
                              return (
                                <TableCell key={index} align={column.align}>
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            }
                          })}
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
          {rows && (
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Paper>
      </div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
