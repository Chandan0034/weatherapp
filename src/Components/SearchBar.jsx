import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Select, MenuItem, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import axios from 'axios';

const SearchBar = ({ setCity, setForecastData }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [cityToAdd, setCityToAdd] = useState('');
  const [selectedFavoriteCity, setSelectedFavoriteCity] = useState('');

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Load favorite cities from local storage on component mount
  useEffect(() => {
    const savedCities = JSON.parse(localStorage.getItem('favoriteCities')) || [];
    setFavoriteCities(savedCities);
    if (savedCities.length > 0) {
      setSelectedFavoriteCity(savedCities[0]); // Select the first city initially
      fetchForecast(savedCities[0]); // Fetch forecast for the initially selected city
    }
  }, []);

  // Save favorite cities to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities));
  }, [favoriteCities]);

  const handleInputChange = async (event, newInputValue) => {
    setInputValue(newInputValue);
    if (newInputValue.length > 2) {
      try {
        const response = await axios.get(`http://api.weatherapi.com/v1/search.json?key=04e680411e39450a87434343240607&q=${newInputValue}`);
        setSuggestions(response.data || []);
      } catch (error) {
        console.error('Error fetching city suggestions:', error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = async (event, value) => {
    if (value && value.name) {
      setCityToAdd(value.name);
      setOpenModal(true);
    }
  };

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const matchingSuggestion = suggestions.find(suggestion => suggestion.name.toLowerCase() === inputValue.toLowerCase());
      if (matchingSuggestion) {
        setCityToAdd(matchingSuggestion.name);
        setOpenModal(true);
      } else if (inputValue.trim()) {
        setCityToAdd(inputValue);
        setOpenModal(true);
      }
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
    fetchForecast(cityToAdd);
  };

  const handleSaveFavorite = () => {
    setOpenModal(false);
    if (!favoriteCities.find(favCity => favCity === cityToAdd)) {
      setFavoriteCities([...favoriteCities, cityToAdd]);
    }
    setSelectedFavoriteCity(cityToAdd); // Select the newly added city
    fetchForecast(cityToAdd);
  };

  const handleDeleteFavorite = (cityToDelete) => {
    const updatedFavoriteCities = favoriteCities.filter(city => city !== cityToDelete);
    setFavoriteCities(updatedFavoriteCities);
    if (selectedFavoriteCity === cityToDelete) {
      // If the deleted city was selected, select the first city in the list
      setSelectedFavoriteCity(updatedFavoriteCities.length > 0 ? updatedFavoriteCities[0] : '');
      fetchForecast(updatedFavoriteCities.length > 0 ? updatedFavoriteCities[0] : '');
    }
  };

  const handleFavoriteCitySelect = (event) => {
    const selectedCity = event.target.value;
    if (selectedCity === '__delete__') {
      // Do nothing or handle differently if needed
    } else {
      setSelectedFavoriteCity(selectedCity);
      fetchForecast(selectedCity);
    }
  };

  const fetchForecast = async (city) => {
    if (!city) {
      console.error('City name is empty or undefined');
      return;
    }
    setCity(city);
    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=04e680411e39450a87434343240607&q=${city}&days=7&aqi=no&alerts=yes`); // Enable alerts fetching
      const forecastData = parseForecastData(response.data);
      setForecastData(forecastData);
      setSelectedFavoriteCity([]);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const parseForecastData = (data) => {
    if (!data || !data.forecast || !data.forecast.forecastday) {
      return [];
    }
    return data.forecast.forecastday.map(day => ({
      day: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
      // Add other relevant data here as needed (e.g., temperature, condition)
    }));
  };

  return (
    <Box>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection={isSmallScreen ? 'column' : 'row'} gap={2} width="100%">
        <Box width={isSmallScreen ? '100%' : '50%'}>
          <Autocomplete
            freeSolo
            inputValue={inputValue}
            onInputChange={handleInputChange}
            options={suggestions}
            getOptionLabel={(option) => option.name || ''}
            renderOption={(props, option) => (
              <li {...props} key={option.id || option.name}>{option.name}</li>
            )}
            onChange={handleSelect}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Search City'
                variant="outlined"
                fullWidth
                onKeyPress={handleKeyPress}
                className="search-bar-input"
                style={{ minWidth: '300px', maxWidth: '600px', width: '100%',backgroundColor:'white' }} // Increase the minimum width and set max width
                InputLabelProps={{
                  style: { color: 'black', borderColor: 'black' ,} // Change the color here
                }}
              />
            )}
          />
        </Box>
      </Box>
     {
      favoriteCities.length> 0 ?  <Box marginTop={'1rem'}  display="flex" alignItems="center" justifyContent={isSmallScreen ? 'center' : 'center'} width={isSmallScreen ? '100%' : 'auto'}>
      <Typography variant="h8" style={{ marginRight: '1rem', whiteSpace: 'nowrap' }} fontFamily={'Poplins sans-serif'} color={'white'} fontWeight={'700'}>
        Favorite Cities:
      </Typography>
      <Select
      style={{fontFamily:'Poplins sans-serif', color:'white',fontWeight:'700'}}
        value={selectedFavoriteCity}
        onChange={handleFavoriteCitySelect}
        displayEmpty
        fullWidth={isSmallScreen}
        variant="outlined"
        sx={{
          '& .MuiSelect-icon': {
            color: 'white', // Change this to your desired color
          },
        }}
      >
        <MenuItem value="">
          Select a favorite city
        </MenuItem>
        {favoriteCities.map((city, index) => (
          <MenuItem key={index} value={city}>
            {city}
            {selectedFavoriteCity !== city && (
              <IconButton
                aria-label="delete"
                color="error"
                onClick={() => handleDeleteFavorite(city)}
                size="small"
                style={{ marginLeft: 'auto' }}
              >
                <Typography variant="button">Del</Typography>
              </IconButton>
            )}
          </MenuItem>
        ))}
      </Select>
    </Box>:""
     }

      <Dialog open={openModal} onClose={handleModalClose}>
        <DialogTitle>Add City to Favorites</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to save {cityToAdd} as your favorite city?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveFavorite} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SearchBar;
