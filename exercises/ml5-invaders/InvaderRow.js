// eslint-disable-next-line no-unused-vars
class InvaderRow {
  constructor(posX, posY, cols, invaderCount, id, invWidth, invHeight, rand) {
    // @Flo: Zwischen optional und required Parametern unterscheiden?! zb rand
    this.posX = posX; // invader row x position
    this.posY = posY; // invader row y position
    this.cols = cols; // screen width
    this.rand = rand; // random value for invaders appearance
    this.invWidth = invWidth; // invader width
    this.invHeight = invHeight; // invader height
    this.invaderCount = invaderCount; // number of invaders in row
    this.id = id; // row id
    // spaces / number of empty pixels between invaders
    this.spaces = this.cols / this.invaderCount / 2;
    // width of all invaders + spaces
    this.rowWidth = this.invWidth * this.invaderCount + this.spaces * this.invaderCount;
    this.invaders = this.generateInvaderRow(); // all invaders
  }

  generateInvaderRow() { // creates invaders
    const temp = [];
    let xPos = this.spaces + this.posX; // invader x pos
    for (let i = 0; i < this.invaderCount; i += 1) {
      // creates instance of Invader class
      // eslint-disable-next-line no-undef
      temp.push(new Invader(this.invWidth, this.invHeight, xPos, this.posY, i, this.rand));
      xPos += this.spaces + this.invWidth; // increase invader x position
    }
    return temp;
  }
}
