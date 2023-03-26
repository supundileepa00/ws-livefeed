const WebSocket = require("ws");
const getTasks = require("./service/tasks");

const wss = new WebSocket.Server({ port: 8000 });

async function websocketConnection() {
  wss.on("connection", async (ws) => {
    console.log("client connected.");

    ws.on("message", (message) => {
      console.log(`Received message: ${message}`);
    });

    const tasks = await getTasks();
    console.log(tasks);
    ws.send(tasks);
  });
}

async function update() {
  wss.clients.forEach(async (client) => {
    if (client.readyState === WebSocket.OPEN) {
      // client.send("An update occurred!");

      const tasks = await getTasks();
      console.log(tasks);
      client.send(tasks);
    }
  });
}

module.exports = {
  update,
  websocketConnection,
};
