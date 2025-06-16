// import React, { useState } from 'react';
// import './App.css';

// function App() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false); 

//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMessage = { sender: 'user', text: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput('');
//     setIsLoading(true); 

//     try {
//       const reply = await getReply(input);
//       const botMessage = { sender: 'bot', text: reply };
//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       setMessages((prev) => [...prev, { sender: 'bot', text: 'Error talking to ChatBot' }]);
//       console.error('Error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getReply = async (message) => {
//     const res = await fetch('http://localhost:5000/api/chats', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ prompt: message })
//     });

//     const data = await res.json();
//     return data.message?.trim() || 'No response';
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-box">
//         {messages.map((msg, i) => (
//           <div key={i} className={`message ${msg.sender}`}>
//             {msg.text}
//           </div>
//         ))}
//         {isLoading && (
//           <div className="message bot">
//             <em>Typing...</em>
//           </div>
//         )}
//       </div>
//       <form onSubmit={handleSend} className="chat-form">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your message..."
//           disabled={isLoading}
//         />
//         <button type="submit" disabled={isLoading}>Send</button>
//       </form>
//     </div>
//   );
// }

// export default App;
// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatBot from './ChatBot';
import EvaluationStart from './EvaluationStart';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EvaluationStart />} />
        <Route path="/chat" element={<ChatBot />} />
      </Routes>
    </Router>
  );
}

export default App;
