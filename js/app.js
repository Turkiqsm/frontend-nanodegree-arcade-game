
//Collision variable to check it
      var Collisioned =false ;

            //resets the player and the score
          var reset = function() {

        player.x = 200;
        player.y = 400;

        player.score = 0;
ScoreHTML();


      };


//adding or altering the score on the screen
        var ScoreHTML = function() {

    $(".Score").html("<p>Score : <b>" + player.score + "</b></p>");
  }
// generate random number not bigger then x
  var random = function(x) {
  return Math.floor((Math.random() * 10) % x);
}

// Enemies our player must avoid

var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  this.speed = [100, 80, 150, 130, 120];
  this.indSpeed = random(5);

  this.x = -200;

  this.ylocations = [60, 140, 220];
  this.indY = random(3);
  this.y = this.ylocations[this.indY];

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x>505){
      this.x=-50;
      this.y=this.ylocations[random(3)] ;
    }

  this.x = this.x+(dt *this.speed[this.indSpeed]) ;

  if (((player.x > Math.floor(this.x-50))&&(player.x < Math.floor(this.x+50))) && ((player.y > this.y-50) && (player.y <this.y+50))){
    Collisioned = true;

}


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var checkCollisions = function() {
if(Collisioned == true){
  reset();
  Collisioned=false;
}

};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
  var player = function() {
    this.x =200;
    this.y =400;
    this.score = 0;

    this.sprite = 'images/char-boy.png';

};

player.prototype.update = function() {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

     if(this.y<-1){
     this.y=400;
     this.score++;
ScoreHTML();
   }





};
player.prototype.render = function() {

        if(this.score>=5){

          this.sprite='images/char-cat-girl.png';
        } if(this.score>=10){
          this.sprite='images/char-horn-girl.png';

        }if(this.score>=15){
          this.sprite='images/char-pink-girl.png';

        }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
player.prototype.handleInput = function(key){

      if (key == 'left' && !(this.x-90<0)) {

        this.x-=90;
      } else if (key == 'right'&& !(this.x+90>405)) {
          this.x+=90;
        } else if (key == 'up'/*&& !(this.y-80<0)*/){
            this.y-=90;
          }else if (key == 'down'&& !(this.y+90>405)) {
              this.y+=90;
}
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
          var allEnemies =[];

            for (var i =5;i>0;i--){
              allEnemies.push(new Enemy() );
              }


          var player = new player();




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
