import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ data }) => {
  const chartData = {
    labels: data.map(day => {
      const date = new Date(day.date);
      return window.screen > 600 ? date.toLocaleDateString('en-US', { weekday: 'short',day:'numeric',month:'numeric',year:'numeric'}):date.toLocaleDateString('en-US', { weekday: 'short'})
    }),
    datasets: [
      {
        label: 'Min Temperature (°C)',
        data: data.map(day => day.day?.mintemp_c ?? 0),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Max Temperature (°C)',
        data: data.map(day => day.day?.maxtemp_c ?? 0),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.dataset.label + ': ' + tooltipItem.raw.toFixed(2);
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        title: {
          display: true,
          text: 'Day',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default Chart;
