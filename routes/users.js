import express from "express";
import auth from "../middleware/Auth.js";

const router = express.Router();
import {
  getAllUser,
  addUser,
  findByCredential,
  generatedToken,
} from "../data/users.js";

/* GET users listing. */
router.get("/", auth, async function (req, res, next) {
  const users = await getAllUser();
  res.json(users);
});

router.post("/", async (req, res) => {
  //TODO: validar
  const user = req.body;
  const result = await addUser(user);
  res.status(201).json(result);
});

router.post("/login", async (req, res) => {
  try {
    const user = await findByCredential(req.body.email, req.body.password);
    const token = generatedToken(user);

    res.send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(401).send(error.message);
  }
});

export default router;
