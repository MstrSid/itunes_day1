export const videoPlayerInit = () => {
  console.log('Video Init');
  // video-player
  // video-button__play
  // video-button__stop
  // video-time__passed
  // video-progress
  // video-time__total

  // получаем элементы из DOM для работы
  const videoPlayer = document.querySelector('.video-player');
  const videoButtonPlay = document.querySelector('.video-button__play');
  const videoButtonStop = document.querySelector('.video-button__stop');
  const videoTimePassed = document.querySelector('.video-time__passed');
  const videoProgress = document.querySelector('.video-progress');
  const videoTimeTotal = document.querySelector('.video-time__total');
  const videoFullscreen = document.querySelector('.video-fullscreen');
  const videoVolume = document.querySelector('.video-volume');

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
    videoPlayer.volume = videoVolume.value / 100;
  });

  // восстанавливаем заданную нами громкость по дефолту в range
  
  videoVolume.value = videoPlayer.volume * 100;
};
