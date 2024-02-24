let player;
let soundControl;

const playerContainer = $('.player');

let eventsInit = () => {
$('.player__start').click(e => {
  e.preventDefault();

  const btn = $(e.currentTarget);

  if (playerContainer.hasClass('player--paused')) {
    player.pauseVideo()
  } else {
    player.playVideo()
  }
});

  $('.player__playback').click(e => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
    const newPlaybackPositionSec = 
      (player.getDuration() / 100) * newButtonPositionPercent;

    $('.player__playback-button').css({
      left: `${newButtonPositionPercent}%`
    });

    player.seekTo(newPlaybackPositionSec);
    
  })

  $(".player__splash").click(e => {
    player.playVideo();
  })
  
};

  const formatTime = timeSec => {
      const roundTime = Math.round(timeSec);

      const minutes = addZero(Math.floor(roundTime / 60));
      const seconds = addZero(roundTime - minutes * 60);

      function addZero(num) {
        return num < 10 ? `0${num}` : num;
      }

      return `${minutes} : ${seconds}`;
  }

  const onPlayerReady = () => {
    let interval;
    const durationSec = player.getDuration();
    
    if (typeof interval !== "undefined") {
      clearInterval(interval);
    }
    
    interval = setInterval(() => {
      const completedSec = player.getCurrentTime();
      const completedPercent = (completedSec / durationSec) * 100;

       $('.player__playback-button').css({
        left: `${completedPercent}%`
       });

       
    });
   };

   const onPlayerStateChange = event => {
    switch (event.data) {
      case 1:
        playerContainer.addClass('player--active');
        playerContainer.addClass('player--paused');
        break;

        case 2:
          playerContainer.removeClass('player--active');
          playerContainer.removeClass('player--paused');
          break;
    }
   }

function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: '390',
    width: '662',
    videoId: 'Dd1VIeTMGQs',
     events: {
       'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplar: 0,
      modestbranding: 0
    }

  });
}

eventsInit();

let micControl = document.getElementById('micLevel');
micControl.addEventListener('click', soundOf);

soundControl = document.getElementById('volumeLevel');
soundControl.addEventListener('click', changeSoundVolume);
soundControl.addEventListener('mouseup', changeSoundVolume);

soundControl.min = 0;
soundControl.max = 10;

soundControl.value = soundControl.max;

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