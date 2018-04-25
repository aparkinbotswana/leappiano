document.addEventListener('DOMContentLoaded', function(){
  // var text = "I am a dirty little robot"
  function voicePlay(text){
    if(responsiveVoice.voiceSupport()) {

    responsiveVoice.speak(text);
  }}

  var concatData = function(id, data) {
    return id + ": " + data + "<br>"
  }

  function getFingerName(fingerType){
    switch (fingerType) {
      case 0:
        return 'Thumb';
      break;

      case 1:
        return 'Index';
      break;

      case 2:
        return 'Middle';
      break;

      case 3:
        return 'Ring';
      break;

      case 4:
        return 'Pinky';
      break;
    }
  }

  function concatJointPosition(id, position){
    return id + ": " + position[0] + ", " + position[1] + ", " + position[2] + "<br>"

  }

  var output = document.getElementById('output');
  var frameString = "", handString = "", fingerString = "";
  var hand, finger;

  var l = null;
  var r = null;


  Leap.loop(/*options,*/ function(frame){

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

    frameString += concatData("num_fingers", frame.fingers.length);
    frameString += "<br>";

    if (l) {
      let lf = l.fingers;

      if (
        // both index fingers extended
        (lf[2].extended)
        // no other fingers on L extended
        && (!lf[0].extended && !lf[1].extended && !lf[3].extended && !lf[4].extended)) {
        let text = 'I am a dirty little robot'
        voicePlay(text)
        console.log('You are, indeed, a dirty little robot');
      }
    }


    for (var i = 0; i < frame.hands.length; i++) {
      hand = frame.hands[i];
      handString = concatData("hand_type", hand.type);
      handString += concatData("pinch_strength", hand.pinchStrength);
      handString += concatData("grab_strength", hand.grabStrength);
      handString += concatData("confidence", hand.confidence);


      handString += '<br>'


      fingerString = concatJointPosition("finger_thumb_dip", hand.thumb.dipPosition);

      finger = hand.fingers[1];
      fingerString += concatData("finger_type", finger.type) + " (" + getFingerName(finger.type) + ") <br>"
      fingerString += concatData("finger_dip", finger.dipPosition);
      fingerString += concatData("finger_pip", finger.pipPosition);
      fingerString += concatData("finger_mcp", finger.mcpPosition);
      fingerString += '<br>'
      frameString += handString;
      frameString += fingerString;
    }

    output.innerHTML = frameString;
  })
}, false);
