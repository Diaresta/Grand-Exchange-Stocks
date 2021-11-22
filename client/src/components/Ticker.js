import { useState, useEffect } from 'react';

const Ticker = () => {
  const [tickerData, setTicker] = useState();

  const tickerCall = async () => {
    const url = await 'http://localhost:8000/';
    const response = await fetch(url);
    const data = await response.json();

    setTicker(data.ticker);
    console.log(tickerData);
    console.log(tickerData);
  };

  useEffect(() => {
    // if (highAlchProfit >= 0) {
    //   setHighAlchColor('alch-prof');
    // } else if (highAlchProfit < 0) {
    //   setHighAlchColor('alch-neg');
    // }
    tickerCall();

    console.log(tickerData);
  }, []);
  return (
    <div id='ticker-container'>
      <div id='moving-container'>
        {/* {tickerData.map((item) => (
          <p className={item.trend}>
            <strong>{item.name}</strong> - {item.price} ({item.percent})
          </p>
        ))} */}

        <p className='positive'>
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
        </p>
      </div>
    </div>
  );
};

export default Ticker;
