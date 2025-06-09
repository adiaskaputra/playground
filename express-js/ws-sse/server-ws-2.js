"use strict";

const serverPort = 8080;
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const websocketServer = new WebSocket.Server({ server });

//when a websocket connection is established
websocketServer.on("connection", (webSocketClient) => {
  // send feedback to the incoming connection
  webSocketClient.send("The time is: ");

  setInterval(() => {
    let time = new Date();
    webSocketClient.send(
      JSON.stringify({
        time: time.toTimeString(),
      })
    );
  }, 1000);
});

//start the web server
server.listen(serverPort, () => {
  console.log(`Websocket server started on port ${serverPort}`);
});
