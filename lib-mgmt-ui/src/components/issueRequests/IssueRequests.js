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

// const rows = [
//   {
//     bookName: "Harry Potter",
//     author: "J.K Rowlings",
//     userName: "Vineet",
//     availableCopies: 5,
//   },
//   {
//     bookName: "Harry Potter",
//     author: "J.K Rowlings",
//     userName: "Vineet",
//     availableCopies: 5,
//   },
//   {
//     bookName: "Harry Potter",
//     author: "J.K Rowlings",
//     userName: "Vineet",
//     availableCopies: 5,
//   },
//   {
//     bookName: "Harry Potter",
//     author: "J.K Rowlings",
//     userName: "Vineet",
//     availableCopies: 5,
//   },
//   {
//     bookName: "Harry Potter",
//     author: "J.K Rowlings",
//     userName: "Vineet",
//     availableCopies: 5,
//   },
//   {
//     bookName: "Harry Potter",
//     author: "J.K Rowlings",
//     userName: "Vineet",
//     availableCopies: 5,
//   },
// ];

const IssueRequests = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handelApprove = (e) => {
    console.log("Approve");
    console.log(e);
  };
  const handelDecline = (e) => {
    console.log("Decline");
    console.log(e);
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
  }, []);

  return (
    <>
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
                                      onClick={() => handelDecline(row)}
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
