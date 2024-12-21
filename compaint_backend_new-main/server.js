require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const PORT = 8000 || process.env.PORT;
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./router");
const fileUpload = require("express-fileupload");
//routes imports
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");



// Database connection
// "mongodb://127.0.0.1:27017/ComplaintDB" old

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Databse connected.."))
  .catch((err) => console.log(err));

//template
// app.set("views", path.join(__dirname, "/resources/views"));
// app.set("view engine", "ejs");

//assets
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use(bodyParser.json());
app.use(fileUpload({
  useTempFiles: true, // This enables temporary file storage
  tempFileDir: '/tmp/', // Temporary directory for uploads
}));
app.use("/", router);


//added new routes
// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
