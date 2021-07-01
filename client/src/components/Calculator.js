const Calculator = () => {
  return (
    <div id='calculator-container'>
      <div id='input-container'>
        <form id='calc-form'>
          <label htmlFor='buy-sell-input'>Buy/Sell Price:</label>
          {/* <br /> */}
          <input
            type=''
            id='buy-sell-input'
            name='buy-sell'
            placeholder='Enter price here...'
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
          ></input>
        </form>
      </div>

      <div id='input-container'>
        <div id='price-container'>
          <p id='form-overall'>Overall:</p>
          <p id='price-overall'>100g</p>
        </div>
        <div id='submit-container'>
          <button id='input-btn'>Buy/Sell</button>
        </div>
      </div>
    </div>
  );
};
export default Calculator;
