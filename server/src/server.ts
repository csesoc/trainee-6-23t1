import express, { application } from "express";
import { client, comp6969Db } from "./db/database";
import dotenv from "dotenv";

// express setup
const app = express();
app.use(express.json());

// start server
const PORT = 5000;

app.listen(PORT, async () => {
    await client.connect();     // connect to mongo
    console.log(`listening on port ${PORT}`);
})