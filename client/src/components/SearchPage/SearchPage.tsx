import { useEffect, useState } from 'react';
import { useQuery } from '../../scripts/Utilities';
import LoadingSpinner from '../ui/loadingSpinner';
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
    <div
      className='container'
      id='search-container'
      data-testid={'search-container'}
    >
      {loading ? (
        <LoadingSpinner size={40} />
      ) : (
        <>
          <div className='pt-4'>
            <h2 className='text-xl font-bold'>
              {errorText || `Search Results: '${query}'`}
            </h2>
            <small className='text-blue-700'>
              {searchResultsAmount || 0} Results
            </small>
          </div>
          <div className='flex justify-between pt-2'>
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
