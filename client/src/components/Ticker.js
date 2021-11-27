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
    // if (highAlchProfit >= 0) {
    //   setHighAlchColor('alch-prof');
    // } else if (highAlchProfit < 0) {
    //   setHighAlchColor('alch-neg');
    // }
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

        {/* <p className='positive'>
          <strong>Adamant Boots</strong> - 200g (+2.4%)
        </p>
        <p className='negative'>
          <strong>Avantoe</strong> - 372g (-5.29%)
        </p>
        <p className='positive'>
          <strong>Twisted Bow</strong> - 939,849,319g (+11.82%)
        </p>
        <p className='positive'>
          <strong>Rune Kiteshield</strong> - 7,821g (+1.3%)
        </p>
        <p className='negative'>
          <strong>Gold Ore</strong> - 162g (-0.14%)
        </p>
        <p className='positive'>
          <strong>Magic Logs</strong> - 895g (+1.23%)
        </p> */}
      </div>
    </div>
  );
};

export default Ticker;
