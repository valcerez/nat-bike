import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardHome from './pages/DashboardHome'

function App() {
  return (
    <BrowserRouter>
      {/* On retire le wrapper dark mode car on passe en Design System "Warm Light" */}
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        {/* Les anciennes routes ne sont plus nécessaires car tout est dans le dashboard */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
