import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { profile } from "../database.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

/*
Registers user and adds them to the database with params: 
{
    email: String,
    password: String,
    firstName: String,
    lastName: String, 
}
*/
router.post("/register", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;

  // return a bad request error if a field is missing
  if (!email || !password || !firstName || !lastName) {
      return res
      .status(400)
      .send({ error: "A field(s) is missing!" });
  }

  // Check if email already exists
  let exists = await profile.findOne({ email: email });
  if (exists) {
      return res.status(400).send({ error: "Email already registered!" });
  }

  // Get salt
  let salt = await bcrypt.genSalt(15);

  // Initialise hash object
  let hash = await bcrypt.hash("rizzler", salt);

  // Combine password into hash
  hash.update(password);

  // Convert hash object to string
  let hashed = hash.digest("hex");

  // Create a token
  const token = jwt.sign(
    { email: email }, 
    process.env.TOKEN_KEY, {
    expiresIn: "30m",
  });

  let user = {
    email: email,
    password: hashed,
    token: token,
    firstName: firstName,
    lastName: lastName,
    interests: {},
    gender: {},
    preferences: {},
    socials: {},
    availabiilty: {},
  };

  await profile.insertOne(user);

  return res.status(200).send({
    message: `${email} has been successfully registered!`,
  });
});

/*
Given user login details, sends a cookie with token
params: 
{
  email: String,
  password: String
}
*/
router.post("/login", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  // Check for missing parameters
  if (!email || !password) {
    return res.status(400).send({ error: "email or password is missing!" });
  }

  // Check if user/email exists
  let dbUser = await profile.findOne({ email: email });
  if (!dbUser) {
    return res.status(400).send({ error: "email not found!" });
  }

  // Compare password with database
  let valid = await bcrypt.compare(dbUser.pasword, password);
  if (!valid) {
    return res.status(400).send({ error: "invalid password!" });
  }

  // Create token and update the database
  const token = jwt.sign(
    { email: email }, 
    process.env.TOKEN_KEY, {
    expiresIn: "30m",
  });
  
  await profile.updateOne(
    { email: email },
    {
      $set: {
        token: token,
      },
    }
  );

  return res.status(200).send({ message: `${email} has been logged in!` });
});

export { router as default };
