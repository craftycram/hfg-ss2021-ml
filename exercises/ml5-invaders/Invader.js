// eslint-disable-next-line no-unused-vars
class Invader {
  constructor(width, height, posX, posY, id, rand = Math.random()) {
    this.width = width; // invaders width
    this.height = height; // invaders height
    this.posX = posX; // invader x position
    this.posY = posY; // invader y position
    this.rand = rand; // invader appearance random number
    this.appearance = this.generateInvader(); // saved appearance
    this.id = id; // invaders id
    this.explodeState = 0; // invaders explosion state
    this.lasers = []; // current invader lasers
    this.laserId = 0; // laser id
  }

  shootLaser() {
    // eslint-disable-next-line no-console
    console.log(`Invader ${this.id} Laser shot`);
    // eslint-disable-next-line no-undef
    this.lasers.push(new Laser(this.posX + this.width,
      // creates new instance of Laser class and pushes into lasers
      this.posY + this.height, this.laserId += 1));
  }

  explode() {
    // eslint-disable-next-line no-console
    console.log(`Invader ${this.id} exploded`);

    if (this.explodeState < 1) { // check if hasn't already exploded
    // cycles through x coordinates of invader's appearance
      for (let x = 0; x < this.width; x += 1) {
        // cycles through y coordinates of invader's appearance
        for (let y = 0; y < this.height; y += 1) {
          // const randProcessed = Math.random().toString()[x * y];
          // if (parseInt(randProcessed, 10) > 5) {
          if (Math.random() > 0.5) { // randomly decide to replace pixel or not
            if (Math.random() > 0.5) { // randomly decide between empty / exlosion pixel
              this.appearance[x][y] = 2; // set explosion pixel
            } else {
              this.appearance[x][y] = 0; // remove pixel
            }
          }
        }
      }
      this.explodeState = 1;
    }

    /* this.appearance = [
      [0, 1, 0, 2, 0],
      [0, 0, 2, 0, 1],
      [1, 2, 0, 2, 0],
      [0, 1, 2, 0, 0],
      [0, 2, 0, 2, 1],
    ]; */
  }

  /*
  isHitByBullet(bulletX, bulletY) {
    // prüfen ob der Bullet den Invader trifft
  }
  */

  generateInvader() {
    const invader = [];
    // const rand = Math.random();
    // cycles through x coordinates of invader's appearance
    for (let x = 0; x < this.width; x += 1) {
      // cycles through y coordinates of invader's appearance
      for (let y = 0; y < this.height; y += 1) {
        const randProcessed = this.rand.toString()[x * y]; // proecss random value
        if (parseInt(randProcessed, 10) > 3) { // create pixel if random is greater than 3
          if (!Array.isArray(invader[x])) { // check if array exists at pos x
            invader[x] = []; // create array at pos x
            invader[x][y] = 1;
          } else {
            invader[x][y] = 1;
          }
        } else if (!Array.isArray(invader[x])) { // check if array exists at pos x
          invader[x] = []; // create array at pos x
          invader[x][y] = 0;
        } else {
          invader[x][y] = 0;
        }
      }
    }
    return invader;
  }
}
