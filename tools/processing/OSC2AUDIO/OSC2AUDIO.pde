import processing.sound.*;
import oscP5.*;
import netP5.*;

OscP5 oscP5;
SoundFile kick;

void setup() {
  size(640, 360);
  background(255);


  oscP5 = new OscP5(this, 8000);



  // Load a soundfile from the /data folder of the sketch and play it back
  kick = new SoundFile(this, "kick.wav");
  kick.play();
}      

void draw() {
}

void oscEvent(OscMessage msg) {
  String address = msg.addrPattern();

  if (address.equals("/kick")) {
    println("trigger kick");
    kick.play();
  }
}
