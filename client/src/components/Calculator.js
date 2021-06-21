const Calculator = () => {
  return (
    <div id='calculator-container'>
      <form>
        <label htmlFor='buy-sell-input'>Buy/Sell Price:</label>
        <br />
        <input
          type=''
          id='buy-sell-input'
          name='buy-sell'
          placeholder='Enter price here...'
        ></input>
        <button>Buy/Sell</button>
      </form>

      <form>
        <label htmlFor='quantity-input'>Quantity:</label>
        <br />
        <input
          type=''
          id='quantity-input'
          name='quantity'
          placeholder='Enter quantity here...'
        ></input>
      </form>

      <p>
        Overall: <br />
        100g
      </p>
    </div>
  );
};
export default Calculator;
