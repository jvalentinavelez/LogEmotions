import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import classes from './EmotionChart.module.css';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const EmotionChart = ({ logs }) => {
    // Mapping of emotion labels to their numeric values
    const emotionValues = {
        awful: 0,
        sad: 1,
        neutral: 2,
        happy: 3,
        rad: 4,
      };

    const data = {};
    // Populate data object with log information
    logs.forEach(log => {
        const { id, date, selectedEmotion } = log;
        
        if (!data[date]) {
        data[date] = { date };
        }
        // Assign the numeric value to the corresponding emotion for the date
        data[date][selectedEmotion] = Object.keys(emotionValues).indexOf(selectedEmotion);
    });
    // Convert the data object into an array and sort it by date
    const dataArray = Object.values(data).sort((a, b) => new Date(a.date) - new Date(b.date));

    // Flatten the numeric values of emotions into an array
    const allEmotionNumericValuesArray = dataArray.flatMap(item =>
        Object.keys(emotionValues).map(emotion => item[emotion] !== undefined ? item[emotion] : -1)
    ).filter(value => value !== undefined && value !== -1);

    // Extract emotion labels for y-axis labels
    const yLabels = Object.keys(emotionValues);
    
    // Construct chart data for rendering
    const chartData = {
        labels: dataArray.map(item => item.date),
        datasets: [ 
            {
                label: 'Emocion',
                data: allEmotionNumericValuesArray,
                tension: 0.5,
                fill : true,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                pointRadius: 5,
                pointBorderColor: 'rgba(255, 99, 132)',
                pointBackgroundColor: 'rgba(255, 99, 132)',
            },
        ],
    };

    // Chart configuration options
    const chartOptions = {
        scales : {
            y: {
                min: 0,
                max: 4,
                ticks: {
                    color: 'rgba(106, 116, 134, 1)',
                    callback: (value) => yLabels[value],
                },
            },
            x: {
                ticks: { color: 'rgba(106, 116, 134, 1)'},
            }
        },
        plugins: {
            legend: {
                display: false, 
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        // Get emotion label based on numeric value
                        const datasetLabel = context.dataset.label || '';
                        const emotionValue = context.parsed.y;
                        const emotion = Object.keys(emotionValues).find(
                            key => emotionValues[key] === emotionValue
                        );
                        return `${datasetLabel}: ${emotion}`;
                    },
                },
            },
        },

    };

    return (
        <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5" gutterBottom fontWeight="300" className={classes.chartTitle}>
          Emotions Over Time
        </Typography>
        <Line data={chartData} options={chartOptions}/>
      </Paper>
  );
};

export default EmotionChart;