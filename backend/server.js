const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv").config();
const compression = require("compression");
const bookRoutes = require("./routes/bookRoutes");
const connectDB = require("./config/connectDB");
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

app.use("/books", bookRoutes);
app.get("/", (req, res) => res.send("Hello Bookstore"));

app.all("*", (req, res) =>
  res.status(404).send("Error 404! Please go to the correct page")
);

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
