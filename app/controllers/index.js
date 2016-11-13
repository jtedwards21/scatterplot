var addr = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
var height = 100;
var width = 700;

d3.json(addr, function(data){

var maxRank = d3.max(data, function(d){return d.Place})
var maxTime = d3.max(data, function(d){return d.Seconds})
var minTime = d3.min(data, function(d){return d.Seconds})
var xScale = d3.scaleLinear().domain([minTime, maxTime]).range([0, 300])
var yScale = d3.scaleLinear().domain([0, maxRank]).range([0, height])
var radius = 1;

var yAxis = d3.axisRight().scale(yScale)
//var yAxis = d3.svg.axis().scale(yScale.orient("right"));
d3.select("svg").append("g").attr("id", "yAxisG").call(yAxis);

var xAxis = d3.axisBottom().scale(xScale);
d3.select("svg").append("g").attr("id", "xAxisG").attr("transform", "translate(0," + height + ")").call(xAxis);


//Order Data by Place
data.sort(function(a, b){
  return a.Place - b.Place
})

//Draw some circles
d3.select("svg")
.selectAll("circle")
.data(data)
.enter()
.append("circle")
.attr("r", radius)
.attr("cx", function(d, i){return xScale(d.Seconds)})
.attr("cy", function(d) {return height - yScale(d.Place)})


})
