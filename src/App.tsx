import { Routes, Route } from "react-router-dom"


import { Dashboard } from "./pages/dashboard"
import { Question } from "./pages/question"
import { Leaderboard } from "./pages/leaderboard"
import { FinalScore } from "./pages/final-score"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/question" element={<Question />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/final-score" element={<FinalScore />} />
      </Routes>
    </>
  )
}

export default App
