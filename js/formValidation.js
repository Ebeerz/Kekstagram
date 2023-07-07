import {postData} from './serverRequests.js';
import {onSubmitError, onSubmitSuccess} from './formSubmit.js';
const form = document.querySelector('.img-upload__form');
const hashtag = document.querySelector('.text__hashtags');

const pristine = new Pristine(form, {
  classTo: 'img-upload__element',
  errorTextParent: 'img-upload__element',
  errorTextClass: 'img-upload__error',
});

const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_COUNT = 5;
const VALIDE_SYMBOLS = /^#[a-zA-Zа-яА-Я0-9]+(?<!#)$/;


const checkCount = (tags) => tags.length < MAX_HASHTAG_COUNT;

// creating set object and comparing it with array to check Uniqueness of tag
const checkUniqueness = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const checkLength = (tag) => tag.length < MAX_HASHTAG_LENGTH;
const validateSymbols = (tag) => VALIDE_SYMBOLS.test(tag);

const validTag = (tag) => checkLength(tag) & validateSymbols(tag);

const validateTags = (value) => {
  const tags = value.trim().split(' ');
  return tags.every(validTag) && checkUniqueness(tags) && checkCount(tags) || tags.length === 0;
};

pristine.addValidator(hashtag, validateTags, 'Отредактируйте хештеги');

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    postData(onSubmitSuccess, onSubmitError, new FormData(evt.target));
    evt.target.reset();
  }
};

export {onFormSubmit};
