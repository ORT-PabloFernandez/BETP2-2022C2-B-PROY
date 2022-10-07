import express from "express";
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Listado de inventores");
});

router.post("/", (req, res) => {
  console.log("POST");
  res.send("POST de inventors");
});

export default router;
