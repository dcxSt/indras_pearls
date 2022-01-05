let balls = []; // an array of ball objects, created on click


function setup() {
  createCanvas(400, 400);
  time = 0;
  xtest = 30;
  ytest = 20;
  // tests 
  console.log(t1([xtest,ytest]));
  console.log(r([xtest,ytest]));
  console.log(rinv(r([xtest,ytest])));
  [a,b] = t1([4,5]);
  console.log(a);
  console.log(b);
}

function draw() {
  time ++; // this variable counts frames, I think 60fps
  background(0);
  fill(200,160,255,255);
  circle(200,200,60 + 5*sin(time/70)); // test
  fill(160,255,200,255);
  circle(200,200,40 + 25*sin(time/70));
  fill(255,200,160,255);
  circle(200,200,25 + 40*sin(time/70));
  
  // put a red circle at the source and a blue one at the sink
  fill(255,0,0,255);
  circle(250,200,25);
  fill(0,0,255,255);
  circle(150,200,25);
  
  fill(255,255,255,255);
  noStroke;
  
  
  for (let i = 0; i < balls.length; i++) {
    balls[i].update();
    balls[i].display();
  }
  
  // a vector of ball objects
  // balls = ; // list
  
}

// North and South are in fact reversed. Hush! Don't tell anyone!
// function to transform vectors
function t1([x,y]) {
  return [x - 0.06*y,y + 0.06*x];
}

// conjugate t by r to get a nice whirly function 
// r takes the point at infinity to +1 and zero to -1
function r([x,y]) {
  denom = (x + 1)**2 + y**2;
  return [(x**2 + y**2 - 1)/denom , 2*y / denom];
}

// the inverse of r
function rinv([x,y]) {
  denom = (1 - x)**2 + y**2;
  return [(1 - x**2 - y**2)/denom , 2*y/denom];
}

// this function scales pixels to appropriate size, centers the drawing
function scaleRinvT1R([xpix,ypix]) {
  x = (xpix - 200) / 50;
  y = (ypix - 200) / 50;
  [x,y] = rinv(t1(r([x,y]))); // update the vectors
  [x,y] = [50 * x + 200 , 50 * y + 200];// scale them appropriately
  return [x,y];
}

// returns the euclidian distance between (x1,y1) and (x2,y2)
function distance(x1,y1,x2,y2) {
  return sqrt((x2-x1)**2 + (y2-y1)**2);
}

// spawn balls when the mouse is pressed
function mousePressed() {
  var ballInstance = new Ball(mouseX,mouseY);
  balls.push(ballInstance);
}

class Ball {
  constructor (x,y) {
    this.xPos = x;
    this.yPos = y;
    this.d0 = 0.0001; // the initial displacement
    this.xNeighbour = x + this.d0;
    this.yNeighbour = y;
    this.size = 2;
    this.age = 0;
  }
  
  update () {
    [this.xPos,this.yPos] = scaleRinvT1R([this.xPos,this.yPos]);
    [this.xNeighbour,this.yNeighbour] = scaleRinvT1R([this.xNeighbour,this.yNeighbour]);
    // nothing here yet
  }
  
  display () {
    // fill(255);
    // noStroke;
    var di = distance(this.xPos,this.yPos,this.xNeighbour,this.yNeighbour);
    circle(this.xPos,this.yPos, this.size * di / this.d0);
  }
}
