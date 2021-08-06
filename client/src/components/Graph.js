import { Bar, Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';

const Graph = ({ itemID, itemName, itemIcon }) => {
  const [chartData] = useState({
    labels: ['June 5', 'June 6', 'June 7', 'June 8', 'June 9', 'June 10'],
    datasets: [
      {
        label: 'Price',
        data: [1372382, 1472382, 1872382, 1672382, 2072382, 1972382],
        backgroundColor: ['rgba(17, 65, 192, 0.8)'],
        hoverBackgroundColor: ['rgba(6, 24, 72, 0.8)'],
      },
    ],
  });

  return (
    <div id='graphs-container'>
      <div id='graph-header'>
        <div id='stats-name'>
          <h2 id='item-name'>{itemName}</h2>
          <img id='item-img' src={itemIcon} alt='Item Sprite' />
        </div>
        <ul id='graph-btn-ul'>
          <li className='graph-btn-li'>
            <button className='price-btn'>5min</button>
          </li>
          <li className='graph-btn-li'>
            <button className='price-btn'>1hr</button>
          </li>
          <li className='graph-btn-li'>
            <button className='price-btn'>6hrs</button>
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
