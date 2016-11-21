import { HttpServices } from './http_service';

export const StatisticServices = [

'$http', '$rootScope', '$q', 'HttpServices',

  class StatisticServices {
    constructor ($http, $rootScope, $q, HttpServices) {
      this.$http = $http;
      this.$rootScope = $rootScope;
      this.$q = $q;
      this.getGameStatsData = this.getGameStatsData.bind(this);
      this.HttpServices = HttpServices;
      this.totalGamesPlayed = null;
      this.highestPercentComplete = null;
      this.averagePercentComplete = null;
      this.totalWordsCompleted = null;
      this.averageWordsCompleted = null;
      this.totalTimeLevel1 = null;
      this.totalTimeLevel2 = null;
      this.totalTimeLevel3 = null;
      this.totalTimeLevel4 = null;
      this.averageTimeLevel1 = null;
      this.averageTimeLevel2 = null;
      this.averageTimeLevel3 = null;
      this.averageTimeLevel4 = null;
      this.totalTimePlayed = null;
      this.averageGameTime = null;
      this.topMissedWords = [];
    }

    getGameStatsData(){
      this.HttpServices.userDataQueryzz()
      .success(({stats}) =>{

        //HighestPercentCompleted
        let percentArr = [];

        for(let x = 0; x<stats.length; x++){
          percentArr.push(stats[x].percentCompleted);
        }
        console.log('percentArr: ', percentArr);
        //TotalGamesPlayed
        this.totalGamesPlayed = percentArr.length;

        this.highestPercentComplete = (Math.max(...percentArr) *100);

        //AveragePercentCompleted
        let percentSum = percentArr.reduce((a, b) => a + b, 0);

        this.averagePercentComplete =  ((percentSum / this.totalGamesPlayed) *100);

        //Total Time per Level
        //TotalTimeLevel1
        let timeLevelOneArr = [];
        for(let x = 0; x<stats.length; x++){
          timeLevelOneArr.push(stats[x].timeElapsed[0]);
        }

        this.totalTimeLevel1 = timeLevelOneArr.reduce((a, b) => a + b, 0);

        //AverageTimeLevel1
        this.averageTimeLevel1 = (this.totalTimeLevel1 / this.totalGamesPlayed);

        //TotalTimeLevel2
        let timeLevelTwoArr = [];
        for(let x = 0; x<stats.length; x++){
          timeLevelTwoArr.push(stats[x].timeElapsed[1]);
        }

        this.totalTimeLevel2 = timeLevelTwoArr.reduce((a, b) => a + b, 0);

        //AverageTimeLevel2
        this.averageTimeLevel2 = (this.totalTimeLevel2 / this.totalGamesPlayed);

        //TotalTimeLevel3
        let timeLevelThreeArr = [];
        for(let x = 0; x<stats.length; x++){
          timeLevelThreeArr.push(stats[x].timeElapsed[2]);
        }

        this.totalTimeLevel3 = timeLevelThreeArr.reduce((a, b) => a + b, 0);

        //AverageTimeLevel3
        this.averageTimeLevel3 = (this.totalTimeLevel3 / this.totalGamesPlayed);

        //AverageTimeLevel2
        this.averageTimeLevel2 = (this.totalTimeLevel2 / this.totalGamesPlayed);

        //TotalTimeLevel4
        let timeLevelFourArr = [];
        for(let x = 0; x<stats.length; x++){
          timeLevelFourArr.push(stats[x].timeElapsed[3]);
        }

        this.totalTimeLevel4 = timeLevelFourArr.reduce((a, b) => a + b, 0);


        //AverageTimeLevel4
        this.averageTimeLevel4 = (this.totalTimeLevel4 / this.totalGamesPlayed);

        //TotalGameTime
        this.totalTimePlayed = this.totalTimeLevel1 + this.totalTimeLevel2 + this.totalTimeLevel3 + this.totalTimeLevel4;

        //Top missSpelled words
        //Combines all the word Objects misspelled into a single array
        let combinedMisspelledArr = [];
        for(let x = 0; x<stats.length; x++){
          combinedMisspelledArr.push(stats[x].misspelledWords);
        }

        //breaks each object containing words into a single array
        let word = [];
        combinedMisspelledArr.forEach(function(x) {
          word = word.concat(x);
        });

         //Trim out the white spacing from data set
        let trimmedWordSet = word.map(entry => entry.trim());


        let count = {};

        trimmedWordSet.forEach((word) => {
          if (!count.hasOwnProperty(word)){
            count[word] = 0;
          }
          count[word] += 1;
        });


        let highestCount = 0;
        for (let word in count) {
          if ( count[word] > highestCount ){
            this.topMissedWords = [];
            highestCount = count[word];
            this.topMissedWords.push(word);
          }else if( count[word] === highestCount ){
            this.topMissedWords.push(word);
          }
        }
      });
    }
  }
];