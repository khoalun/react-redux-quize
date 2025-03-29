import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from '../../redux/actions/formActions';
import { RootState } from '../../redux/types';
import { ICategory } from '../../types';

const initializeState = {
  category: '',
  difficulty: '',
  type: '',
  amount: 0
}

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categories, setCategories] = React.useState<ICategory[]>([]);
  const [forms, setForms] = React.useState(initializeState)

  React.useEffect(() => {
    async function fetchCategories() {
      const res = await fetch('https://opentdb.com/api_category.php');
      const data = await res.json();
      setCategories(data.trivia_categories);
    }
    fetchCategories();
  }, []);
  
  const [errors, setErrors] = useState({
    category: false,
    difficulty: false,
    type: false,
    amount: false
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const validateForm = () => {
    const newErrors = {
      category: !forms.category,
      difficulty: !forms.difficulty,
      type: !forms.type,
      amount: !forms.amount 
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  function handleChange(e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
    const { name, value } = e.target;
    setForms(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    })
    
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
      dispatch(
        updateFormData({
          category: forms.category,
          difficulty: forms.difficulty,
          type: forms.type,
          amount: forms.amount
        })
      );
      setForms(initializeState)
      navigate('/question');
    }
  }

  return (
    <>
      <h1 className="title">Quiz App</h1>
      
      <form onSubmit={onSubmit} className="form">
        <div className="form-group">
          <select 
            className={`form-control ${errors.category && isSubmitted ? 'error' : ''}`}
            name="category" 
            value={forms.category}
            onChange={handleChange}
          >
            <option value="" disabled>Category</option>
            {categories.map(cate => (
              <option key={cate.id} value={cate.id}>{cate.name}</option>
            ))}
          </select>
          {errors.category && isSubmitted && (
            <div className="error-message">Please enter category!!!</div>
          )}
        </div>
        
        <div className="form-group">
          <select 
            className={`form-control ${errors.difficulty && isSubmitted ? 'error' : ''}`}
            name="difficulty"
            value={forms.difficulty}
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
            value={forms.type}
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
            value={forms.amount}
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
    </>
  );
}

export default Dashboard;