import { useEffect, useState } from 'react'
import './App.css'
import { NavigationBar } from './components/NavigationBar'
import { Home } from './components/Home'
import AppContext from './components/AppContext'
import axios from "axios"
import './fonts/fonts.css';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

function App() {
  const [blogs, setBlogs] = useState([]);
  const [focus, setFocus] = useState(['Home'])
  const [order, setOrder] = useState({
    left: '1 / 2',
    mid: '2 / 3',
    right: '3 / 4'
  });
  const [store] = useState({
    'Home': {key: 'Home', format: { left: '1 / 2', mid: '2 / 3', right: '3 / 4' }},
    'Blog': {key: 'RightHome', format: { left: '1 / 2', mid: '3 / 4', right: '2 / 3' }},
    'Trending': {key: 'LeftHome', format: { left: '2 / 3', mid: '1 / 2', right: '3 / 4' }},
  });

  const fetchData = () => {
      axios.get(`http://localhost:3000/home`)
      .then((res) => {
          const shuffledBlogs = shuffleArray(res.data.msg);
          setBlogs(shuffledBlogs);
      });
  }
  const focusSection = (value) =>{
    const getValue = (key) => {
      return store[key] || 'Default value'; 
    };
    setFocus(getValue(value).key)
    setOrder(getValue(value).format)
    console.log(focus)
    // setFocus(value)
  }

  useEffect(() => {
    // This will run when the component mounts
    focusSection(focus);
  }, []); // Empty dependency array means it will run once when component mounts


  return (
      <AppContext.Provider value={{ blogs, order, focus, focusSection, fetchData }}>
          <NavigationBar />
          <Home />
      </AppContext.Provider>
  );
}


export default App
