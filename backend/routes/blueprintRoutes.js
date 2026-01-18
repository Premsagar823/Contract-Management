const express = require("express");
const router = express.Router();

const {
  createBlueprint,
  getBlueprints
} = require("../controllers/blueprintController");

router.post("/", createBlueprint);
router.get("/", getBlueprints);

module.exports = router;
