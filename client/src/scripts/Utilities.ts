import { useLocation } from 'react-router-dom';

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ITEM_NAME_ID_API: string =
  'https://oldschool.runescape.wiki/?title=Module:GEIDs/data.json&action=raw&ctype=application%2Fjson';

const fetchItems = async (item_api: string) => {
  const response = await fetch(item_api);
  const data = await response.json();
  return data;
};

const createItemJSON = (items: any) => {
  let output: { name: string; id: number }[] = [];

  for (let i = 2; i < Object.keys(items).length; i++) {
    output.push({
      name: Object.keys(items)[i],
      id: Object.values(items)[i] as number,
    });
  }
  return output;
};
