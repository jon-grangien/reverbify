Template.play.events({
  'click .play-button': function () {
    IonLoading.show();

    if( Platform.isAndroid() ) {
        // var env_title = Reverbify.Audio.kernelBuffer;
        // var signal = Reverbify.Audio.signalBuffer;

        // var conv = Reverbify.convolution(signal, env_title);
        IonLoading.hide();
        alert('Android not supported yet');
    }

    else {
        // Create AudioBufferSourceNode (inherits from AudioNode) and set its buffer to the loaded signal
        var audioSourceNode = Reverbify.AudioCtx.createBufferSource();
        audioSourceNode.buffer = Reverbify.Audio.signalBuffer;

        // Create ConvolverNode (inherits from AudioNode) and set its buffer to the loaded kernel
        var convolverNode = Reverbify.AudioCtx.createConvolver();
        convolverNode.buffer = Reverbify.Audio.kernelBuffer;

        // Connect the source node's output to the convolver node's input
        audioSourceNode.connect(convolverNode);
        // Connect the convolver node's output to the audio player
        convolverNode.connect(Reverbify.AudioCtx.destination);

        // Play the sound
        audioSourceNode.start();
        IonLoading.hide();
    }
  }
});