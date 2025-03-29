import React from 'react'
import { Link } from 'react-router-dom'

function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <header className="header">
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
          <div className="header-title">Quiz App</div>
        </Link>
        <Link to="/leaderboard" className="header-link">LEADER BOARD</Link>
      </header>

      <div className="container">
        {children}
      </div>
    </>
  )
}

export default MainLayout