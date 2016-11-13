var addr = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
var height = 100;
var width = 700;

d3.json(addr, function(data){

var maxRank = d3.max(data, function(d){return d.Place})
var maxTime = d3.max(data, function(d){return d.Seconds})
var minTime = d3.min(data, function(d){return d.Seconds})
var xScale = d3.scaleLinear().domain([maxTime, minTime]).range([0,300])
var yScale = d3.scaleLinear().domain([maxRank, 0]).range([height, 0])
var radius = 1;

var yAxis = d3.axisLeft().scale(yScale).tickSize(0)
d3.select("svg").append("g").attr("id", "yAxisG").attr("transform", "translate(0,0)").call(yAxis);//These transforms should be factor of the size

var xAxis = d3.axisBottom().scale(xScale).tickSize(0)
d3.select("svg").append("g").attr("id", "xAxisG").attr("transform", "translate(0," + height + ")").call(xAxis);

//Append Parent Element
d3.select("svg")
.append("g")
.attr("id", "pointsG")
.attr("transform", "translate(0,0)")
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


//Add the hover attributes
//Add Written Names



})
