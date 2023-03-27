function getRandomInteger(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function checkLength(row, length) {
  return row.length < length;
}
checkLength('',2);

const getRandomArrayElement = (array) =>
  array[getRandomInteger(0, array.length-1)];

export {getRandomInteger, checkLength, getRandomArrayElement};
