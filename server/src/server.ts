import express from "express";
import { client } from "./db/database";
import dotenv from "dotenv";
import authRoute from "./routes/auth";
import profileRoute from "./routes/profile";
import { setupSchema } from "./db/schema";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
app.use(cookieParser());

app.use("/auth", authRoute);
app.use("/profile", profileRoute);

// start server
const PORT = 5005;

app.listen(PORT, async () => {
    await client.connect(); // connect to mongo
    console.log("COMP6969 API started!");   
    console.log(`listening on port ${PORT}`);
    // await setupSchema();
})
