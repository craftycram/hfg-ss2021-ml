import processing.sound.*;
import oscP5.*;
import netP5.*;

OscP5 oscP5;
SoundFile hiSound;
SoundFile byeSound;
int lastValue = 0;

void setup() {
  size(640, 360);
  background(255);
  oscP5 = new OscP5(this, 12000);
  // Load a soundfile from the /data folder of the sketch and play it back
  hiSound = new SoundFile(this, "corpse_wadupbaby.mp3");
  byeSound = new SoundFile(this, "corpse_game.mp3");
}

void draw() {
}

void oscEvent(OscMessage msg) {
  if (msg.checkAddrPattern("/wek/outputs")==true) {
    if (msg.checkTypetag("f")) {
      int firstValue = (int)msg.get(0).floatValue();
      if (firstValue != lastValue) {
        if (firstValue == 1) {
          byeSound.stop();
          hiSound.play();
        }
        if (firstValue == 2) {
          hiSound.stop();
          byeSound.play();
        }
        lastValue = firstValue;
      }
      println(" values: "+firstValue);
      return;
    }
  }
}
