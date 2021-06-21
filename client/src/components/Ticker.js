const Ticker = () => {
  return (
    <div id='ticker-container'>
      <div id='moving-container'>
        <p className='positive-gains'>
          <strong>Adamant Boots</strong> - 200g (+2.4%)
        </p>
        <p className='negative-gains'>
          <strong>Avantoe</strong> - 372g (-5.29%)
        </p>
        <p className='positive-gains'>
          <strong>Twisted Bow</strong> - 939,849,319g (+11.82%)
        </p>
        <p className='positive-gains'>
          <strong>Rune Kiteshield</strong> - 7,821g (+1.3%)
        </p>
        <p className='negative-gains'>
          <strong>Gold Ore</strong> - 162g (-0.14%)
        </p>
        <p className='positive-gains'>
          <strong>Magic Logs</strong> - 895g (+1.23%)
        </p>
      </div>
    </div>
  );
};

export default Ticker;
