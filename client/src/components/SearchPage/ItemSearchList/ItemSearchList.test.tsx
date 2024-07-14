import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ItemSearchList from './ItemSearchList';

describe('ItemSearchList Component:', () => {
  let itemsList: any = [
    {
      name: 'Dragon scimitar',
      id: 4587,
    },
    {
      name: 'Prayer potion(2)',
      id: 141,
    },
    {
      name: 'Rune 2h sword',
      id: 1319,
    },
    {
      name: 'Rune scimitar',
      id: 1333,
    },
  ];

  it('Should render <ul> with all items (4) when query is not present', () => {
    render(
      <ItemSearchList
        query=''
        itemsList={itemsList}
        setSearchResultsAmount={() => {}}
      />
    );
    const listItems = screen.getAllByRole('listitem');

    expect(listItems.length).toBe(4);
    listItems.forEach((item, i) => {
      expect(item).toBeInTheDocument();
      expect(item).toHaveTextContent(itemsList[i].name);
      expect(item.closest('a')?.getAttribute('href')).toBe(
        `/item/${itemsList[i].name}/${itemsList[i].id}`
      );
    });
  });

  it('Should render <ul> with all items (1) when query is present and matches item name', () => {
    render(
      <ItemSearchList
        query={itemsList[1].name.toLowerCase()}
        itemsList={itemsList}
        setSearchResultsAmount={() => {}}
      />
    );
    const listItems = screen.getAllByRole('listitem');

    expect(listItems.length).toBe(1);
    expect(listItems[0]).toHaveTextContent(itemsList[1].name);
    expect(listItems[0].closest('a')?.getAttribute('href')).toBe(
      `/item/${itemsList[1].name}/${itemsList[1].id}`
    );
  });

  it('Should render <ul> with all items (2) when query is present and partially matches item name', () => {
    render(
      <ItemSearchList
        query='scim'
        itemsList={itemsList}
        setSearchResultsAmount={() => {}}
      />
    );
    const listItems = screen.getAllByRole('listitem');

    expect(listItems.length).toBe(2);
    expect(listItems[0]).toHaveTextContent(itemsList[0].name);
    expect(listItems[0].closest('a')?.getAttribute('href')).toBe(
      `/item/${itemsList[0].name}/${itemsList[0].id}`
    );
    expect(listItems[1]).toHaveTextContent(itemsList[3].name);
    expect(listItems[1].closest('a')?.getAttribute('href')).toBe(
      `/item/${itemsList[3].name}/${itemsList[3].id}`
    );
  });

  it('Should render <ul> with all items (0) when query is present and no match', () => {
    render(
      <ItemSearchList
        query='No Match Query'
        itemsList={itemsList}
        setSearchResultsAmount={() => {}}
      />
    );

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('Should render <ul> with all items (4) with proper id and href', () => {
    render(
      <ItemSearchList
        query=''
        itemsList={itemsList}
        setSearchResultsAmount={() => {}}
      />
    );
    const listItems = screen.getAllByRole('listitem');

    expect(listItems.length).toBe(4);
    listItems.forEach((item, i) => {
      expect(item.closest('a')?.getAttribute('href')).toBe(
        `/item/${itemsList[i].name}/${itemsList[i].id}`
      );
      expect(item.closest('li')?.getAttribute('id')).toBe(itemsList[i].name[0]);
    });
  });
});
