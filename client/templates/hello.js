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

      alert('Default audio signal loaded!');


      // Store signal and kernel in global object Reverbify
      Reverbify.Audio = {};
      Reverbify.Audio.signalBuffer = signalBuffer;

      // Enable continuation
      $('.continue-button').removeClass('disabled');
    });

  }
});