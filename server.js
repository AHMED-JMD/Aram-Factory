const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//connect to mongodb
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected to MongoDB"))
  .catch((e) => console.log("db_err = ", e));

//middlewares
// app.use(express.static("client/build"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

//setting up routes
app.use("/user/register", require("./routes/users/signup"));
app.use("/user/auth", require("./routes/users/login"));

app.get("/", (req, res) => {
  res.send("hello world");
});

const Port = process.env.PORT || 40000;
app.listen(Port, () => console.log(`server running on port ${Port}`));
