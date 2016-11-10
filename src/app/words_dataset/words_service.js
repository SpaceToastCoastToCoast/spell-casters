
const spellWords = {
  lvl1Words: null,
  lvl2Words: null,
  lvl3Words: null,
  lvl4Words: null
}

const randomDatasetLength = 5;
const secondsPerRound = 120;

export const WordsService = [
  '$http', '$q',
  class WordsService {
    constructor ($http, $q) {
      this.wordsData = [];
      this.bossSpells = {};
      this.baseSpells = {};
      this.easy = [];
      this.medium = [];
      this.hard = [];
      this.boss = [];
      this.$http = $http;
      this.$q = $q;
      this.syllableCount = this.syllableCount.bind(this)
      this.getRandomWords = this.getRandomWords.bind(this)
      this.calculateTotalTime = this.calculateTotalTime.bind(this)
      this.calculatePercentComplete = this.calculatePercentComplete.bind(this)
    }
    getWords (lvl) {
      this.wordsData = spellWords[`lvl${lvl}Words`];
      return spellWords[`lvl${lvl}Words`];
    }

    initSpells() {
      return this.$http.get('/api/spells').success(response => {
        this.baseSpells = response.base_spells;
        this.bossSpells = response.boss_spells;
      })
    }
    getBossSpells() {
      return this.bossSpells
    }
    getBaseSpells() {
      return this.baseSpells;
    }

    initSpellsByLvl () {
      for (var wordObj in this.baseSpells) {
        if (this.syllableCount(this.baseSpells[wordObj].word) > 3) {
          this.hard.push(this.baseSpells[wordObj])
        } else if (this.syllableCount(this.baseSpells[wordObj].word) > 2) {
          this.medium.push(this.baseSpells[wordObj])
        } else {
          this.easy.push(this.baseSpells[wordObj])
        }
      }

      for (var wordObj in this.bossSpells) {
        this.boss.push(this.bossSpells[wordObj])
      }
    }

    syllableCount(word) {
      word = word.toLowerCase();                                     //word.downcase!
      if(word.length <= 3) { return 1; }                             //return 1 if word.length <= 3
      word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');   //word.sub!(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
      word = word.replace(/^y/, '');                                 //word.sub!(/^y/, '')
      return word.match(/[aeiouy]{1,2}/g).length;                    //word.scan(/[aeiouy]{1,2}/).size
    }
    getRandomWords(arr) {
      const max = arr.length - 1;
      const randomIndicies = [];
      const randomWords = [];

      while(randomWords.length < randomDatasetLength) {
        const randomIndex = Math.floor(Math.random() * (max))

        if (randomIndicies.indexOf(randomIndex) === -1) {
          randomIndicies.push(randomIndex);
          randomWords.push(arr[randomIndex]);
        }
      }
      return randomWords;
    }
    initRandomWords() {
      spellWords.lvl1Words = this.getRandomWords(this.easy)
      spellWords.lvl2Words = this.getRandomWords(this.medium)
      spellWords.lvl3Words = this.getRandomWords(this.hard)
      spellWords.lvl4Words = this.getRandomWords(this.boss)
    }
    postStatistics(userId,totalWordsCompleted,gameMistakes,times) {
      const totalTime = this.calculateTotalTime(times);
      const percentComplete = this.calculatePercentComplete(totalWordsCompleted);
      const req = {
        method: 'POST',
        url: '/api/post-stats',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: `percentComplete=${percentComplete}&totalWordsCompleted=${totalWordsCompleted}&gameMistakes=${gameMistakes}&totalTimeElapsed=${totalTime}&UserId=${userId}`
      }
      return this.$http(req)
    }
    calculateTotalTime(times) {
      let totalTime = 0;
      for (var lvlTime in times) {
        if (times[lvlTime] !== null) {
          totalTime += (secondsPerRound - times[lvlTime])
        }
      }
      return totalTime;
    }
    calculatePercentComplete(totalWordsCompleted) {
      return Math.round((totalWordsCompleted / (randomDatasetLength*4))*100)/100;
    }
  }

];