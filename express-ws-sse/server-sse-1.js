const serverPort = 8080;
const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
    });

    const interval = setInterval(() => {
      res.write("data: " + new Date().toLocaleTimeString() + "\n\n");
    }, 1000);

    req.on("close", () => {
      console.log("client closed connection");
      clearInterval(interval);
    });
  })
  .listen(serverPort, () => {
    console.log(`Server sent event started on port ${serverPort}`);
  });
