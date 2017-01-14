
var Pos = function(x, y){
  this.x = x;
  this.y = y;
}

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
  for(var i = 0; i < x; i++){
    for(var j = 0; j < y; j++){
      $('#grid').append('<div class="square" id="x'+i.toString()+'y'+j.toString()+'"></div>');
    }
  }
};

var Snake = function() {
  this.head_x = 0;
  this.head_y = 0;
  // var posArray = [new Pos(3,3)];
  this.posArray = [new Pos(3,3), new Pos(4,4)];
  // this.posArray[0] = new Pos(3,3);
  //var posArray;
};

Snake.prototype.addPos = function(x, y){
  this.posArray.push(new Pos(x,y));
}

Snake.prototype.updatePos = function(x, y) {
  this.head_x = x;
  this.head_y = y;
};

Snake.prototype.drawSnake = function() {
//  console.log(this.head_x + ", " + this.head_y);
  var x;
  var y;
  temp = ['df', 'gh', 'sd'];
  console.log(this.posArray);
  // $('#x3y3').addClass('worm-block');
//  console.log("");
  for(var i = 0; i < this.posArray.length; i++){
    x = this.posArray[i].x;
    y = this.posArray[i].y;
    $('#x' + x + "y" + y).addClass('worm-block');
  }
};

$(document).ready(function(){

  var x = 50;
  var y = 50;
  var s = 11;

  var grid = new Grid(x, y, s);
  var gameSnake = new Snake();

  grid.drawGrid(x, y);
  gameSnake.drawSnake();

  $(document).keydown(function(e){
    if(e.keyCode == 38){ //up
      // gameSnake.updatePos(gameSnake.head_x, gameSnake.head_y+1);
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

    $('#3,3').addClass('worm-block');
  });
});
