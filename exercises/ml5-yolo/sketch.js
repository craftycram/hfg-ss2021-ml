let video;
let detector;
let detections = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  // Models available are 'cocossd', 'yolo'
  detector = ml5.objectDetector('cocossd', modelReady);
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
  detector.detect(video, gotDetections);
}

function modelReady() {
  detector.detect(video, gotDetections);
}

function draw() {
  image(video, 0, 0);
  for (let i = 0; i < detections.length; i++) {
    let object = detections[i];
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill(255);
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);
  }
}

function say() {
  if (detections.length === 0) {
    setTimeout(say, 1000);
  } else {
    const voices = [];
    detections.forEach((object) => {
      voices.push(window.speechSynthesis.speak(new SpeechSynthesisUtterance(object.label)));
    });
    Promise.all(voices).then(() => {
      setTimeout(say, 1000);
    });
  }
}
say();