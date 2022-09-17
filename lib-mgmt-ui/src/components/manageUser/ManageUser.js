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

const columns = [
  { id: "username", label: "Name", minWidth: 170 },
  { id: "phoneNo", label: "Phone-No", minWidth: 100, format: (value) => value },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "totalIssuedBook",
    label: "Total Issued Book",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "userFine",
    label: "Fine",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
];

// const rows = [
//   {
//     userName: "Vineet",
//     phoneNo: 999999999,
//     email: "VineetDixit@gmail.com",
//     totalIssuedBook: 3,
//     userFine: 50,
//   },
//   {
//     userName: "Shubham",
//     phoneNo: 999999999,
//     email: "Vinee@gmail.com",
//     totalIssuedBook: 3,
//     userFine: 50,
//   },
//   {
//     userName: "Vikrant",
//     phoneNo: 999999999,
//     email: "Vineett@gmail.com",
//     totalIssuedBook: 3,
//     userFine: 50,
//   },
//   {
//     userName: "Balraj",
//     phoneNo: 999999999,
//     email: "etDixit@gmail.com",
//     totalIssuedBook: 3,
//     userFine: 50,
//   },
//   {
//     userName: "Dixit",
//     phoneNo: 999999999,
//     email: "Vineil.com",
//     totalIssuedBook: 3,
//     userFine: 50,
//   },
//   {
//     userName: "Vivek",
//     phoneNo: 999999999,
//     email: "VineetDl.com",
//     totalIssuedBook: 3,
//     userFine: 50,
//   },
// ];

const ManageUsers = (props) => {
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

  const handelEdit = (e) => {
    console.log(e);
  };
  const handelRemove = (e) => {
    console.log(e);
  };

  //fetch all userdetails++ need to add query for issued books also
  useEffect(() => {
    axios
      .get("http://localhost:3004/getAllUsers")
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
      <h1>Manage Users component</h1>
      <div>
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
                                return (
                                  <>
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                    >
                                      <button
                                        className="btn btn-success"
                                        onClick={() => handelEdit(row)}
                                      >
                                        Ban
                                      </button>
                                      <button
                                        className="btn btn-danger"
                                        onClick={() => handelRemove(row)}
                                      >
                                        Remove
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
};

export default ManageUsers;
