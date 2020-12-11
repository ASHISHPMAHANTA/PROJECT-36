//Create variables here
var dog,dogImage;
var database;
var happyDog,happyDogImage;
var foodS,food,lastFed;
var foodStock;
var foodremaining = 20;

function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
 
  createCanvas(800, 700);

  food = new Food();

  feed = createButton("Feed the dog");
  feed.position(700,105);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(700,150);
  addFood.mousePressed(addFoods);


  dog = createSprite(400,500,20,20);
  dog.addImage("dogimage",dogImage);
  dog.scale = 0.2;

  foodStock = database.ref('food');
  foodStock.on("value",readStock);

}


function draw() { 

  background(46,139,87);
  food.display();


   fill("red")
  textSize(30)
  text("foodremaining : "+foodremaining,50,200);

textSize(30);
  text("NOTE: PRESS Feed the dog TO FEED THE DOG MILK",50,50)
 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("LastFeed : "+ lastFed%12+"PM",350,30);
  }
  else if(lastFed==0){
    text("LastFeed : 12AM",350,30);
  }
  else{
    text("LastFeed :"+lastFed+"AM",350,30);
  }

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){

lastFed = data.val();    
  });
  
      
  drawSprites();
  //add styles here

}
function readStock(data){
  foodS=data.val();
  food.updateFoodStock(foodS);
}

function writeStock(){
database.ref('/').update({
  food:foodremaining
})
}
function writeStock(){

  if(foodremaining<=0){
    foodremaining=0;
  }
  else{
    foodremaining = foodremaining-1;
  }
}

function showError(){
  console.log("Error in writing to the database");
}



function feedDog(){
  writeStock(foodS)
dog.addImage(happyDog);
foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
Food:foodObj.getFoodStock(),
FeedTime:hour()

})
}

function addFoods(){
foodS++;
database.ref('/').update({

  Food:foodS
})

}
