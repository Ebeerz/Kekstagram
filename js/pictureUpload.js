import {isEscapeKey} from './util.js';
import {onFormSubmit} from './formValidation.js';
const imgUpload = document.querySelector('.img-upload');
const fileChooseButton = imgUpload.querySelector('#upload-file');
const imgUploadPopupCloseButton = imgUpload.querySelector('#upload-cancel');
const imgUploadPopup = imgUpload.querySelector('.img-upload__overlay');
const imgUploadForm = imgUpload.querySelector('.img-upload__form');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

// esc keydown close function
const imgUploadPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !isTextFieldFocused) {
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
  imgUploadForm.deleteEventListener('submit', onFormSubmit);
};

// opening popup function
const showImgUploadPopup = () => {
  imgUploadPopup.classList.remove('hidden');
  document.body.classList.add('modal-open');
  imgUploadPopupCloseButton.addEventListener('click', closeImgUploadPopup);
  document.addEventListener('keydown', imgUploadPopupEscKeydown);
  imgUploadForm.addEventListener('submit', onFormSubmit);
};

// function that handles img uploading
const imgUploading = () => {
  fileChooseButton.addEventListener('change', () => {
    showImgUploadPopup();
  });
};

export {imgUploading};
