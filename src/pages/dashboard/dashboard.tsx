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
          <option>Entertainment: Film</option>
          <option>Entertainment: Music</option>
        </select>
        
        <br />

        <label htmlFor="difficulty">Difficulty</label>
        <select name="difficulty">
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <br />

        <label htmlFor="type">Type</label>
        <select name="type">
          <option>Multiple  Choice</option>
          <option>True/False</option>
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