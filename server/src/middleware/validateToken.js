import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { profile } from "../database.js";
dotenv.config();

/*
Check for a token and validity in the Auth bearer
*/
const validateToken = async (req, res, next) => {
  const user = await profile.findOne({ token: token });
  if (!user) {
    return res.status(403).send({ error: "Invalid token" });
  }

  let token;
  let auth = req.headers.authorization;

  // Extact token from bearer
  if (auth && auth.startsWith("Bearer")) {
    token = auth.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({ error: "Invalid token" });
      }
      req.profile = decoded.user;
      next();
    });
  }
  
  if (!token) {
    return res.status(401).send({ error: "Invalid token" });
  }
}

export { validateToken };
