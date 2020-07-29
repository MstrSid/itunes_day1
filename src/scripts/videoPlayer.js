export const videoPlayerInit = () => {
  console.log('Video Init');

  // получаем элементы из DOM для работы
  const videoPlayer = document.querySelector('.video-player');
  const videoButtonPlay = document.querySelector('.video-button__play');
  const videoButtonStop = document.querySelector('.video-button__stop');
  const videoTimePassed = document.querySelector('.video-time__passed');
  const videoProgress = document.querySelector('.video-progress');
  const videoTimeTotal = document.querySelector('.video-time__total');
  const videoFullscreen = document.querySelector('.video-fullscreen');
  const videoVolume = document.querySelector('.video-volume');
  const videoVolumeDown = document.querySelector('.video-volume__down');
  const videoVolumeUp = document.querySelector('.video-volume__up');
  const videoVolumeOff = document.querySelector('.video-volume__off');
  let nowVolume; // переменная для текущей позиции громкости

  // смена иконки при воспроизведении/паузе
  const toggleIcon = () => {
    if (videoPlayer.paused) { // если на паузе то показываем иконку play
      videoButtonPlay.classList.remove('fa-pause');
      videoButtonPlay.classList.add('fa-play');
    } else { // если не на паузе то показываем иконку pause
      videoButtonPlay.classList.add('fa-pause');
      videoButtonPlay.classList.remove('fa-play');
    }
  };

  // переключение состояния плеера
  const togglePlay = () => {
    if (videoPlayer.paused) { // если был на паузе, то новое состояние по клику play()
      videoPlayer.play();
    } else { // иначе - pause()
      videoPlayer.pause();
    }
  };

  // при остановке видео сбрасываем текущую позицию времени
  const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  };

  // переключение иконки громкости в случае отключения звука на volume off
  const toggleVolumeIcon = () => {
    if (videoVolume.value == 0) {
      videoVolumeDown.classList.remove('fa-volume-down');
      videoVolumeDown.classList.add('fa-volume-off');
    } else {
      videoVolumeDown.classList.add('fa-volume-down');
      videoVolumeDown.classList.remove('fa-volume-off');
    }
  };

  // добавляем ноль спереди при выводе секунд/минут меньше значения 10
  const addZero = n => n < 10 ? '0' + n : n;

  // запуск/пауза видео по клику на сам плеер
  videoPlayer.addEventListener('click', togglePlay);
  // запуск/пауза видео по клику на сам кнопку
  videoButtonPlay.addEventListener('click', togglePlay);

  // переключение иконки при проигрывании
  videoPlayer.addEventListener('play', toggleIcon);
  // переключение иконки при паузе
  videoPlayer.addEventListener('pause', toggleIcon);

  // остановка видео при клике на кнопку stop
  videoButtonStop.addEventListener('click', stopPlay);

  // получаем и выводим общее и оставшееся время проигрывания по timeupdate
  videoPlayer.addEventListener('timeupdate', () => {
    const currentTime = videoPlayer.currentTime; // получаем текущее время
    const duration = videoPlayer.duration; // получаем общее время файла

    videoProgress.value = (currentTime / duration) * 100; // вычисляем сколько прошло времени для движения range

    const minutePassed = Math.floor(currentTime / 60); // вычисляем прошедшие минуты
    const secondsPassed = Math.floor(currentTime % 60); // вычисляем прошедшие секунды

    const minuteTotal = Math.floor(duration / 60); // вычисляем общее число минут
    const secondsTotal = Math.floor(duration % 60); // вычисляем общее число секунд

    videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`; // выводим прошедшие мминуты
    videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`; // выводим прошедшие секунды
  });

  // перемотка видео
  videoProgress.addEventListener('input', () => {
    const duration = videoPlayer.duration; // длительность видео
    const value = videoProgress.value; // текущая позиция

    videoPlayer.currentTime = (value * duration) / 100; // вычисляем новую позицию
  });

  // развернуть видео в полный экран
  videoFullscreen.addEventListener('click', () => {
    videoPlayer.requestFullscreen();
  });

  // контроль звука
  videoVolume.addEventListener('input', () => {
    toggleVolumeIcon();
    videoPlayer.volume = videoVolume.value / 100;
  });

  // восстанавливаем заданную нами громкость по дефолту в range
  videoVolume.value = 50;

  // минимизаци звука или полное отключение при клике на иконку уменьшения громкости
  videoVolumeDown.addEventListener('click', () => {
    switch (true) {
      case videoVolume.value > 1: { // если звук больше минимума, то минимизировать
        videoVolume.value = 1;
        break;
      }
      case videoVolume.value == 1: { // если звук на минимуме, то отключить
        videoVolume.value = 0;
        toggleVolumeIcon();
        break;
      }
      case videoVolume.value == 0: { // если звук отключен, то вернуть минимум
        videoVolume.value = 1;
        toggleVolumeIcon();
        break;
      }
    }
    videoPlayer.volume = videoVolume.value / 100;
  });

  // выключаем звук по клику
  videoVolumeOff.addEventListener('click', () => {
    switch (true) {
      case videoVolume.value > 0: { // если звук больше минимума, то мьютим
        nowVolume = videoVolume.value;
        videoVolume.value = 0;
        toggleVolumeIcon();
        break;
      }
      case videoVolume.value == 0: { // если звук отключен, то возвращаем уровень до мьюта
        videoVolume.value = nowVolume; // возвращаем уровень до мьюта
        toggleVolumeIcon();
        break;
      }
    }
    videoPlayer.volume = videoVolume.value / 100;
  });

  // включение звука на максимум при клике на иконку увеличения громкости
  videoVolumeUp.addEventListener('click', () => {
    videoVolume.value = 100;
    videoPlayer.volume = videoVolume.value / 100;
    toggleVolumeIcon();
  });
};
