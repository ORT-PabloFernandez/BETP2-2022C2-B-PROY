import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function auth(req, res, next) {
  if (req.header("Authorization")) {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(token);
  }

  try {
    const user = jwt.verify(token, process.env.CLAVESECRETA);
    console.log(user);
    next();
  } catch (error) {
    res.status(401).send({ error });
  }
}

export default auth;
