// The front end P5 js
// render a svg of uk
var myCanvas;
var britImg;
var map;

function setup(){
  myCanvas = createCanvas(windowWidth, 700);
  myCanvas.parent('myContainer');
  background(0, 26, 51);

  britImg = loadImage("static/data/britGrid2.svg");

  createImg("static/data/britGrid2.svg");

  /* would be good if we could manipulate it as an svg
  maybe this could help:
  <object type="image/svg+xml" data="green-circle.svg" 
  width="64" height="64" border="1"></object>

  */

}

function draw(){
  background(0, 26, 51);
  image(britImg,0, 0, 300, 600);


}

/* this was giving errors
/////////////////////////////////////////////////////////////
// Javascript only: resizes the canvas
// when browser window is resized
function windowResized() {
  resizeCanvas(windowWidth, 700);
}
*/