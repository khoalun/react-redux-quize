import React from 'react'
import { Link } from 'react-router-dom'

function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <header className="header">
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
          <div className="header-title">Quiz App</div>
        </Link>
        <a href="/leaderboard" className="header-link">LEADER BOARD</a>
      </header>

      <div className="container">
        {children}
      </div>
    </>
  )
}

export default MainLayout