const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const errorHandler = require("./middlewares/error");
const connectDB = require("./config/db.js");

//Load env variables
dotenv.config({ path: "./config/config.env" });
//database connected
connectDB();

const app = express();
//body Parser
app.use(express.json());
//cors
app.use(cors());

// //Routes files
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user");
const businessRoutes = require("./routes/business");
const reviewRoutes = require("./routes/reviews");


// //Mount the routers
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/businesses", businessRoutes);
app.use("/api/reviews", reviewRoutes);


app.use(errorHandler);

const PORT = process.env.PORT || 4505;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV}mode on port ${PORT}`)
);
