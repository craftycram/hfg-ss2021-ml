
  // Global variable to store the classifier
let classifier;

// Label
let label = 'listening...';

// Teachable Machine model URL:
let soundModel = 'https://teachablemachine.withgoogle.com/models/sPe7Zp1Zq/';

async function initPew() {
  classifier = await ml5.soundClassifier(soundModel + 'model.json');
  classifier.classify(gotResult);
}

initPew();

// The model recognizing a sound will trigger this event
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  console.log(results[0].label);
  if (results[0].label === 'pew') fireBullet();
}
