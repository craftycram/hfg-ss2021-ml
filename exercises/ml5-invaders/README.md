# hackINvaders
This is a version of SpaceInvaders written in the lectures of Florian Geiselhart @hfg-gmuend.
We used the original game as a template and added the basic features with our interpretation how the game should work.
For this our lecturer gave us a [GitHub repository](github.com/hfgcoding/01_03_spacebase/) as a template with rough instructions.
There we should build our game. The template already contained code, which described the basic structure of the game.
Our task was then to represent the invaders, let them wander, shoot and make them hit the target.
Furthermore a variable should count up the hits.

play now: [hackINvaders - Online Version](https://itmr-dev.de/invaders)

## How to play
The game can be cloned directly from GitHub.
Opening the file "index.html" will launch the browser set as default and the game will start immediately.

### gerneral
<kdb>P</kdb>: pause
<kdb>L</kdb>: invader shoot (2nd row, 3rd invader)
<kdb>E</kdb>: let all invaders explode

### spaceship controls
<kdb>←</kdb>: move left
<kdb>→</kdb>: move right
<kdb>space</kdb>: shoot

> You can also use the buttons on the left.

## code structure

### classes:  
* **invader_class.js:**
  * `this.width`: invaders width
  * `this.height`: invaders height
  * `this.posX`: invader x position
  * `this.posY`: invader y position
  * `this.rand`: invader appearance random number
  * `this.appearance`: saved appearance
  * `this.id`: invaders id
  * `this.explodeState`: invaders explosion state
  * `this.lasers`: current invader lasers
  * `this.laserId`: laser id

* **InvaderRow.js:**
  * `this.posX`: invader row x position
  * `this.posY`: invader row y position
  * `this.cols`: game screen width
  * `this.rand`: random value for invaders appearance
  * `this.invWidth`: invader width
  * `this. invHeight`: invader height
  * `this.invaderCount`: number of invaders in row
  * `this.id`: row id
  * `this.spaces`: spaces / number of empty pixels between invaders
  * `this.rowWidth`: width of all invaders + spaces
  * `this.invaders`: all invaders

* **bullet.js:**
  * `this.posX`: bullet x position
  * `this.posY`: bullet y position
  * `this.id`: bullet id

* **Laser.js:**
  * `this.posX`: bullet x position
  * `this.posY`: bullet y position
  * `this.id`: laser id#

### functions:
* `renderBullets()`: A function that goes through each invader and bullet and calculates the distance between the invader and the bullet. If the distance is smaller than the invader diameter, the invader explodes, the bullet is deleted and the shotcount (scoreboard) is incremented. If the bullets reach the edge, they are also deleted so that they do not fly into infinity.  
* `renderLasers()`: Goes through each invader or its laser and calculates the distance between laser and spaceship. If it is hit, the spaceship and laser are removed, the render speed accelerates and the end of the game is initiated. If the laser reaches the edge, it is removed.  
* `renderInvaders()`: The game is rendered every 40 ms. Every 25 times the function moves the invaders forward by a defined step. When the invaders reach the edge they are moved down one line and change direction. If they reach the bottom edge, the player loses. Every 50 times a random invader shoots. If the game is over, an invader explodes instead. Also, all InvaderRows are displayed at the end of the function.  
* `render()`: The render function calls up all render functions of the individual components, checks whether the player has already won and updates the scoreboard.  
* `checkPlayerWon()`: The function goes through all invaders and checks if an unexploded invader still exists. If this is the case, the player has not yet won. If all invaders have exploded, it returns this.  
* `playerWon () & playerLost ()`: Create large texts on the display, should the player have won or lost ("game over" / "you won")  
* `printInvaderRow ()`: The function retrieves all stored InvaderRows and their Invaders and displays them at their respective positions with the displacement on both axes. Should the invader be hit, it will display an explosion animation for a short time.  
* `shootlaser()`: Creates an object of class Laser as soon as it is called in an invader.  
* `explode()`: Makes the invader explode by changing the appearance and explodeState of the invader.  
* `generateInvader()`: Creates an invader by the given random number.  
* `generateInvaderRow()`: Creates multiple invaders and stores them in a row.  

## game process

The game starts by creating 2 rows of invaders at the top.
The spaceship starts centrally at the bottom and can only move on the X-axis.
The invaders now moves slowly from left to right until they reach the right edge.
Then they jump down one row and move left until they reach the left edge again.
There they jump down one row again.
This procedure is repeated until the invaders have reached the bottom edge.
If this is the case, the player loses. During this procedure a random invader always shoots towards the spaceship.
The player must try to avoid the bullets and shoot down all invaders at the same time without getting hit or letting the invaders come to the bottom.

## ToDo
* adding obstacles for the player to hide which get destroyed afer a few hits
* invader row respawning for infinity mode
* multiple spaceship lives
* different difficulty levels
* adding sounds
* end-boss for extra points and thrill
* expandnig the multiplayer mode
* adding online / offline rankings
* special effect items (e.g. speed or strenght)
