const express = require("express");
const router = express.Router();

const {
  createContract,
  getContracts,
  updateContractStatus
} = require("../controllers/contractController");

router.post("/", createContract);
router.get("/", getContracts);
router.patch("/:id/status", updateContractStatus);

module.exports = router;

