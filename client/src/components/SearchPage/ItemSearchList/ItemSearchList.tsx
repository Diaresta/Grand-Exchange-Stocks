const ItemSearchList = ({
  query,
  itemsList,
  setSearchResultsAmount,
}: {
  query: string | undefined;
  itemsList?: [{ name: string; id: number }];
  setSearchResultsAmount: React.Dispatch<number>;
}) => {
  const filterItemList = (
    itemData: [{ name: string; id: number }],
    query: string | undefined
  ) => {
    if (!query) {
      return itemData;
    }

    return itemData?.filter((item: any) => {
      const postName = item.name.toLowerCase();
      return postName.includes(query);
    });
  };

  const filteredItems = filterItemList(itemsList!, query);
  setSearchResultsAmount(filteredItems?.length);

  return (
    <div
      id='item-search-list-container'
      data-testid={'item-search-list-container'}
    >
      <ul id='item-search-ul'>
        {filteredItems?.map((item: any) => (
          <li key={item.id} id={item.name[0]}>
            <a
              href={`/item/${item.name}/${item.id}`}
              key={item.id}
              className='hover:text-blue-700 hover:font-bold'
            >
              {item.name[0].toUpperCase() + item.name.slice(1)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemSearchList;
