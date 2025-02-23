import { useState } from 'react'

import './App.css'
function Button() {
  const [count, setCount] = useState(0)

  return (
    <>
      <button className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none'></button>
    </>
  )
}

export default Button
