import {addBigPictureHandler} from './bigPicture.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();


const renderPictures = (picturesData) => {
  picturesData.forEach((pictureData) => {
    const element = pictureTemplate.cloneNode(true);
    element.querySelector('img').src = pictureData.url;
    element.querySelector('.picture__comments').textContent = pictureData.comments.length;
    element.querySelector('.picture__likes').textContent = pictureData.likes;
    addBigPictureHandler(element, pictureData);
    fragment.append(element);
  });
  pictures.append(fragment);
};


export {renderPictures};
