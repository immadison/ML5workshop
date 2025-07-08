/*
 * 👋 Hello! This is an ml5.js example made and shared with ❤️.
 * Learn more about the ml5.js project: https://ml5js.org/
 * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * This example demonstrates hand tracking on live video through ml5.handPose.
 */

let handPose;
let video;
let hands = [];
let painting;

function preload() {
  // Load the handPose model
  handPose = ml5.handPose({flipped: true});
}

function mousePressed() {
  console.log(hands);
}

function setup() {
  createCanvas(640, 480);
  painting = createGraphics(640,480)
  // Create the webcam video and hide it
  video = createCapture(VIDEO, {flipped: true});
  video.size(640, 480);
  video.hide();
  // start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);
  
  //make sure there is at least one hand
  if(hands.length > 0){
    let hand = hands[0];
    let index = hand.index_finger_tip;
    let thumb = hand.thumb_tip;
    
    painting.noStroke();
    painting.fill(255,0,0);
    
    //get distance between thumb and pointer
    let d = dist(index.x, index.y, thumb.x, thumb.y)
    //if touching draw
    if(d < 20){
      painting.fill(255,255,0)
          let x = (index.x + thumb.x) * 0.5;
    let y = (index.y + thumb.y) * 0.5;
    painting.circle(x,y,16)
    }

    
    // circle(index.x, index.y,16);
    // circle(thumb.x, thumb.y,16);
    
  }
  

//   // Draw all the tracked hand points
//   for (let i = 0; i < hands.length; i++) {
//     let hand = hands[i];
//     for (let j = 0; j < hand.keypoints.length; j++) {
//       let keypoint = hand.keypoints[j];
//       if(hand.handedness == "Left"){
//         fill(0, 255, 0);
//       } 
//       else{fill(255,0,0)}
      
//       noStroke();
//       circle(keypoint.x, keypoint.y, 10);
//     }
//   }
  
  image(painting,0,0)
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}
