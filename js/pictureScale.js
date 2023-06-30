const image = document.querySelector('.img-upload__preview img');
const scaleInput = document.querySelector('.scale__control--value');

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

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

export {resetScale, onButtonBiggerClick, onButtonSmallerClick};
