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
  
  button = createButton('limpiar');
  button.position(windowWidth/2-50, windowHeight/2 - 260);
  button.size(100,40);
  button.style('font-family','Nerko One');
  button.style("background-color", "#eee");
  button.style("color", "#222");
  button.style('font-size','20px')
  button.mousePressed(changeBG);
  
  colorPicker = createColorPicker('#ffffff');
  colorPicker.position(windowWidth/2 - 400, windowHeight/2 - 250);
  
  sliderStroke = createSlider(10, 50, 25);
  sliderStroke.position(windowWidth/2 - 400, windowHeight/2 - 280);

    
}

function draw() {
  
  
  //background(60)
  freq = constrain(map(mouseY, width, 0, 100, 500), 100, 500);
  amp = sliderStroke.value()/100;
  pan = constrain(map(mouseX, 0, height, -1, 1), -1, 1);
  
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
    
    changeType()
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
  let val = random([0,255]);
  background(val);
}

function changeType(){
  let r = colorPicker.color().levels[0];
  let g = colorPicker.color().levels[1]; 
  let b = colorPicker.color().levels[2];
  
  //print(r, g, b)
  
  if(r > 150 && g < 100 && b < 100){
    osc.setType('square');
  } else if(r < 100 && g > 150 && b < 100){
    osc.setType('triangle');
  } else if(r < 100 && g < 100 && b > 150){
    osc.setType('sawtooth');
  } else{
    osc.setType('sine');
  }
}