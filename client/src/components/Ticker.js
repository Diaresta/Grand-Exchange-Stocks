import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Ticker = ({ tickerData }) => {
  // const [tickerData, setTicker] = useState([apiData]);

  // const tickerCall = async () => {
  //   const url = await axios.get('http://localhost:8000/');
  //   // const response = await fetch(url);
  //   const data = await url.data.ticker;

  //   setTicker(data);
  //   console.log(data);
  //   console.log(tickerData);
  // };

  useEffect(() => {
    // tickerCall();
  });
  return (
    <div id='ticker-container'>
      <div id='moving-container'>
        {tickerData.map((item, i) => (
          <a
            href={`/item/${item.name}/${item.id}`}
            className={item.trend}
            key={i}
          >
            <strong>{item.name}</strong> - {item.price} ({item.percent})
          </a>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
