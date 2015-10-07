Template.play.events({
  'click .play-button': function () {
    console.log("pressed");
    IonLoading.show();

    if( Platform.isAndroid() ) {
        console.log("platform android");

        var kernel = Reverbify.Audio.kernelBuffer;
        var signal = Reverbify.Audio.signalBuffer;

        //ta ut arrayer
        var kernelData = kernel.getChannelData(1);
        var signalData = signal.getChannelData(1);

        //falta
        console.log("convoluting");
        var result = Reverbify.convolve(signalData, kernelData);
        console.log("convolution done");


        //sätt till audio buffers
        var arrayBuffer = new ArrayBuffer(result.length);
        var bufferView = new Uint8Array(arrayBuffer);
        for (i = 0; i < result.length; i++) {
          bufferView[i] = result[i];
        }

        // play
        Reverbify.audioCtx.decodeAudioData(arrayBuffer, function(buffer) {
            // Create a source node from the buffer
            var source = Reverbify.audioCtx.createBufferSource();
            source.buffer = buffer;
            // Connect to the final output node (the speakers)
            source.connect(Reverbify.audioCtx.destination);
            // Play immediately
            source.start(0);

        });

        IonLoading.hide();
        // alert('Android not supported yet');
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