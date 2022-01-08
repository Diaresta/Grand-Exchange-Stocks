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

export const emailValidate = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(email.toLowerCase());
};

export const dateFormat = (date) => {
  return date.split('T')[0];
};
