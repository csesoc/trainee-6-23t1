// Setup database
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.DATABASE_URL;
let client = new MongoClient(url);
let comp6969Db = client.db("COMP6969");
let profile = comp6969Db.collection("profile");

export { client, comp6969Db, profile };
