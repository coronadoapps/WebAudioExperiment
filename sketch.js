let osc, playing, freq, amp, button;

var cnv;

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}


function setup() {
  cnv = createCanvas(800, 600);
  cnv.mousePressed(playOscillator);
  centerCanvas();
  osc = new p5.Oscillator('sine');
  background(0);
  
  button = createButton('clear');
  button.position(windowWidth/2 + 150, windowHeight/2 - 280);
  button.mousePressed(changeBG);
  
  colorPicker = createColorPicker('#ffffff');
  colorPicker.position(windowWidth/2 + 50, windowHeight/2 - 285);
  
  sliderStroke = createSlider(1, 20, 10);
  sliderStroke.position(windowWidth/2 - 120, windowHeight/2 - 280);
  
  sel = createSelect();
  sel.option('Sine');
  sel.option('Triangle');
  sel.option('Sawtooth');
  sel.option('Square');
  sel.changed(changeType);
  
  sel.position(windowWidth/2 - 230, windowHeight/2 - 280);  
}

function draw() {
  //background(60)
  freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
  amp = 0.5; //constrain(map(mouseY, height, 0, 0, 1), 0, 1);
  pan = constrain(map(mouseY, height, 0, -1, 1), -1, 1);
  
  if (playing) {
    // smooth the transitions by 0.1 seconds
    osc.freq(freq, 0.1);
    //osc.freq(2*freq, 0.7);
    osc.amp(amp, 0.1);
    osc.pan(pan, 0.1);
  }
  
  if(mouseIsPressed){
    stroke(colorPicker.color());
    strokeWeight(sliderStroke.value());
    line(mouseX, mouseY, pmouseX, pmouseY);
  }

}

function playOscillator() {
  // starting an oscillator on a user gesture will enable audio
  // in browsers that have a strict autoplay policy.
  // See also: userStartAudio();
  osc.start();
  playing = true;
}

function mouseReleased() {
  // ramp amplitude to 0 over 0.5 seconds
  osc.amp(0, 0.5);
  osc.pan(0, 0.5);
  playing = false;
}

function changeBG() {
  let val = random(255);
  background(val);
}

function changeType(){
  let val = sel.value();
  if(val == 'Sine'){
    osc.setType('sine');
  } else if(val == 'Triangle'){
   	osc.setType('triangle');
  } else if(val == 'Sawtooth'){
   	osc.setType('sawtooth');
  } else if(val == 'Square'){
   	osc.setType('square');
  }
}