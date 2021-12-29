import { useEffect, useState } from 'react';

const Calculator = ({ loggedIn }) => {
  const [priceValue, setPriceValue] = useState('');
  const [quantityValue, setQuantityValue] = useState('');
  const [btnDisable, setBtnDisable] = useState(true);

  const calcCheck = (priceValue, quantityValue) => {
    if (isNaN(priceValue) === true || isNaN(quantityValue) === true) {
      return '???';
    } else {
      return priceValue * quantityValue;
    }
  };

  const buttonEnable = (priceValue, quantityValue) => {
    if (priceValue === '' || quantityValue === '') {
      setBtnDisable(true);
    } else {
      setBtnDisable(false);
    }

    // add check if inputs are strings and disable btn
  };

  const itemPurchase = () => {
    if (loggedIn === false) {
      window.location.href = '/login';
    } else {
      console.log('test');
    }
  };

  useEffect(() => {
    // buttonEnable();
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
              buttonEnable();
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
              buttonEnable();
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
          <button id='input-btn' onClick={itemPurchase} disabled={btnDisable}>
            Buy/Sell
          </button>
        </div>
      </div>
    </div>
  );
};
export default Calculator;
