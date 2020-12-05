var cnv;

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function setup() {
  cnv = createCanvas(800, 600);
  cnv.mousePressed(playSynth);
  centerCanvas();
  /*background(222);*/
  monoSynth = new p5.MonoSynth();
}

function windowResized() {
  centerCanvas();
}

function draw() {
  background(200);
  var size = 50;
  
  for (let y = 0; y < 60; y++) {
    for (let x = 0; x < 80; x++) {
      let xpos = x * size;
      let ypos = y * size;
      
      let index = y * 7 + x; // find the index
      
      if( inside(xpos, ypos, size, size) ){
        // were inside
        fill(random(255), random(255), random(255));
        //playSynth();
      } else {
        // not inside
      	fill(10);
      }
      
      stroke(222);
      rect(xpos, ypos, size, size, 10);
      
    }
  }
}

function inside(x, y, w, h){
 if(mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
  return true; 
 } else {
  return false; 
 }
}

function playSynth() {
  userStartAudio();

  let note = random(['C3','C#3','D3','D#3','E3','F3','F#3','G3','G#3','A3','A#3', 'B3']);
  // note velocity (volume, from 0 to 1)
  let velocity = 0.6;/*random();*/
  // time from now (in seconds)
  let time = 0;
  // note duration (in seconds)
  let dur = 1/6;

  monoSynth.play(note, velocity, time, dur);
}