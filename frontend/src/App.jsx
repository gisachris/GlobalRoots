import { useState, useEffect } from 'react'
import './input.css'


function App() {
  const [color, setColor] = useState('white')
  const baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/v1/'

  useEffect(() => {
    fetch(`${baseURL}`)
      .then(res => res.json())
      .then(data => setColor(data.color))
      .catch(err => console.error(err))
  }, [baseURL])
  return (
    <div className='flex justify-center items-center h-screen w-screen'>
      <div className={`min-w-[100px] min-h-[100px] self-auto`} style={{ backgroundColor: color }}></div>
    </div>
  )
}

export default App
