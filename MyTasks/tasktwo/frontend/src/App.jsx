import React, { useState, useRef, useEffect } from "react";
import useWebSocket from "react-use-websocket";

const socketUrl = "wss://4skvjnmo6a.execute-api.ap-south-1.amazonaws.com/production/";

const App = () => {
    const [message, setMessage] = useState("");
    const [responses, setResponses] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const messagesEndRef = useRef(null);

    const { sendMessage, readyState, getWebSocket } = useWebSocket(socketUrl, {
        onOpen: () => setIsConnected(true),
        onClose: () => setIsConnected(false),
        onMessage: (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.response) {
                    setResponses((prev) => [...prev, `Server: ${data.response}`]);
                }
            } catch (error) {
                console.error("Error parsing message:", error);
            }
        },
        shouldReconnect: () => true, // Auto-reconnect when disconnected
    });

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [responses]);

    const handleSendMessage = () => {
        if (message.trim()) {
            sendMessage(JSON.stringify({ action: "sendmessage", message }));
            setResponses((prev) => [...prev, `You: ${message}`]);
            setMessage("");
        }
    };

    const handleCloseConnection = () => {
        getWebSocket()?.close();
    };

    return (
        <div style={{
            position: 'absolute', width: '100%', height: '100%', backgroundColor: '#f4ede3',
            display: 'flex', alignItems: 'center',
        }}>
            <div style={{ maxWidth: '900px', width: '100%', margin: 'auto', height: '90%' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ width: '20%', backgroundColor: '#3e103f', color: 'white', padding: '10px' }}>
                        <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Users</h3>
                    </div>
                    <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ flex: 1, padding: '10px', overflowY: 'auto' }}>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {responses.map((row, index) => (
                                    <li key={index} style={{ marginBottom: '10px' }}>{row}</li>
                                ))}
                                <div ref={messagesEndRef} />
                            </ul>
                        </div>
                        <div style={{ padding: '10px', display: 'flex', gap: '7px' }}>
                            <input
                                type="text"
                                style={{ flexGrow: 1, padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type a message..."
                            />
                            <button onClick={handleSendMessage} disabled={!isConnected} style={{ padding: '5px 10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', opacity: isConnected ? 1 : 0.5 }}>
                                Send
                            </button>
                            <button onClick={handleCloseConnection} disabled={!isConnected} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', opacity: isConnected ? 1 : 0.5 }}>
                                Disconnect
                            </button>
                        </div>
                        <div style={{
                            position: 'absolute', right: '10px', top: '10px', width: '12px', height: '12px',
                            backgroundColor: isConnected ? '#00da00' : '#e2e2e2', borderRadius: '50%',
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;