import netP5.*;
import oscP5.*;

import websockets.*;
int oscPort = 12000;
WebsocketServer ws;
OscP5 oscP5;

int now;

void setup() {
  size(200, 200);
  ws = new WebsocketServer(this, 8080, "");
  oscP5 = new OscP5(this, oscPort);

  now = millis();
}

void draw() {
}

void oscEvent(OscMessage msg) {
  String address = msg.addrPattern();
  print(address);
    JSONObject json = new JSONObject();
    json.setString("address", address);
    // TODO: osc args

    ws.sendMessage(json.toString());
}
void webSocketServerEvent(String msg) {
  println(msg);
}
