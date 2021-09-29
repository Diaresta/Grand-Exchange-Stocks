import { useState, useEffect } from 'react';

const SearchPage = () => {
  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');

  const [itemData, setitemData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn] = useState(true);

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

  useEffect(() => {
    itemSearch();
  }, []);

  return (
    <div>
      <p>Search Results: ''</p>
      {/* <small>REEE</small> */}
      <p>reeeeeeee</p>

      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
