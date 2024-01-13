import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";

// enabling dotenv
dotenv.config();

//connect to MongoDB
connectDB();

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enabling cookie-parser
app.use(cookieParser());

app.use("/", userRoutes);

// CUSTOM ERROR HANDLER
app.use(notFound);
app.use(errorHandler);
// CUSTOM ERROR HANDLER

app.listen(port, () => {
  console.log(`SERVER STARTED ON PORT ${port}`);
});
