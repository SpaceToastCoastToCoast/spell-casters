export const GraphStatsServices = [

'$http', '$rootScope',

class GraphStatsServices {
  constructor($http, $rootScope){
    this.$http = $http;
    this.$rootScope = $rootScope;
  }

  setCurrentData(recentGames, allstats){

    //Set data for graphs
    let recentPercentComplete = [];
    let totalWords = [];

    for(let x = 0; x<recentGames.length; x++){
      recentPercentComplete.push(recentGames[x].percentCompleted);
    }

    for(let x = 0; x<allstats.length; x++){
      totalWords.push(allstats[x].totalWordsCompleted);
    }

    return this.graphData(recentPercentComplete), this.totalWordsGraph(totalWords);
  }

  graphData(recentPercentComplete){

    var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

    // Set the ranges
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    if(recentPercentComplete){
      // var p = d3.select(".totalGamesPlayed").selectAll("p")

      // Define the axes
      var xAxis = d3.axisBottom().scale(x)
        .ticks(5);

      var yAxis = d3.axisLeft().scale(y)
        .ticks(5);

      // Define the line
      var valueline = d3.line()
        .x(function(d, i) {return  x(i)})
        .y(function(d) { return y(d); });

      // Adds the svg canvas
      var svg = d3.select(".totalGamesPlayed")
        .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

     // Scale the range of the data
     x.domain(d3.extent(recentPercentComplete, function(d, i) { return i; }));
     y.domain([0, d3.max(recentPercentComplete, function(d) { return d; })]);

     // Add the valueline path.
     svg.append("path")
      .attr("class", "line")
      .attr("d", valueline(recentPercentComplete))
      .style('stroke-width', '3')
      .style('stroke', '#feedba')


     // Add the X Axis
     svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

     // Add the Y Axis
      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    }





  }

  totalWordsGraph(totalWords){
    console.log('totalWords: ', totalWords);

    var svg = d3.select(".totalWords"),
  margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
  },
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom;

// Set the ranges
var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
  y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

if (totalWords) {

  x.domain(totalWords.map(function(d, i) {

    console.log('i.freq: ', i);
    return i;
  }));
  y.domain([0, d3.max(totalWords, function(d) {

    console.log('d.totalWords: ', d);
    return d;
  })]);

  g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y).ticks(20))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 7)
    .attr("dy","0.71em")
    .attr("text-anchor", "end")
    .text("Frequency");

  g.selectAll(".bar")
    .data(totalWords)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d, i) {
      //54
      console.log('i: ', i);
      console.log('x(i): ', x(i));
      return x(i);
    })
    .attr("y", function(d) {

      console.log('d: ', d);
      console.log('y(d): ', y(d));
      return y(d);
    })
    .attr("width", x.bandwidth())
    .attr("height", function(d) {

      console.log('heigh - y(d): ', height + y(d));
      return height - y(d);
    });
}
  }
}];


