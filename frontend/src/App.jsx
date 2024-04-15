import { useState } from 'react'
import './App.css'
import { NavigationBar } from './components/NavigationBar'
import { Home } from './components/Home'
import './fonts/fonts.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <NavigationBar/>
      <Home/>
    </div>
  )
}

export default App
