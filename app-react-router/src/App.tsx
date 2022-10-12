import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom"
import "./App.css"
import { Home } from "./pages/home/Home"
import { Players } from "./pages/players/Players"
import { Teams } from "./pages/teams/Teams"

function App() {

  
  return (
    <div className="App">
      <Router>
        <header>
          <h1>Copa 2022</h1>
          <nav className="menu">
            <ul>
              <li><Link to="/"> Home</Link></li>
              <li><Link to="/teams">Teams</Link> </li>
              <li><Link to="/playes">Playes</Link></li>
            </ul>
          </nav>
          
        </header>
      
        <main>

          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/teams" element={<Teams/>} />
            <Route path="/playes" element={<Players/>} />
          </Routes>
        </main>

        <footer>
          <p>copa 2022</p>
        </footer>
      </Router>

    </div>
  )
}

export default App
