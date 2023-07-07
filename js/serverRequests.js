const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((pictures) => {
      onSuccess(pictures);
    });
};


const postData = (onSuccess, onFail, body) => {
  fetch('https://25.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess(response);
      } else {
        onFail('Не удалось отправить данные');
      }
    })
    .catch(()=> {
      onFail('Не удалось отправить данные');
    });
};

export {getData, postData};
