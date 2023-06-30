const EFFECTS = [
  {
    name: 'none',
    min: 0,
    max: 100,
    step: 1,
  },
  {
    name: 'chrome',
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  {
    name: 'phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  {
    name: 'heat',
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
];
const sliderElement = document.querySelector('.effect-level__slider');
const imgPreview = document.querySelector('.img-upload__preview img');
const effectLevel = document.querySelector('.effect-level__value');
const DEFAULT_EFFECT = EFFECTS[0];
let chosenEffect = DEFAULT_EFFECT;

const isDefault = () => chosenEffect === DEFAULT_EFFECT;

const updateSlider = () => {
  sliderElement.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });

  if (isDefault()) {
    sliderElement.classList.add('hidden');
  }
};

const onSliderUpdate = () => {
  imgPreview.style.filter = 'none';
  imgPreview.className = '';
  effectLevel.value = '';
  if (isDefault()) {
    return;
  }
  const sliderValue = sliderElement.noUiSlider.get();
  imgPreview.style.filter = `${chosenEffect.filter}(${sliderValue}${chosenEffect.unit})`;
  imgPreview.classList.add(`effects__preview--${chosenEffect.name}`);
  effectLevel.value = sliderValue;
};

const onEffectChange = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  updateSlider();
};

const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};

// slider bibliary creation
noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});
updateSlider();
sliderElement.noUiSlider.on('update', onSliderUpdate);
export {onEffectChange, resetEffects};
