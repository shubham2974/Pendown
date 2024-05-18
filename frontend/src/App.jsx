import { useEffect, useState } from 'react'
import './App.css'
import { NavigationBar } from './components/NavigationBar'
import { Home } from './components/Home'
import AppContext from './components/AppContext'
import useAppContext from './utils/useAppContext'
import axios from "axios"
import './fonts/fonts.css';

function App() {
  const { blogs, hashtags, order, focus, openModal, username, setBlogs, setUsername, setOpenModal, focusSection, fetchData, fetchHashtags, fetchPosts } = useAppContext();

  return (
      <AppContext.Provider value={{ blogs, hashtags, order, focus, openModal, username, setBlogs, setUsername, setOpenModal,focusSection, fetchData, fetchHashtags, fetchPosts }}>
          <NavigationBar />
          <Home />
      </AppContext.Provider>
  );
}


export default App
