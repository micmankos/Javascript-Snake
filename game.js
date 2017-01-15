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
var Apple = function(x, y) {
  this.wallX = x;
  this.wallY = y;
  this.x = 0;
  this.y = 0;
  this.exists = false;
}

Apple.prototype.makeApple = function(wallX, wallY){

  var validLoc = false;

  while(validLoc == false){
    var x = Math.floor((Math.random() * wallX)+1);
    var y = Math.floor((Math.random() * wallY)+1);

    if($('#x' + x + "y" + y).hasClass('worm-block') || $('#x' + x + "y" + y).hasClass('wall-block')){
      validLoc=false;
    }
    else{
      this.exists = true;
      $('#x' + x + "y" + y).addClass('apple-block')
      this.x = x;
      this.y = y;
      validLoc=true;
    }
  }

}

Apple.prototype.destroyApple = function(){

  this.exists = false;
  $('#x' + this.x + "y" + this.y).removeClass('apple-block');

}


  /*==========================Snake Object===========================*/
var Snake = function() {
  // this.head_x = 0;
  // this.head_y = 0;
  // var posArray = [new Pos(3,3)];
  this.posArray = [new Pos(4,4), new Pos(4,3), new Pos(4,2), new Pos(4,1)];
  this.direction = "right";
  this.growCount = 0;
  // this.posArray[0] = new Pos(3,3);
  //var posArray;
};

Snake.prototype.ateApple = function(gameApple){

  if(this.posArray[0].x == gameApple.x && this.posArray[0].y == gameApple.y){
    return true;
  }
  return false;
}

Snake.prototype.grow = function(){
  this.growCount += 3;
}

Snake.prototype.addPos = function(x, y){
  this.posArray.push(new Pos(x,y));
}

Snake.prototype.didCollide = function(wallX, wallY){
  var headX = this.posArray[0].x;
  var headY = this.posArray[0].y;
  console.log(this.posArray);
  for(var i = 1; i < this.posArray.length - 1; i++){
    if(headX == this.posArray[i].x && headY == this.posArray[i].y)
      return true;
  }

  if(headX == wallX-1 || headX == 0 || headY == wallY-1 || headY == 0)
    return true;

  return false;
}

//give moveSnake an "apple count" which, when a snake eats an apple, appleCount will become 3. Each time moveSnake is called, appleCount reduces by 1
//When appleCount > 0, the current move the snake makes will be added on to the total length of the snake
Snake.prototype.moveSnake = function(wallX, wallY, gameApple){
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





  if(gameApple.exists == false){
    gameApple.makeApple(wallX, wallY);
  }
  // console.log("X" + gameApple.x + "Y" + gameApple.y);
  if(this.ateApple(gameApple)){
    gameApple.exists = false;
    gameApple.destroyApple();
    this.grow();
  }

  // $('#x' + tailX + "y" + tailY).addClass('wall-block');
  for(var h = this.posArray.length-1; h > 0; h--){
    this.posArray[h].x = this.posArray[h-1].x;
    this.posArray[h].y = this.posArray[h-1].y;
  }

  if(this.growCount > 0){
    this.posArray.unshift(new Pos(newX, newY))
    this.growCount--;
  }
  else{//growCount == 0

  }

  this.posArray[0].x = newX;
  this.posArray[0].y = newY;

  if(this.didCollide(wallX,wallY)){
    // alert("You lost!");
    clearInterval(interval);
  }

  this.drawSnake();
}
//
// Snake.prototype.updatePos = function(x, y) {
//   this.head_x = x;
//   this.head_y = y;
// };

Snake.prototype.drawSnake = function() {
  var x;
  var y;
  // console.log(this.posArray);

  for(var i = 0; i < this.posArray.length; i++){
    x = this.posArray[i].x;
    y = this.posArray[i].y;
    $('#x' + x + "y" + y).addClass('worm-block');
    // if(i==posArray.length){
    //   $('#x' + x + "y" + y).removeClass('worm-block');
    // }
  }

  var tail = this.posArray.length;
  var tailX = this.posArray[tail-1].x;
  var tailY = this.posArray[tail-1].y;
  $('#x' + tailX + "y" + tailY).removeClass('worm-block');
};

$(document).ready(function(){

  /*==========================Initialize Game===========================*/
  var x = 50;
  var y = 50;
  var s = 11;

  var grid = new Grid(x, y, s);
  var gameSnake = new Snake();
  var gameApple = new Apple(x, y);

  grid.drawGrid(x, y);
  gameSnake.drawSnake();
  /*==========================Game Logic===========================*/

  interval = setInterval(function(){gameSnake.moveSnake(x, y, gameApple)}, 65);
  //alert("Continuing...");

  /*==========================Handlers===========================*/
  $(document).keydown(function(e){

    //changes direction of snake!
    if(e.keyCode == 38){ //up
      gameSnake.direction="up";
    }
    else if(e.keyCode == 40){ //down
      gameSnake.direction="down";
    }
    else if(e.keyCode == 37){ //left
      gameSnake.direction="left";
    }
    else if(e.keyCode == 39){ //right
      gameSnake.direction="right";
    }
  });
});
