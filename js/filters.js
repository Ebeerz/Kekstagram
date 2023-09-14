const RANDOM_PICTURES_NUMBER = 10;

const randomFilter = (picturesData) => {
  const newPicturesData = picturesData.slice(0, RANDOM_PICTURES_NUMBER);
  return newPicturesData.sort(() => Math.random() - 0.5);
};

const commentsSort = (firstPicture, secondPicture) => secondPicture.comments.length - firstPicture.comments.length;

const discussedFilter = (picturesData) => {
  const newPicturesData = picturesData.slice(0);
  return newPicturesData.sort(commentsSort);
};

export {randomFilter, discussedFilter};
