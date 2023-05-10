// Setup database
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.DATABASE_URL;
let client = new MongoClient(url);
let database = client.db("COMP6969");
let profile = database.collection("profile");

export { client, database, profile };
