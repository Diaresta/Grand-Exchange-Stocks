import { useEffect, useState } from 'react';
import { useQuery } from '../../scripts/Utilities';
import AlphabetSearchContainer from './AlphabetSearchContainer/AlphabetSearchContainer';
import ItemSearchList from './ItemSearchList/ItemSearchList';

const SearchPage = () => {
  const query = useQuery().get('s')?.toLowerCase();
  const [loading, setLoading] = useState<boolean>(true);
  const [errorText, setErrorText] = useState<string>();
  const [itemsList, setItemsList] = useState<[{ name: string; id: number }]>();
  const [searchResultsAmount, setSearchResultsAmount] = useState<number>();

  const fetchItemList = async () => {
    try {
      const url: string = '/itemDB.json';
      const response = await fetch(url);
      const data = await response.json();
      setItemsList(data);
    } catch (error) {
      setErrorText('Error fetching item list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = `ge.teller - Search: ${query || ''}`;
    fetchItemList();
  }, []);

  return (
    <div id='search-container' data-testid={'search-container'}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>
            <h2>{errorText || `Search Results: '${query}'`}</h2>
            <small>{searchResultsAmount || 0} Results</small>
          </div>
          <div>
            <ItemSearchList
              query={query}
              itemsList={itemsList}
              setSearchResultsAmount={setSearchResultsAmount}
            />
            <AlphabetSearchContainer />
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;
