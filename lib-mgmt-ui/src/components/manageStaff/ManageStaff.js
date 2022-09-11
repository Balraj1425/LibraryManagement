import React, { useEffect, useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "username", label: "Name", minWidth: 170 },
  { id: "phoneNo", label: "Phone-No", minWidth: 100 },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
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
//     username: "Vineet",
//     phoneNo: 999999999,
//     email: "VineetDixit@gmail.com",
//   },
//   {
//     username: "Shubham",
//     phoneNo: 999999999,
//     email: "Vinee@gmail.com",
//   },
//   {
//     username: "Vikrant",
//     phoneNo: 999999999,
//     email: "Vineett@gmail.com",
//   },
//   {
//     username: "Balraj",
//     phoneNo: 999999999,
//     email: "etDixit@gmail.com",
//   },
//   {
//     username: "Dixit",
//     phoneNo: 999999999,
//     email: "Vineil.com",
//   },
//   {
//     username: "Vivek",
//     phoneNo: 999999999,
//     email: "VineetDl.com",
//   },
// ];

const ManageStaff = (props) => {
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

  //fetch all Staffdetails++ need to add query for issued books also
  useEffect(() => {
    axios
      .get("http://localhost:3004/getAllStaffs")
      .then((res) => {
        console.log("res", res);
        setRows(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  console.log("staffDetails", rows);

  return (
    <>
      <h1>Manage Staff component</h1>
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
                                        Edit
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

export default ManageStaff;
