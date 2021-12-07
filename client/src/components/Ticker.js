import { useState, useEffect } from 'react';
import axios from 'axios';

const Ticker = () => {
  const [tickerData, setTicker] = useState([]);

  const tickerCall = async () => {
    const url = await axios.get('http://localhost:8000/');
    // const response = await fetch(url);
    const data = await url.data.ticker;

    setTicker(data);
    console.log(data);
    console.log(tickerData);
  };

  useEffect(() => {
    tickerCall();
  });
  return (
    <div id='ticker-container'>
      <div id='moving-container'>
        {tickerData.map((item) => (
          <p className={item.trend}>
            <strong>{item.name}</strong> - {item.price} ({item.percent})
          </p>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
