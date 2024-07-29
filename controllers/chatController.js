const {
  handleQuery,
  fetchData,
  streamResponse,
} = require("../services/chatService");

const processQuery = async (req, res) => {
  const { userId, query } = req.body;
  try {
    const response = await handleQuery(userId, query);
    res.json({ success: true, response });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const streamQueryResponse = async (req, res) => {
  const { userId, query } = req.body;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  try {
    const response = await handleQuery(userId, query);
    await streamResponse(response, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getBalanceSheet = (req, res) => {
  try {
    const data = fetchData("data/balanceSheet.json");
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getProfitLoss = (req, res) => {
  try {
    const data = fetchData("data/profitLoss.json");
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  processQuery,
  streamQueryResponse,
  getBalanceSheet,
  getProfitLoss,
};
