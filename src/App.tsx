import { Routes, Route } from "react-router-dom"


import { Dashboard } from "./pages/dashboard"
import { Question } from "./pages/question"
import { Leaderboard } from "./pages/leaderboard"
import { FinalScore } from "./pages/final-score"
import MainLayout from "./layouts/main-layout/main-layout"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
        <Route path="/question" element={<MainLayout><Question /></MainLayout>} />
        <Route path="/leaderboard" element={<MainLayout><Leaderboard /></MainLayout>} />
        <Route path="/final-score" element={<MainLayout><FinalScore /></MainLayout>} />
      </Routes>
    </>
  )
}

export default App
