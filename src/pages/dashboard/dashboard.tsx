import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from '../../redux/actions/formActions';
import { RootState } from '../../redux/types';
import './dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form);
  
  const [errors, setErrors] = useState({
    category: false,
    difficulty: false,
    type: false,
    amount: false
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const validateForm = () => {
    const newErrors = {
      category: !formData.category,
      difficulty: !formData.difficulty,
      type: !formData.type,
      amount: !formData.amount 
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  function handleChange(e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
    
    if (isSubmitted) {
      setErrors(prev => ({
        ...prev,
        [name]: !value 
      }));
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitted(true);
    
    if (validateForm()) {
      navigate('/question');
    }
  }

  return (
    <div className="dashboard">
      <header className="header">
        <div className="header-title">Quiz App</div>
        <a href="/leaderboard" className="header-link">LEADER BOARD</a>
      </header>

      <div className="container">
        <h1 className="title">Quiz App</h1>
        
        <form onSubmit={onSubmit} className="form">
          <div className="form-group">
            <select 
              className={`form-control ${errors.category && isSubmitted ? 'error' : ''}`}
              name="category" 
              value={formData.category}
              onChange={handleChange}
            >
              <option value="" disabled>Category</option>
              <option value="Entertainment: Film">Entertainment: Film</option>
              <option value="Entertainment: Music">Entertainment: Music</option>
              <option value="Entertainment: Television">Entertainment: Television</option>
              <option value="Science & Nature">Science & Nature</option>
            </select>
            {errors.category && isSubmitted && (
              <div className="error-message">Please enter category!!!</div>
            )}
          </div>
          
          <div className="form-group">
            <select 
              className={`form-control ${errors.difficulty && isSubmitted ? 'error' : ''}`}
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
            >
              <option value="" disabled>Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            {errors.difficulty && isSubmitted && (
              <div className="error-message">Please enter difficulty!!!</div>
            )}
          </div>
          
          <div className="form-group">
            <select 
              className={`form-control ${errors.type && isSubmitted ? 'error' : ''}`}
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="" disabled>Type</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True/False</option>
            </select>
            {errors.type && isSubmitted && (
              <div className="error-message">Please enter type!!!</div>
            )}
          </div>
          
          <div className="form-group">
            <input 
              className={`form-control ${errors.amount && isSubmitted ? 'error' : ''}`}
              type="number" 
              name="amount" 
              value={formData.amount}
              onChange={handleChange}
              placeholder="Amount of Question"
            />
            {errors.amount && isSubmitted && (
              <div className="error-message">Please enter amount of questions!</div>
            )}
          </div>
          
          <button type="submit" className="submit-button">
            GET STARTED
          </button>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;