// Setup database
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { Profile } from "../interfaces";

dotenv.config();

// connect when starting up server
const url = process.env.DATABASE_URL as string;
let client = new MongoClient(url);                          // mongo cluster
let comp6969Db = client.db("COMP6969");                     // db
let profile = comp6969Db.collection<Profile>("profile");    // collection

export { client, comp6969Db, profile };
