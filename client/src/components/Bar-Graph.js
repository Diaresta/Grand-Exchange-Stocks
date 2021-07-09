import { Bar, Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';

const BarGraph = () => {
  const [chartData] = useState({
    labels: ['June 5', 'June 6', 'June 7', 'June 8', 'June 9', 'June 10'],
    datasets: [
      {
        label: 'Volume',
        data: [4, 6, 5, 2, 2, 7],
        backgroundColor: ['rgba(22, 82, 240, 0.6)'],
        hoverBackgroundColor: ['rgba(17, 65, 192, 0.8)'],
      },
    ],
  });

  return (
    // <div id='bar-graph-container'>
    //   <p>asdasdasdasdasdasdasdasdasdasdasdasdasdas</p>
    //   <p>asdasdasdasdasdasdasdasdasdasdasdasdasdas</p>
    //   <p>asdasdasdasdasdasdasdasdasdasdasdasdasdas</p>
    // </div>

    <div id='bar-graph-container'>
      <Bar
        data={chartData}
        height={68}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Item Volume',
              // color: 'black',
            },
            legend: {
              display: false,
              position: 'right',
            },
            tooltip: {
              displayColors: false,
              titleAlign: 'center',
            },
          },
          layout: {
            padding: {
              top: 0,
              left: 10,
              right: 10,
              bottom: 0,
            },
          },
        }}
      />
    </div>
  );
};

export default BarGraph;
