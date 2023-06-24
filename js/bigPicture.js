import {isEscapeKey} from './util.js';
const bigPicture = document.querySelector('.big-picture');
const commentList = bigPicture.querySelector('.social__comments');
const socialComment = document.querySelector('#comment').content.children[0];
const pictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const showMoreButton = bigPicture.querySelector('.social__comments-loader');
const commentListCount = document.querySelector('.social__comment-count');
let commentsCount = 0;
let comments = [];

// function for closing popup with ecs keydown
const bigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeBigPicture();
  }
};

// function for closing popup with click on close button
const onCloseButtonClick = () => {
  // eslint-disable-next-line no-use-before-define
  closeBigPicture();
};

// function that returns html fragment with comments
const addComments = (newComments) => {
  const commentFragment = document.createDocumentFragment();
  newComments.forEach((newComment) => {
    const commentTemplate = socialComment.cloneNode(true);
    const commentAvatar = commentTemplate.querySelector('img');
    const commentText = commentTemplate.querySelector('p');
    commentAvatar.src = newComment.avatar;
    commentAvatar.alt = newComment.name;
    commentText.textContent = newComment.message;
    commentFragment.append(commentTemplate);
  });
  return commentFragment;
};

// function for uploading comments by click on show more button
const commentsHadler = () => {
  const newComments = [];
  let counter = 0;
  while (commentsCount+1 <= comments.length && counter < 5) {
    commentsCount += 1;
    counter += 1;
    newComments.push(comments[commentsCount-1]);
  }
  commentList.append(addComments(newComments));
  commentListCount.innerHTML = `${commentsCount} из <span class="comments-count">${comments.length}</span> комментариев`;
  if (commentsCount < comments.length) {
    // eslint-disable-next-line no-use-before-define
    showMoreButton.addEventListener('click', onShowMoreClick);
    showMoreButton.classList.remove('hidden');
  } else {
    // eslint-disable-next-line no-use-before-define
    showMoreButton.removeEventListener('click', onShowMoreClick);
    showMoreButton.classList.add('hidden');
  }
};

// on show more button listener function
const onShowMoreClick = () => commentsHadler();

const renderComments = () => {
  commentsCount = 0;
  commentList.innerHTML = '';
  commentsHadler();
};

// show popup function
const showBigPicture = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

// hide popup function
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', bigPictureEscKeydown);
  pictureCloseButton.removeEventListener('click', onCloseButtonClick);
};

// function for rendering popup datas
const renderBigPictureData = (pictureData) => {
  bigPicture.querySelector('.big-picture__img').children[0].src = pictureData.url;
  bigPicture.querySelector('.likes-count').textContent = pictureData.likes;
  bigPicture.querySelector('.social__comment-count').innerHTML = '';
  bigPicture.querySelector('.social__comment-count').insertAdjacentHTML('afterbegin',`${pictureData.comments.length} из <span class="comments-count">${pictureData.comments.length}</span> комментариев</div>`);
  bigPicture.querySelector('.social__caption').textContent = pictureData.description;
  comments = pictureData.comments;
  renderComments();
};

// main function that opens popup and adds event listeners
const addBigPictureHandler = (element, pictureData) => {
  element.addEventListener('click', () => {
    showBigPicture();
    document.addEventListener('keydown', bigPictureEscKeydown);
    pictureCloseButton.addEventListener('click', onCloseButtonClick);
    renderBigPictureData(pictureData);
  });

};

export {addBigPictureHandler};
