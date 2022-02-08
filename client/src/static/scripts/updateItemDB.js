const axios = require('axios');

let itemDB = [];

const updateItemDB = async () => {
  let getItemData = await axios.get(
    'https://prices.runescape.wiki/api/v1/osrs/mapping'
  );

  let itemReponse = await getItemData.data;

  for (let i = 0; i < itemReponse.length; i++) {
    itemDB.push({
      id: itemReponse[i].id,
      name: itemReponse[i].name.toLowerCase(),
    });
  }
};

updateItemDB();
