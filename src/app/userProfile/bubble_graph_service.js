const d3 = require('d3')

export const BubbleGraphService = [

class BubbleGraphService {
  constructor(){}

  drawingBubbleChart (sortedWords) {
    const diameter = 400
    const colorArr = [ '#9CCBC5', '#64A39A', '#3F897F',
                  '#247267', '#105A50', '#904A19',
                  '#B66D3A', '#FFC59C', '#FFDCC4', '#b1695a']
    const maxBubbleRadius = 48;
    const textColor = 'black'
    const textFont = 'monospace';
    const textSize = '15px';
    const smallerTextSize = '13px';
    const legendColorBox = 20;
    const spacingBetweenLegend = 30;
    const highestCount = sortedWords[0].count;

    var svg = d3.select('#bubble-chart').append('svg')
      .attr("id", "bubble-svg")
      .attr('width',diameter+200)
      .attr('height',diameter)

    var bubble = d3.layout.pack()
      .size([diameter,diameter])
      .value(function(d) {
        return d.count
      ;})
      .padding(1.5);

    var nodes = bubble.nodes(processData(sortedWords))
      .filter(function(d) {return !d.children;});

    var nodeLegend = bubble.nodes(processData(sortedWords))
      .filter(function(d) {return !d.children});

    var vis = svg.selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
        .attr('class', 'circle')
        .attr('transform', function(d) {
          return `translate(${d.x},${d.y})`;
        })
        .attr('r', function(d) {
          if (d.count === highestCount) {
            return maxBubbleRadius;
          } else {
            return maxBubbleRadius*((d.count)/highestCount)
          }
        })
        .attr('class', function(d) {
          return d.className;
        })
        .style('fill', function(d) {
          return colorArr[d.colorIndex];
        })
        .append("svg:title")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .text(function(d) { return d.word; })
        .on("mouseover", function(){return title.style("visibility", "visible");})
        .on("mouseout", function(){return title.style("visibility", "hidden");})

    var legend = d3.select('svg#bubble-svg')
      .append('g')
        .attr('class', 'legend')
      .selectAll('g')
      .data(nodeLegend)
      .enter()
      .append('g')
        .attr('class', 'legend')
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
      .style('font-size',function(d) {
        if (d.word.length > 11) {
          return smallerTextSize;
        } else {
          return textSize
        }
      })

    function processData(data) {
      data = data.map((wordObj, index) =>{
        wordObj.colorIndex = index;
        return wordObj;
      })
      return {children: data};
    }
  }
}];