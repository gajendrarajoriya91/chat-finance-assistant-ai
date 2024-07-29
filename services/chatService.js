const { OpenAI } = require("openai");
const dotenv = require("dotenv");
dotenv.config();

const openai = new OpenAI({
  api_key: process.env.OPENAI_API_KEY,
});

const {
  getConversation,
  saveConversation,
} = require("../models/conversationModel");
const { readJsonFile } = require("../utils/fileUtils");

const fetchChatGPTResponse = async (messages) => {
  try {
    const formattedMessages = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: formattedMessages,
    });

    return chatCompletion.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error fetching ChatGPT response:", error);
    throw new Error("Failed to get a response from the AI.");
  }
};

const handleQuery = async (userId, query) => {
  try {
    let messages = getConversation(userId);
    messages.push({ role: "user", content: query });

    const balanceSheet = readJsonFile("data/balanceSheet.json");

    const profitLoss = readJsonFile("data/profitLoss.json");

    messages.push({
      role: "system",
      content: `Here is the financial data for the user:
Balance Sheet: ${JSON.stringify(balanceSheet.balanceSheet)}
Profit and Loss: ${JSON.stringify(profitLoss.profitLoss)}`,
    });

    const aiResponse = await fetchChatGPTResponse(messages);

    messages.push({ role: "assistant", content: aiResponse });

    saveConversation(userId, messages);
    return aiResponse;
  } catch (error) {
    console.error("Error handling query:", error);
    throw new Error("Failed to process the query.");
  }
};

const fetchData = (file) => {
  try {
    return readJsonFile(file);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data from file.");
  }
};

const streamResponse = async (responseText, res) => {
  try {
    const chunks = responseText.match(/.{1,50}/g); // Split response into 50-character chunks
    for (const chunk of chunks) {
      res.write(chunk);
      await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate streaming delay
    }
    res.end();
  } catch (error) {
    console.error("Error streaming response:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to stream response." });
  }
};

module.exports = {
  handleQuery,
  fetchData,
  streamResponse,
};
