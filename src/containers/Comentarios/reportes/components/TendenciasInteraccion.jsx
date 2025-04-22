import React from 'react';
import { Bar } from 'react-chartjs-2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import './tendenciasInteraccion.css';
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

const TendenciasInteraccion = ({ horasData }) => {
    const { labels, data } = horasData;

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Comentarios',
                data: data,
                backgroundColor: 'rgba(77, 171, 247, 0.4)',
                borderColor: '#4dabf7',
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
                        weight: 'bold'
                    },
                    color: '#1a237e'
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#2c3e50',
                    font: {
                        size: 14,
                        weight: '500'
                    },
                    padding: 10
                },
                grid: {
                    color: 'rgba(77, 171, 247, 0.1)'
                }
            },
            x: {
                ticks: {
                    color: '#2c3e50',
                    font: {
                        size: 14,
                        weight: '500'
                    },
                    autoSkip: false,
                    padding: 15
                },
                grid: {
                    display: false
                }
            }
        },
    };

    return (
        <Box className="comentarios-container" sx={{ 
            padding: 4,
            width: '95%',
            margin: 'auto'
        }}>
            <Typography variant="h4" className="neon-title" gutterBottom>
                Tendencias de Interacción
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ 
                color: '#4dabf7',
                fontSize: '1.2rem',
                textAlign: 'center',
                mb: 4,
                textShadow: '0 2px 4px rgba(77, 171, 247, 0.2)'
            }}>
                Horarios con mayor número de comentarios
            </Typography>
            
            <Paper className="tendencias-chart" sx={{ 
                height: '600px',
                padding: 3,
                position: 'relative',
                width: '100%',
                maxWidth: '65vw'
            }}>
                <Bar data={chartData} options={chartOptions} />
            </Paper>
        </Box>
    );
};

export default TendenciasInteraccion;