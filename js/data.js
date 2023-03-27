import {getRandomInteger, getRandomArrayElement} from './util.js';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Ялта 2007',
  'Мой кот',
  'На прогулке',
  'Мой пиздюк',
  '#природа',
  '#DubaiLife',
  'Рыбылка',
  '#пятница'
];

const NAMES = [
  'Вася',
  'Петя',
  'Влада',
  'Даня',
  'Коля',
  'Кирилл'
];

const createComment = (index) => ({
  id: index,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const getComments = () =>
  Array.from({length: getRandomInteger(1,5)}, (commentIndex) => createComment(commentIndex + 1));

const createPicture = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15,200),
  comments: getComments()
});

const getPictures = () =>
  Array.from({length: 25}, (pictureIndex) => createPicture(pictureIndex+1));

export {getPictures};
