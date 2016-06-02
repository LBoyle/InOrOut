var numOfBalls = 100;
var recoveryRate = 3;
var deathLikelyhood = 1;
var posX = [];
var posY = [];
var directionX = [];
var directionY = [];
var radius = [];
var diamArray = [];
var ballState = [];
var ballAlive = [];

var ballsDeadCounter=0;
var ballsSickCounter=0;
var ballsHealthyCounter=numOfBalls;
var ballsAliveCounter=numOfBalls;

// DOM elements ////////////////
var recoveryRateSlider;
var recoveryRateHeader;
var deathLikelyhoodSlider;
var deathLikelyhoodHeader;
var populationSizeInput;
var populationSizeHeader;
var diseaseNameInput;
var diseaseName = "disease";
var diseaseNameSpan;
var submitButton;
////////////////////////////////

function setup() {
  myCanvas = createCanvas(document.getElementById('myContainer').clientWidth, 400);
  myCanvas.parent('myContainer');

  
  // DOM stuff ////////////////////////////////////
  // INSERT YOUR CODE HERE

  recoveryRateHeader = createSpan(recoveryRateSpan);
  recoveryRateHeader.parent('recoveryRateSpan');

  deathLikelyhoodHeader = createSpan(deathLikelyhoodSpan);
  deathLikelyhoodHeader.parent('deathLikelyhoodSpan');

  diseaseNameInput = createInput(diseaseName);
  diseaseNameInput.parent('diseaseName');

  populationSizeInput = createInput(numOfBalls);
  populationSizeInput.parent('populationSize');

  diseaseNameSpan = createSpan(diseaseName);
  diseaseNameSpan.parent('diseaseNameSpan');

  submitButton = createButton("Infect");
  submitButton.mousePressed(initializePopulation);
  submitButton.parent('submitParams');

  recoveryRateSlider = createSlider(0,10,3);
  recoveryRateSlider.parent('recoveryRate');

  deathLikelyhoodSlider = createSlider(0,30,1);
  deathLikelyhoodSlider.parent('deathLikelyhood');

  peopleAlive = createSpan(peopleAlive);
  peopleAlive.parent('peopleAlive');

  peopleDead = createSpan(peopleDead);
  peopleDead.parent('peopleDead');

  peopleHealthy = createSpan(peopleHealthy);
  peopleHealthy.parent('peopleHealthy');

  peopleSick = createSpan(peopleSick);
  peopleSick.parent('peopleSick');

  //////////////////////////////////////////////////

  stroke(0);
  initializePopulation();
}

function initializePopulation()
{
  for (var i=0; i<numOfBalls; i++)
  {
    directionX[i] = random(-5, 5);
    directionY[i] = random(-5, 5);
    diamArray[i] = random(10, 60);
    posX[i] = random(0+diamArray[i]/2, width-diamArray[i]/2);
    posY[i] = random(0+diamArray[i]/2, height-diamArray[i]/2);
    ballState[i] = 255;
    ballAlive[i] = true;
  }
  
  //DOM STUFF //////////////////////////
  // uncomment this area once you have finished the previous step
  diseaseName = diseaseNameInput.value();
  numOfBalls = populationSizeInput.value();

  recoveryRate = recoveryRateSlider.value()
  deathLikelyhood = deathLikelyhoodSlider.value();


  diseaseNameSpan.html(diseaseName);
  

  // recoveryRateHeader.html(recoveryRate);
  //////////////////////////////////////
}

function draw()
{
  background(255,0,255);
  
  drawBalls();
  moveBalls();
  bounceBall();
  ballBallInteraction();
  ballUserInteraction(mouseX, mouseY);
  recoverBalls();
  calculateStatistics();

  // DOM STUFF /////////////////////
  //INSERT YOUR CODE HERE

  // recoveryRateHeader.html(recoveryRateSlider.value());
  recoveryRateHeader.html(recoveryRate);
  deathLikelyhoodHeader.html(deathLikelyhood);

  peopleAlive.html(ballsAliveCounter);
  peopleDead.html(ballsDeadCounter);
  peopleHealthy.html(ballsHealthyCounter);
  peopleSick.html(ballsSickCounter);


  //////////////////////////////////  
}

function drawBalls()
{
  for (var i=0; i<numOfBalls; i++)
  {
    if (ballAlive[i])
    {
      fill(ballState[i]); 
      ellipse(posX[i], posY[i], diamArray[i], diamArray[i]);
    }
  }
}

function moveBalls()
{
  for (var i=0; i<numOfBalls; i++)
  {
    if (ballAlive[i])
    {
    posX[i] = posX[i] + directionX[i];
    posY[i] = posY[i] + directionY[i];
  }
  }
}

function bounceBall()
{
  for (var i=0; i<numOfBalls; i++)
  {
    if (ballAlive[i])
    {
      if (( posX[i] > width-diamArray[i]/2) || (posX[i] < 0+diamArray[i]/2))
      {
        directionX[i] = directionX[i] * -1;
      }
      if ((posY[i] > height-diamArray[i]/2) || (posY[i] < 0+diamArray[i]/2))
      {
        directionY[i] = directionY[i] * -1;
      }
    }
  }
}

function ballUserInteraction(x, y)
{
  for (var i=0; i<numOfBalls; i++)
  {
    if (ballAlive[i])
    {
    if (dist(x, y, posX[i], posY[i]) < diamArray[i]/2.0 && mouseIsPressed)
    {
      ballState[i] = 0;
    }
    }
  }
}

function ballBallInteraction()
{
  for (var i=0; i<numOfBalls; i++)
  {
    for (var j=0; j<numOfBalls; j++)
    {
      if (dist(posX[i], posY[i], posX[j], posY[j])<(diamArray[i]/2+diamArray[j]/2))
      {
        if ((ballState[i] < 255 || ballState[j] < 255) && i!=j && ballAlive[i] && ballAlive[j])
        {
          ballState[i] = 0;
          ballState[j] = 0;
        }
      }
    }
  }
}

function recoverBalls()
{
  for (var i=0; i<numOfBalls; i++)
  {
    if (ballAlive[i])
    {
    ballState[i] = ballState[i] + recoveryRate;
    ballState[i] = constrain(ballState[i], 0, 255);
    if (ballState[i]<255 && random(1000)<deathLikelyhood) ballAlive[i]=false;
    }
  }
}

/////////////////////////////////////////////////////////////
// Javascript only: resizes the canvas
// when browser window is resized
function windowResized() {
  resizeCanvas(getElement('myContainer').width, 400);
}

// added this in order to calculate number
// of dead and alive people for the sake of the exercise
function calculateStatistics() {
  
  ballsSickCounter = 0;
  ballsDeadCounter = 0;
  
  for (var i=0; i<numOfBalls; i++)
  {
    if (ballAlive[i]==false)
    {
    ballsDeadCounter++;
    }
    else if (ballState[i]<255)
    {
    ballsSickCounter++;
  }
  }
  ballsHealthyCounter = ballsAliveCounter - ballsSickCounter;
  ballsAliveCounter = numOfBalls - ballsDeadCounter;
}