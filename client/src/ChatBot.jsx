// // ChatBot.jsx
// import React, { useState } from 'react';
// import './App.css';

// function ChatBot() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//    const [manualEvalInputs, setManualEvalInputs] = useState({});
//   const [isLoading, setIsLoading] = useState(false); 
//   const handleSend = async (e) => {
//   e.preventDefault();
//   if (!input.trim()) return;

//   const userMessage = { sender: 'user', text: input };
//   setMessages((prev) => [...prev, userMessage]);
//   setInput('');
//   setIsLoading(true); 

//   try {
//     const reply = await getReply(input);
//     const botMessage = { sender: 'bot', text: reply.message };

//     const newMessages = [botMessage];

//     if (reply.evaluation) {
//       const evaluationMessage = {
//         sender: 'evaluation',
//         text: `Score: ${reply.evaluation.score}/10\nFeedback: ${reply.evaluation.feedback}`
//       };
//       newMessages.push(evaluationMessage);
//     }

//     setMessages((prev) => [...prev, ...newMessages]);

//   } catch (error) {
//     setMessages((prev) => [...prev, { sender: 'bot', text: 'Error talking to ChatBot' }]);
//     console.error('Error:', error);
//   } finally {
//     setIsLoading(false);
//   }
// };


// //   const handleSend = async (e) => {
// //     e.preventDefault();
// //     if (!input.trim()) return;

// //     const userMessage = { sender: 'user', text: input };
// //     setMessages((prev) => [...prev, userMessage]);
// //     setInput('');
// //     setIsLoading(true); 

// //     try {
// //       const reply = await getReply(input);
// //       const botMessage = { sender: 'bot', text: reply };
// //       setMessages((prev) => [...prev, botMessage]);
// //     } catch (error) {
// //       setMessages((prev) => [...prev, { sender: 'bot', text: 'Error talking to ChatBot' }]);
// //       console.error('Error:', error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const getReply = async (message) => {
// //     const gender = localStorage.getItem('gender');
// //     const mode = localStorage.getItem('evaluationMode');

// //     const res = await fetch('http://localhost:5000/api/chats', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json'
// //       },
// //       body: JSON.stringify({ prompt: message, gender, mode })
// //     });

// //     const data = await res.json();
// //     return data.message?.trim() || 'No response';
// //   };
// const getReply = async (message) => {
//   const gender = localStorage.getItem('gender');
//   const mode = localStorage.getItem('evaluationMode');

//   const res = await fetch('https://bot-ride.vercel.app/api/chats', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ prompt: message, gender, mode })
//   });

//   const data = await res.json();
//   return {
//     message: data.message?.trim() || 'No response',
//     evaluation: data.evaluation || null
//   };
// };
// const handleManualEvaluationSubmit = (e, index) => {
//     e.preventDefault();
//     const { score, feedback } = manualEvalInputs[index];
//     if (!score || !feedback) return;

//     setMessages((prev) =>
//       prev.map((msg, i) =>
//         i === index ? { ...msg, manualEvaluation: { score, feedback } } : msg
//       )
//     );

//     setManualEvalInputs((prev) => {
//       const updated = { ...prev };
//       delete updated[index];
//       return updated;
//     });
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

// export default ChatBot;
import React, { useState } from 'react';
import './App.css';

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [manualEvalInputs, setManualEvalInputs] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const reply = await getReply(input);
      const botMessage = { sender: 'bot', text: reply.message, manualEvaluation: null };

      if (reply.evaluation) {
        botMessage.evaluation = reply.evaluation;
      }

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Error talking to ChatBot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getReply = async (message) => {
    const gender = localStorage.getItem('gender');
    const mode = localStorage.getItem('evaluationMode');

    const res = await fetch('https://bot-ride.vercel.app/api/chats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: message, gender, mode }),
    });

    const data = await res.json();
    return {
      message: data.message?.trim() || 'No response',
      evaluation: data.evaluation || null
    };
  };

  const handleManualEvaluationSubmit = (e, index) => {
    e.preventDefault();
    const { score, feedback } = manualEvalInputs[index];
    if (!score || !feedback) return;

    setMessages((prev) =>
      prev.map((msg, i) =>
        i === index ? { ...msg, manualEvaluation: { score, feedback } } : msg
      )
    );

    setManualEvalInputs((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };

  const mode = localStorage.getItem('evaluationMode');

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            {msg.text}

            {/* AI Evaluation */}
            {mode === 'ai' && msg.evaluation && (
              <div className="message evaluation">
                <strong>AI Evaluation</strong><br />
                Score: {msg.evaluation.score}/10<br />
                Feedback: {msg.evaluation.feedback}
              </div>
            )}

            {/* Manual Evaluation Form */}
            {mode === 'manual' && msg.sender === 'bot' && msg.manualEvaluation === null && (
              <form onSubmit={(e) => handleManualEvaluationSubmit(e, i)} className="manual-eval-form">
                <input
                  type="number"
                  min="1"
                  max="10"
                  placeholder="Score"
                  required
                  
                  value={manualEvalInputs[i]?.score || ''}
                  onChange={(e) =>
                    setManualEvalInputs((prev) => ({
                      ...prev,
                      [i]: { ...prev[i], score: e.target.value }
                    }))
                  }
                />
                <textarea
                  placeholder="Your feedback..."
                  required
                
                  value={manualEvalInputs[i]?.feedback || ''}
                  onChange={(e) =>
                    setManualEvalInputs((prev) => ({
                      ...prev,
                      [i]: { ...prev[i], feedback: e.target.value }
                    }))
                  }
                />
                <button type="submit">Submit</button>
              </form>
            )}

            {/* Manual Evaluation Display */}
            {mode === 'manual' && msg.manualEvaluation && (
              <div className="message evaluation">
                <strong>Manual Evaluation</strong><br />
                Score: {msg.manualEvaluation.score}/10<br />
                Feedback: {msg.manualEvaluation.feedback}
              </div>
            )}
          </div>
        ))}
        {isLoading && <div className="message bot"><em>Typing...</em></div>}
      </div>

      <form onSubmit={handleSend} className="chat-form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>Send</button>
      </form>
    </div>
  );
}

export default ChatBot;
