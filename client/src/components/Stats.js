const Stats = ({ apiData, loading }) => {
  return (
    <div id='stats-container'>
      <div id='stats-name'>
        <h2>Item Name</h2>
        <p>Item Photo</p>
      </div>

      <div id='stats-list-container'>
        <ul>
          <li>Current Price: 1,372,382g</li>
          <li>Offer Price: 1,372,382g</li>
          <li>Sell Price: 1,372,382g</li>
          <li>High Alch Value: 425,192g</li>
          <li>Price High: 2,000,000</li>
        </ul>

        <ul>
          <li>GE Limit: 5</li>
          <li>Buy Quantity/Hour: 200</li>
          <li>Sell Quantity/Hour: 40,000</li>
          <li>High Alch Profit: -927,293g</li>
          <li>Price Low: 1,000,000</li>
        </ul>
      </div>
    </div>
  );
};
export default Stats;
