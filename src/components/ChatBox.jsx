import React, { useState } from 'react';

const ChatBox = ({ onAiResponse }) => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hi! I'm Travel Agent. Tell me about your trip and I'll build your itinerary!" },
  ]); // Initialize with the first AI message
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const tripId = sessionStorage.getItem('user_id'); // Retrieve trip ID (user ID) from session storage
    if (!tripId) {
      console.error('Trip ID not found in session storage.');
      return;
    }

    const userMessage = {
      trip_id: tripId, // Use the user ID as the trip ID
      prompt: newMessage, // User's input message
    };

    // Add the user's message to the chat
    setMessages((prev) => [...prev, { sender: 'user', text: newMessage }]);
    setNewMessage('');
    setLoading(true);
   
    try {
      const response = await fetch('https://xlgwkfw9-8000.use.devtunnels.ms/api/v1/conversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userMessage),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();

      // Add the AI's response to the chat
      setMessages((prev) => [...prev, { sender: 'ai', text: data.follow_up }]);

      // Check if the conversation is complete
     
      if (data.is_complete) {
        onAiResponse('confirmed'); // Notify the parent component
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-5 w-3/4 mx-auto border border-gray-650 p-5 flex flex-col">
      <div className="flex flex-col gap-4 overflow-y-auto h-96">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat ${message.sender === 'user' ? 'chat-end' : 'chat-start'}`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt={message.sender === 'user' ? 'User' : 'AI Assistant'}
                  src={
                    message.sender === 'user'
                      ? 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9_TS_juGOZ1RR7tlKL1upTUJR0u6mwby1EA&s'
                  }
                />
              </div>
            </div>
            <div className="chat-header">{message.sender === 'user' ? 'You' : 'Travel Agent AI'}</div>
            <div className="chat-bubble">{message.text}</div>
          </div>
        ))}
      </div>

      <div className="p-5 border-t border-gray-600 flex gap-2 items-center">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 rounded p-2"
          placeholder="Type your message..."
          disabled={loading}
        />
        <button onClick={sendMessage} className="btn btn-secondary" disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatBox;