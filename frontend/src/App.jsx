import { useEffect, useState } from 'react'
import './App.css'
import { NavigationBar } from './components/NavigationBar'
import { Home } from './components/Home'
import AppContext from './components/AppContext'
import useAppContext from './utils/useAppContext'
import axios from "axios"
import './fonts/fonts.css';

function App() {
  const { blogs, order, focus, openModal, username, setUsername, setOpenModal, focusSection, fetchData } = useAppContext();

  return (
      <AppContext.Provider value={{ blogs, order, focus, openModal, username, setUsername, setOpenModal,focusSection, fetchData }}>
          <NavigationBar />
          <Home />
      </AppContext.Provider>
  );
}


export default App
