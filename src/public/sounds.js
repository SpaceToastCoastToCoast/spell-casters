
const playButton = document.getElementById('play')
playButton.onclick = function() {
  sound.play();
}
const pauseButton = document.getElementById('pause')
pauseButton.onclick = function() {
  sound.pause();
}

var sound = new Howl({
  src: ['music/Spellcasters_short_theme.ogg'],
  autoplay: true,
  loop: true
});
