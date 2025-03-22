import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from '../../redux/actions/formActions';
import { RootState } from '../../redux/types';


function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate('/question');
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="category">Category</label>
        <select 
          name="category" 
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Entertainment: Film">Entertainment: Film</option>
          <option value="Entertainment: Music">Entertainment: Music</option>
        </select>
        
        <br />

        <label htmlFor="difficulty">Difficulty</label>
        <select 
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <br />

        <label htmlFor="type">Type</label>
        <select 
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True/False</option>
        </select>

        <br />

        <label htmlFor="amount">Amount of Question</label>
        <input 
          type="text" 
          name="amount" 
          value={formData.amount}
          onChange={handleChange}
        />

        <br />

        <button type='submit'>Submit</button>
      </form>
    </>
  );
}

export default Dashboard;