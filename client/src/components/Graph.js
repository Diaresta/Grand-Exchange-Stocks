import { Bar, Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';

const Graph = ({ itemID, itemName, itemIcon, fiveMin, oneHour, sixHour }) => {
  const [lineChartData, setLineChartData] = useState();
  const [barChartData, setBarChartData] = useState();

  const [priceGraph, setPriceGraph] = useState();
  const [volumeGraph, setVolumeGraph] = useState();
  const fiveMinPrice = [];
  const oneHourPrice = [];
  const sixHourPrice = [];
  const fiveMinVolume = [];
  const oneHourVolume = [];
  const sixHourVolume = [];
  const graphLabel = {
    fiveMin: ['5 Minute', '4 Minute', '3 Minute', '2 Minute', '1 Minute'],
    oneHour: ['1 Hour', '45 Minute', '30 Minute', '15 Minute'],
    sixHour: ['6 Hour', '5 Hour', '4 Hour', '3 Hour', '2 Hour', '1 Hour'],
  };

  const setChartBtn = (e) => {
    let label;
    let data;
    let volume;

    if (e.target.innerHTML === '5min') {
      label = graphLabel.fiveMin;
      data = priceGraph.fiveMin;
      volume = volumeGraph.fiveMin;
    } else if (e.target.innerHTML === '1hr') {
      label = graphLabel.oneHour;
      data = priceGraph.oneHour;
      volume = volumeGraph.oneHour;
    } else {
      label = graphLabel.sixHour;
      data = priceGraph.sixHour;
      volume = volumeGraph.sixHour;
    }

    setLineChartData({
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

    setBarChartData({
      labels: label,
      datasets: [
        {
          label: 'Volume',
          data: volume,
          backgroundColor: ['rgba(22, 82, 240, 0.6)'],
          hoverBackgroundColor: ['rgba(17, 65, 192, 0.8)'],
        },
      ],
    });
  };

  const chart = async () => {
    const defaultWindow = window.location.pathname.split('/')[1];
    const itemLinkID = window.location.pathname.split('/')[3];

    if (defaultWindow === '' || defaultWindow === 'home') {
      var url = await `http://localhost:5000/`;
    } else {
      var url = await `http://localhost:5000/item/${itemLinkID}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    for (let key in data.fiveMinGraph) {
      fiveMinPrice.push(data.fiveMinGraph[key].price);
      fiveMinVolume.push(data.fiveMinGraph[key].volume);
    }

    for (let key in data.oneHourGraph) {
      oneHourPrice.push(data.oneHourGraph[key].price);
      oneHourVolume.push(data.oneHourGraph[key].volume);
    }

    for (let key in data.sixHourGraph) {
      sixHourPrice.push(data.sixHourGraph[key].price);
      sixHourVolume.push(data.sixHourGraph[key].volume);
    }

    setPriceGraph({
      fiveMin: fiveMinPrice,
      oneHour: oneHourPrice,
      sixHour: sixHourPrice,
    });

    setVolumeGraph({
      fiveMin: fiveMinVolume,
      oneHour: oneHourVolume,
      sixHour: sixHourVolume,
    });

    setLineChartData({
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

    setBarChartData({
      labels: graphLabel.fiveMin,
      datasets: [
        {
          label: 'Volume',
          data: fiveMinVolume,
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
    <div id='graph-container'>
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
          data={lineChartData}
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

      <div id='bar-graph-container'>
        <Bar
          data={barChartData}
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
    </div>
  );
};

export default Graph;
