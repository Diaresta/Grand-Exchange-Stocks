import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';

const BarGraph = () => {
  const [chartData, setChartData] = useState();
  const tempVolume = [];
  const tempLabel = {
    fiveMin: ['5 Minute', '4 Minute', '3 Minute', '2 Minute', '1 Minute'],
    oneHour: ['1 Hour', '45 Minute', '30 Minute', '15 Minute'],
    sixHour: ['6 Hour', '5 Hour', '4 Hour', '3 Hour', '2 Hour', '1 Hour'],
  };

  const chart = async () => {
    const url = await 'http://localhost:8000/';
    const response = await fetch(url);
    const data = await response.json();

    for (let key in data.fiveMinGraph) {
      tempVolume.push(data.fiveMinGraph[key].volume);
    }

    setChartData({
      labels: tempLabel.fiveMin,
      datasets: [
        {
          label: 'Volume',
          data: tempVolume,
          backgroundColor: ['rgba(22, 82, 240, 0.6)'],
          hoverBackgroundColor: ['rgba(17, 65, 192, 0.8)'],
        },
      ],
    });
  };

  useEffect(() => {
    chart();
  }, []);

  return (
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
