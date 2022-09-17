import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const columns = [
  { id: "bookName", label: "Book Name", minWidth: 170 },
  { id: "author", label: "Author", minWidth: 100 },
  {
    id: "username",
    label: "User Name",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
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

const IssueRequests = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState();
  const [show, setShow] = useState(false);
  const [decline, setDecline] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [reload, setReload] = useState(false);

  //Handel Modal
  const handleShow = (row) => {
    setShow(true);
    setSelectedUser(row);
    console.log({ row });
  };
  const handleClose = () => setShow(false);

  const declineMessage = (e) => {
    setDecline(e.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handelApprove = (row) => {
    console.log({ row });
    row.allotedBy = sessionStorage.getItem("userId");
    axios
      .post("http://localhost:3004/acceptIssueRequest", row)
      .then((res) => {
        console.log(res.data);
        setReload(!reload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //handelDecline on Modal
  const handelDecline = (e) => {
    console.log({ e });
    e.preventDefault();
    selectedUser.allotedBy = sessionStorage.getItem("userId");
    selectedUser.remarks = decline;
    let payload = {
      userData: selectedUser,
    };
    axios
      .post("http://localhost:3004/declineissueRequest", payload)
      .then((res) => {
        console.log("=========>", res.body);
        if (res) {
          setReload(!reload);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setShow(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3004/getIssueRequests")
      .then((res) => {
        console.log("res", res);
        setRows(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [reload]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Decline Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter reason to decline request</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={decline}
                onChange={declineMessage}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handelDecline}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
      <h1>Issue Request</h1>
      <div>
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
                        <TableRow hover tabIndex={-1} key={index}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            if (column.id === "action") {
                              return (
                                <>
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    <button
                                      className="btn btn-success"
                                      onClick={() => handelApprove(row)}
                                    >
                                      Approve
                                    </button>
                                    <button
                                      className="btn btn-danger"
                                      onClick={() => handleShow(row)}
                                    >
                                      Decline
                                    </button>
                                  </TableCell>
                                </>
                              );
                            } else {
                              return (
                                <TableCell key={column.id} align={column.align}>
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
    </>
  );
};

export default IssueRequests;
