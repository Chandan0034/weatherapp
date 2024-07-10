# Weather Dashboard

## Description
The Weather Dashboard is a React application that provides current weather information and a 7-day forecast for different cities. The application allows users to search for cities and display the weather data using the OpenWeatherMap API. The project uses Material-UI for styling and Chart.js for data visualization.

## Objectives
- Fetch and display real-time weather data.
- Implement data visualization for temperature trends.
- Ensure the application is responsive and mobile-friendly.

## Features
- Search for cities and display current weather information.
- Display a 7-day weather forecast with daily temperatures and weather conditions.
- Visualize temperature trends over the next 7 days using charts.
- Responsive design that works well on various screen sizes, including mobile devices.

## Project Structure
weather-dashboard/
├── public/
│ ├── index.html
│ └── ...
├── src/
│ ├── api/
│ │ └── weatherApi.js
│ ├── components/
│ │ ├── Forecast.js
│ │ ├── ForecastChart.js
│ │ ├── SearchBar.js
│ │ └── WeatherDisplay.js
│ ├── App.css
│ ├── App.js
│ ├── index.js
│ └── ...
├── package.json
└── README.md


## Setup Instructions

### Prerequisites
- Node.js and npm installed on your machine.
- An API key from OpenWeatherMap.

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/weather-dashboard.git
   cd weather-dashboard
## Install Dependencies
npm install
## Running The Application
npm start
