import React from 'react';
import { Bar } from 'react-chartjs-2';
import './Chart.module.css'
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

const Chart = (props) =>{

    const labels = Object.keys(props.chart_data);

    const data = {
        labels,
        datasets: [
            {
              label: props.chart_title,
              data: Object.values(props.chart_data),
              // data: props.ml_model_data,
              backgroundColor: props.color,
            }
        ]
    
    }
    
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Result Analysis'
          },
        },
      };

    return(
        <>
        <Bar options={options} data={data} />
        </>
    )
}

export default Chart;