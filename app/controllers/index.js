var addr = https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json
var height = 100;
var width = 100;

d3.json(addr, function(data){

var maxRank = d3.max(data, function(d){return d.Place})
var maxTime = d3.max(data, function(d){return d.Seconds})
var xScale = d3.scaleLinear().domain([0, maxTime]).range([0, width])
var yScale = d3.scaleLinear().domain([0, maxRank]).range([0, height])
var radius = 5;


//Order Data by Place
data.sort(function(a, b){
  return a.Place - b.Place
}

//Draw some circles
d3.select("svg")
.selectAll("circle")
.data(data)
.enter()
.append("circle")
.attr("r", radius)
.attr("cx", function(d, i){return xScale(d.Seconds)})
.attr.("cy", function(d) {return height - yScale(d.Place)})


})
