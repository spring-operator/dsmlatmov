
function lineplot(data,accid) {
document.getElementById("selectedaccid").value = ""+data[0].account_name;

var selacc = document.getElementById("selectedaccid").value;
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse;

//var x = d3.time.scale()
//    .range([0, width]);
var x =d3.scale.linear()
       .range([0,width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.week_id); })
    .y(function(d) { return y(d.pca_score); });

d3.select("#accdivid").append("h4").html("Risk score time series for user : "+ selacc +"\<br>") 

var svg = d3.select("#accdivid").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//d3.tsv("data.tsv", function(error, data) {
 // if (error) throw error;

  /*data.forEach(function(d) {
    //d.date = parseDate(d.date);
    d.week_id = d.week_id;
    d.pca_score = +d.pca_score;
  });*/

  x.domain([0, d3.max(data, function(d) { return d.week_id; })]);
  y.domain([0, d3.max(data, function(d) { return d.pca_score; })]);



  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
        //.attr("transform", "translate(" + (width) + " ," + (height) + ")")
        .attr("x", width / 2 )
        .attr("y",  height + margin.bottom-5)
        .style("text-anchor", "middle")
        .text("week id");
      
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Risk score");

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line)
      .attr("stroke","steelblue")
      .attr("stroke-width","1.5px");
//});
}