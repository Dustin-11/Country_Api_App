import './App.css';
import React, { Fragment } from 'react';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from "./Components/Header";
import CountryCard from './Components/CountryCard';
import SingleCountry from './Components/SingleCountry';

function App() {
  const [sharedData, setSharedData] = useState("");
  const HandleCountrySelection = (Selection) => {
    setSharedData(Selection);
  }
  return (
    <>
      <Header />
      <Routes>
        <Route path="/Country_Api_App" element={<CountryCard countrySelection={HandleCountrySelection}/>} />
        <Route path="/SingleCountry" element={<SingleCountry sharedData={sharedData}/>} />
      </Routes>
    </>
  );
}

export default App;



