export const GraphStatsServices = [

'$http', '$rootScope',

class GraphStatsServices {
  constructor($http, $rootScope){
    this.$http = $http;
    this.$rootScope = $rootScope;



  }

  c3Chart(percentComplete){
    console.log('percentComplete: ', percentComplete);
    var chart = c3.generate({
    bindto: '#chart',
    data: {
        columns: [
            ['data1', 30, 200, 100, 400, 150, 250],
            [percentComplete]
        ]
    }
    });
  }

  graphData(foo){


    // Parse the date / time
    // var parseDate = d3.time.format("%d-%b-%y").parse;




    if(foo){
      // var p = d3.select(".totalGamesPlayed").selectAll("p")

      var margin = {top: 30, right: 20, bottom: 30, left: 50},
      width = 600 - margin.left - margin.right,
      height = 270 - margin.top - margin.bottom;
      // Set the ranges
      var y = d3.time.scale().range([0, width]);
      var x = d3.scale.linear().range([height, 0]);

      // Define the axes
      var xAxis = d3.svg.axis().scale(y)
          .orient("bottom").ticks(10);

      var yAxis = d3.svg.axis().scale(x)
          .orient("right").ticks(10);

      // Define the line
      var valueline = d3.svg.line()
        .y(function(d) {return  x(d)})
        .x(function(d, i) { return y(i)});


      // Adds the svg canvas
      var svg = d3.select(".totalGamesPlayed")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");
      x.domain(d3.extent(foo, function(d) { return d; }));
      y.domain([0, d3.max(foo, function(d, i) { return i; })]);

      // Add the valueline path.
      svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(foo));

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
}];


