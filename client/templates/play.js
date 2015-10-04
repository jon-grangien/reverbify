Template.play.events({
  'click .play-button': function () {
    console.log("pressed");
    IonLoading.show();

    if( Platform.isAndroid() ) {
        console.log("platform android");

        if (!window.AudioContext) {
            if (!window.webkitAudioContext) {
                console.log("audiocontext unsupported :(");
            }
            window.AudioContext = window.webkitAudioContext;
        }

        var kernel = Reverbify.Audio.kernelBuffer;
        var signal = Reverbify.Audio.signalBuffer;

        console.log("convoluting");
        var conv = Reverbify.convolve(signal, kernel);
        console.log("convolution done");

        var context = new AudioContext();

        var buffer = new Uint8Array( conv.length );
        buffer.set( new Uint8Array(conv), 0 );

        console.log("decoding");

        context.decodeAudioData(buffer.buffer, function(audioBuffer) {
            var source = context.createBufferSource();
            source.buffer = audioBuffer;
            source.connect( context.destination );
            source.start(0);
        });

        console.log("all done");

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