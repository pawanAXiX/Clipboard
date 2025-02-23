import { useState } from 'react'
import './App.css'
import Clipboard from './assets/Componenets/Cipboard'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Clipboard/>
      </div>
    </>
  )
}

export default App
