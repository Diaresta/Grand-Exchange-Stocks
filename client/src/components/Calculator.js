import { useState } from 'react';

const Calculator = () => {
  const [priceValue, setPriceValue] = useState('');
  const [quantityValue, setQuantityValue] = useState('');

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
          ></input>
        </form>
      </div>

      <div id='input-container'>
        <div id='price-container'>
          <p id='form-overall'>Overall:</p>
          <p id='price-overall'>{priceValue * quantityValue}g</p>
        </div>
        <div id='submit-container'>
          <button id='input-btn'>Buy/Sell</button>
        </div>
      </div>
    </div>
  );
};
export default Calculator;
