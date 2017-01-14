var interval;
var Pos = function(x, y){
  this.x = x;
  this.y = y;
}
/*==========================Grid Object===========================*/
var Grid = function(x, y, s){
  size_x = x;
  size_y = y;

  $("<style>").html("\
    .square {\
        height: "+s.toString()+"px;\
        width: "+s.toString()+"px;\
    }").appendTo("head");

  s = s + 2;

  $('#grid').css('width', x*s);
  $('#grid').css('height', y*s);
};

Grid.prototype.drawGrid = function(x, y){
  for(var j = 0; j < x; j++){
    for(var i = 0; i < y; i++){
      if(i == 0 || j == 0 || i == x-1 || j == y-1)
        $('#grid').append('<div class="square wall-block" id="x'+i.toString()+'y'+j.toString()+'"></div>');
      else
        $('#grid').append('<div class="square" id="x'+i.toString()+'y'+j.toString()+'"></div>');
    }
  }
};
  /*==========================Apple Object===========================*/
var Apple = function() {
  this.x = 0;
  this.y = 0;
  this.exists = false;
}

Apple.prototype.createApple = function(){
  //assign an x,y to apple, while that x,y overlaps with a snake or wall, then generate it again
  //when an apple is generated, changes this.exists to true


}

  /*==========================Snake Object===========================*/
var Snake = function() {
  this.head_x = 0;
  this.head_y = 0;
  // var posArray = [new Pos(3,3)];
  this.posArray = [new Pos(3,3)];
  this.direction = "right";
  // this.posArray[0] = new Pos(3,3);
  //var posArray;
};

Snake.prototype.addPos = function(x, y){
  this.posArray.push(new Pos(x,y));
}

Snake.prototype.didCollide = function(wallX, wallY){
  var headX = this.posArray[0].x;
  var headY = this.posArray[0].y;
  for(var i = 1; i < this.posArray.length - 1; i++){
    if(headX == posArray[i].x && headY == posArray[i].y)
      return true;
  }

  if(headX == wallX-1 || headX == 0 || headY == wallY-1 || headY == 0)
    return true;

  return false;
}

//give moveSnake an "apple count" which, when a snake eats an apple, appleCount will become 3. Each time moveSnake is called, appleCount reduces by 1
//When appleCount > 0, the current move the snake makes will be added on to the total length of the snake
Snake.prototype.moveSnake = function(wallX, wallY){
  var newX;
  var newY;

  if(this.direction==="up"){
    newX = this.posArray[0].x;
    newY = this.posArray[0].y - 1;
  }
  else if(this.direction==="down"){
    newX = this.posArray[0].x;
    newY = this.posArray[0].y + 1;
  }
  else if(this.direction==="left"){
    newX = this.posArray[0].x - 1;
    newY = this.posArray[0].y;
  }
  else if(this.direction==="right"){
    newX = this.posArray[0].x + 1;
    newY = this.posArray[0].y;
  }

  var tail = this.posArray.length;
  var tailX = this.posArray[tail-1].x;
  var tailY = this.posArray[tail-1].y;
  $('#x' + tailX + "y" + tailY).removeClass('worm-block');
  // $('#x' + tailX + "y" + tailY).addClass('wall-block');

  this.posArray[0].x = newX;
  this.posArray[0].y = newY;

  console.log(this.posArray);

  //game over logic
  if(this.didCollide(wallX,wallY)){
    alert("You lost!");
    clearInterval(interval);
  }

  this.drawSnake();

}

Snake.prototype.updatePos = function(x, y) {
  this.head_x = x;
  this.head_y = y;
};

Snake.prototype.drawSnake = function() {
//  console.log(this.head_x + ", " + this.head_y);
  var x;
  var y;
  console.log(this.posArray);

  for(var i = 0; i < this.posArray.length; i++){
    x = this.posArray[i].x;
    y = this.posArray[i].y;
    $('#x' + x + "y" + y).addClass('worm-block');
    // if(i==posArray.length){
    //   $('#x' + x + "y" + y).removeClass('worm-block');
    // }
  }
};

$(document).ready(function(){

  /*==========================Initialize Game===========================*/
  var x = 50;
  var y = 50;
  var s = 11;

  var grid = new Grid(x, y, s);
  var gameSnake = new Snake();

  grid.drawGrid(x, y);
  gameSnake.drawSnake();
  /*==========================Game Logic===========================*/

  interval = setInterval(function(){gameSnake.moveSnake(x, y)}, 65);
  //alert("Continuing...");

  /*==========================Handlers===========================*/
  $(document).keydown(function(e){

    //changes direction of snake!
    if(e.keyCode == 38){ //up
      gameSnake.direction="up";
      console.log(gameSnake.direction);
    }
    else if(e.keyCode == 40){ //down
      gameSnake.direction="down";
      console.log(gameSnake.direction);
    }
    else if(e.keyCode == 37){ //left
      gameSnake.direction="left";
      console.log(gameSnake.direction);
    }
    else if(e.keyCode == 39){ //right
      gameSnake.direction="right";
      console.log(gameSnake.direction);
    }
  });
});
