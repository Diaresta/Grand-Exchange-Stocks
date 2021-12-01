import { useState, useEffect } from 'react';
import axios from 'axios';

const Ticker = () => {
  const [tickerData, setTicker] = useState();
  const [state, setstate] = useState();

  const testBoys = [
    {
      name: 'Amulet of fury',
      trend: 'negative',
      price: '1.6m',
      percent: '+12.0%',
    },
    {
      name: 'Adamant platelegs',
      trend: 'positive',
      price: '3,492',
      percent: '-1.0%',
    },
    {
      name: 'Abyssal whip',
      trend: 'neutral',
      price: '1.8m',
      percent: '+8.0%',
    },
    {
      name: 'Armadyl godsword',
      trend: 'neutral',
      price: '12.4m',
      percent: '+70.0%',
    },
    {
      name: 'Bandos chestplate',
      trend: 'negative',
      price: '24.7m',
      percent: '+65.0%',
    },
    {
      name: 'Cannonball',
      trend: 'neutral',
      price: '182',
      percent: '+4.0%',
    },
    {
      name: 'Adamant platelegs',
      trend: 'neutral',
      price: '3,492',
      percent: '-1.0%',
    },
  ];

  const tickerCall = async () => {
    const url = await axios.get('http://localhost:8000/');
    // const response = await fetch(url);
    const data = await url.data;

    setstate('trfyghb');

    console.log(state);
    // console.log(data.ticker);
  };

  useEffect(() => {
    tickerCall();
  }, []);
  return (
    <div id='ticker-container'>
      <div id='moving-container'>
        {testBoys.map((item) => (
          <p className={item.trend}>
            <strong>{item.name}</strong> - {item.price} ({item.percent})
          </p>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
