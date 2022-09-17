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
  },
  userImage: {
    type: String,
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
          }
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
app.get("/getallbooks", (req, res) => {
  BOOKREPO.find({}, (err, result) => {
    if (result) {
      res.send(result);
    } else {
      res.send("Error in fetching books");
    }
  });
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
app.get("/getIssueRequests", async(req, res) => {
  let bookingdetails = await BOOKINGDETAILS.find({ approvalStatus: "" });
  let myData = await Promise.all(
    bookingdetails.map(async(item)=>{
      let userData = await USERDETAILS.findOne({ _id: item.userId });
      let bookData = await BOOKREPO.findOne({ _id: item.bookId });
      return {
        "bookName": bookData.bookName,
        "username": userData.username,
        "author": bookData.author,
        "availableCopies": bookData.availableCopies,
      };
    }));
    res.send(myData)
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

app.put("/updateDetails", (req, res) => {
  console.log("effewdwwdwddwwddw", req.body);

  // USERDETAILS.findByIdAndUpdate({id:req.body.})
});

app.listen(port, () => {
  console.log("server started at port: ", port);
});
