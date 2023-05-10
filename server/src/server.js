import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { validateToken } from "./middleware/validateToken.js";
import authRoute from "./routes/auth.js";

dotenv.config();

const app = express();

app.use(express.json());

// app.use(
//   cors({
//     origin: process.env.FE_URL,
//     credentials: true,
//   })
// );

app.use("/auth", authRoute);

app.listen(5000, async () => {
    console.log("COMP6969 API started!");
    console.log("listening on port 5000");
});