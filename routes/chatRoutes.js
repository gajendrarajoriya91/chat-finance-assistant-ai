const express = require("express");
const router = express.Router();
const {
  processQuery,
  streamQueryResponse,
  getBalanceSheet,
  getProfitLoss,
} = require("../controllers/chatController");

router.post("/query", processQuery);
router.post("/stream-query", streamQueryResponse);
router.get("/balance-sheet", getBalanceSheet);
router.get("/profit-loss", getProfitLoss);

module.exports = router;
