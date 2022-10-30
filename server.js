const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const db = require("./models/index");
require("dotenv").config();

//connect to database
// (async () => {
//   await db.sequelize.sync();
//   console.log("Connected to MySQL");
// })();

//middlewares
app.use(express.static("client/build"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//setting up routes
app.use("/user", require("./routes/users/auth"));
app.use("/employees", require("./routes/employees/Employee"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const Port = process.env.PORT || 40000;
app.listen(Port, () => console.log(`server running on port ${Port}`));
