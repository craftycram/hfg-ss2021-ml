import oscP5.*;
import netP5.*;
import com.runwayml.*;

RunwayOSC runway;
int ellipseSize = 10;
OscP5 oscP5;
NetAddress dest;
JSONObject data;

void setup() {
  size(600, 400);
  runway = new RunwayOSC(this);
  oscP5 = new OscP5(this,12001);
  dest = new NetAddress("127.0.0.1",6448);
}

void draw() {
  background(0);
  if (data != null) {
    JSONArray humans = data.getJSONArray("poses");
    for (int h = 0; h < humans.size(); h++) {
      JSONArray keypoints = humans.getJSONArray(h);
      for (int k = 0; k < keypoints.size(); k++) {
        JSONArray point = keypoints.getJSONArray(k);
        float x = point.getFloat(0);
        float y = point.getFloat(1);
        if (k == 0) {
          push();
          fill(255,0,0);
          ellipse(x * width, y * height, ellipseSize, ellipseSize);
          sendOsc(x, y);
          pop();
        } else {
          ellipse(x * width, y * height, ellipseSize, ellipseSize);
        }
      }
    }
  }
}

void runwayDataEvent(JSONObject runwayData) {
  data = runwayData;
}

void sendOsc(float bx, float by) {
  OscMessage msg = new OscMessage("/wek/inputs");
  msg.add((float)bx); 
  msg.add((float)by);
  oscP5.send(msg, dest);
}
