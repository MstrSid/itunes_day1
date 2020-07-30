/* eslint-disable semi */
import {
  radioPlayerInit, audio as radioAudio
} from './radioPlayer.js';
import {
  musicPlayerInit
} from './musicPlayer.js';
import {
  videoPlayerInit
} from './videoPlayer.js';

const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');
const audioButtonPlay = document.querySelector('.audio-button__play');
const audioPlayer = document.querySelector('.audio-player');
const radioStop = document.querySelector('.radio-stop');
const videoPlayer = document.querySelector('.video-player');
const videoButtonStop = document.querySelector('.video-button__stop');

const deactivationPlayer = () => {
  temp.style.display = 'none';
  playerBtn.forEach((item) => item.classList.remove('active'));
  playerBlock.forEach((item) => item.classList.remove('active'));
  if (audioPlayer.paused !== true) { // если аудиоплеер не на паузе при переключении таба - ставим на паузу
    audioButtonPlay.click();
  }
  if (videoPlayer.paused !== true) { // если видеоплеер играет при переключении таба - останавливаем
    videoButtonStop.click();
  }
  if (radioAudio.paused !== true) { // если радиоплеер не на паузе при переключении таба - ставим на паузу
    radioStop.click();
  }
};

playerBtn.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    deactivationPlayer();
    btn.classList.add('active');
    playerBlock[i].classList.add('active');
  });
});

radioPlayerInit();
musicPlayerInit();
videoPlayerInit();
