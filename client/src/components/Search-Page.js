import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const { search } = window.location;
  const query = new URLSearchParams(search).get('s').toLowerCase();

  const [itemData, setitemData] = useState([]);
  const [loading, setLoading] = useState(true);

  const itemSearch = async () => {
    const url = await '../itemDB.json';

    const response = await fetch(url);
    const data = await response.json();
    setitemData(data);
    setLoading(false);
  };

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
    itemSearch();
  }, []);

  return (
    <div id='search-container'>
      <p>Search Results: '{query}'</p>
      <small>{filteredItems.length} Results</small>
      {/* <small>REEE</small> */}

      <ul id='item-search-ul'>
        {filteredItems.map((item) => (
          <Link
            to={`/item/${item.name}/${item.id}`}
            className='item-search-li'
            key={item.id}
            onClick={() => sendItemToSever(item.id)}
          >
            <li key={item.id}>
              {item.name[0].toUpperCase() + item.name.slice(1)}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
