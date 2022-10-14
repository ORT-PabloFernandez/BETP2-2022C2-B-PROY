import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function auth(req, res, next) {
  try {
    let token = req.header("Authorization");
    const user = jwt.verify(token, process.env.CLAVESECRETA);
    console.log(user);
    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
}

export default auth;
