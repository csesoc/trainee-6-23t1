import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { profile } from "../db/database";
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

  // Hash password with salt
  let hash = await bcrypt.hash(password, salt);

  // Create a token
  if (process.env.TOKEN_KEY !== undefined) {
    const token = jwt.sign(
      { email: email }, 
      process.env.TOKEN_KEY, 
      { expiresIn: "30m" }
    );

    let user = {
      email: email,
      password: hash,
      token: token,
      firstName: firstName,
      lastName: lastName,
    };
  
    await profile.insertOne(user);

    res.cookie("jwt", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    return res.status(200).send({ message: `${email} has been successfully registered!` });
  }

  return res.status(400).send({ message: `Could not register ${email}!` });
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
  let valid = await bcrypt.compare(password, dbUser.password);

  if (!valid) {
    return res.status(400).send({ error: "invalid password!" });
  }

  // Create token and update the database
  if (process.env.TOKEN_KEY !== undefined) {
    const token = jwt.sign(
      { email: email }, 
      process.env.TOKEN_KEY.toString(), 
      { expiresIn: "30m",
    });
    
    await profile.updateOne(
      { email: email },
      {
        $set: {
          token: token,
        },
      }
    );
    
    res.cookie("jwt", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    return res.status(200).send({ message: `${email} has been logged in!` });
  }

  return res.status(400).send({ message: `Could not login to ${email}!` });
});


/*
Logout of user by deleting the token.
*/
router.delete("/logout", async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(204).send({ message: `No content` });
  }

  const token = cookies.jwt;
  let user = profile.findOne({ token: token });
  if (!user) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true }); 
    return res.status(204).send({ message: `No content` });;
  }

  await profile.updateOne(
    { token: token },
    {
      $set: {
        token: "",
      },
    }
  );

  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  return res.status(200).send({ message: `Successfully logged out`});
});

export { router as default };
