import Home from "./pages/Home/Home"
import './App.css'
import { PokeContext } from "./components/PokeContext/PokeContext"

function App() {
  
  return (
    <PokeContext>
      <Home/>
    </PokeContext>
  )
}

export default App
