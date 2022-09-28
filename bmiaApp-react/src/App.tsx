import { useForm } from 'react-hook-form'
import './App.css'
import { Header } from './components/Header'

function App() {
  const {register ,handleSubmit} = useForm()

  function onSubmit(value: any) {
    const bmi = calcularBmi(value.height, value.weight) 
  }

  function calcularBmi(height: number, weight: number) {
    const bmi = weight / (height*height)        
    return bmi
  }

  return (
    <div id="container">
      <Header/>
      <main>
        <h2>Type your data</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-control">
            <label htmlFor="name">Name: </label>
            <input {...register('name')} type="text" id="name" />
          </div>
          <div className="input-control">
            <label htmlFor="weight">Weight: </label>
            <input {...register('weight')} type="number" id="weight" />
          </div>
          <div className="input-control">
            <label htmlFor="height">Height: </label>
            <input {...register('height')} type="number" step="0.01" id="height" />
          </div>
          <button id="btn_calculate">Calculate</button>
        </form>

        <section id="result">BMI: <span id="bmi">34.5</span></section>
      </main>
      <footer>
        <p>R1 Software @ 2023</p>
      </footer>
    </div>
  )
}

export default App
