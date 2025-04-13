import React from 'react';
import { Bar } from 'react-chartjs-2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import './comentariosMes.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ComentariosMes = ({ mesesData }) => {
  const { labels, data } = mesesData;

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Comentarios',
        data: data,
        backgroundColor: 'rgba(233, 30, 99, 0.4)',
        borderColor: '#e91e63',
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16,
            weight: 'bold',
          },
          color: '#1a237e',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#2c3e50',
          font: {
            size: 14,
            weight: '500',
          },
          padding: 10,
        },
        grid: {
          color: 'rgba(233, 30, 99, 0.1)',
        },
      },
      x: {
        ticks: {
          color: '#2c3e50',
          font: {
            size: 14,
            weight: '500',
          },
          autoSkip: false,
          padding: 15,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <Box
      className="comentariosmes-container"
      sx={{
        padding: 4,
        width: '95%',
        margin: 'auto',
      }}
    >
      <Typography variant="h4" className="comentarios-mes-title" gutterBottom>
        Comentarios por Mes 2025
      </Typography>

      <Paper
        className="comentarios-chart"
        sx={{
          height: '600px',
          padding: 3,
          position: 'relative',
          width: '100%',
          maxWidth: '60vw',
        }}
      >
        <Bar data={chartData} options={chartOptions} />
      </Paper>
    </Box>
  );
};

export default ComentariosMes;
