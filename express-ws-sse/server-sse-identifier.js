const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const connections = new Map();

// Endpoint SSE
app.get("/api/sse-request-status/:identifier", (req, res) => {
  const token = req.params.token;

  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  res.flushHeaders();

  // Save SSE connection
  connections.set(token, res);

  console.log(`SSE Connected for token: ${token}`);

  // Handle client disconnect
  req.on("close", () => {
    console.log(`SSE Disconnected for token: ${token}`);
    connections.delete(token);
  });
});

// Endpoint untuk "accept" dari mobile
app.post("/api/accept-request/:identifier", (req, res) => {
  const token = req.params.token;
  const sseConnection = connections.get(token);

  if (sseConnection) {
    sseConnection.write(`data: ${JSON.stringify({ status: "ACCEPTED" })}\n\n`);
    connections.delete(token);
    return res.json({ message: "SSE event sent to client" });
  }

  res.status(404).json({ message: "No active SSE connection for token" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
