export const BubbleChartDataServices = [
'$q',

class BubbleChartDataServices {
  constructor($q){
    this.sortedWords =[];
    this.$q = $q;
    this.makingDataSets = this.makingDataSets.bind(this);
  }
  //url: `/api/game-stats/${this.$rootScope.user}`
  makingDataSets(response) {
    //console.log('response.data', response.data);
    let combinedMisspelledArr = [];
    for(let x = 0; x<response.data.stats.length; x++){
      combinedMisspelledArr.push(response.data.stats[x].misspelledWords);
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
    // eof BBs UserProfileService

    // transform count {} into sorted [{},{}...
    function sortingWords (objWord) {
      let misspWords = []
      let counter = 10;
      for (var key in objWord) {
        if (counter > 0) {
          let oneWord = {};
          oneWord.word = key ;
          oneWord.count = objWord[key];
          misspWords.push(oneWord)
          counter --;
        }
      }
      // sorting misspWords2
      function quickSort(array){
        if (array.length <= 1) {
          return array;
        }
        let pivot = array.shift();
        let left = array.filter(element => {
          return element.count >= pivot.count;
        });
        let right = array.filter(element => {
          return element.count < pivot.count;
        });
        return quickSort(left).concat(pivot, quickSort(right));
      }
      return quickSort(misspWords);
    }

    this.sortedWords = sortingWords(count)
    console.log('this.sortedWords', this.sortedWords)

    return this.$q((resolve,reject) => {
      resolve(this.sortedWords)
    });

  }
}];

