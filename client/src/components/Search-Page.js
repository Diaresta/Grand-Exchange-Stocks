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
      <div id='query-container'>
        <h2>Search Results: '{query}'</h2>
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
              <li key={item.id} id={item.name[0]}>
                {item.name[0].toUpperCase() + item.name.slice(1)}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <div id='alphabet-container'>
        <ul>
          <li>
            <a href='#3'>0</a>
          </li>
          <li>
            <a href='#a'>A</a>
          </li>
          <li>
            <a href='#b'>B</a>
          </li>
          <li>
            <a href='#c'>C</a>
          </li>
          <li>
            <a href='#d'>D</a>
          </li>
          <li>
            <a href='#e'>E</a>
          </li>
          <li>
            <a href='#f'>F</a>
          </li>
          <li>
            <a href='#g'>G</a>
          </li>
          <li>
            <a href='#h'>H</a>
          </li>
          <li>
            <a href='#i'>I</a>
          </li>
          <li>
            <a href='#j'>J</a>
          </li>
          <li>
            <a href='#k'>K</a>
          </li>
          <li>
            <a href='#l'>L</a>
          </li>
          <li>
            <a href='#m'>M</a>
          </li>
          <li>
            <a href='#n'>N</a>
          </li>
          <li>
            <a href='#o'>O</a>
          </li>
          <li>
            <a href='#p'>P</a>
          </li>
          <li>
            <a href='#q'>Q</a>
          </li>
          <li>
            <a href='#r'>R</a>
          </li>
          <li>
            <a href='#s'>S</a>
          </li>
          <li>
            <a href='#t'>T</a>
          </li>
          <li>
            <a href='#u'>U</a>
          </li>
          <li>
            <a href='#v'>V</a>
          </li>
          <li>
            <a href='#w'>W</a>
          </li>
          <li>
            <a href='#x'>X</a>
          </li>
          <li>
            <a href='#y'>Y</a>
          </li>
          <li>
            <a href='#z'>Z</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SearchPage;
