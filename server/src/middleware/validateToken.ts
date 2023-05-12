import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { profile } from "../db/database";

dotenv.config();

/*
Check for a token and validity in cookies
*/
const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(401).send({ error: "token missing" });
  }

  const token = cookies.jwt;
  const user = await profile.findOne({ token: token });
  if (!user) {
    return res.status(403).send({ error: "Invalid token" });
  }

  if (process.env.TOKEN_KEY != undefined) {
    jwt.verify(token, process.env.TOKEN_KEY, (err: any, decoded: any) => {
      if (err) {
        return res.status(401).send({ error: "Invalid token" });
      }
      console.log("Token is valid!");
      next();
    });
  }
}

export { validateToken };
