export const GameChartsServices = [

'$http',

class GameChartsServices {
  constructor($http){
    this.$http = $http;
    this.userDataQuery = this.userDataQuery.bind(this);
    this.sortedWords =[];

  }

//url: `/api/game-stats/${this.$rootScope.user}`
  userDataQuery() {
    const req = {
      method: 'GET',
      url: `/api/game-stats/John`,
    };
    return this.$http(req)
      .success(response => {
        //console.log('response.stats', response.stats);

        //Top missSpelled words
        //Combines all the word Objects misspelled into a single array
        let combinedMisspelledArr = [];
        for(let x = 0; x<response.stats.length; x++){
          combinedMisspelledArr.push(response.stats[x].misspelledWords);
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

        // transform count into sorted [{},{}...]

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
          console.log('misspWords', misspWords)
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

        //bubble chart
        const diameter = 400 //max size of the bubbles
        const colorArr = [ '#f9d5e5', '#eeac99', '#e06377',
                      '#c83349', '#5b9aa0', '#d6d4e0',
                      '#b8a9c9', '#622569', '#ffcc5c', '#ff6f69']
        const scaler = 5;
        const textColor = 'black'
        const textFont = 'monospace';
        const textSize = '15px';
        const legendColorBox = 20;
        const spacingBetweenLegend = 30;

        var svg = d3.select('#bubble-chart').append('svg')
          .attr('width',diameter+200)
          .attr('height',diameter)

        var bubble = d3.layout.pack()
          .size([diameter,diameter])
          .value(function(d) {
            return d.count;})
          .padding(1.5);

        var nodes = bubble.nodes(processData(this.sortedWords))
          .filter(function(d) {return !d.children;});

        var nodeLegend = bubble.nodes(processData(this.sortedWords))
          .filter(function(d) {return !d.children});

        var vis = svg.selectAll('circle')
          .data(nodes)
          .enter()
          .append('circle')
            .attr('transform', function(d) {
            return `translate(${d.x},${d.y})`;
            })
            .attr('r', function(d) {return d.count * scaler})
            .attr('class', function(d) {
            return d.className;
            })
            .style('fill', function(d) {
            return colorArr[d.colorIndex];
            })

        var legend = d3.select('svg')
          .append('g')
            .attr('class', 'legend')
          .selectAll('g')
          .data(nodeLegend)
          .enter()
          .append('g')
            .attr('transform', function(d) {
              return `translate(${450},${spacingBetweenLegend*d.colorIndex})`
            })

        legend.append('rect')
          .attr('width',legendColorBox)
          .attr('height',legendColorBox)
          .style('fill', function(d) {
            return colorArr[d.colorIndex];
          })

        legend.append('text')
          .attr('y','1em')
          .attr('x', legendColorBox + 5)
          .text(function(d) {
            return `${d.count} ${d.word}`
          })
          .style('fill',textColor)
          .style('font-family', textFont)
          .style('font-size',textSize)



        function processData(data) {
          data = data.map((wordObj, index) =>{
            wordObj.colorIndex = index;
            return wordObj;
          })
          return {children: data};
        }


        return;
    });

  }


}
];