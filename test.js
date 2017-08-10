// SVG Size
var width = 3000,
    height = 3000;


// Load CSV file
d3.csv("data/scroll_interp.csv", function(data){

    // Convert value types
    data.forEach(function(point) {
        point.pixel = +point.pixel;
        point.percent = +point.percent;
    });

    console.log(data);

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

//        var x = d3.scale.linear()
//            .domain([0,100])
//            .range([0, width]);
//        var y = d3.scale.linear()
//            .range([height, 0]);
    var x = d3.scale.linear()
        .domain([0,100])
        .range([width, 0]);
    var y = d3.scale.linear()
        .domain([0,3000])
        .range([0,height]);

    var area = d3.svg.area()
        .x(function(d) {
            return y(d.pixel);
        })
        .y0(height)
        .y1(function(d) {
            return x(d.percent);
        });

    var path = svg.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area)
        .attr("fill","pink");

    var line = d3.svg.line()
        .x(function(d) { return y(d.pixel); })
        .y(function(d) { return x(d.percent); });

    var linepath = svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line)
        .attr("fill","none")
        .attr("stroke","red")
        .attr("stroke-width","5");

    //Container for the gradients
    var defs = svg.append("defs");

    //Filter for the outside glow
    var filter = defs.append("filter")
        .attr("id","glow");
    filter.append("feGaussianBlur")
        .attr("stdDeviation","3.5")
        .attr("result","coloredBlur");
    var feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode")
        .attr("in","coloredBlur");
    feMerge.append("feMergeNode")
        .attr("in","SourceGraphic");

    svg.selectAll(".line", "url(#glow)");


});

d3.select('#dl').on('click', function() {
    var config = {
        filename: 'customFileName',
    }
    d3_save_svg.save(d3.select('svg').node(), config);
});