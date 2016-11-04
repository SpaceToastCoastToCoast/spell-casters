const {base_spells, sat_words} = require('./spellcasters_dataset');

//words per level
const randomDatasetLength = 5;
//full datasets
const easy = []
const medium = []
const hard = []
const SAT = []

//used to create full datasets, higher syllable count = higher level
function syllable_count(word) {
  word = word.toLowerCase();                                     //word.downcase!
  if(word.length <= 3) { return 1; }                             //return 1 if word.length <= 3
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');   //word.sub!(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
  word = word.replace(/^y/, '');                                 //word.sub!(/^y/, '')
  return word.match(/[aeiouy]{1,2}/g).length;                    //word.scan(/[aeiouy]{1,2}/).size
}

//initialize full datasets
(function () {
  for (var word in base_spells) {
    if (syllable_count(word) > 3) {
      hard.push(word)
    } else if (syllable_count(word) > 2) {
      medium.push(word)
    } else {
      easy.push(word)
    }
  }

  for (var word in sat_words) {
    SAT.push(word)
  }
})();

function getRandomWords(arr) {
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



module.exports = {
  lvl1Words: getRandomWords(easy),
  lvl2Words: getRandomWords(medium),
  lvl3Words: getRandomWords(hard),
  lvl4Words: getRandomWords(SAT)
}