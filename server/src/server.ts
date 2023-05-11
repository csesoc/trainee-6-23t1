import express, { application } from "express";
import { client } from "./db/database";
import dotenv from "dotenv";
import { validateToken } from "./middleware/validateToken";
import authRoute from "./routes/auth";
import { setupSchema } from "./db/schema";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/auth", authRoute);

// start server
const PORT = 5000;

app.listen(PORT, async () => {
    await client.connect(); // connect to mongo
    console.log("COMP6969 API started!");   
    console.log(`listening on port ${PORT}`);
})
