const URL = "https://teachablemachine.withgoogle.com/models/ve34tyWh3/";
let model, webcam, ctx, labelContainer, maxPredictions;

async function initPose() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  // load the model and metadata
  // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
  // Note: the pose library adds a tmPose object to your window (window.tmPose)
  model = await tmPose.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  // Convenience function to setup a webcam
  const size = 200;
  const flip = true; // whether to flip the webcam
  webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
  await webcam.setup(); // request access to the webcam
  await webcam.play();
  window.requestAnimationFrame(loop);
}

async function loop(timestamp) {
  webcam.update(); // update the webcam frame
  await predict();
  window.requestAnimationFrame(loop);
}

async function predict() {
  // Prediction #1: run input through posenet
  // estimatePose can take in an image, video or canvas html element
  const {
    pose,
    posenetOutput
  } = await model.estimatePose(webcam.canvas);
  // Prediction 2: run input through teachable machine classification model
  const prediction = await model.predict(posenetOutput);

  const result = prediction.find((e) => e.probability > 0.9);
  console.log(result ? result.className : 'error');

  if (result) {
    switch (result.className) {
      case 'links':
        spaceshipPos = Math.max(0, spaceshipPos - spaceshipOffsetSteps);
        break;
      case 'rechts':
        spaceshipPos = Math.min(cols - 7, spaceshipPos + spaceshipOffsetSteps);
        break;
      default:
        break;
    }
  }

}

initPose();