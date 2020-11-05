var trex;
var ground;
var ground2;
var cloud;
var obstacles;
var i = 0;
var gamestate = 'play';
var ob_grp;
var cl_grp;
var gameOver;
var restart;
var touches = [];
function preload(){
  trex1 = loadAnimation("trex1.png","trex3.png","trex4.png");
  trexC = loadAnimation("trex_collided.png");
  gameOver_A = loadAnimation("gameOver.png");
  restart_A = loadAnimation("restart.png");
  ground1 = loadAnimation("ground2.png");
  cloud1 = loadAnimation("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  die_sound = loadSound("die.mp3");
  checkPoint_sound = loadSound("checkPoint.mp3");
  jump_sound = loadSound("jump.mp3");
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  trex = createSprite(90,height/2+10,20,20);
  trex.addAnimation("trex",trex1);
  trex.scale = 0.5;
  trex.addAnimation("trex_C",trexC);
  ground = createSprite(width/2,height/2+40,800,10);
  ground.addAnimation("ground1.1",ground1);
  ground2 = createSprite(width/2,height/2+45,800,10);
  //ground2.shapeColor = 220;
  ground2.visible = false; 
  ob_grp = new Group();
  cl_grp = new Group();
  gameOver = createSprite(width/2,height/2-50);
  gameOver.addAnimation("gA",gameOver_A);
  gameOver.scale = 0.5;
  restart = createSprite (width/2,height/2-80);
  restart.addAnimation("rA",restart_A);
  restart.scale = 0.5;
  ground.velocityX = -8;
}
function draw() {
  //console.time("time");
  background('white');
  if(gamestate == 'play'){
  trex.changeAnimation ("trex",trex1);
  if(trex.isTouching(ob_grp)){
  die_sound.play();
  gamestate = 'over';
  }
  if(frameCount%50 == 0){
  cloud = createSprite(width+10,height/2-140,20,20);
  cloud.addAnimation("cloudanimation",cloud1);
  cloud.y = Math.round(random(width/4,height/4-20));
  cloud.velocityX = -3;
  trex.collide (cloud); 
  cloud.depth = -2;
  cl_grp.add(cloud);
  // console.log("clouds",cloud.depth);
  } 
  i = i + 0.1;
//  console.log("score=" , i);
  if(ground.x<=0){
  ground.x = 200
  }
  if((keyDown("space") || touches.length > 0) && trex.y>=height/2+16){
  touches = [] ;
  trex.velocityY = -10;
  jump_sound.play();
  } 
  trex.velocityY = trex.velocityY + 0.5;
  if(frameCount%120 == 0){
  obstacles = createSprite(width+10,height/2+5);
  obstacles.velocityX = -6;
  obstacles.scale = 0.7;
  obstacles.lifetime = 200;
  var R = Math.round(random(1,6));
  ob_grp.add(obstacles);
  switch(R){
  case 1: obstacles.addImage(obstacle1);
  obstacles.y = height/2+15;
  break;
  case 2: obstacles.addImage(obstacle2);
  obstacles.y = height/2+15;
  break;
  case 3: obstacles.addImage(obstacle3);
  obstacles.y = height/2+15;
  break;
  case 4: obstacles.addImage(obstacle4);break;
  case 5: obstacles.addImage(obstacle5);
  obstacles.y = height/2+7;
  break;
  case 6: obstacles.addImage(obstacle6);break;
  default: break;
  } //end of switch
  } //end of if (obstacles)
  if(Math.round(i)%100 == 0){
    ground.velocityX = ground.velocityX -0.5;
    ob_grp.setVelocityXEach (ground.velocityX); 
    // console.log("velocity =" +ground.velocityX) 
    checkPoint_sound.play();
  } 
    restart.visible = false;
    gameOver.visible = false;
  }//end of gamestate play
  if(gamestate == 'over'){
  ground.velocityX = 0;
  ob_grp.setVelocityXEach(0);
  ob_grp.setLifetimeEach(-1);
  trex.changeAnimation("trex_C",trexC);
  cl_grp.setVelocityXEach (0);
  cl_grp.setLifetimeEach(-1);
  trex.velocityX = 0;
    restart.visible = true;
    gameOver.visible = true;
  if(mousePressedOver(restart)|| touches.length > 0){
    touches = [];
    ob_grp.destroyEach();
    cl_grp.destroyEach();
    i = 0; 
    gamestate = 'play';
  } 
  } 
  // console.log(trex.depth);
  textSize (15);
  text ("Score = ", width/2+100,50);
  text (Math.round(i),width/2+150,50);
  //console.time("t");
  //console.log(getFrameRate())
  //console.timeEnd("t");
  //console.log(trex.y);
  //console.info("INFORMATION");
  //console.warn("WARNING");
  //console.error("ERROR");
  trex.collide (ground2);
  //if(cloud.x <= 0){
  //cloud.x = 200;
  // }
  drawSprites();
  //console.timeEnd("time");
  // console.log(getFrameRate()/60)
}