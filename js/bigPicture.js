const bigPicture = document.querySelector('.big-picture');
const commentList = bigPicture.querySelector('.social__comments');
const socialComment = document.querySelector('#comment').content.children[0];
const pictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

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

const showBigPicture = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', (evt) => {
    if (evt.code === 'Escape') {
      closeBigPicture();
    }
  });
};


const addBigPictureHandler = (element, pictureData) => {
  element.addEventListener('click', () => {
    showBigPicture();

    document.addEventListener('keydown', (evt) => {
      if (evt.code === 'Escape') {
        closeBigPicture();
      }
    });

    pictureCloseButton.addEventListener('click', () => {
      closeBigPicture();
    });

    bigPicture.querySelector('.big-picture__img').children[0].src = pictureData.url;
    bigPicture.querySelector('.likes-count').textContent = pictureData.likes;
    bigPicture.querySelector('.social__comment-count').innerHTML = '';
    bigPicture.querySelector('.social__comment-count').insertAdjacentHTML('afterbegin',`${pictureData.comments.length} из <span class="comments-count">${pictureData.comments.length}</span> комментариев</div>`);
    bigPicture.querySelector('.social__caption').textContent = pictureData.description;
    commentList.append(addComments(pictureData.comments));
  });

};

export {addBigPictureHandler};
