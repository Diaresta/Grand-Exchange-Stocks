export const itemNameCall = async (itemArray) => {
  const defaultWindow = window.location.pathname.split('/')[1];
  const itemLinkID = window.location.pathname.split('/')[3];

  if (defaultWindow === '' || defaultWindow === 'home') {
    var url = await `http://localhost:8000/item/${itemArray}`;
  } else {
    var url = await `http://localhost:8000/item/${itemLinkID}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  const item = { name: data.name, id: itemLinkID };

  console.log(item);
  return item;
};
