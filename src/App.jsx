import React, { useState } from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import SearchBar from './Components/SearchBar';
import CurrentWeather from './Components/CurrentWeather';
import Forecast from './Components/Forecast';
import './App.css';

const App = () => {
  const [city, setCity] = useState('pune');
  const [forecastData, setForecastData] = useState([]);

  return (
    <div className='container' >
      <Container className="App" style={{background:'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(17,17,84,1) 100%, rgba(0,212,255,1) 100%)'}}>
      <CssBaseline />
      <Typography variant="h5" gutterBottom style={{textAlign:'center', color:'white'}}>
        Weather Dashboard
      </Typography>
      <SearchBar setCity={setCity} setForecastData={setForecastData} />
      {city && (
        <>
          <CurrentWeather city={city} />
          <Forecast city={city} />
        </>
      )}
    </Container>
    </div>
  );
};

export default App;
