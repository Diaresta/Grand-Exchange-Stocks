import { Bar, Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';

const BarGraph = ({ fiveMin, oneHour, sixHour }) => {
  // -------------------- testing --------------------
  // const barGraphVolume = () => {
  const [chartData, setChartData] = useState();
  const [priceGraph, setPriceGraph] = useState();
  const [volumeGraph, setVolumeGraph] = useState();
  const tempPrice = [];
  const tempVolume = [];

  // for (let key in fiveMin) {
  //   tempPrice.push(fiveMin[key].price);
  //   tempVolume.push(fiveMin[key].volume);
  // }

  // };

  const chart = async () => {
    const url = await 'http://localhost:5000/';
    const response = await fetch(url);
    const data = await response.json();

    for (let key in data.fiveMinGraph) {
      tempPrice.push(data.fiveMinGraph[key].price);
      tempVolume.push(data.fiveMinGraph[key].volume);
    }
    console.log(data.fiveMinGraph);

    // setPriceGraph(tempPrice);
    // setVolumeGraph(tempVolume);

    setChartData({
      labels: ['June 5', 'June 6', 'June 7', 'June 8', 'June 9', 'June 10'],
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
    // setPriceGraph(tempPrice);
    // setVolumeGraph(tempVolume);
    // for (let key in fiveMin) {
    //   setPriceGraph(fiveMin[key].price);
    //   volumeGraph.push(fiveMin[key].volume);
    // }
    // console.log(priceGraph);
    chart();
  }, []);

  // -------------------- testing --------------------

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
