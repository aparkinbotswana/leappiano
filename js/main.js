let midi = {};
let MIDI_OUTPUT = 'LinuxSampler_in_0';

// see also https://github.com/cotejp/webmidi  good lib
if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess()
  .then(midiAccess => {
    midi.inputs = midiAccess.inputs;
    midi.outputs = midiAccess.outputs;

    // console.log('midi', midi);

    for (let output of midiAccess.outputs.values()){
      // console.log('output:', output);
      if( output.name === MIDI_OUTPUT ){
        midi.out = output;
        // console.log('output', output);
      }
    }
  },
  fail => console.log('midi connection failure', fail)
  );
} else {
  console.log('WebMIDI is not supported in this browser.');
}

document.addEventListener('DOMContentLoaded', function(){

  let canvasElement = document.getElementById("displayArea");
  let displayArea = canvasElement.getContext("2d");
  var count = 1

// setTimeout(function(){ alert("Hello"); }, 3000);
  Leap.loop( function(frame){

    if(frame.pointables.length > 0)
    {
      canvasElement.width = canvasElement.width; //clear
      
      //Get a pointable and normalize the tip position
      let pointable = frame.pointables[0];
      let speed = pointable.tipVelocity;
      // console.log(speed);
      let interactionBox = frame.interactionBox;
      let normalizedPosition = interactionBox.normalizePoint(pointable.tipPosition, true);
      
      // Convert the normalized coordinates to span the canvas
      let canvasX = canvasElement.width * normalizedPosition[0];
      let canvasY = canvasElement.height * (1 - normalizedPosition[1]);
      //we can ignore z for a 2D context
      displayArea.strokeText("(" + canvasX.toFixed(1) + ", " + canvasY.toFixed(1) + ")", canvasX, canvasY);

      count += 1

      console.log('playing ' + count);
      // [ eventType (144 == noteOn), noteNumber, velocity ]
      if (canvasX > 0 && canvasX < 5){
        midi.out.send([144, 61, 80]);
      } else if (canvasX > 5 && canvasX < 10){
        midi.out.send([144, 62, 80]);
      } else if (canvasX > 10 && canvasX < 15){
        midi.out.send([144, 63, 80]);
      } else if (canvasX > 15 && canvasX < 20){
        midi.out.send([144, 64, 80]);
      } else if (canvasX > 20 && canvasX < 25){
        midi.out.send([144, 65, 80]);
      } else if (canvasX > 25 && canvasX < 30){
        midi.out.send([144, 66, 80]);
      } else if (canvasX > 30 && canvasX < 35){
        midi.out.send([144, 67, 80]);
      } else if (canvasX > 35 && canvasX < 40){
        midi.out.send([144, 68, 80]);
      } else if (canvasX > 40 && canvasX < 45){
        midi.out.send([144, 69, 80]);
      } else if (canvasX > 45 && canvasX < 50){
        midi.out.send([144, 70, 80]);
      } else if (canvasX > 50 && canvasX < 55){
        midi.out.send([144, 71, 80]);
      } else if (canvasX > 55 && canvasX < 60){
        midi.out.send([144, 72, 80]);
      } else if (canvasX > 60 && canvasX < 65){
        midi.out.send([144, 73, 80]);
      } else if (canvasX > 65 && canvasX < 70){
        midi.out.send([144, 74, 80]);
      } else if (canvasX > 70 && canvasX < 75){
        midi.out.send([144, 75, 80]);
      } else if (canvasX > 75 && canvasX < 80){
        midi.out.send([144, 76, 80]);
      } else if (canvasX > 80 && canvasX < 85){
        midi.out.send([144, 77, 80]);
      } else if (canvasX > 85 && canvasX < 90){
        midi.out.send([144, 78, 80]);
      } else if (canvasX > 90 && canvasX < 95){
        midi.out.send([144, 79, 80]);
      } else if (canvasX > 95 && canvasX < 100){
        midi.out.send([144, 80, 80]);
      }
    }
  })
}, false);
