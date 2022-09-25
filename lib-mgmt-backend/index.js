const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const { Console } = require("console");

const port = "3004";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const hashKey = "thisIsMyHashKey";
const jwtSecretKey = "thisIsMyJwtSecretKey";

//creating connection with database
mongoose
  .connect(
    "mongodb+srv://admin:99wxPFtXiMqJKvvy@cluster0.3r0nanf.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DataBase connected");
  })
  .catch((err) => {
    console.log("Failed to connect to DataBase");
  });

//Establishing a connection
const connection = mongoose.connection;

//Creating a Schema for database

//User Registration Details
const UserDetails = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  userType: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  phoneNo: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  accessToken: {
    type: String,
  },
  banStatus: {
    type: Boolean,
    require: true,
    default: false,
  },
  userImage: {
    type: String,
  },
  approvalStatus: {
    type: Boolean,
    default: false,
  },
});

//Book Repo schema
const BookRepo = new mongoose.Schema({
  bookName: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  status: {
    type: Boolean,
    require: true,
  },
  searchKey: {
    type: String,
    require: true,
  },
  bookType: {
    type: String,
    require: true,
  },
  publisher: {
    type: String,
    require: true,
  },
  bookImage: {
    type: String,
    require: true,
  },
  noOfCopies: {
    type: Number,
    require: true,
  },
  availableCopies: {
    type: Number,
    require: true,
  },
});

//Booking details schema
const BookingDetails = new mongoose.Schema({
  bookId: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
  issueDate: {
    type: String,
    require: true,
  },
  returnDate: {
    type: String,
    require: true,
  },
  lateFee: {
    type: Number,
  },
  durationOfBooking: {
    type: String,
  },
  allotedBy: {
    type: String,
  },
  returnStatus: {
    type: Boolean,
  },
  approvalStatus: {
    type: String,
  },
  bookRent: {
    type: Number,
  },
  remarks: {
    type: String,
  },
});

//Creating a Model of a schema into a Database
const USERDETAILS = connection.model("usersdetail", UserDetails);
const BOOKREPO = connection.model("bookrepo", BookRepo);
const BOOKINGDETAILS = connection.model("bookingdetails", BookingDetails);

app.get("/hello", (req, res) => {
  res.send("hello");
});

//route for login
app.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log("Please fill all the details");
      res.send({ message: "Please fill all the details" });
    } else {
      USERDETAILS.findOne({ email: email }, (err, result) => {
        if (result) {
          if (result.approvalStatus) {
            if (!result.banStatus) {
              req.body.password = crypto
                .createHash("sha256", hashKey)
                .update(req.body.password)
                .digest("hex");

              if (req.body.password === result.password) {
                //create jwt token
                let data = {
                  email: req.body.email,
                  userType: req.body.userType,
                  time: Date(),
                };
                const jwtToken = jwt.sign(data, jwtSecretKey);
                let resultpayload = {
                  result: result,
                  token: jwtToken,
                };
                // console.log(resultpayload);
                res.send(resultpayload);
              } else {
                res.status(400).send("user is banned");
              }
            } else {
              res.send("User ID is Banned");
            }
          } else {
            res.send("Appraval pending");
          }
        } else {
          res.send("Invalid User");
        }
      });
    }
  } catch (error) {}
});

//route for user registration
app.post("/register", (req, res) => {
  try {
    const { username, phoneNo, email, address, password, userType } = req.body;
    if (!username || !phoneNo || !email || !password || !address || !userType) {
      console.log("Please fill all the details");
      res.status(422).send("Please fill all the Details");
    }
    req.body.approvalStatus = true;

    //check if user exist or not
    USERDETAILS.findOne({ email: email }, (err, result) => {
      if (result) {
        res.status(409).send("User already exist");
      } else {
        //saving reqbody into a variable to save into database
        const values = new USERDETAILS(req.body);

        //hashing for password
        values.password = crypto
          .createHash("sha256", hashKey)
          .update(req.body.password)
          .digest("hex");

        //save user to database
        values.save((err) => {
          if (err) {
            res.send(err);
          } else {
            res.send("User Registered");
          }
        });
      }
    });
  } catch (error) {}
});

//Routes for Staff Registration
app.post("/registerStaff", (req, res) => {
  try {
    const { username, phoneNo, email, address, password, userType } = req.body;
    if (!username || !phoneNo || !email || !password || !address || !userType) {
      console.log("Please fill all the details");
      res.status(422).send("Please fill all the Details");
    }

    //check if user exist or not
    USERDETAILS.findOne({ email: email }, (err, result) => {
      if (result) {
        res.status(409).send("User already exist");
      } else {
        //saving reqbody into a variable to save into database
        const values = new USERDETAILS(req.body);

        //hashing for password
        values.password = crypto
          .createHash("sha256", hashKey)
          .update(req.body.password)
          .digest("hex");

        //save user to database
        values.save((err) => {
          if (err) {
            res.send(err);
          } else {
            res.send("Staff Registered");
          }
        });
      }
    });
  } catch (error) {}
});

//route to add books
//multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../lib-mgmt-ui/public/images");
  },
  filename: (req, file, cb) => {
    // console.log(file);
    cb(
      null,
      Date.now() +
        path.parse(file.originalname).name +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.post("/addBook", upload.single("file"), (req, res) => {
  const token = req.header("jwt-token");
  const verified = jwt.verify(token, jwtSecretKey);
  if (verified) {
    const values = new BOOKREPO(req.body);
    values.bookImage = req.file.filename;
    values.availableCopies = values.noOfCopies;
    values.save((err) => {
      if (err) {
        res.send(err);
      } else {
        res.send("book added successfully");
      }
    });
  } else {
    res.status(404).send("Invalid User request");
  }
});

// routes to fetch allbooks Data
app.get("/getallbooks", async (req, res) => {
  let bookData = await BOOKREPO.find({}).sort({ bookName: 1 });
  res.send(bookData);
});

//route to fetch all userdetails
//need to fetch IssuedBooks data also
app.get("/getAllUsers", (req, res) => {
  USERDETAILS.find({ userType: "user" }, (err, result) => {
    if (result) {
      res.send(result);
    } else {
      res.send("Error in fetching user details");
    }
  });
});

//Routes to get all Staff Details
app.get("/getAllStaffs", (req, res) => {
  USERDETAILS.find({ userType: "staff" }, (err, result) => {
    if (result) {
      res.send(result);
    } else {
      res.send("Error in fetching Staff details");
    }
  });
});

//Routes To search Books
app.post("/getSearchBook", (req, res) => {
  // console.log(req.body.searchKey);
  // BOOKREPO.find({
  //   $or: [
  //     { searchKey: "harry"  },
  //     { bookName: { $regex: req.body.searchKey } },
  //   ],
  // })
  let payload = {};
  if (req.body.searchKey.trim() != "") {
    payload = {
      $or: [
        { searchKey: { $regex: req.body.searchKey } },
        { bookName: { $regex: req.body.searchKey } },
      ],
    };
  }

  BOOKREPO.find(payload, (err, result) => {
    if (result) {
      // console.log("rr", result);
      res.send(result);
    } else {
      res.send("No Data");
    }
  });
});

//route for issue book request
app.post("/issueBookRequest", (req, res) => {
  // console.log(req.body);
  let payload = {
    bookId: req.body.bookData._id,
    userId: req.body.userId,
    issueDate: req.body.bookData.issueDate,
    returnDate: req.body.bookData.returnDate,
    returnStatus: false,
    approvalStatus: "",
    bookRent: 20,
  };
  const values = new BOOKINGDETAILS(payload);
  values.save((err) => {
    if (err) {
      // console.log(err);
      res.status(400).send(err);
    } else {
      res.send("book request done");
    }
  });
});

//route to get all issue requests
app.get("/getIssueRequests", async (req, res) => {
  let bookingdetails = await BOOKINGDETAILS.find({ approvalStatus: "" });
  console.log({ bookingdetails });
  let myData = await Promise.all(
    bookingdetails.map(async (item) => {
      let userData = await USERDETAILS.findOne({ _id: item.userId });
      let bookData = await BOOKREPO.findOne({ _id: item.bookId });
      return {
        bookId: bookData._id,
        bookingId: item._id,
        bookName: bookData.bookName,
        username: userData.username,
        author: bookData.author,
        availableCopies: bookData.availableCopies,
        noOfCopies: bookData.noOfCopies,
      };
    })
  );
  res.send(myData);
});

//route to add profile pic
app.post("/uploadProfilPic", upload.single("file"), async (req, res) => {
  const token = req.header("jwt-token");
  const verified = jwt.verify(token, jwtSecretKey);
  if (verified) {
    let result = await USERDETAILS.findOneAndUpdate(
      { email: req.body.email },
      { userImage: req.file.filename },
      { new: true }
    );
    res.status(200).send(result);
  } else {
    res.status(404).send("Invalid User request");
  }
});

//route to get userProfileData
app.post("/getUserProfileData", (req, res) => {
  USERDETAILS.findOne({ email: req.body.email }, (err, result) => {
    // console.log({ result });
    res.send(result);
  });
});

app.put("/updateDetails", async (req, res) => {
  console.log("effewdwwdwddwwddw", req.body);

  let result = await USERDETAILS.findByIdAndUpdate(
    { _id: req.body.userId },
    {
      username: req.body.username,
      phoneNo: req.body.phoneNo,
      address: req.body.address,
    },
    { new: true }
  );
  res.send(result);
});

//Routes for Decline of book issue Request
app.post("/declineissueRequest", async (req, res) => {
  let result = await BOOKINGDETAILS.findOneAndUpdate(
    { _id: req.body.userData.bookingId },
    {
      allotedBy: req.body.userData.allotedBy,
      remarks: req.body.userData.remarks,
      approvalStatus: "Declined",
    },
    { new: true }
  );
  res.send(result);
});

//Routes for approval of book issue Request

app.post("/acceptIssueRequest", async (req, res) => {
  console.log(req.body);
  if (req.body.availableCopies > 0) {
    let bookData = await BOOKREPO.findByIdAndUpdate(
      { _id: req.body.bookId },
      { availableCopies: req.body.availableCopies - 1 },
      { new: true }
    );
    let result = await BOOKINGDETAILS.findByIdAndUpdate(
      { _id: req.body.bookingId },
      { approvalStatus: "Issued", allotedBy: req.body.allotedBy },
      { new: true }
    );
    res.send(result);
  } else {
    res.send("outofstock");
  }
});

//Routes for user booking history

app.post("/bookingHistory", async (req, res) => {
  console.log(req.body.id);
  let bookHistory = await BOOKINGDETAILS.find({ userId: req.body.id });
  let myData = await Promise.all(
    bookHistory.map(async (item) => {
      let bookData = await BOOKREPO.findOne({ _id: item.bookId });
      return {
        remarks: item.remarks,
        bookName: bookData.bookName,
        author: bookData.author,
        approvalStatus: item.approvalStatus,
      };
    })
  );
  res.send(myData);
});

//Routes for allissued bokks by user

app.post("/allIssuedBooks", async (req, res) => {
  console.log(req.body.id);
  let bookHistory = await BOOKINGDETAILS.find({
    userId: req.body.id,
    approvalStatus: "Issued",
  });
  let myData = await Promise.all(
    bookHistory.map(async (item) => {
      let bookData = await BOOKREPO.findOne({ _id: item.bookId });
      return {
        issueDate: item.issueDate,
        bookName: bookData.bookName,
        author: bookData.author,
        returnDate: item.returnDate,
      };
    })
  );
  res.send(myData);
});

//route to remove user
app.post("/removeUser", async (req, res) => {
  console.log(req.body);
  let result = await USERDETAILS.deleteOne({ email: req.body.email });
  res.send("user deleted successfully");
});

//route to ban user
app.post("/banUser", async (req, res) => {
  console.log(req.body);
  let result = await USERDETAILS.findOneAndUpdate(
    { email: req.body.email },
    { banStatus: true },
    { new: true }
  );
  if (result) {
    res.send(result);
  }
});

//route to activate user
app.post("/activateUser", async (req, res) => {
  console.log(req.body);
  let result = await USERDETAILS.findOneAndUpdate(
    { email: req.body.email },
    { banStatus: false },
    { new: true }
  );
  if (result) {
    res.send(result);
  }
});

app.get("/getAllIssuedBooks", async (req, res) => {
  let result = await BOOKINGDETAILS.find({ approvalStatus: "Issued" });
  let myData = await Promise.all(
    result.map(async (item) => {
      let bookData = await BOOKREPO.findOne({ _id: item.bookId });
      return {
        issueDate: item.issueDate,
        bookName: bookData.bookName,
        author: bookData.author,
        returnDate: item.returnDate,
        availableCopies: bookData.availableCopies,
      };
    })
  );
  res.send(myData);
});

//route to remove staff
app.post("/removeStaff", async (req, res) => {
  let result = await USERDETAILS.deleteOne({ email: req.body.email });
  res.send("user deleted successfully");
});

// routes to fetch allbooks Data
app.get("/getStaffApprovalRequest", async (req, res) => {
  let userData = await USERDETAILS.find({ approvalStatus: false });
  res.send(userData);
});

//route to approve staff request
app.post("/approveStaffRequest", async (req, res) => {
  console.log(req.body);
  let result = await USERDETAILS.findOneAndUpdate(
    { email: req.body.email },
    { approvalStatus: true },
    { new: true }
  );
  if (result) {
    res.send(result);
  }
});

//route to decline staff request
app.post("/declineStaffRequest", async (req, res) => {
  console.log(req.body);
  let result = await USERDETAILS.deleteOne({ email: req.body.email });
  res.send("staff approval request declined successfully");
});

//route to update book details
app.post("/updateBooks", async (req, res) => {
  console.log(req.body);
  const payload = {
    bookName: req.body.bookName,
    publisher: req.body.publisher,
    author: req.body.author,
    searchKey: req.body.searchKey,
    noOfCopies: req.body.noOfCopies,
  };
  let result = await BOOKREPO.findOneAndUpdate({ _id: req.body._id }, payload, {
    new: true,
  });
  if (result) {
    res.send(result);
  }
});

//route to remove book
app.post("/deleteBook", async (req, res) => {
  let result = await BOOKREPO.deleteOne({ _id: req.body._id });
  res.send("Book deleted successfully");
});

app.listen(port, () => {
  console.log("server started at port: ", port);
});
