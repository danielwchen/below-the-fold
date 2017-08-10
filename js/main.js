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

function updatePixelCount() {
    document.getElementById('pixel-counter').innerHTML = checkBotPos().toString() + " px";
}

updatePixelCount();

$( window ).resize(function() {
    updatePixelCount();
});
$( window ).scroll(function() {
    updatePixelCount();
});

