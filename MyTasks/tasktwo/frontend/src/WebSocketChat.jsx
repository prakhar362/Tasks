import React, { useState, useEffect } from "react";

const WebSocketChat = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    // Replace with your deployed WebSocket API Gateway URL
    const ws = new WebSocket("wss://rgwjd4m932.execute-api.ap-south-1.amazonaws.com/production/")

    ws.onopen = () => console.log("Connected to WebSocket");

    ws.onmessage = (event) => {
      console.log("Received:", event.data);
      const data = JSON.parse(event.data);
      setResponses((prev) => [...prev, data.response]);
    };

    ws.onerror = (error) => console.error("WebSocket Error:", error);

    ws.onclose = () => console.log("WebSocket Disconnected");

    setSocket(ws);

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (socket && message.trim()) {
      const payload = JSON.stringify({
        action: "sendMessage", // Must match API Gateway route key
        message: message,
      });
      socket.send(payload);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">WebSocket Chat</h2>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={sendMessage}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
        <div className="mt-4 p-3 bg-gray-200 rounded">
          <strong>Responses:</strong>
          <ul className="list-disc pl-4">
            {responses.map((res, index) => (
              <li key={index}>{res}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WebSocketChat;
