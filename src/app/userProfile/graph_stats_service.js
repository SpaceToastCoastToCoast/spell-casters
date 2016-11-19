export const GraphStatsServices = [

'$http', '$rootScope',

class GraphStatsServices {
  constructor($http, $rootScope){
    this.$http = $http;
    this.$rootScope = $rootScope;



  }

  graphData(foo){

    var margin = {top: 30, right: 20, bottom: 30, left: 50},
      width = 600 - margin.left - margin.right,
      height = 270 - margin.top - margin.bottom;
    // Parse the date / time
    var parseDate = d3.time.format("%d-%b-%y").parse;

    // Set the ranges
    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    // Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(5);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);
    if(foo){
      // var p = d3.select(".totalGamesPlayed").selectAll("p")


      // Define the line
      var valueline = d3.svg.line()
        .y(function(d) {return  x(d)})
        .x(function(d, i) { return y(i); });

      // Adds the svg canvas
      var svg = d3.select(".totalGamesPlayed")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");
      y.domain(d3.extent(foo, function(d) { return d; }));
      x.domain([0, d3.max(foo, function(d, i) { return i; })]);

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


