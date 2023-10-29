import React, { useState } from 'react';
import './App.css';
import { getAIResponse } from './api';


function App() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const sendMessage = async () => {
    const userMessage = inputValue.trim();
    if (userMessage != '') {
      setMessages([...messages, { type: 'user', text: userMessage }, { type: 'ai', text: 'AI is typing...' }]);
      setInputValue(''); // Clear the input
      const aiResponse = await getAIResponse(userMessage);
      setMessages(prevMessages => {
        prevMessages[prevMessages.length - 1] = { type: 'ai', text: aiResponse };
        return [...prevMessages];
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };


  const handleSave = () => {
    // Convert the messages array to a single string
    const conversationText = messages.map(message => `${message.type.toUpperCase()}: ${message.text}`).join('\n');

    // Create a blob (file-like object) from the string
    const blob = new Blob([conversationText], { type: 'text/plain' });
    const href = URL.createObjectURL(blob);

    // Create a link element to initiate the download
    const link = document.createElement('a');
    link.href = href;
    link.download = 'conversation.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClear = () => {
    setMessages([]);
  };


  return (
    <div className="App">
      <div className='appBar'> Deloitte Auditor Enterprise Chat UI </div>
      <div className="chatWindow">
        {messages.map((message, index) => (
          <div key={index} className={`chatMessage ${message.type}`}>
            {message.text}
          </div>
        ))}
      </div>
      <input
        className="chatInput"
        placeholder="Type your question here..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <div className="buttonContainer">
        <button onClick={handleSave}>Save Conversation</button>
        <button onClick={handleClear}>Clear</button>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
