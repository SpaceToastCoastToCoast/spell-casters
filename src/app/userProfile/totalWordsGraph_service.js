const d3 = require('d3')
import { HttpServices } from './http_service';

export const totalWordsGraphServices =[
  'HttpServices',

  class totalWordsGraphServices {
    constructor(HttpServices) {
      'ngInject';
      this.HttpServices = HttpServices;
    }

    getGraphData(){
      this.HttpServices.userDataQuery()
      .success(({recentGames}) =>{
        if (recentGames.recentGamesPercent.length !== 0) {
          let totalWords = recentGames.recentGamesTotalWords

          var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 60
          },
          width = 600 - margin.left - margin.right,
          height = 300 - margin.top - margin.bottom;

          // Set the ranges
          var x = d3.scale.ordinal().rangeRoundBands([0, width],0.1),
            y = d3.scale.linear().range([height, 0]);

          var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom')
            .ticks(10)
            .tickFormat(function(d) {
              return d + 1
            })
          var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left')
            .ticks(10);

          var svg = d3.select(".totalWords")
            .append("svg")
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          if (totalWords) {

            x.domain(totalWords.map(function(d, i) { return i; }));
            y.domain([0, d3.max(totalWords, function(d) { return d; })]);

            svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis)

            svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
              .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 0 - margin.left)
              .attr("x", 0 - (height/2))
              .attr("dy","0.6em")
              .attr("text-anchor", "start")
              .text("Words Completed");

            svg.selectAll(".bar")
              .data(totalWords)
              .enter().append("rect")
              .attr("class", "bar")
              .attr("x", function(d, i) { return x(i); })
              .attr("y", function(d) { return y(d); })
              .attr("width", x.rangeBand())
              .attr("height", function(d) { return height - y(d); })
          }
        }
      });
    }
  }
];