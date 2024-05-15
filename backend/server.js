import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// enabling dotenv
dotenv.config();

//connect to MongoDB
connectDB();

const port = process.env.PORT || 5000;
const app = express();

// enabling cookie-parser
app.use(cookieParser());

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    samesite: "none",
  })
);

app.options("*", cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/auth/users", userRoutes);
app.use("/api/posts", postRoutes);

// CUSTOM ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

// CUSTOM ERROR HANDLER

app.listen(port, () => {
  console.log(`SERVER STARTED ON PORT ${port}`);
});
