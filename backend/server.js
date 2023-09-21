import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";

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

app.listen(port, () => {
  console.log(`SERVER STARTED ON PORT ${port}`);
});
