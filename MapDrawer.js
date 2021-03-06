var width = 600,
        height = 600;

var projection = d3.geo.equirectangular()
        .scale(2000)
        .translate([width / 2, height / 2])
        .rotate([-174.7772, +41.2889]);

var path = d3.geo.path()
    .projection(projection)
    .pointRadius(2);

var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);

var index = 0;
//NOTE: there is no 11 D: 8+13 = the same thing bruh
//subunit -> wikipedia index
var map1 =[15, 12, 14, 13, 9, 10, 11, 0, 1, 2, 3, 5, 4, 6, 7, 8, 15];
//wikipedia index -> trademe index
var map2 =  [9, 1, 14, 2, 4, 5, 12, 6, 15, 8, 8, 7, 16, 3, 10, 11];
var reg = topojson.feature(nz, nz.objects['nz-regions'])


svg.selectAll(".subunit")
    .data(reg.features)
  .enter().append("path")
    .attr("class", function(d) { return "subunit " + map2[map1[index++]]; })
    .attr("d", path)

$(".subunit").click(function(e) {
  var id = e.currentTarget.className.baseVal.split(" ")[1];
  //document.getElementById("info")=id;
});

refreshAllData();

//country labels things
/*svg.selectAll(".subunit-label")
    .data(subunits.features)
  .enter().append("text")
    .attr("class", function(d) { return "subunit-label " + d.id; })
    .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
    .attr("dy", ".35em")
    .text(function(d) { return d.properties.name; });*/

//dots
/*svg.append("path")
    .datum(places)
    .attr("d", path)
    .attr("class", "place");*/


/*svg.selectAll(".place-label")
    .data(places.features)
  .enter().append("text")
    .attr("class", "place-label")
    .attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")"; })
    .attr("x", function(d) { return d.geometry.coordinates[0] > -1 ? 6 : -6; })
    .attr("dy", ".35em")
    .style("text-anchor", function(d) { return d.geometry.coordinates[0] > -1 ? "start" : "end"; })
    .text(function(d) { return d.properties.name; });*/
