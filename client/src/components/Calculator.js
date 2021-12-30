import { useEffect, useState } from 'react';

const Calculator = ({ loggedIn, itemArray }) => {
  const [itemName, setItemName] = useState();
  const [priceValue, setPriceValue] = useState('');
  const [quantityValue, setQuantityValue] = useState('');

  const itemNameCall = async () => {
    const defaultWindow = window.location.pathname.split('/')[1];
    const itemLinkID = window.location.pathname.split('/')[3];

    if (defaultWindow === '' || defaultWindow === 'home') {
      var url = await `http://localhost:8000/item/${itemArray}`;
    } else {
      var url = await `http://localhost:8000/item/${itemLinkID}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    setItemName(data.name);
  };

  const calcCheck = (priceValue, quantityValue) => {
    if (isNaN(priceValue) === true || isNaN(quantityValue) === true) {
      return '???';
    } else {
      return priceValue * quantityValue;
    }
  };

  const itemPurchase = async () => {
    if (loggedIn === false) {
      window.location.href = '/login';
    } else if (priceValue + quantityValue === '') {
      // Alert 'You need both a Price and Quantity'
    } else if (isNaN(parseInt(priceValue + quantityValue)) === true) {
      // Alert 'Price and Quantity '
    } else {
      // Post to mongodb
      console.log(`name: ${itemName}`);
      console.log(`price: ${priceValue}`);
      console.log(`quantity: ${quantityValue}`);
      console.log(`overall: ${priceValue * quantityValue}`);

      // Maybe add timer to purcahse again
    }
  };

  useEffect(() => {
    itemNameCall();
  }, []);

  return (
    <div id='calculator-container'>
      <h4>Buy/Sell</h4>
      <div id='input-container'>
        <form id='calc-form'>
          <label htmlFor='buy-sell-input'>Buy/Sell Price:</label>
          {/* <br /> */}
          <input
            type=''
            id='buy-sell-input'
            name='buy-sell'
            placeholder='Enter price here...'
            onChange={(e) => {
              setPriceValue(e.target.value);
            }}
            required
          ></input>
        </form>

        <form id='calc-form'>
          <label htmlFor='quantity-input'>Quantity:</label>
          {/* <br /> */}
          <input
            type=''
            id='quantity-input'
            name='quantity'
            placeholder='Enter quantity here...'
            onChange={(e) => {
              setQuantityValue(e.target.value);
            }}
            required
          ></input>
        </form>
      </div>

      <div id='input-container'>
        <div id='price-container'>
          <p id='form-overall'>Overall:</p>
          <p id='price-overall'>{calcCheck(priceValue, quantityValue)}g</p>
        </div>
        <div id='submit-container'>
          <button id='input-btn' onClick={itemPurchase}>
            Buy/Sell
          </button>
          <p></p>
        </div>
      </div>
    </div>
  );
};
export default Calculator;
