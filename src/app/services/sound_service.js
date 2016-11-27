const Howl = require('howler').Howl
const mainSong = require('../../public/music/Main.ogg');

export const SoundService = [

  class SoundService {
    constructor () {
      'ngInject';
      this.setCurrentSong = this.setCurrentSong.bind(this);
      this.playSoundEffect = this.playSoundEffect.bind(this);
      this.currentSong;
      this.currentSound;
      this.musicOn = true;
      this.soundEffectsOn = true;
      this.turnMusicOn = this.turnMusicOn.bind(this);
      this.turnMusicOff = this.turnMusicOff.bind(this);
    }

    setCurrentSong(songPath) {
      if (this.currentSong) {
        this.currentSong.pause();
      }
      this.currentSong = new Howl({
        src: [songPath],
        loop: true
      })
      if (this.musicOn) { //only play music if user has music on in settings
        this.currentSong.play();
      }
    }

    turnMusicOff() {
      this.musicOn = false;
      this.currentSong.pause();
    }

    turnMusicOn() {
      this.musicOn = true;
      this.currentSong.play();
    }


    playSoundEffect(soundPath) {
      if (this.soundEffectsOn) { //only set and play sound effects if soundEffectsOn is true
        if(this.currentSound) {
          this.currentSound.pause();
        }
        this.currentSound = new Howl({
          src: [soundPath],
        })
        if (this.soundEffectsOn) {
          this.currentSound.play();
        }
      }
    }
  }
];