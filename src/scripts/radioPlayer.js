export const radioPlayerInit = () => {
  // получаем элементы из DOM для работы
  const radio = document.querySelector('.radio');
  const radioCoverImg = document.querySelector('.radio-cover__img');
  const radioNavigation = document.querySelector('.radio-navigation');
  const radioHeaderBig = document.querySelector('.radio-header__big');
  const radioItem = document.querySelectorAll('.radio-item');
  const radioStop = document.querySelector('.radio-stop');
  const radioVolume = document.querySelector('.radio-volume');
  const radioVolumeDown = document.querySelector('.radio-volume__down');
  const radioVolumeUp = document.querySelector('.radio-volume__up');

  const audio = new Audio(); // создаем новый объект аудио и заносим в переменную
  audio.type = 'audio/aac'; // задаем тип (формат) аудио
  radioStop.disabled = true; // блокируем кнопку Stop

  // смена иконки кнопки radioStop при проигрывании/паузе + включени/выключение анимации radio
  const changeIconPlay = () => {
    if (audio.paused) {
      radio.classList.remove('play');
      radioStop.classList.remove('fa-stop');
      radioStop.classList.add('fa-play');
    } else {
      radio.classList.add('play');
      radioStop.classList.remove('fa-play');
      radioStop.classList.add('fa-stop');
    }
  };

  // переключение иконки громкости в случае отключения звука на volume off
  const toggleVolumeIcon = () => {
    if (radioVolume.value == 0) {
      radioVolumeDown.classList.remove('fa-volume-down');
      radioVolumeDown.classList.add('fa-volume-off');
    } else {
      radioVolumeDown.classList.add('fa-volume-down');
      radioVolumeDown.classList.remove('fa-volume-off');
    }
  };

  const changeActivePlay = elem => {
    const title = elem.querySelector('.radio-name').textContent; /* ищем элемент radio-name для конкретного
    parent и вытаскиваем  textContent т.е. имя станции в данном случае */
    const img = elem.querySelector('.radio-img').src;
    radioItem.forEach(item => item.classList.remove('select'));
    elem.classList.add('select');
    radioCoverImg.src = img; // выводим обложку радио
    radioHeaderBig.textContent = title; // выводим название радиостанции
  };

  // включение музыки через audio.src
  radioNavigation.addEventListener('change', event => { // передаем event
    const target = event.target;
    const parent = target.closest('.radio-item'); // получаем родительский radio-item элемента, на который кликнули
    audio.src = target.dataset.radioStantion; // из target.dataset вытаскиваем значение radioStation (url станции)
    audio.play();
    radioStop.disabled = false;
    changeIconPlay();
    changeActivePlay(parent);
    console.log(audio.getAttribute);
  });

  // работа кнопки radioStop
  radioStop.addEventListener('click', () => {
    audio.paused ? audio.play() : audio.pause(); // если пауза, то play, иначе pause
    changeIconPlay();
  });

  // контроль звука
  radioVolume.addEventListener('input', () => {
    toggleVolumeIcon();
    audio.volume = radioVolume.value / 100;
  });

  // восстанавливаем заданную нами громкость по дефолту в range
  audio.volume = 0.5;
  radioVolume.value = audio.volume * 100;

  // минимизаци звука или полное отключение при клике на иконку уменьшения громкости
  radioVolumeDown.addEventListener('click', () => {
    switch (true) {
      case radioVolume.value > 1: { // если звук больше минимума, то минимизировать
        console.log(radioVolume.value);
        radioVolume.value = 1;
        break;
      }
      case radioVolume.value == 1: { // если звук на минимуме, то отключить
        radioVolume.value = 0;
        toggleVolumeIcon();
        break;
      }
      case radioVolume.value == 0: { // если звук отключен, то вернуть минимум
        radioVolume.value = 1;
        toggleVolumeIcon();
        break;
      }
    }
    audio.volume = radioVolume.value / 100;
  });

  // включение звука на максимум при клике на иконку увеличения громкости
  radioVolumeUp.addEventListener('click', () => {
    radioVolume.value = 100;
    audio.volume = radioVolume.value / 100;
    toggleVolumeIcon();
  });
};
