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