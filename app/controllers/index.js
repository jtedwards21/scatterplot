
var addr = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json"

var margins = {
"top": 50,
"left": 60,
"bottom": 50,
"right": 30
}

var height = 700 - margins.top - margins.bottom;
var width = 700 - margins.left - margins.right;


//Set size of svg element
d3.select("svg")
.attr("height", height + margins.top + margins.bottom)
.attr("width", width + margins.left + margins.right)



d3.json(addr, function(data){

var maxRank = d3.max(data, function(d){return d.Place})
var maxTime = d3.max(data, function(d){return d.Seconds})
var minTime = d3.min(data, function(d){return d.Seconds})
var xScale = d3.scaleLinear().domain([maxTime, minTime]).range([0,width])
var yScale = d3.scaleLinear().domain([maxRank, 0]).range([height, 0])
var radius = 5;

//I've not changed the dimensions of 'barchart'

//Append and Adjust Parent Element


d3.select("svg")
.append("g")
.attr("id", "containerG")
.attr("transform", "translate(" + margins.left + "," + margins.top + ")")

var yAxis = d3.axisLeft().scale(yScale).tickSize(0)
d3.select("#containerG").append("g").attr("id", "yAxisG").attr("transform", "translate(-20,0)").call(yAxis)

//Append Label?
.append("text")
  .attr("x", 0)
  .attr("y", -35)
  .attr("dy", ".35em")
  .style("text-anchor", "end")
  .attr("transform", "rotate(-90)")
  .text("Ranking");

var xAxis = d3.axisBottom().scale(xScale).tickSize(0)
d3.select("#containerG").append("g").attr("id", "xAxisG").attr("transform", "translate(0," + (height + 20) + ")").call(xAxis);



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


var div= d3.select("#box").append("div")
.attr("class", "tooltip")
.style("opacity", 0)

var pointsG = d3.selectAll("g.overallG")

pointsG
.append("text")
.text(function(d){
  return d.Name;
})
.attr("x", function(d){return xScale(d.Seconds) + 10})
.attr("y", function(d) {return yScale(d.Place) + 5})

pointsG
.append("circle")
.attr("r", radius)
.attr("cx", function(d, i){return xScale(d.Seconds)})
.attr("cy", function(d) {return yScale(d.Place)})
.style("fill", function(d){
  if(d.Doping == ""){
    return "#01CFAF";
  } else {
    return "#DC5038";
  }
})
.style("stroke-width", "3px")
.style("stroke", function(d){
  if(d.Doping == ""){
    return "#01CFAF";
  } else {
    return "#DC5038";
  }
})
//Code for tooltip
.on("mouseover", function(d){
var rect = d3.select(this);
rect.attr("class", "mouseover")
var name = d.Name;
var year = d.Year;
var nationality = d.Nationality;
var doping = d.Doping;
var url = d.URL;
var place = d.Place;
var raceTime = d.Time;
div.style("opacity", .9)
div.html("<span class='name'>" + name + "</span><br><span class='year'>" + year + "</span><br><span class='nationality'>" + nationality + "</span><br><a href='"+ url + "'>" + doping + "</a>")
.style("left", (d3.event.pageX + 5) + "px")
.style("top", (d3.event.pageY - 50) + "px");

})

//Turn off the tooltip

.on("mouseleave", function(d){
var rect = d3.select(this);
rect.attr("class", "mouseleave");
div.style("opacity", 0);

})

})
