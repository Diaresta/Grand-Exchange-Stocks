import { useState, useEffect } from 'react';

const Stats = ({ apiData, loading, appAlchProfit, itemID }) => {
  const [highAlchProfit] = useState(appAlchProfit);

  const [highAlchColor, setHighAlchColor] = useState();

  useEffect(() => {
    if (highAlchProfit >= 0) {
      setHighAlchColor('alch-prof');
    } else if (highAlchProfit < 0) {
      setHighAlchColor('alch-neg');
    }
  }, []);

  console.log(highAlchProfit);

  return (
    <div id='stats-container'>
      {/* <div id='stats-name'>
        <h2 id='item-name'>Abyssal Whip</h2>
        <img
          id='item-img'
          src={`https://secure.runescape.com/m=itemdb_oldschool/1624874635661_obj_big.gif?id=${itemID}`}
          alt='Item Sprite'
        />
      </div> */}

      <div id='stats-list-container'>
        <ul id='ul-1'>
          <li className='stats-li'>
            <p>
              <span className='item-uline'>Current Price:</span> 1,372,382g
            </p>
          </li>
          <li className='stats-li'>
            <p>
              <span className='item-uline'>Offer Price:</span> 1,372,382g
            </p>
          </li>
          <li className='stats-li'>
            <p>
              <span className='item-uline'>High Alch Value:</span> 1,372,382g
            </p>
          </li>
          <li className='stats-li'>
            <p>
              <span className='item-uline'>Price High:</span> 2,000,000g
            </p>
          </li>
        </ul>

        <ul>
          <li className='stats-li'>
            <p>
              <span className='item-uline'>GE Limit:</span> 5
            </p>
          </li>
          <li className='stats-li'>
            <p>
              <span className='item-uline'>Average High/Hour:</span> 200g
            </p>
          </li>
          <li className='stats-li'>
            <p>
              <span className='item-uline'>Average Low/Hour:</span> 20,000g
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
