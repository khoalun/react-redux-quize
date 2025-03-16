import React from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    navigate('/question')
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="category">Category</label>
        <select name="category">
          <option value="Entertainment: Film">Entertainment: Film</option>
          <option value="Entertainment: Music">Entertainment: Music</option>
        </select>
        
        <br />

        <label htmlFor="difficulty">Difficulty</label>
        <select name="difficulty">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <br />

        <label htmlFor="type">Type</label>
        <select name="type">
          <option value="multiple">Multiple  Choice</option>
          <option value="boolean">True/False</option>
        </select>

        <br />

        <label htmlFor="amount">Amount of Question</label>
        <input type="text" name="amount" />


        <br />

        <button type='submit'>Submit</button>

      </form>
    </>
  )
}

export default Dashboard