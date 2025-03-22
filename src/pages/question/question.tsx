import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/types';

function Question() {
  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.form);
  console.log('formData', formData)
  return (
    <div style={{textAlign: 'left', marginLeft:'20px'}}>
      <h2>Quiz Information</h2>
      <p>Category: {formData.category}</p>
      <p>Difficulty: {formData.difficulty}</p>
      <p>Type: {formData.type}</p>
      <p>Amount: {formData.amount}</p>
      
      <button onClick={() => navigate('/')}>Back to Dashboard</button>
    </div>
  );
}

export default Question;