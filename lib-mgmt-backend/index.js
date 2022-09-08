const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

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
    "mongodb+srv://admin:admin@cluster0.3r0nanf.mongodb.net/?retryWrites=true&w=majority"
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
});

//Creating a Model of a schema into a Database
const USERDETAILS = connection.model("usersdetail", UserDetails);

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
    }
    console.log(email);
    res.send(password);
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

app.listen(port, () => {
  console.log("server started at port: ", port);
});
