var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImage;
var bullet;
var gameState = "play";
var life = 3;
var life1, life2, life3;
var zombiesGroup,bulletGroup,stoneGroup
var score = 0;
var explosionSound,loseSound,winSound
var stone, stoneImage

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  zombieImage = loadImage("assets/zombie.png")
  life3 = loadImage("assets/heart_3.png")
  life2 = loadImage("assets/heart_2.png")
  life1 = loadImage("assets/heart_1.png")
  explosionSound = loadSound("assets/explosion.mp3")
  loseSound = loadSound("assets/lose.mp3")
  winSound = loadSound("assets/win.mp3")
  stoneImage = loadImage("assets/stone.png.png")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

zombiesGroup = new Group()
bulletGroup = new Group()
stoneGroup = new Group()
}

function draw() {
  background(0); 
  textSize(30)
  text ("Score:"+score,50,100)
  


if (gameState == "play"){
 
                  if(frameCount%50==0){
                    spawnZombies();
                  
                  }
                  
                 spawnStone();

                  //moving the player up and down and making the game mobile compatible using touches
                if((keyDown("UP_ARROW")||touches.length>0) && player.y>windowHeight-400){
                  player.y = player.y-30
                }
                if((keyDown("DOWN_ARROW")||touches.length>0)&& player.y<windowHeight-50){
                player.y = player.y+30
                }


                //release bullets and change the image of shooter to shooting position when space is pressed
                if(keyWentDown("space")){
                  
                  player.addImage(shooter_shooting)
                  spawnBullet();
                
                }

                //player goes back to original standing image once we stop pressing the space bar
                else if(keyWentUp("space")){
                  player.addImage(shooterImg)
                }
                for(var i = 0; i < zombiesGroup.length;i++){
                  if (zombiesGroup.isTouching(player)){
                    life = life - 1;
                    zombiesGroup.get(i).destroy();
                    explosionSound.play()
                  
                  }
                  if(life == 0){
                    gameState = "end"
                    loseSound.play();
                  }
                }
                for(var i = 0; i < zombiesGroup.length;i++){
                if(bulletGroup.isTouching(zombiesGroup)){
                  zombiesGroup.get(i).destroy();
                  bulletGroup.get(i).destroy(); 
                  score = score+20;
                  winSound.play();
                }
                }
                if(score >= 100){
                for(var i = 0; i < stoneGroup.length;i++){
                  if (stoneGroup.isTouching(player)){
                    life = life - 1;
                    stoneGroup.get(i).destroy();
                    loseSound.play();
                  }
                }
              }
                
              
              drawSprites();
              
               


}

else if (gameState == "end"){
  zombiesGroup.setVelocityXEach(0);
  zombiesGroup.setLifetimeEach(-1);
  textSize(100);
  fill("green");
  text("GAMEOVER",500,500);
  
}



if (life == 3){
  image (life3,displayWidth-200,100,200,50)
}
else if (life == 2){
  image (life2,displayWidth-200,100,150,50)
}
else if (life == 1){
  image (life1,displayWidth-200,100,100,50)
}

}

function spawnZombies (){
  zombie = createSprite(displayWidth-50,random(windowHeight-400,windowHeight-50),100,100);
  zombie.addImage(zombieImage);
  zombie.scale = 0.15;
  zombie.velocityX = -6 - score/100;
  zombie.lifetime = 600;
  zombiesGroup.add(zombie);
}
function spawnBullet (){
  bullet = createSprite(player.x+70,player.y-20,15,10);
  bullet.shapeColor = "orange";
  bullet.velocityX = 5;
  bullet.lifetime = displayWidth/bullet.velocityX;
  bulletGroup.add(bullet);
  
}
function spawnStone(){
  if (frameCount%80==0 && score >= 100){
  stone = createSprite(displayWidth-80,random(windowHeight-400,windowHeight-50),500,500);
  stone.addImage(stoneImage);
  stone.scale = 0.10;
  stone.velocityX = -7;
  stone.lifetime = 600
  stoneGroup.add(stone);
 

  }
  
  
}
