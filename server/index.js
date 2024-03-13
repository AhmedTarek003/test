require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connectDB");
const glogalErrorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");

// datatbase
connectDB();

// app
const app = express();

// middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/usersRoute"));

// Invaild route
app.use("*", (req, res, next) => {
  next(Error("Invalidggggg route"));
});

// global error
app.use(glogalErrorHandler);

// server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server is running at Port ${PORT}`)
);

// Handle errors outside server
process.on("unhandledRejection", (err) => {
  console.log(`Unhandled rejection Error : ${err.message} `);
  server.close(() => {
    console.log("Shutdown.....");
    process.exit(1);
  });
});
