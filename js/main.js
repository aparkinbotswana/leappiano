let midi = {};
let MIDI_OUTPUT = 'LinuxSampler_in_0';

// see also https://github.com/cotejp/webmidi  good lib
 if (navigator.requestMIDIAccess) {
   navigator.requestMIDIAccess()
   .then(midiAccess => {
     midi.inputs = midiAccess.inputs;
     midi.outputs = midiAccess.outputs;

     console.log('midi', midi);

     for (var output of midiAccess.outputs.values()){
       // console.log('output:', output);
       if( output.name === MIDI_OUTPUT ){
         midi.out = output;
         console.log('output', output);
       }
     }
   },
   fail => console.log('midi connection failure', fail)
   );
 } else {
   console.log('WebMIDI is not supported in this browser.');
 }


document.addEventListener('DOMContentLoaded', function(){

  document.addEventListener('keydown', function(){
    console.log('playing!');
    midi.out.send([144, 60, 80]);  // [ eventType (144 == noteOn), noteNumber, velocity ]
  });

  // var text = "I am a dirty little robot"
  function voicePlay(text){
    if(responsiveVoice.voiceSupport()) {

    responsiveVoice.speak(text);
  }}

  const concatData = function(id, data) {
    return id + ": " + data + "<br>"
  }


  let output = document.getElementById('output');
  let frameString = "", handString = "", fingerString = "";
  let hand, finger;

  let l = null;
  let r = null;


  Leap.loop( function(frame){

    frameString = concatData("frame_id", frame.id);
    frameString += concatData("num_hands", frame.hands.length);

    if( frame.hands.length > 1 ){
      frameString += concatData("hands[0].type", frame.hands[0].type);
      frameString += concatData("hands[1].type", frame.hands[1].type);

      if( frame.hands[0].type === "left") {
        l = frame.hands[0];
        r = frame.hands[1];
      } else {
        l = frame.hands[1];
        r = frame.hands[0];
      }

    } else if( frame.hands.length > 0 ){
      frameString += concatData("hands[0].type", frame.hands[0].type);

      if( frame.hands[0].type === "left") {
        l = frame.hands[0];
        r = null;
      } else {
        r = frame.hands[0];
        l = null;
      }

    } else if( frame.hands.length === 0 ){
      l = null;
      r = null;
    }

    // frameString += concatData("num_fingers", frame.fingers.length);
    frameString += "<br>";

    if (l) {
      let lf = l.fingers;
      let lfIndexTipY = lf[1].tipPosition[1]
      let lfIndexTipX = lf[1].tipPosition[0]

      // if (
      //   // both index fingers extended
      //   (lf[2].extended)
      //   // no other fingers on L extended
      //   && (!lf[0].extended && !lf[1].extended && !lf[3].extended && !lf[4].extended)) {
      //   let text = 'Someone is being naughty'
      //   voicePlay(text)
      // }

      if (lfIndexTipY > 250 && lfIndexTipY < 350 && lfIndexTipX > 0 && lfIndexTipX < 100) {
        console.log('if < 100');
      } else if (lfIndexTipY > 250 && lfIndexTipY < 350 && lfIndexTipX > 100 && lfIndexTipX < 200) {
        console.log('elseif > 100');
      }
    }


    for (var i = 0; i < frame.hands.length; i++) {
      hand = frame.hands[i];
      handString = concatData("hand_type", hand.type);
      handString += concatData("pinch_strength", hand.pinchStrength);
      handString += concatData("grab_strength", hand.grabStrength);
      handString += concatData("confidence", hand.confidence);


      // var xdist = hand.fingers[1].tipPosition[0]
      // var ydist = hand.fingers[1].tipPosition[1]
      // var zdist = hand.fingers[1].tipPosition[2]


      handString += '<br>'


      // finger = hand.fingers[1];
      // fingerString += concatData("finger_type", finger.type) + " (" + getFingerName(finger.type) + ") <br>"
      // fingerString += concatData("finger_dip", finger.dipPosition);
      // fingerString += concatData("finger_pip", finger.pipPosition);
      // fingerString += concatData("finger_mcp", finger.mcpPosition);
      frameString += 'xTipDist (side to side)  ' + hand.fingers[1].tipPosition[0]
      frameString += '<br>'
      frameString += ' yTipDist (up and down)  ' + hand.fingers[1].tipPosition[1]
      frameString += '<br>'
      frameString += ' zTipDist (Back and forth)  ' + hand.fingers[1].tipPosition[2]
    }

    output.innerHTML = frameString;
  })
}, false);
