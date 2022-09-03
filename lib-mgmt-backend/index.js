const express = require("express")
const bodyParser = require("body-parser")

const port = "3004";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/hello", (req, res) => {
    res.send("hello")
})


app.listen(port, ()=>{
    console.log("server started at port: ", port);
})