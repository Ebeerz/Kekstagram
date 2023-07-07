import {onFormSubmit} from './formValidation.js';
import {onEffectChange, resetEffects} from './pictureFilter.js';
import {resetScale, onButtonBiggerClick, onButtonSmallerClick} from './pictureScale.js';
const imgUpload = document.querySelector('.img-upload');
const fileChooseButton = imgUpload.querySelector('#upload-file');
const imgUploadPopupCloseButton = imgUpload.querySelector('#upload-cancel');
const imgUploadPopup = imgUpload.querySelector('.img-upload__overlay');
const imgUploadForm = imgUpload.querySelector('.img-upload__form');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const effects = document.querySelector('.img-upload__effects');

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


// closing popup function
const closeImgUploadPopup = () => {
  imgUploadPopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadPopupCloseButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', imgUploadPopupEscKeydown);
  imgUploadForm.removeEventListener('submit', onFormSubmit);
  buttonBigger.removeEventListener('click', onButtonBiggerClick);
  buttonSmaller.removeEventListener('click', onButtonSmallerClick);
  effects.removeEventListener('change', onEffectChange);
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
  resetEffects();
  effects.addEventListener('change', onEffectChange);
};

// function that handles img uploading
const imgUploading = () => {
  fileChooseButton.addEventListener('change', () => {
    showImgUploadPopup();
  });
};

export {imgUploading, closeImgUploadPopup};
