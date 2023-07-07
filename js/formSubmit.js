import {isEscapeKey} from './util.js';
import {closeImgUploadPopup} from './pictureUpload.js';
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');


const successMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeSuccessMessage();
  }
};

const onSuccessCloseButtonClick = () => {
  // eslint-disable-next-line no-use-before-define
  closeSuccessMessage();
};

const onSuccessOutClick = (evt) => {
  if (!evt.target.closest('.success__inner')) {
    // eslint-disable-next-line no-use-before-define
    closeSuccessMessage();
  }
};

const closeSuccessMessage = () => {
  document.removeEventListener('keydown', successMessageEscKeydown);
  document.removeEventListener('click', onSuccessOutClick);
  const successCloseButton = document.querySelector('.success__button');
  successCloseButton.removeEventListener('click', onSuccessCloseButtonClick);
  document.body.removeChild(document.querySelector('.success'));
};

const onSubmitSuccess = () => {
  closeImgUploadPopup();
  const fragment = document.createDocumentFragment();
  fragment.append(successMessage);
  const successCloseButton = fragment.querySelector('.success__button');
  successCloseButton.addEventListener('click', onSuccessCloseButtonClick);
  document.addEventListener('keydown', successMessageEscKeydown);
  document.addEventListener('click', onSuccessOutClick);
  document.body.append(fragment);
};

const errorMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeErrorMessage();
  }
};

const onErrorCloseButtonClick = () => {
  // eslint-disable-next-line no-use-before-define
  closeErrorMessage();
};

const onErrorOutClick = (evt) => {
  if (!evt.target.closest('.error__inner')) {
    // eslint-disable-next-line no-use-before-define
    closeErrorMessage();
  }
};

const closeErrorMessage = () => {
  document.removeEventListener('keydown', errorMessageEscKeydown);
  document.removeEventListener('click', onErrorOutClick);
  const errorCloseButton = document.querySelector('.error__button');
  errorCloseButton.removeEventListener('click', onErrorCloseButtonClick);
  document.body.removeChild(document.querySelector('.error'));
};

const onSubmitError = () => {
  closeImgUploadPopup();
  const fragment = document.createDocumentFragment();
  fragment.append(errorMessage);
  const errorCloseButton = fragment.querySelector('.error__button');
  errorCloseButton.addEventListener('click', onErrorCloseButtonClick);
  document.addEventListener('keydown', errorMessageEscKeydown);
  document.addEventListener('click', onErrorOutClick);
  document.body.append(fragment);
};

export {onSubmitSuccess, onSubmitError};
