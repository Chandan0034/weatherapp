import React, { useState, useEffect } from 'react';
import { Card, Typography, Icon, Container, Box ,useMediaQuery, useTheme} from '@mui/material';
import axios from 'axios';

const CurrentWeather = ({ city }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      try {
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=04e680411e39450a87434343240607&q=${city}&aqi=no`);
        setCurrentWeather(response.data);
      } catch (error) {
        console.error("Error fetching current weather:", error);
      }
    };

    if (city) {
      fetchCurrentWeather();
    }
  }, [city]);

  if (!currentWeather) return null;

  return (
    <Container style={{textAlign:'center' ,marginTop:'1rem'}}>
      {
        isSmallScreen ? <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
        <Typography variant='h5' fontFamily={'Poplins sans-serif'} color={'white'} fontWeight={'700'}>{currentWeather.location.name}<>,</><>{currentWeather.location.region}</></Typography>
        <Typography variant='5' fontFamily={'Poplins sans-serif'} color={'white'} fontWeight={'700'}>{currentWeather.location.localtime}</Typography>
        <Icon style={{width:'60px',height:'60px',marginTop:'1.5rem'}}>
          <img
            alt={currentWeather.current.condition.text}
            src={`https:${currentWeather.current.condition.icon}`}
            className="current-weather-icon-img"
          />
        </Icon>
        
          <Typography variant="h6" fontFamily={'Poplins sans-serif'} color={'white'} fontWeight={'600'}>Current Temperature: {currentWeather.current.temp_c}°C</Typography>
          <Typography variant="h6" fontFamily={'Poplins sans-serif'} color={'white'} fontWeight={'600'}>Condition: {currentWeather.current.condition.text}</Typography>
          <Typography variant="h6" fontFamily={'Poplins sans-serif'} color={'white'} fontWeight={'600'}>Humidity: {currentWeather.current.humidity}%</Typography>
          <Typography variant="h6" fontFamily={'Poplins sans-serif'} color={'white'} fontWeight={'600'}>Wind: {currentWeather.current.wind_kph} km/h</Typography>
        </Box>:
        <Container style={{display:'flex', justifyContent:'space-evenly', alignItems:'center'}}>
          <Card style={{background:'#0d0d42', padding:'2rem', textAlign:'start'}}>
            <Typography variant='h5' fontFamily={'Poplins sans-serif'} color={'white'} fontWeight={'700'}>{currentWeather.location.name}<>,</><>{currentWeather.location.region}</></Typography>
            <Typography variant='5' fontFamily={'Poplins sans-serif'} color={'white'} fontWeight={'700'}>{currentWeather.location.localtime}</Typography>
            <Typography variant="h6" fontFamily={'Poplins sans-serif'} color={'white'} fontWeight={'600'}>Current Temperature: {currentWeather.current.temp_c}°C</Typography>
            <Typography variant="h6" fontFamily={'Poplins sans-serif'} color={'white'} fontWeight={'600'}>Condition: {currentWeather.current.condition.text}</Typography>
            <Typography variant="h6" fontFamily={'Poplins sans-serif'} color={'white'} fontWeight={'600'}>Humidity: {currentWeather.current.humidity}%</Typography>
            <Typography variant="h6" fontFamily={'Poplins sans-serif'} color={'white'} fontWeight={'600'}>Wind: {currentWeather.current.wind_kph} km/h</Typography>

          </Card>
          <Card>
            <Icon style={{width:'150px',height:'150px',marginTop:'1.5rem'}}>
              <img
                alt={currentWeather.current.condition.text}
                src={`https:${currentWeather.current.condition.icon}`}
                className="current-weather-icon-img"
              />
        </Icon>
          </Card>
        </Container>
      }
    </Container>
  );
};

export default CurrentWeather;
