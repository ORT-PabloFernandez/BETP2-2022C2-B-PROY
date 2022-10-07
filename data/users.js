import { getConnection } from "./conecction.js";

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
  const connectiondb = await getConnection();
  const infoAdd = await connectiondb
    .db("sample_mflix")
    .collection("users")
    .insertOne(user);
  return infoAdd;
}

export { getAllUser, addUser };
