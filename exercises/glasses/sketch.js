// Copyright (c) 2020 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Object Detection using COCOSSD
This example uses a callback pattern to create the classifier
=== */

let video;
let detector;
let detections = [];

let data = new Map();

const confidenceThreshold = 0.75;
const countThreshold = 24;
const timeout = 3000;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  // Models available are 'cocossd', 'yolo'
  detector = ml5.objectDetector("cocossd", modelReady);
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
  results.forEach((detection) => {
    if (detection.confidence > confidenceThreshold) {
      detection.timestamp = millis();
      let alreadyDetectedItem = data.get(detection.label);
      if (alreadyDetectedItem) {
        detection.counter = alreadyDetectedItem.counter + 1;
        if (detection.counter === countThreshold) {
          console.log(
            "new item detected",
            detection.label,
            detection.confidence
          );
        }
        data.set(detection.label, detection);
      } else {
        detection.counter = 1;
        data.set(detection.label, detection);
      }
      data.set(detection.label, detection);
    }
  });
  detector.detect(video, gotDetections);
}

function modelReady() {
  detector.detect(video, gotDetections);
}

function draw() {
  // if item has not been updated for 3s then we remove it from the map
  data.forEach((value, key) => {
    if (millis() - value.timestamp > timeout) {
      data.delete(key);
      if (value.counter >= countThreshold) {
        console.log("item removed", key);
      }
    }
  });

  image(video, 0, 0);
  data.forEach((value, key) => {
    let object = value;
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill(255);
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);
  });
}
