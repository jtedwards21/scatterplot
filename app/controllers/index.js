
var addr = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json"

var margins = {
"top": 50,
"left": 30,
"bottom": 5,
"right": 10
}

var height = 700 - margins.top - margins.bottom;
var width = 500 - margins.left - margins.right;

//Set the height of the box
d3.select(".box")
.attr("height", height + margins.top + margins.bottom)
.attr("width", width + margins.left + margins.right)

//Set size of svg element
d3.select("svg")
.attr("height", height + margins.top + margins.bottom)
.attr("width", width + margins.left + margins.right)



d3.json(addr, function(data){

var maxRank = d3.max(data, function(d){return d.Place})
var maxTime = d3.max(data, function(d){return d.Seconds})
var minTime = d3.min(data, function(d){return d.Seconds})
var xScale = d3.scaleLinear().domain([maxTime, minTime]).range([0,300])
var yScale = d3.scaleLinear().domain([maxRank, 0]).range([height, 0])
var radius = 1;


//Append and Adjust Parent Element
d3.select("svg")
.append("g")
.attr("id", "containerG")
.attr("transform", "translate(" + margins.left + "," + margins.top + ")")

var yAxis = d3.axisLeft().scale(yScale).tickSize(0)
d3.select("#containerG").append("g").attr("id", "yAxisG").attr("transform", "translate(0,0)").call(yAxis);//These transforms should be factor of the size

var xAxis = d3.axisBottom().scale(xScale).tickSize(0)
d3.select("#containerG").append("g").attr("id", "xAxisG").attr("transform", "translate(0," + height + ")").call(xAxis);

//Create a container for the points


d3.select("#containerG")
.append("g")
.attr("id", "pointsG")

d3.select("#pointsG")
.selectAll("g")
.data(data)
.enter()
.append("g")
.attr("class","overallG")


var pointsG = d3.selectAll("g.overallG")

pointsG
.append("circle")
.attr("r", radius)
.attr("cx", function(d, i){return xScale(d.Seconds)})
.attr("cy", function(d) {return yScale(d.Place)})
.style("fill", "black")
.style("stroke-width", "1px")


})
