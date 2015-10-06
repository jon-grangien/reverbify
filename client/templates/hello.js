Template.hello.events({
  'click .continue-button': function () {
    Router.go('/select');
  },

  'click .use-existing-button': function () {
    $('.continue-button').removeClass("disabled");
  },

  'click .record-button': function () {
    $('.continue-button').removeClass("disabled");
  },

  'click .default-audio-button': function () {
    IonLoading.show();
    // Load default audio signal
    Reverbify.loadAudio('/audio/sowehaveblank.wav', function (didLoad, audioBuffer) {
      if (!didLoad) {
        alert('Failed to load default signal!');
        IonLoading.hide();
        return;
      }

      // Store signal buffer and load kernel
      var signalBuffer = audioBuffer;

      alert('Default audio signal loaded!');
      IonLoading.hide();

      // Store signal and kernel in global object Reverbify
      Reverbify.Audio = {};
      Reverbify.Audio.signalBuffer = signalBuffer;

      // Enable continuation
      $('.continue-button').removeClass('disabled');
    });

  }
});