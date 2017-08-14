/**
 * Created by Daniel on 7/27/17.
 */
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x, y, ypos, ybot;

checkWinStat()

function checkWinStat() {
    x = w.innerWidth || e.clientWidth || g.clientWidth;
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    ypos = w.scrollY;
}

function checkBotPos() {
    checkWinStat();
    return ypos + y - 300;
}

function updatePixelCount() {
    var pos = checkBotPos();
    document.getElementById('pixels').innerHTML = pos.toString() + "px";
    if (pos > 3000) {
        document.getElementById('percent').innerHTML = data[3000].percent.toString() + "%";
    } else if (pos < 0) {
        document.getElementById('percent').innerHTML = data[0].percent.toString() + "%";
    } else {
        document.getElementById('percent').innerHTML = data[pos].percent.toString() + "%";
    }
}

$( window ).resize(function() {
    updateVis();
});
$( window ).scroll(function() {
    updateVis();
});

var data;
var numPeople; // may scale based on window size
var people = [];
var svg;


queue()
    .defer(d3.csv,"data/scroll_interp.csv")
    .await(initVis);

function initVis(error, d){
    if(error) { console.log(error); }

    data = d;
    data.pixel = +data.pixel;
    data.percent = +data.percent;

    svg = d3.select("#people-vis").append("svg")
        .attr("width", x)
        .attr("height", 200)
    ;

    updateVis();
}

function updateVis() {

    updatePixelCount();

    var pos = checkBotPos();

    var people = [];

    if (x > 800) {
        numPeople = 20;
    } else {
        numPeople = 10;
    }

    for (var i = 0; i < numPeople; i++) {
        var person = {
            active: true
        };
        people.push(person);
    }

    svg.attr("width",x);

    var bg_image = svg.selectAll(".bg-image")
        .data(people);

    // enter
    bg_image.enter()
        .append("image")
        .attr("class", "bg-image");

    // update
    bg_image
        .attr("width", 40)
        .attr("height", 105.507)
        .attr("y", 70)
        .attr("transform", function(d, i) {
            return "translate(" + ((x / (numPeople + 6)) * (i + 3) - 20) + "," + "0" + ")";
        })
        .attr("xlink:href", "img/grayperson.svg")
        ;

    // exit
    bg_image.exit()
        .remove();


    var image = svg.selectAll(".image")
        .data(people);

    // enter
    image.enter()
        .append("image")
        .attr("class", "image")
        .attr("y", 70)
        .attr("width", 40)
        .attr("height", 105.507)
        .attr("xlink:href", "img/pinkperson.svg")
    ;

    // update
    image
        .attr("transform", function(d, i) {
            return "translate(" + ((x / (numPeople + 6)) * (i + 3) - 20) + "," + "0" + ")";
        })
        .transition(100)
        .attr("opacity", function(d,i) {
            if (pos > 3000) {
                return 0;
            } else if (i < Math.round(data[pos].percent * numPeople / 100)) {
                return 1;
            } else {
                return 0;
            }
        });

    // exit
    image.exit()
        .remove();


}
