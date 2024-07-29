const express = require("express");
const { port } = require("./config/config");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

app.use(express.json());
app.use("/api/chat", chatRoutes);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
