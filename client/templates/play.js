Template.play.rendered = function() {
Session.set("isPlaying", false);
};

Template.play.events({
  'click .play-button': function () {
    // IonLoading.show();

    if (Platform.isAndroid()) {
      // console.log("platform android");

      // var kernel = Reverbify.Audio.kernelBuffer;
      // var signal = Reverbify.Audio.signalBuffer;

      // //ta ut arrayer
      // var kernelData = kernel.getChannelData(1);
      // var signalData = signal.getChannelData(1);

      // //falta
      // console.log("convoluting");
      // var result = Reverbify.convolve(signalData, kernelData);
      // console.log("convolution done");


      // //sätt till audio buffers
      // var arrayBuffer = new ArrayBuffer(result.length);
      // var bufferView = new Uint8Array(arrayBuffer);
      // for (i = 0; i < result.length; i++) {
      //   bufferView[i] = result[i];
      // }

      // // play
      // Reverbify.audioCtx.decodeAudioData(arrayBuffer, function (buffer) {
      //   // Create a source node from the buffer
      //   var source = Reverbify.audioCtx.createBufferSource();
      //   source.buffer = buffer;
      //   // Connect to the final output node (the speakers)
      //   source.connect(Reverbify.audioCtx.destination);
      //   // Play immediately
      //   source.start(0);

      // });

      // IonLoading.hide();
      alert('Android not supported yet');

    }

    else {

      // Pause if playing
      if (Session.get("isPlaying")) {
        clearTimeout(Reverbify.playTimer);  //stop playback timer
        Reverbify.audioSourceNode.stop();   //stop playback
        Session.set("isPlaying", false);
        // console.log("paused");
        return;
      }

      // Create AudioBufferSourceNode (inherits from AudioNode) and set its buffer to the loaded signal
      Reverbify.audioSourceNode = Reverbify.AudioCtx.createBufferSource();
      Reverbify.audioSourceNode.buffer = Reverbify.Audio.signalBuffer;

      // Create ConvolverNode (inherits from AudioNode) and set its buffer to the loaded kernel
      var convolverNode = Reverbify.AudioCtx.createConvolver();
      convolverNode.buffer = Reverbify.Audio.kernelBuffer;

      // Connect the source node's output to the convolver node's input
      Reverbify.audioSourceNode.connect(convolverNode);
      // Connect the convolver node's output to the audio player
      convolverNode.connect(Reverbify.AudioCtx.destination);

      // IonLoading.hide();

      Session.set("isPlaying", true);
      // console.log("playing (druation: " + Reverbify.audioSourceNode.buffer.duration * 1000);

      // Play the sound
      Reverbify.audioSourceNode.start();

      // Find end of playback and update playing state
      Reverbify.playTimer = setTimeout(function() {
        if(Session.get("isPlaying")) {
          Session.set("isPlaying", false);
          // console.log('playback finished');
        }

      }, Reverbify.audioSourceNode.buffer.duration * 1000);
    }
  }
});

Template.play.helpers({
  icon: function() {
    if(Session.get("isPlaying"))
      return "pause";
    else 
      return "play";
  },
  text: function() {
    if(Session.get("isPlaying"))
      return "Pause";
    else
      return "Play sound";
  }
});
