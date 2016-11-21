import { HttpServices } from './http_service';

export const totalWordsGraphServices =[
  'HttpServices',

  class totalWordsGraphServices {
    constructor(HttpServices) {
      this.HttpServices = HttpServices;
    }

    getGraphData(){
      this.HttpServices.userDataQueryzz()
      .success(({stats}) =>{

        let totalWords = [];

        for(let x = 0; x<stats.length; x++){
          totalWords.push(stats[x].totalWordsCompleted);
        }
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

          x.domain(totalWords.map(function(d, i) { return i; }));
          y.domain([0, d3.max(totalWords, function(d) { return d; })]);

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
            .attr("x", function(d, i) { return x(i); })
            .attr("y", function(d) { return y(d); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return height - y(d); });
        }
      });
    }
  }
];