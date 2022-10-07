import express from "express";
const router = express.Router();
import { getAllUser, addUser } from "../data/users.js";

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const users = await getAllUser();
  res.json(users);
});

router.post("/", async (req, res) => {
  //TODO: validar
  const user = req.body;
  const result = await addUser(user);
  res.status(201).json(result);
});

export default router;
