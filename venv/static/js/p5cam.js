var capture;
var w;
var h;
var btn1 = false;
var btn2 = false;
var btn3 = false;

function setup() {
    w = document.getElementById('myContainer').clientWidth;
    h = w * (10 / 16);              // 16:10 camera aspect?
    myCanvas = createCanvas(w, h);
    myCanvas.parent('myContainer');
    stroke(0);

    capture = createCapture(VIDEO);
    capture.size(w, h);
    capture.hide();             // Stop the raw capture appearing too.
}

function draw() {
  if(!btn1 && !btn2 && !btn3){
    background(0);
    image(capture, 0, 0, w, h);
  }else{
    if(btn1){
      background(0);
      image(capture, 0, 0, w, h);
      filter(INVERT);
    }
    if(btn2){
      background(0);
      var thisw = w/3;
      var thish = h/3;
      image(capture, 0, 0, thisw, thish);
      image(capture, 0, thish, thisw, thish);
      image(capture, 0, h-thish, thisw, thish);
      image(capture, thisw, 0, thisw, thish);
      image(capture, thisw, thish, thisw, thish);
      image(capture, thisw, h-thish, thisw, thish);
      image(capture, w-thisw, 0, thisw, thish);
      image(capture, w-thisw, thish, thisw, thish);
      image(capture, w-thisw, h-thish, thisw, thish);
      if(btn1){
        filter(INVERT);
      }
      // replace with a for loop
    }
    if(btn3){
      background(0);
      var images = [];
      for(var i; i<10; i++){
        var temp = str("capture, "+(0+(10*i))+", "+(0+(10*i))+", "+(w-(10*i))+", "+(h-(10*i)));
        images[i] = temp;
        
        // still doesn't work
      }
      for(var i; i<10; i++){
        image(images[i]);
      }

      if(btn1){
        filter(INVERT);
      }
    }

  }
}

$('#btn1').click(function(){
    btn1 = !btn1;
}) 
$('#btn2').click(function(){
    btn2 = !btn2;
});
$('#btn3').click(function(){
    btn3 = !btn3;
});
