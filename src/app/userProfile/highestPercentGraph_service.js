const d3 = require('d3')
import { HttpServices } from './http_service';

export const HighPercentGraphServices = [

 'HttpServices',

  class HighPercentGraphServices {
    constructor (HttpServices) {
      'ngInject';
      this.HttpServices = HttpServices;
    }

    getGraphData(){
      this.HttpServices.userDataQuery()
      .success(({recentGames}) =>{
        if (recentGames.recentGamesPercent.length !== 0) {
          //Set data for graphs
          let recentPercentComplete = recentGames.recentGamesPercent

          var margin = {
            top: 10,
            right: 20,
            bottom: 30,
            left: 60
          },
          width = 600 - margin.left - margin.right,
          height = 300 - margin.top - margin.bottom;

          // Set the ranges
          var x = d3.scale.linear().range([0, width]);
          var y = d3.scale.linear().range([height, 0]);

          if(recentPercentComplete){

            let tix = recentPercentComplete.length - 1;
            if(tix > 5) {
              tix = 5;
            }

            // Define the axes
            var xAxis = d3.svg.axis()
              .scale(x)
              .orient('bottom')
              .ticks(tix);

            var yAxis = d3.svg.axis()
              .scale(y)
              .orient('left')
              .ticks(tix, "%");

            // Define the line
            var valueline = d3.svg.line()
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
            .attr("d", valueline(recentPercentComplete));

           // Add the X Axis
           svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

           // Add the Y Axis
           svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 5)
            .attr("x", 0 - (height/2) - 15)
            .attr("dy","0.6em")
            .attr("text-anchor", "start")
            .text("Percent Completed")
          }
        }
      });
    }
  }

];