import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

import "chalk";
dotenv.config();
connectDB();
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("SERVER IS WORKING WELL");
});

app.use("/api/users", userRoutes);

// CUSTOM ERROR HANDLER
app.use(notFound);
app.use(errorHandler);
// CUSTOM ERROR HANDLER
console.log("PROJECT INITIATED");
app.listen(port, () => {
  console.log(`SERVER STARTED ON PORT ${port}`);
});
