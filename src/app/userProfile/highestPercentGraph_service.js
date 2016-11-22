import { HttpServices } from './http_service';

export const HighPercentGraphServices = [

 'HttpServices',

  class HighPercentGraphServices {
    constructor (HttpServices) {
      this.HttpServices = HttpServices;
    }

    getGraphData(){
      this.HttpServices.userDataQuery()
      .success(({recentGames}) =>{

        //Set data for graphs
        let recentPercentComplete = recentGames.recentGamesPercent;


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
          .attr("d", valueline(recentPercentComplete));

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


      });
    }
  }

];