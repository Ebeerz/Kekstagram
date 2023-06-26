import {isEscapeKey} from './util.js';
import {onFormSubmit} from './formValidation.js';
const imgUpload = document.querySelector('.img-upload');
const fileChooseButton = imgUpload.querySelector('#upload-file');
const imgUploadPopupCloseButton = imgUpload.querySelector('#upload-cancel');
const imgUploadPopup = imgUpload.querySelector('.img-upload__overlay');
const imgUploadForm = imgUpload.querySelector('.img-upload__form');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const image = document.querySelector('.img-upload__preview img');
const scaleInput = document.querySelector('.scale__control--value');
const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

// esc keydown close function
const imgUploadPopupEscKeydown = (evt) => {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeImgUploadPopup();
  }
};


// close button function
const onCloseButtonClick = () => {
  // eslint-disable-next-line no-use-before-define
  closeImgUploadPopup();
};

const changePictureSize = (size = DEFAULT_SCALE) => {
  image.style.transform = `scale(${size/100})`;
  scaleInput.value = `${size}%`;
};

const onButtonSmallerClick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  let newValue = currentValue - SCALE_STEP;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  changePictureSize(newValue);
};

const onButtonBiggerClick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  let newValue = currentValue + SCALE_STEP;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  changePictureSize(newValue);
};


const resetScale = () => {
  changePictureSize();
};


// closing popup function
const closeImgUploadPopup = () => {
  imgUploadPopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadPopupCloseButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', imgUploadPopupEscKeydown);
  imgUploadForm.removeEventListener('submit', onFormSubmit);
  buttonBigger.removeEventListener('click', onButtonBiggerClick);
  buttonSmaller.removeEventListener('click', onButtonSmallerClick);
};

// opening popup function
const showImgUploadPopup = () => {
  imgUploadPopup.classList.remove('hidden');
  document.body.classList.add('modal-open');
  imgUploadPopupCloseButton.addEventListener('click', closeImgUploadPopup);
  document.addEventListener('keydown', imgUploadPopupEscKeydown);
  imgUploadForm.addEventListener('submit', onFormSubmit);
  buttonBigger.addEventListener('click', onButtonBiggerClick);
  buttonSmaller.addEventListener('click', onButtonSmallerClick);
  resetScale();
};

// function that handles img uploading
const imgUploading = () => {
  fileChooseButton.addEventListener('change', () => {
    showImgUploadPopup();
  });
};

export {imgUploading};
