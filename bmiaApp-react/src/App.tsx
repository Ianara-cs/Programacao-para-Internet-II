import axios, { AxiosRequestConfig } from 'axios'
import { ChangeEvent, useEffect, useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { Input } from './components/Input'

interface DataBmi {
  name: string
  weight: number
  height: number
}

function App() {

  const [name, setName] = useState('')
  const [weight, setWeight] = useState(0.0)
  const [height, setHeight] = useState(0.0)
  const [bmi, setBmi] = useState(0) 
  const [allBmi, setAllBmi] = useState<DataBmi[]>([])

  useEffect(() => {
    const bmiAppApi  = async () => {
      const URL = 'http://localhost:3000/data'
      const config: AxiosRequestConfig = {
        headers: {
          Accept: "application/json"
        }
      }
      const response = await axios.get(URL, config)
      setAllBmi(response.data)
    }

    bmiAppApi()
  }, [])



  const nameOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const heightOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHeight(Number(e.target.value))
  }

  const weightOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(Number(e.target.value))
  }

  const handlerSubmit = () => {

    const result = weight / (height * height)

    setBmi(result)

  }

  return (
    <div id="container">
      <Header />
      <main>
        <h2>Type your data</h2>
        <form action="#">
          <div className="input-control">
            <label htmlFor="name">Name: </label>
            <Input value={name} onChange={nameOnChange} />
          </div>
          <div className="input-control">
            <label htmlFor="weight">Weight: </label>
            <Input value={weight} onChange={weightOnChange}/>
          </div>
          <div className="input-control">
            <label htmlFor="height">Height: </label>
            <Input value={height} onChange={heightOnChange}/>
          </div>
          <button onClick={handlerSubmit} id="btn_calculate">Calculate</button>
        </form>

        {
          bmi !== 0 &&
          (
          <h2>
            <section id="result">
              BMI: <span id="bmi">{bmi.toFixed(1)}</span>
            </section>
          </h2>
          )
        }

        <section>
        
          <ul>
            {allBmi.map(bmi => <li >{bmi.name}</li>)}
          </ul>
        
        </section>

      </main>
      <footer>
        <p>R1 Software @ 2023</p>
      </footer>
    </div>
  )
}

export default App
