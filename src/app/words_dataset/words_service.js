const spellWords = {
  lvl1Words: null,
  lvl2Words: null,
  lvl3Words: null,
  lvl4Words: null
}

export const WordsService = [
  '$http', '$q', '$rootScope', 'TimerService',
  class WordsService {
    constructor ($http, $q, $rootScope, TimerService) {
      'ngInject';
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
      this.randomize = this.randomize.bind(this)
      this.calculateTotalTime = this.calculateTotalTime.bind(this)
      this.calculatePercentCompleted = this.calculatePercentCompleted.bind(this)
      this.calculateTotalWordsCompleted = this.calculateTotalWordsCompleted.bind(this)
      this.calculateScore = this.calculateScore.bind(this)
      this.totalWords = null;
      this.$rootScope = $rootScope;
      this.resetGame = this.resetGame.bind(this)
      this.TimerService = TimerService;
    }
    resetGame() {
      this.wordsData = [];
      this.bossSpells = {};
      this.baseSpells = {};
      this.easy = [];
      this.medium = [];
      this.hard = [];
      this.boss = [];
    }
    getWords (lvl) {
      this.wordsData = spellWords[`lvl${lvl}Words`];
      return spellWords[`lvl${lvl}Words`];
    }

    initSpells() {
      this.resetGame();
      return this.$http.get('/api/spells').success(response => {
        this.baseSpells = response.base_spells;
        this.bossSpells = response.boss_spells;
        this.totalWords = Object.keys(response.base_spells).length + Object.keys(response.boss_spells).length
      })
    }
    getBossSpells() {
      return this.bossSpells;
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

    randomize(arr) {
      let currentIndex = arr.length, temporaryValue, randomIndex;
      let randomArr = arr.map(wordObj => {
        return {
          word: wordObj.word,
          prompt: wordObj.prompt,
          hint: wordObj.hint
        }
      });

      while(currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        --currentIndex;

        temporaryValue = randomArr[currentIndex];
        randomArr[currentIndex] = randomArr[randomIndex];
        randomArr[randomIndex] = temporaryValue;
      }
      return randomArr;
    }

    initRandomWords() {
      spellWords.lvl1Words = this.randomize(this.easy)
      spellWords.lvl2Words = this.randomize(this.medium)
      spellWords.lvl3Words = this.randomize(this.hard)
      spellWords.lvl4Words = this.randomize(this.boss)
    }

    postStatistics(lvl,currentIndex,misspelledWords,times) {
      let timeElapsed = '';
      for (var time in times) {
        timeElapsed += `${times[time]},`
      }
      timeElapsed = timeElapsed.substring(0,timeElapsed.length - 1);
      const totalTime = this.calculateTotalTime(this.TimerService.times)
      const totalWordsCompleted = this.calculateTotalWordsCompleted(lvl, currentIndex);
      const percentCompleted = this.calculatePercentCompleted(lvl, totalWordsCompleted);
      const score = this.calculateScore(totalWordsCompleted, misspelledWords.length, totalTime, lvl)

      if (this.$rootScope.user !== 'Guest') {
        const req = {
          method: 'POST',
          url: '/api/post-stats',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: `percentCompleted=${percentCompleted}&totalWordsCompleted=${totalWordsCompleted}&misspelledWords=${misspelledWords.join(',')}&timeElapsed=${timeElapsed}&username=${this.$rootScope.user}&score=${score}`
        }
        return this.$http(req);
      } else {
        return {
          totalTime,
          totalWordsCompleted,
          percentCompleted,
          score
        }
      }
    }

    calculateTotalTime(times) {
      let totalTime = 0;
      for (var lvlTime in times) {
        totalTime += times[lvlTime]
      }
      return totalTime;
    }

    calculatePercentCompleted(lvl, totalWordsCompleted) {
      if(lvl === 5) {
        return 1
      } else {
        return Math.round((totalWordsCompleted / (this.totalWords))*100)/100;
      }
    }

    calculateTotalWordsCompleted(lvl,currentIndex) {
      switch(lvl) {
        case 1:
          return currentIndex;
          break;
        case 2:
          return this.easy.length + currentIndex;
          break;
        case 3:
          return this.easy.length + this.medium.length + currentIndex;
          break;
        default:
          return this.easy.length + this.medium.length + this.hard.length + currentIndex;
          break;
      }
    }

    calculateScore(totalWordsCompleted,misspelledWordsAmt,totalTime,lvl) {
      let bossWordsCompleted = 0;
      let totalBaseSpells = Object.keys(this.baseSpells).length
      let totalBossSpells = Object.keys(this.bossSpells).length
      if (totalWordsCompleted > totalBaseSpells) {
        bossWordsCompleted = totalWordsCompleted - totalBaseSpells
      }
      //score algorithm

      //if you do not complete the game:
      //+ total base words completed * 2
      //+ total boss words completed
      //- misspelled words amount
      //- total time in game * 0.01

      //if you complete the game:
      //+ total base words completed * 2
      //+ amount of boss spells in the database * 3 - boss words it took to complete the game
      //- misspelled words amount
      //- total time in game * 0.01

      if (lvl === 4) {
        return Math.round((totalBaseSpells * 2) + bossWordsCompleted - misspelledWordsAmt - (totalTime * 0.01))
      } else if (lvl === 5) {
        return Math.round((totalBaseSpells * 2) + ((totalBossSpells * 3) - bossWordsCompleted) - misspelledWordsAmt - (totalTime * 0.01))
      } else {
        return Math.round((totalWordsCompleted * 2) - misspelledWordsAmt - (totalTime * 0.01))
      }
    }
  }

];