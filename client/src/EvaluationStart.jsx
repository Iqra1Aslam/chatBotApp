
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EvaluationStart = () => {
  const [gender, setGender] = useState('');
  const [mode, setMode] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (gender && mode) {
      localStorage.setItem('gender', gender);
      localStorage.setItem('evaluationMode', mode);
      navigate('/chat'); // or '/manual' depending on mode
    } else {
      alert('Please select gender and evaluation type.');
    }
  };

  return (
    <div>
      {/* <h3>Select Gender</h3>
      <button onClick={() => setGender('male')}>MALE</button>
      <button onClick={() => setGender('female')}>FEMALE</button>

      <h3>Wanna Continue with:</h3>
      <button onClick={() => setMode('manual')}>MANUAL EVALUATION</button>
      <button onClick={() => setMode('ai')}>AI CHAT BOT EVALUATION</button>

      <button onClick={handleContinue}>Continue</button> */}
      <h2>Select Gender</h2>
<div className="gender-buttons">
  <button onClick={() => setGender('male')} className={gender === 'male' ? 'selected' : ''}>MALE</button>
  <button onClick={() => setGender('female')} className={gender === 'female' ? 'selected' : ''}>FEMALE</button>
</div>

<h2>Continue With</h2>
<div className="mode-buttons">
  <button onClick={() => setMode('manual')} className={mode === 'manual' ? 'selected' : ''}>MANUAL</button>
  <button onClick={() => setMode('ai')} className={mode === 'ai' ? 'selected' : ''}>AI CHAT BOT</button>
   
</div>
<div className="mode-buttons">
  <button onClick={handleContinue}>Continue</button>
  </div>
    </div>
  );
};

export default EvaluationStart;
