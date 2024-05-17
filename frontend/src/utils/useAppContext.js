// useAppContext.js

import { useState, useEffect } from 'react';
import axios from 'axios';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

const useAppContext = () => {
  const [blogs, setBlogs] = useState([]);
  const [focus, setFocus] = useState('Home');
  const [openModal, setOpenModal] = useState(false);
  const [username, setUsername] = useState();
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

  const fetchData = async () => {
    try {
      const feeds = await axios.get(`http://localhost:3000/home`, {
        withCredentials: true
      });
      const shuffledBlogs = shuffleArray(feeds.data.msg);
      setBlogs(shuffledBlogs);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401 && error.response.data && error.response.data.msg === 'Unauthorized') {
        setOpenModal(true);
      } else {
        console.log(error);
      }
    }
  };

  const focusSection = (value) => {
    const section = store[value] || store['Home'];
    setFocus(section.key);
    setOrder(section.format);
  };

  useEffect(() => {
    focusSection(focus);
  }, []); // Empty dependency array means it will run once when component mounts

  return { blogs, order, focus, openModal, username, setUsername, setOpenModal, focusSection, fetchData };
};

export default useAppContext;
