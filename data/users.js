import { getConnection } from "./conecction.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function getAllUser() {
  const connectiondb = await getConnection();

  const users = await connectiondb
    .db("sample_mflix")
    .collection("users")
    .find()
    .toArray();
  return users;
}

async function addUser(user) {
  user.password = await bcrypt.hash(user.password, 8);
  const connectiondb = await getConnection();
  const infoAdd = await connectiondb
    .db("sample_mflix")
    .collection("users")
    .insertOne(user);
  return infoAdd;
}

async function findByCredential(email, password) {
  const connectiondb = await getConnection();
  const user = await connectiondb
    .db("sample_mflix")
    .collection("users")
    .findOne({ email: email });

  if (!user) {
    throw new Error("Credenciales no validas");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Credenciales no validas");
  }

  return user;
}

function generatedToken(user) {
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.CLAVESECRETA,
    { expiresIn: "2h" }
  );
  return token;
}

export { getAllUser, addUser, findByCredential, generatedToken };
