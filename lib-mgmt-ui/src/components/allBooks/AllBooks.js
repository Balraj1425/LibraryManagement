import React, { useContext, useEffect, useState } from "react";
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
import AuthContext from "../../Context/auth-context";

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

// const rows = [
//   {
//     bookName: "Harry Potter",
//     bookId: 1,
//     author: "JK Rowling",
//     status: true,
//     searchKey: ["harry", "Potter", "Jk", "Rowling", "goblet"],
//     bookType: "fiction",
//     publisher: "abc publisher",
//     bookImage: "/Images/harry.jpg",
//     noOfCopies: 11,
//     availableCopies: 5,
//   },
//   {
//     bookName: "Harry Potter",
//     bookId: 2,
//     author: "JK Rowling",
//     status: true,
//     searchKey: ["harry", "Potter", "Jk", "Rowling", "goblet"],
//     bookType: "fiction",
//     publisher: "abc publisher",
//     bookImage: "/Images/harry.jpg",
//     noOfCopies: 11,
//     availableCopies: 5,
//   },
//   {
//     bookName: "Harry Potter",
//     bookId: 3,
//     author: "JK Rowling",
//     status: true,
//     searchKey: ["harry", "Potter", "Jk", "Rowling", "goblet"],
//     bookType: "fiction",
//     publisher: "abc publisher",
//     bookImage: "/Images/harry.jpg",
//     noOfCopies: 11,
//     availableCopies: 5,
//   },
//   {
//     bookName: "Harry Potter",
//     bookId: 4,
//     author: "JK Rowling",
//     status: true,
//     searchKey: ["harry", "Potter", "Jk", "Rowling", "goblet"],
//     bookType: "fiction",
//     publisher: "abc publisher",
//     bookImage: "/Images/harry.jpg",
//     noOfCopies: 11,
//     availableCopies: 5,
//   },
//   {
//     bookName: "Harry Potter",
//     bookId: 5,
//     author: "JK Rowling",
//     status: true,
//     searchKey: ["harry", "Potter", "Jk", "Rowling", "goblet"],
//     bookType: "fiction",
//     publisher: "abc publisher",
//     bookImage: "/Images/harry.jpg",
//     noOfCopies: 11,
//     availableCopies: 5,
//   },
//   {
//     bookName: "Harry Potter",
//     bookId: 6,
//     author: "JK Rowli",
//     status: true,
//     searchKey: ["harry", "Potter", "Jk", "Rowling", "goblet"],
//     bookType: "fiction",
//     publisher: "abc publisher",
//     bookImage: "/Images/harry.jpg",
//     noOfCopies: 11,
//     availableCopies: 5,
//   },
//   {
//     bookName: "Harry Potter",
//     bookId: 7,
//     author: "JK Rowling",
//     status: true,
//     searchKey: ["harry", "Potter", "Jk", "Rowling", "goblet"],
//     bookType: "fiction",
//     publisher: "abc publisher",
//     bookImage: "/Images/harry.jpg",
//     noOfCopies: 11,
//     availableCopies: 5,
//   },
// ];

export default function AllBooks() {
  const ctx = useContext(AuthContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState();
  console.log(ctx.loggedInUserData.userType)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handelApprove = (e) => {
    console.log(e);
  };

  const handelDecline = (e) => {
    console.log(e);
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
  }, []);

  return (
    <>
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
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
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
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
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
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            {
                              if (column.id === "action") {
                                if (ctx.loggedInUserData.userType != "user") {
                                  return (
                                    <>
                                      <TableCell
                                        key={column.id}
                                        align={column.align}
                                      >
                                        {/* {userType === ""} */}
                                        <button
                                          className="btn btn-success"
                                          onClick={() => handelApprove(row)}
                                        >
                                          Edit
                                        </button>
                                        <span>&nbsp;</span>
                                        <button
                                          className="btn btn-danger"
                                          onClick={() => handelDecline(row)}
                                        >
                                          Delete
                                        </button>
                                      </TableCell>
                                    </>
                                  );
                                } else {
                                  return (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                    >
                                      <button
                                        className="btn btn-success"
                                        onClick={() => handelApprove(row)}
                                      >
                                        Issue Book
                                      </button>
                                    </TableCell>
                                  );
                                }
                              } else {
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {column.format && typeof value === "number"
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                                );
                              }
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
}
