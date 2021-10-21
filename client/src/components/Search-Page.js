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
    <div>
      <p>Search Results: '{query}'</p>
      {/* <small>REEE</small> */}

      <ul>
        {filteredItems.map((item) => (
          <Link
            to={`/item/${item.name}/${item.id}`}
            key={item.id}
            onClick={() => sendItemToSever(item.id)}
          >
            <li key={item.id}>{item.name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
