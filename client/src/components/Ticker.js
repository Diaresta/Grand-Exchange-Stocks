const Ticker = ({ tickerData }) => {
  return (
    <div id='ticker-container'>
      <div id='moving-container'>
        {tickerData.map((item, i) => (
          <a
            href={`/item/${item.name}/${item.id}`}
            className={item.trend}
            key={i}
          >
            <strong>{item.name}</strong> - {item.price} ({item.percent})
          </a>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
