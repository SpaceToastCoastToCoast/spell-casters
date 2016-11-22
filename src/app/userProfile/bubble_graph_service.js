export const BubbleGraphService = [
  'HttpServices',

class BubbleGraphService {
  constructor(HttpServices){

    this.HttpServices = HttpServices
  }

  drawingBubbleChart (sortedWords) {
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
  }

}];