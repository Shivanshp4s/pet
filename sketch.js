var happydog;
var saddog;
var dog;
var database;
var foods,foodStock;

function preload (){

happydog = loadImage("happyDog.png");
saddog = loadImage("sadDog.png");

}

function setup(){

    createCanvas(500,500);

 database = firebase.database();
 foodStock = database.ref("food");
 foodStock.on("value" , readStock);
    foodStock.set(20);

    dog=createSprite(800,200,150,150);
    dog.addImage(saddog);
    dog.scale=0.15;

}
function draw(){

  background("green");

    if(foods === undefined){

        textSize(20);
        fill(255);
        text(" INFO :: PRESS UP ARROW TO FEED THE DOG ",50,50);
        text("food remaning = "+foods,150,150);

        if(keyWentDown("UP_ARROW")){
           writeStock(foods);
           dog.addImage(happydog);
        }

        if(keyWentUp("UP_ARROW")){
           dog.addImage(saddog);
        } 

        if(foods === 0){
                foods = 20;
        }

    
  drawSprites();

    }

}

function writeStock(x){

if(x<=0){

    x = 0;

}else{

  x = x-1;

}
database.ref("/").update({
    Food:x
});

}

function readStock(data){

  foods = data.val();

}

