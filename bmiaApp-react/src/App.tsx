import './App.css'
import { Header } from './components/Header'
import { Input } from './components/Input'
import { InputControl } from './components/InputControl'

function App() {
  return (
    <div className='container'>
      <Header/>
      <main>
        <form>
          <InputControl label='Name:'>
            <Input/>
          </InputControl>
          <InputControl label='Weight:'>
            <Input/>
          </InputControl>
          <InputControl label='Height:'>
            <Input/>
          </InputControl>
        </form>
      </main>
      <footer>
        <p>R1 Software @ 2023</p>
      </footer>

    </div>
  )
}

export default App
