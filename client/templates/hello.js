var playConvolvedAudio = function () {
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
};

Template.hello.events({
  'click .continue-button': function () {
    Router.go('/convolve');
  },

  'click .use-existing-button': function () {
    $('.continue-button').removeClass("disabled");
  },

  'click .record-button': function () {
    $('.continue-button').removeClass("disabled");
  },

  'click .default-audio-button': function () {
    // Load default audio signal
    Reverbify.loadAudio('/audio/default_signal.wav', function (didLoad, audioBuffer) {
      if (!didLoad) {
        alert('Failed to load default signal!');
        return;
      }

      // Store signal buffer and load kernel
      var signalBuffer = audioBuffer;

      Reverbify.loadAudio('/audio/default_kernel_K4.wav', function (didLoad, audioBuffer) {
        if (!didLoad) {
          alert('Loaded default signal but failed to load default kernel!');
          return;
        }

        alert('Default audio signal and kernel loaded!');

        // Store signal and kernel in global object Reverbify
        Reverbify.Audio = {}
        Reverbify.Audio.signalBuffer = signalBuffer;
        Reverbify.Audio.kernelBuffer = audioBuffer;

        // Enable continuation
        $('.continue-button').removeClass('disabled');
      });
    });

  }
});