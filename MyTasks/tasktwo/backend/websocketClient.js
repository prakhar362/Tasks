const WebSocket = require("ws");

const ws = new WebSocket("wss://zxgm7ieqs3.execute-api.ap-south-1.amazonaws.com/production/");

ws.on("open", () => {
    console.log("✅ Connected to WebSocket Server");
    ws.send(JSON.stringify({ action: "sendMessage", message: "Hello Server!" }));
});

ws.on("message", (data) => {
    console.log("📩 Message from server:", data.toString());
});

ws.on("error", (error) => {
    console.error("❌ WebSocket Error:", error);
});

ws.on("close", () => {
    console.log("⚠️ Connection closed");
});
