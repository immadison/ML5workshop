let handPose;
let video;
let hands = [];
let painting;

function preload() {
  // Load the handPose model
  handPose = ml5.handPose({flipped:true});
}

function mousePressed(){
  console.log(hands);
}

function setup() {
  createCanvas(640, 480);
  painting = createGraphics(640,480);
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
  if(hands.length>0){
    let hand = hands[0];
    let index = hand.index_finger_tip;
    let thumb = hand.thumb_tip;
    
    let d = dist(index.x, index.y, thumb.x, index.y);
    if(d < 15){
      painting.fill(0,255,0);
      painting.noStroke();
      
      let x = (index.x + thumb.x) * 0.5;
      let y = (index.y + thumb.y) * 0.5;
      painting.circle(x, y, 16);
    }
  }
    image(painting,0,0)
}
  // Callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}
