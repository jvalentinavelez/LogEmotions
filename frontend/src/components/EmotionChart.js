import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Typography, Paper, colors } from '@mui/material';

const EmotionChart = ({ logs }) => {

    const emotionValues = {
        awful: 0,
        sad: 1,
        neutral: 2,
        happy: 3,
        rad: 4,
      };

    // Crear un registro por cada combinación de fecha y emoción
    const data = {};

    // Procesar cada registro de log
    logs.forEach(log => {
        const { id, date, selectedEmotion } = log;
        
        // Si aún no hay un objeto para esta fecha, créalo
        if (!data[date]) {
        data[date] = { date };
        }

        // Agregar la emoción con el valor correspondiente
        data[date][selectedEmotion] = emotionValues[selectedEmotion];
    });

    const dataArray = Object.values(data).sort((a, b) => new Date(a.date) - new Date(b.date));

    console.log(dataArray)

    return (
        <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h5" gutterBottom>
                Emotions Over Time
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart width={400} height={300} data={dataArray}>
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 4]} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    {Object.keys(emotionValues).map((emotion) => (
                        <Line
                        type="linear"
                        dataKey={emotion}
                        stroke="#5752c0"
                        activeDot={{ r: 12 }}
                        key={emotion}
                        connectNulls = {false}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </Paper>
  );
};

export default EmotionChart;