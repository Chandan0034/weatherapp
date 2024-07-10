import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Icon, Grid, Container, CircularProgress } from '@mui/material';
import axios from 'axios';
import Chart from './Charts';

const Forecast = ({ city }) => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=04e680411e39450a87434343240607&q=${city}&days=7&aqi=no&alerts=no`);
        setForecast(response.data.forecast.forecastday);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching forecast:", error);
        setLoading(false); // Handle error and set loading to false
      }
    };

    if (city) {
      fetchForecast();
    }
  }, [city]);

  // const theme = useTheme();
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen size is small (mobile)

  if (loading) {
    return (
      <Container style={{ marginTop: '2rem', textAlign: 'center' }}>
        <CircularProgress /> {/* Show loading indicator */}
      </Container>
    );
  }

  if (!forecast || forecast.length === 0) {
    return <Typography variant="h6" fontFamily={'Poplins sans-serif'} color={'white'}>No forecast data available</Typography>; // Handle no forecast data
  }

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
    return `${dayName} (${formattedDate})`;
  };

  return (
    <Container style={{ marginTop: '2rem', textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom fontFamily={'Poplins sans-serif'} color={'white'} fontWeight={'700'}>7-Day Forecast</Typography>
      <Grid container spacing={2}>
        {forecast.map((day, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card className="forecast-day-card">
              <CardContent>
                <Icon className="forecast-icon" style={{ height: '60px', width: '60px' }}>
                  <img
                    alt={day.day.condition.text}
                    src={`https:${day.day.condition.icon}`}
                    className="forecast-icon-img"
                    style={{ height: '100%', width: '100%' }}
                  />
                </Icon>
                <Typography variant="body1" fontFamily={'Poplins sans-serif'}>Min Temp: {day.day.mintemp_c}°C</Typography>
                <Typography variant="body1" fontFamily={'Poplins sans-serif'}>Max Temp: {day.day.maxtemp_c}°C</Typography>
                <Typography variant="body1" fontFamily={'Poplins sans-serif'}>Condition: {day.day.condition.text}</Typography>
                <Typography variant="body1" fontFamily={'Poplins sans-serif'}>Precipitation: {day.day.totalprecip_mm} mm</Typography>
                <Typography variant="h6" fontFamily={'Poplins sans-serif'}>{getDayName(day.date)}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Card style={{ marginTop: '2rem',backgroundColor:'white' }}>
          <Chart data={forecast} />
        </Card>
      {/* {isSmallScreen && (
        <Card style={{ marginTop: '2rem', backgroundColor:'white' }}>
          <Chart data={forecast} />
        </Card>
      )}
      {!isSmallScreen && (
        <Card style={{ marginTop: '2rem',backgroundColor:'white' }}>
          <Chart data={forecast} />
        </Card>
      )} */}
    </Container>
  );
};

export default Forecast;
