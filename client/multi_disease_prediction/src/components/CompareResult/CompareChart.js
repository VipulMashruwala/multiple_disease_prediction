import React from 'react';
import { Bar } from 'react-chartjs-2';
import './CompareChart.module.css'
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

const CompareChart = (props) =>{

    let accuracy = []
    let recall = []
    let precision = []

    for(let i in props.chart_data){
        accuracy.push(props.chart_data[i]['Accuracy'])
        recall.push(props.chart_data[i]['Recall'])
        precision.push(props.chart_data[i]['Precision'])
    }

    const labels = Object.keys(props.chart_data);

    const data = {
        labels,
        datasets: [
            {
              label: 'Accuracy',
              data: accuracy,
              backgroundColor: 'rgba(50, 119, 168)',
            },
            {
              label: 'Recall',
              data: recall,
              backgroundColor: 'rgba(168, 127, 50)',
            },
            {
              label: 'Precision',
              data: precision,
              backgroundColor: 'rgba(50, 168, 64)',
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
            text: 'Comparison Result'
          },
        },
      };

    return(
        <>
        <Bar options={options} data={data} />
        </>
    )
}

export default CompareChart;