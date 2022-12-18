import Header from './components/Header';
import styles from "./styles/App.module.scss";

import Map from './components/Map';
import Login from './pages/Login';

import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  // EVENTS CHECKBOXES LAYERS
  const [showAllCheckbox, setShowAllCheckbox] = useState(false)
  const [showTodayCheckbox, setShowTodayCheckbox] = useState(false)
  const [showTomorrowCheckbox, setShowTomorrowCheckbox] = useState(false)

  const handleShowAll = () => {
      if (!showAllCheckbox) setAllFalse()
      setShowAllCheckbox(!showAllCheckbox)
  }

  const handleShowToday = () => {
      if (!showTodayCheckbox) setShowAllCheckbox(false)
      setShowTodayCheckbox(!showTodayCheckbox)
  }

  const handleShowTomorrow = () => {
      if (!showTomorrowCheckbox) setShowAllCheckbox(false)
      setShowTomorrowCheckbox(!showTomorrowCheckbox)
  }

  const setAllFalse = () => {
      setShowAllCheckbox(false)
      setShowTodayCheckbox(false)
      setShowTomorrowCheckbox(false)
  }



  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>

        <Route path="/home" element={
          <div className={styles.container}>
            <Header />
            <div className={styles.main}>
              <Map zoom={14} scrollZoom={true} center={[-22.896830735482645, -43.18081249706902]} tileUrl={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}/>
            </div>
          </div>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;