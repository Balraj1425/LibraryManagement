import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

// bookName: "Harry Potter",
//       bookId: 2,
//       author: "JK Rowling",
//       status: true,
//       searchKey: ["harry", "Potter", "Jk", "Rowling", "goblet"],
//       bookType: "fiction",
//       publisher: "abc publisher",
//       bookImage: "/Images/harry.jpg",
//       noOfCopies: 11,
//       availableCopies: 5,
const columns = [
  { id: "bookName", label: "Book Name", minWidth: 170, align: "center" },
  { id: "author", label: "Author", minWidth: 100, align: "center" },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "noOfCopies",
    label: "No Of Copies",
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
];

const rows = [
  {
    bookName: "Harry Potter",
    bookId: 1,
    author: "JK Rowling",
    status: true,
    searchKey: ["harry", "Potter", "Jk", "Rowling", "goblet"],
    bookType: "fiction",
    publisher: "abc publisher",
    bookImage: "/Images/harry.jpg",
    noOfCopies: 11,
    availableCopies: 5,
  },
  {
    bookName: "Harry Potter",
    bookId: 2,
    author: "JK Rowling",
    status: true,
    searchKey: ["harry", "Potter", "Jk", "Rowling", "goblet"],
    bookType: "fiction",
    publisher: "abc publisher",
    bookImage: "/Images/harry.jpg",
    noOfCopies: 11,
    availableCopies: 5,
  },
  {
    bookName: "Harry Potter",
    bookId: 3,
    author: "JK Rowling",
    status: true,
    searchKey: ["harry", "Potter", "Jk", "Rowling", "goblet"],
    bookType: "fiction",
    publisher: "abc publisher",
    bookImage: "/Images/harry.jpg",
    noOfCopies: 11,
    availableCopies: 5,
  },
  {
    bookName: "Harry Potter",
    bookId: 4,
    author: "JK Rowling",
    status: true,
    searchKey: ["harry", "Potter", "Jk", "Rowling", "goblet"],
    bookType: "fiction",
    publisher: "abc publisher",
    bookImage: "/Images/harry.jpg",
    noOfCopies: 11,
    availableCopies: 5,
  },
  {
    bookName: "Harry Potter",
    bookId: 5,
    author: "JK Rowling",
    status: true,
    searchKey: ["harry", "Potter", "Jk", "Rowling", "goblet"],
    bookType: "fiction",
    publisher: "abc publisher",
    bookImage: "/Images/harry.jpg",
    noOfCopies: 11,
    availableCopies: 5,
  },
  {
    bookName: "Harry Potter",
    bookId: 6,
    author: "JK Rowli",
    status: true,
    searchKey: ["harry", "Potter", "Jk", "Rowling", "goblet"],
    bookType: "fiction",
    publisher: "abc publisher",
    bookImage: "/Images/harry.jpg",
    noOfCopies: 11,
    availableCopies: 5,
  },
  {
    bookName: "Harry Potter",
    bookId: 7,
    author: "JK Rowling",
    status: true,
    searchKey: ["harry", "Potter", "Jk", "Rowling", "goblet"],
    bookType: "fiction",
    publisher: "abc publisher",
    bookImage: "/Images/harry.jpg",
    noOfCopies: 11,
    availableCopies: 5,
  },
];

const UserIssuedbooks = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <h1>Currently Issued Books</h1>
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
                {rows
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
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
};

export default UserIssuedbooks;
