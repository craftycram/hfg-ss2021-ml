var synth = window.speechSynthesis;
let video;
let detector;
let detections = [];
let parsedDetections = [];
let lastDetections = [];

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
  // say();
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
    parsedDetections = [];
    detections.forEach((r) => {
      parsedDetections.push(r.label);
    });
    parsedDetections.forEach((r) => {
      if (!lastDetections.includes(r)) window.speechSynthesis.speak(new SpeechSynthesisUtterance(r));
    });
    lastDetections = parsedDetections;
  }
}

function say() {
  if (detections.length === 0) {
    setTimeout(say, 1000);
  } else {
    let text = '';
    detections.forEach((object) => {
      text += `${object.label} `;
    });
    var utterThis = new SpeechSynthesisUtterance(text);
    synth.speak(utterThis);
    utterThis.onend = function(event) {
      setTimeout(say, 1000);
    }
  }
}