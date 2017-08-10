/**
 * Created by Daniel on 7/27/17.
 */
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x, y, ypos, ybot;


function checkBotPos() {
    x = w.innerWidth || e.clientWidth || g.clientWidth;
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    ypos = w.scrollY;
    return ypos + y - 200;

}

var data;

d3.csv("data/scroll_interp.csv", function(d){
    data = d;

    function updatePixelCount() {
        var pos = checkBotPos();
        document.getElementById('counterright').innerHTML = pos.toString() + " px";
        if (pos > 3000) {
            document.getElementById('counterleft').innerHTML = data[3000].percent.toString() + " % readers";
        } else if (pos < 0) {
            document.getElementById('counterleft').innerHTML = data[0].percent.toString() + " % readers";
        } else {
            document.getElementById('counterleft').innerHTML = data[pos].percent.toString() + " % readers";
        }
    }

    updatePixelCount();

    $( window ).resize(function() {
        updatePixelCount();
    });
    $( window ).scroll(function() {
        updatePixelCount();
    });

    console.log(data);
});
