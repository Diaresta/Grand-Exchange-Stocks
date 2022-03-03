import { useState, useEffect } from 'react';

const SearchPage = () => {
  const { search } = window.location;
  const query = new URLSearchParams(search).get('s').toLowerCase();

  const alphabet = Array.from(Array(26))
    .map((e, i) => i + 65)
    .map((x) => String.fromCharCode(x));

  const [itemData, setitemData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Searches item database for passed in query
  const itemSearch = async () => {
    const url = await '../itemDB.json';

    const response = await fetch(url);
    const data = await response.json();
    setitemData(data);
    setLoading(false);
  };

  // Filters item db for passed in query
  const filteritemData = (itemData, query) => {
    if (!query) {
      return itemData;
    }

    return itemData.filter((item) => {
      const postName = item.name.toLowerCase();
      return postName.includes(query);
    });
  };

  const filteredItems = filteritemData(itemData, query);

  const [itemToSever, setItemToSever] = useState();
  const sendItemToSever = (send) => {
    setItemToSever(send);
    console.log(send);
  };

  useEffect(() => {
    document.title = `ge.teller - Search: ${query}`;

    itemSearch();
  }, []);

  return (
    <div id='search-container'>
      <div id='query-container'>
        <h2>Search Results: '{query}'</h2>
        <small>{filteredItems.length} Results</small>

        <ul id='item-search-ul'>
          {filteredItems.map((item) => (
            <a
              href={`/item/${item.name}/${item.id}`}
              className='item-search-li'
              key={item.id}
              onClick={() => sendItemToSever(item.id)}
            >
              <li key={item.id} id={item.name[0]}>
                {item.name[0].toUpperCase() + item.name.slice(1)}
              </li>
            </a>
          ))}
        </ul>
      </div>

      <div id='alphabet-container'>
        <ul>
          <li>
            <a href='#3'>0</a>
          </li>
          {alphabet.map((alphabet) => (
            <li>
              <a href={'#' + alphabet.toLowerCase()}>{alphabet}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchPage;
