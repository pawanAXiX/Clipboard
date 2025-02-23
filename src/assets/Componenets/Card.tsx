import { useState } from 'react'
import Button from './Button'
import './App.css'
function Card() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='card-body'></div>
        <div class='mt-4 flex space-x-2'>
            <Button/>
            <Button/>
            <Button/>
        </div>
      </div>
    </>
  )
}

export default Card
