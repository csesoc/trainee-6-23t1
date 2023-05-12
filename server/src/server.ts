import express from "express";
import { client } from "./db/database";
import dotenv from "dotenv";
import authRoute from "./routes/auth";
import profileRoute from "./routes/profile";
import { setupSchema } from "./db/schema";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoute);
app.use("/profile", profileRoute);

// start server
const PORT = 5000;

app.listen(PORT, async () => {
    await client.connect(); // connect to mongo
    console.log("COMP6969 API started!");   
    console.log(`listening on port ${PORT}`);
    // await setupSchema();
})
