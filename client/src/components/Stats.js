import { useState, useEffect } from 'react';

const Stats = ({ itemArray }) => {
  const [highAlchColor, setHighAlchColor] = useState();

  const [currentPrice, setCurrentPrice] = useState();
  const [geLimit, setGeLimit] = useState();
  const [latestOfferPrice, setLatestOfferPrice] = useState();
  const [avgHighHour, setAvgHighHour] = useState();
  const [avgLowHour, setAvgLowHour] = useState();
  const [highAlchVal, setHighAlchVal] = useState();
  const [highAlchProfit, setHighAlchProfit] = useState();
  const [margin, setMargin] = useState();

  const apiCall = async (itemArray) => {
    const defaultWindow = window.location.pathname.split('/')[1];
    const itemLinkID = window.location.pathname.split('/')[3];

    if (defaultWindow === '' || defaultWindow === 'home') {
      var url = await `http://localhost:8000/item/${itemArray}`;
    } else {
      url = await `http://localhost:8000/item/${itemLinkID}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    setCurrentPrice(data.currentPrice);
    setGeLimit(data.geLimit);
    setLatestOfferPrice(data.offerPrice);
    setAvgHighHour(data.avgHighHour);
    setAvgLowHour(data.avgLowHour);
    setHighAlchVal(data.highAlchValue);
    setHighAlchProfit(data.highAlchProfit);
    setMargin(data.margin);
  };

  useEffect(() => {
    apiCall(itemArray);

    // if (highAlchProfit >= 0) {
    //   setHighAlchColor('alch-prof');
    // } else if (highAlchProfit < 0) {
    //   setHighAlchColor('alch-neg');
    // }
  }, []);

  return (
    <div id='stats-container'>
      <h4>Stats</h4>
      <div id='stats-list-container'>
        <ul id='ul-1'>
          <li className='stats-li'>
            <p>
              <span className='item-uline'>Current Price:</span> {currentPrice}g
            </p>
          </li>
          <li className='stats-li'>
            <p>
              <span className='item-uline'>Offer Price:</span>{' '}
              {latestOfferPrice}g
            </p>
          </li>
          <li className='stats-li'>
            <p>
              <span className='item-uline'>Margin:</span> {margin}g
            </p>
          </li>
          <li className='stats-li'>
            <p>
              <span className='item-uline'>High Alch Value:</span> {highAlchVal}
              g
            </p>
          </li>
        </ul>

        <ul>
          <li className='stats-li'>
            <p>
              <span className='item-uline'>GE Limit:</span> {geLimit}
            </p>
          </li>
          <li className='stats-li'>
            <p>
              <span className='item-uline'>Average High/Hour:</span>{' '}
              {avgHighHour}g
            </p>
          </li>
          <li className='stats-li'>
            <p>
              <span className='item-uline'>Average Low/Hour:</span> {avgLowHour}
              g
            </p>
          </li>
          <li className='stats-li'>
            <p>
              <span className='item-uline'>High Alch Profit:</span>
              <span id={highAlchColor}> {highAlchProfit}g</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Stats;
