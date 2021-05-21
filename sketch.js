var knife, knifeimg, fruit1, fruit2, fruit3, fruit4, fruitGroup,enemyGroup,enemyimg,enemyimg2,gameoverimg,gameOver,gameOversound,knifeSound;
PLAY = 1;
END = 0;
var gamestate = 1;
var score = 0;

function preload() {
  knifeimg = loadImage("sword.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  enemyimg = loadImage("alien1.png");
  enemyimg2 = loadImage("alien2.png");
  gameoverimg = loadImage("gameover.png");
  gameOversound = loadSound("gameover.mp3");
  knifeSound = loadSound("knifeSwooshSound.mp3");
}

function setup() {
  createCanvas(400, 400);
  knife = createSprite(200, 200);
  knife.addImage("knifeya", knifeimg);
  knife.scale = 0.5;
  fruitGroup = createGroup();
  fruit1.scale = 0.1;
  fruit2.scale = 0.1;
  fruit3.scale = 0.1;
  fruit4.scale = 0.1;
  enemyGroup = createGroup();
  gameover = createSprite(200,200);
  gameover.addImage(gameoverimg);
}

function draw() {
  background("lightblue");
  textFont("Centaur");
  textSize(20)
;  text("score: " + score, 175, 50);
  fruits();
  enemy();
  if (gamestate === PLAY) {
    gameover.visible = false;
    
    knife.y = World.mouseY;
    knife.x = World.mouseX;
    if (fruitGroup.isTouching(knife)) {
      fruitGroup.destroyEach();
      knifeSound.play();
      score = score + 2;
    }
    if(knife.isTouching(enemyGroup))
      {
        gamestate = END;
        gameOversound.play();
      }
  }
  else if(gamestate === END)
    {
        gameover.visible = true;
        enemyGroup.destroyEach();
        knife.addImage(gameoverimg);
        knife.x = 200;
        knife.y = 200;
        fruitGroup.setVelocityXEach(0);
        fruitGroup.destroyEach();
        knife.visible = false;
}
  drawSprites();
}

function fruits() {
  if (World.frameCount % 80 === 0) {
    fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.2;
    a = Math.round(random(1, 4));
    if (a == 1) {
      fruit.addImage(fruit1);
    } else if (a == 2) {
      fruit.addImage(fruit2);
    } else if (a == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    var position = Math.round(random(1,2));
    fruit.velocityX = -(10+(score/10));
    fruit.y = Math.round(random(50,340));
    fruit.setLifetime = 100;
    
    fruitGroup.add(fruit);
  }
}
function enemy()
{
  if(World.frameCount % 100 === 0)
    {
      alien = createSprite(400,200,20,20);
      alien.addAnimation("monstermoving", enemyimg);
      alien.y = Math.round(random(100,300));
      alien.velocityX = -(13+ (score/10));
      alien.setLifetime = 50;
      
      enemyGroup.add(alien);
}
}