import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';
import sendMsgToOpenAI from '../openai/Openai';

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message to messages
    const userMessage = { 
      text: input, 
      sender: 'user' 
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Clear input
    setInput("");
    
    // Set loading state
    setIsLoading(true);

    try {
      // Send message to OpenAI
      const response = await sendMsgToOpenAI(input);
      
      // Add AI response to messages
      const aiMessage = { 
        text: response, 
        sender: 'ai' 
      };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Add error message
      const errorMessage = { 
        text: "Sorry, there was an error processing your message.", 
        sender: 'system' 
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chatbot-container">
      {/* Chat Header */}
      <div className="chatbot-header">
        <span className="chatbot-icon">🤖</span>
        <h2 className="chatbot-title">Customer Support</h2>
      </div>

      {/* Messages Container */}
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`chatbot-message ${msg.sender}`}
          >
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="chatbot-message ai typing">
            Typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Type your message..."
          className="chatbot-input-field"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <button 
          className="chatbot-input-button" 
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
        >
          ➢
        </button>
      </div>
    </div>
  );
};

export default Chatbot;