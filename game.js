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
  /*==========================Snake Object===========================*/
var Snake = function() {
  this.head_x = 0;
  this.head_y = 0;
  // var posArray = [new Pos(3,3)];
  this.posArray = [new Pos(3,3)];
  this.direction;
  // this.posArray[0] = new Pos(3,3);
  //var posArray;
};

Snake.prototype.addPos = function(x, y){
  this.posArray.push(new Pos(x,y));
}

Snake.prototype.moveSnake = function(){
  //take the direction

  //take the next right direction and update all the positions in snake array so that they
  //every snake square at pos i+1 becomes the snake square at pos i

  //if this.direction == right
  var newX = this.posArray[0].x + 1;
  var newY = this.posArray[0].y;


  //temporary game over logic
  if(newX == 49){
    alert("You lost!");
    clearInterval(interval);
  }

  this.posArray[0].x = newX;
  this.posArray[0].y = newY;
  console.log(this.posArray);
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

  interval = setInterval(function(){gameSnake.moveSnake()}, 65);
  //alert("Continuing...");

  /*==========================Handlers===========================*/
  $(document).keydown(function(e){

    //changes direction of snake!
    if(e.keyCode == 38){ //up
      //shift every
      console.log("up");
    }
    else if(e.keyCode == 40){ //down
      // gameSnake.updatePos(gameSnake.head_x, gameSnake.head_y-1);
      console.log("down");
    }
    else if(e.keyCode == 37){ //left
      // gameSnake.updatePos(gameSnake.head_x-1, gameSnake.head_y);
      console.log("left");
    }
    else if(e.keyCode == 39){ //right
      // gameSnake.updatePos(gameSnake.head_x+1, gameSnake.head_y);
      console.log("right");
    }
  });
});