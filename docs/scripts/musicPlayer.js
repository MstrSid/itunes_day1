import { addZero } from './supScripts.js';

export const musicPlayerInit = () => {
  const audio = document.querySelector('.audio');
  const audioImg = document.querySelector('.audio-img');
  const audioHeader = document.querySelector('.audio-header');
  const audioPlayer = document.querySelector('.audio-player');
  const audioNavigation = document.querySelector('.audio-navigation');
  const audioButtonPlay = document.querySelector('.audio-button__play');
  const audioTimePassed = document.querySelector('.audio-time__passed');
  const audioProgress = document.querySelector('.audio-progress');
  const audioProgressTiming = document.querySelector('.audio-progress__timing');
  const audioTimeTotal = document.querySelector('.audio-time__total');
  const audioVolume = document.querySelector('.audio-volume');
  const audioVolumeDown = document.querySelector('.audio-volume__down');
  const audioVolumeUp = document.querySelector('.audio-volume__up');
  const audioVolumeOff = document.querySelector('.audio-volume__off');
  let nowVolume;
  const playlist = ['hello', 'flow', 'speed'];

  let trackIndex = 0;

  // загрузка трека
  const loadTrack = () => {
    const isPlayed = audioPlayer.paused; // состояние плеера
    const track = playlist[trackIndex]; // индекс трека
    audioHeader.textContent = track.toUpperCase(); // название трека
    audioPlayer.src = `../audio/${track}.mp3`; // передаем трек на воспроизведение
    audioImg.src = `../audio/${track}.jpg`; // выводим обложку трека
    isPlayed ? audioPlayer.pause() : audioPlayer.play(); // проверяем состояние плеера и запускаем/ставим на паузу
  };

  // предыдущий трек
  const prevTrack = () => {
    trackIndex !== 0 ? trackIndex-- : trackIndex = playlist.length - 1; /* если индекс трека не равен 0, то уменьшаем
    индекс на 1, иначе оставляем первый в плейлисте */
    loadTrack();
  };

  // следующий трек
  const nextTrack = () => {
    trackIndex === playlist.length - 1 ? trackIndex = 0 : trackIndex++; /* если индекс трека  равен 0, то ставим
    первый трек в плейлисте, иначе увеличиваем индекс трека на 1 */
    loadTrack();
  };

  // переключение иконки громкости в случае отключения звука на volume off
  const toggleVolumeIcon = () => {
    if (audioVolume.value == 0) {
      audioVolumeDown.classList.remove('fa-volume-down');
      audioVolumeDown.classList.add('fa-volume-off');
    } else {
      audioVolumeDown.classList.add('fa-volume-down');
      audioVolumeDown.classList.remove('fa-volume-off');
    }
  };

  // запуск и остановка музыки
  audioNavigation.addEventListener('click', event => {
    const target = event.target;

    if (target.classList.contains('audio-button__play')) { // если кликнули по кнопке play
      const track = playlist[trackIndex]; // получаем индекс трека
      audioHeader.textContent = track.toUpperCase(); // выводим название
      audio.classList.toggle('play'); // добавляем клаа play для анимации обложки
      audioButtonPlay.classList.toggle('fa-play'); // переключаем на иконку play
      audioButtonPlay.classList.toggle('fa-pause'); // или pause в зависимости от клика
      audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause(); // проверяем состояние плеера и запускаем/ставим на паузу
    }

    // предыдущий трек по клику на кнопку prev
    if (target.classList.contains('audio-button__prev')) {
      prevTrack();
    }

    // следующий трек по клику на кнопку next
    if (target.classList.contains('audio-button__next')) {
      nextTrack();
    }
  });

  // если плеер закончил проигрывать трек, переключаем на следующий
  audioPlayer.addEventListener('ended', () => {
    nextTrack();
    audioPlayer.play();
  });

  // вывод времени проигрывания и длительности трека
  audioPlayer.addEventListener('timeupdate', () => {
    const currentTime = audioPlayer.currentTime; // получаем текущее время
    const duration = audioPlayer.duration; // получаем общее время файла
    const progress = (currentTime / duration) * 100;// вычисляем сколько прошло времени для движения range
    const minutePassed = Math.floor(currentTime / 60) || '0'; // вычисляем прошедшие минуты
    const secondsPassed = Math.floor(currentTime % 60) || '0'; // вычисляем прошедшие секунды

    const minuteTotal = Math.floor(duration / 60) || '0'; // вычисляем общее число минут
    const secondsTotal = Math.floor(duration % 60) || '0'; // вычисляем общее число секунд
    audioProgressTiming.style.width = progress + '%';
    audioTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`; // выводим прошедшие мминуты
    audioTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`; // выводим прошедшие секунды
  });

  // реализуем перемотку аудио
  audioProgress.addEventListener('click', event => {
    const x = event.offsetX; // получаем координату клика
    const allWidth = audioProgress.clientWidth; // получаем длину бара
    const progress = (x / allWidth) * audioPlayer.duration; // вычисляем время перемотки
    audioPlayer.currentTime = progress; // передам время плееру
  });

  // контроль звука
  audioVolume.addEventListener('input', () => {
    toggleVolumeIcon();
    audioPlayer.volume = audioVolume.value / 100;
  });

  // восстанавливаем заданную нами громкость по дефолту в range
  audioVolume.value = 50;

  // минимизаци звука или полное отключение при клике на иконку уменьшения громкости
  audioVolumeDown.addEventListener('click', () => {
    switch (true) {
      case audioVolume.value > 1: { // если звук больше минимума, то минимизировать
        audioVolume.value = 1;
        break;
      }
      case audioVolume.value == 1: { // если звук на минимуме, то отключить
        audioVolume.value = 0;
        toggleVolumeIcon();
        break;
      }
      case audioVolume.value == 0: { // если звук отключен, то вернуть минимум
        audioVolume.value = 1;
        toggleVolumeIcon();
        break;
      }
    }
    audioPlayer.volume = audioVolume.value / 100;
  });

  // выключаем звук по клику
  audioVolumeOff.addEventListener('click', () => {
    switch (true) {
      case audioVolume.value > 0: { // если звук больше минимума, то мьютим
        nowVolume = audioVolume.value;
        audioVolume.value = 0;
        toggleVolumeIcon();
        break;
      }
      case audioVolume.value == 0: { // если звук отключен, то возвращаем уровень до мьюта
        audioVolume.value = nowVolume; // возвращаем уровень до мьюта
        toggleVolumeIcon();
        break;
      }
    }
    audioPlayer.volume = audioVolume.value / 100;
  });

  // включение звука на максимум при клике на иконку увеличения громкости
  audioVolumeUp.addEventListener('click', () => {
    audioVolume.value = 100;
    audioPlayer.volume = audioVolume.value / 100;
    toggleVolumeIcon();
  });
};
