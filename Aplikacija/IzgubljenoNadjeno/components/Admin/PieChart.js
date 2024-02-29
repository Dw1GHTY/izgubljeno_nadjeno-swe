import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import styles from "../../styles/admin.module.css";

Chart.register(...registerables);

const PieChart = ({ segment1Value, segment2Value }) => {
    const chartData = {
      labels: ['Pronalazaci', 'Posetioci'],
      datasets: [
        {
          data: [segment1Value, segment2Value],
          backgroundColor: ['#8D3BAA', '#8c3baa5f'],
        },
      ],
    };
  
    return (
      <div className={styles.pita}>
        <Pie width={"200px"}
              height={"300px"}
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
    );
  };
  
  export default PieChart;
  