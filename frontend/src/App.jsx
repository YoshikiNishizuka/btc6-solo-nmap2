import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState([
      "a",
      "b"
      ])

  function getTest(){
      fetch("/api/lists")
      .then((res)=>res.json())
      .then((data) => setCount(data[0].name))
      }

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => getTest()}>
          count is {count}
        </button>
        <p>
        </p>
      </div>
      <p className="read-the-docs">
        aaaaaClick on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
