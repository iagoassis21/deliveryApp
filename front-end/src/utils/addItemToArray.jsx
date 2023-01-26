// essa função recebe um array de objetos e um novo objeto a ser adicionado a este array,
// caso o objeto já exista no array ele adiciona +1 ao atributo qnt do objeto e caso não exista ela adiciona o objeto ao array.
const addItemToArray = (array, newObj) => {
  let itemCached = null;
  if (!itemCached) itemCached = array.find((i) => i.name === newObj.name);
  if (itemCached) {
    itemCached.qnt += 1;
    return itemCached;
  }
  return [...array, newObj];
};

export default addItemToArray;
