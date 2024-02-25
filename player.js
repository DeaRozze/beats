let video;
let durationControl;
let soundControl;
let intervalid;

document.addEventListener('DOMContentLoaded', e => {
  video = document.getElementById('video');

  video.addEventListener('click', playStop);

  let playButton = document.querySelectorAll('.play');
  for (let i = 0; i < playButton.length; i++) {
    playButton[i].addEventListener('click', playStop);
  }

  let micControl = document.getElementById('micLevel');
  micControl.addEventListener('click', soundOf);

  durationControl = document.getElementById('durationLevel');
  durationControl.addEventListener('mousedown', stopInterval);
  durationControl.addEventListener('click', setVideoDuration);

  durationControl.min = 0;
  durationControl.value = 0;

  soundControl = document.getElementById('volumeLevel');
  soundControl.addEventListener('cltck', changeSoundVolume);
  soundControl.addEventListener('mousedown', changeSoundVolume);

  soundControl.min = 0;
  soundControl.max = 10;

  soundControl.value = soundControl.max;

})

function playStop () {
  let playImg = document.querySelector('.video__play');
  playImg.classList.toggle('video__play--active');

  durationControl.max = video.duration;

  if(video.paused) {
    video.play();
    intervalid = setInterval(updateDuration , 1000 / 66);
  }else {
    video.pause();
    clearInterval(intervalid);
  }
}

function updateDuration() {
  durationControl.value = video.currentTime;
}

function stopInterval() {
  video.pause();
  clearInterval(intervalid);
}

function setVideoDuration() {
  if(video.paused) {
    video.play();
  }else {
    video.pause();
  }

  video.currentTime = durationControl.value;
  intervalid = setInterval(updateDuration, 1000 / 66);
}

function changeSoundVolume() {
  video.volume = soundControl.value / 10;
}

function soundOf(){
  if(video.volume === 0){
    video.volume = soundLevel;
    soundControl.value = soundLevel * 10;
  } else {
    soundLevel = video.volume;
    video.volume = 0;
    soundControl.value = 0;
  }
}

