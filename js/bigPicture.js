import {isEscapeKey} from './util.js';
const bigPicture = document.querySelector('.big-picture');
const commentList = bigPicture.querySelector('.social__comments');
const socialComment = document.querySelector('#comment').content.children[0];
const pictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

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
const addComments = (comments) => {
  const commentFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentTemplate = socialComment.cloneNode(true);
    const commentAvatar = commentTemplate.querySelector('img');
    const commentText = commentTemplate.querySelector('p');
    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    commentText.textContent = comment.message;
    commentFragment.append(commentTemplate);
  });
  commentList.innerHTML = '';
  return commentFragment;
};

// show popup function
const showBigPicture = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
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
  commentList.append(addComments(pictureData.comments));
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
