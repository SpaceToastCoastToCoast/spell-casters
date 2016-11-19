const mainSong = require('../../public/music/Main.ogg');

export const SoundService = [

  '$rootScope',

  class SoundService {
    constructor ($rootScope) {
      this.$rootScope = $rootScope;
      this.setCurrentSong = this.setCurrentSong.bind(this)
      this.playSoundEffect = this.playSoundEffect.bind(this)
      this.currentSong;
      this.currentSound;
      this.musicOn = true;
      this.soundEffectsOn = true;
      this.turnMusicOn = this.turnMusicOn.bind(this)
      this.turnMusicOff = this.turnMusicOff.bind(this)
    }

    setCurrentSong(songPath) {
      if (this.currentSong) {
        this.currentSong.pause();
      }
      if (this.musicOn) { //only set and play music if musicOn is true
        this.currentSong = new Howl({
          src: [songPath],
          autoplay: true,
          loop: true
        })
      }
    }

    turnMusicOff() {
      this.musicOn = false;
      this.setCurrentSong();
    }

    turnMusicOn(songpath) {
      this.musicOn = true;
      this.setCurrentSong(songPath);
    }


    playSoundEffect(soundPath) {
      if (this.soundEffectsOn) { //only set and play sound effects is soundEffectsOn is true
        if(this.currentSound) {
          this.currentSound.pause();
        }
        this.currentSound = new Howl({
          src: [soundPath],
          autoplay: true
        })
      }
    }
  }
];