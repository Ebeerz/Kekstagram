import {addBigPictureHandler} from './bigPicture.js';
import {debounce} from './util.js';
import {randomFilter, discussedFilter} from './filters.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();
const filters = document.querySelector('.img-filters');
const standartFilterButton = filters.querySelector('#filter-default');
const randomFilterButton = filters.querySelector('#filter-random');
const discussedFilterButton = filters.querySelector('#filter-discussed');
const RENDER_RELAY = 500;
let picturesData = [];
let activeButton = standartFilterButton;


const renderPictures = (newPicturesData) => {
  document.querySelectorAll('.picture').forEach((element) => element.remove());
  newPicturesData.forEach((pictureData) => {
    const element = pictureTemplate.cloneNode(true);
    element.querySelector('img').src = pictureData.url;
    element.querySelector('.picture__comments').textContent = pictureData.comments.length;
    element.querySelector('.picture__likes').textContent = pictureData.likes;
    addBigPictureHandler(element, pictureData);
    fragment.append(element);
  });
  pictures.append(fragment);
};

const debouncedRenderPictures = debounce(renderPictures);


const standartFilterHandler = () => {
  activeButton.classList.remove('img-filters__button--active');
  standartFilterButton.classList.add('img-filters__button--active');
  activeButton = standartFilterButton;
  debouncedRenderPictures(picturesData, RENDER_RELAY);
};

const randomFilterHandler = () => {
  activeButton.classList.remove('img-filters__button--active');
  randomFilterButton.classList.add('img-filters__button--active');
  activeButton = randomFilterButton;
  debouncedRenderPictures(randomFilter(picturesData), RENDER_RELAY);
};

const discussedFilterHandler = () => {
  activeButton.classList.remove('img-filters__button--active');
  discussedFilterButton.classList.add('img-filters__button--active');
  activeButton = discussedFilterButton;
  debouncedRenderPictures(discussedFilter(picturesData), RENDER_RELAY);
};


const managePictures = (newPicturesData) => {
  picturesData = newPicturesData;
  renderPictures(picturesData);
  filters.classList.remove('img-filters--inactive');
  standartFilterButton.addEventListener('click', standartFilterHandler);
  randomFilterButton.addEventListener('click', randomFilterHandler);
  discussedFilterButton.addEventListener('click', discussedFilterHandler);
};

export {managePictures};
