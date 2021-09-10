import { Bar, Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';

const Graph = ({ itemID, itemName, itemIcon, fiveMin, oneHour, sixHour }) => {
  const [chartData, setChartData] = useState();
  const [priceGraph, setPriceGraph] = useState();
  const fiveMinPrice = [];
  const oneHourPrice = [];
  const sixHourPrice = [];
  const graphLabel = {
    fiveMin: ['5 Minute', '4 Minute', '3 Minute', '2 Minute', '1 Minute'],
    oneHour: ['1 Hour', '45 Minute', '30 Minute', '15 Minute'],
    sixHour: ['6 Hour', '5 Hour', '4 Hour', '3 Hour', '2 Hour', '1 Hour'],
  };

  const setChartBtn = (e) => {
    let label;
    let data;

    if (e.target.innerHTML === '5min') {
      label = graphLabel.fiveMin;
      data = priceGraph.fiveMin;
    } else if (e.target.innerHTML === '1hr') {
      label = graphLabel.oneHour;
      data = priceGraph.oneHour;
    } else {
      label = graphLabel.sixHour;
      data = priceGraph.sixHour;
    }

    setChartData({
      labels: label,
      datasets: [
        {
          label: 'Price',
          data: data,
          backgroundColor: ['rgba(17, 65, 192, 0.8)'],
          hoverBackgroundColor: ['rgba(6, 24, 72, 0.8)'],
        },
      ],
    });
  };

  const chart = async () => {
    const url = await 'http://localhost:5000/';
    const response = await fetch(url);
    const data = await response.json();

    for (let key in data.fiveMinGraph) {
      fiveMinPrice.push(data.fiveMinGraph[key].price);
    }

    for (let key in data.oneHourGraph) {
      oneHourPrice.push(data.oneHourGraph[key].price);
    }

    for (let key in data.sixHourGraph) {
      sixHourPrice.push(data.sixHourGraph[key].price);
    }

    setPriceGraph({
      fiveMin: fiveMinPrice,
      oneHour: oneHourPrice,
      sixHour: sixHourPrice,
    });

    setChartData({
      labels: graphLabel.fiveMin,
      datasets: [
        {
          label: 'Price',
          data: fiveMinPrice,
          backgroundColor: ['rgba(17, 65, 192, 0.8)'],
          hoverBackgroundColor: ['rgba(6, 24, 72, 0.8)'],
        },
      ],
    });
  };

  useEffect(() => {
    chart();
  }, []);

  return (
    <div id='graphs-container'>
      <div id='graph-header'>
        <div id='stats-name'>
          <h2 id='item-name'>{itemName}</h2>
          <img id='item-img' src={itemIcon} alt='Item Sprite' />
        </div>
        <ul id='graph-btn-ul'>
          <li className='graph-btn-li'>
            <button className='price-btn' onClick={setChartBtn}>
              5min
            </button>
          </li>
          <li className='graph-btn-li'>
            <button className='price-btn' onClick={setChartBtn}>
              1hr
            </button>
          </li>
          <li className='graph-btn-li'>
            <button className='price-btn' onClick={setChartBtn}>
              6hrs
            </button>
          </li>
        </ul>
      </div>
      {/* <canvas id='cart'></canvas> */}
      <Line
        data={chartData}
        height={125}
        options={{
          // maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Item Price',
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
              left: 5,
              right: 0,
              bottom: 0,
            },
          },
        }}
      />
    </div>
  );
};

export default Graph;
