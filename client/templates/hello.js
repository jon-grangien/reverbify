Template.hello.events({
  'click .continue-button': function () {
    Router.go('/select');
  },


  'click .upload-button': function () {

      IonLoading.show();

      var file = document.getElementById('file_input').files[0];
      if (!file) {
        alert('Failed to find selected signal!');
        return;
      }

    // Store signal in global object Reverbify
    Reverbify.Audio = {};

      var reader = new FileReader();
      reader.onload = function (e) {
        var contents = e.target.result;


        // Convert ArrayBuffer to AudioBuffer, and store it in Reverbify
        Reverbify.AudioCtx.decodeAudioData(contents, function(buf) {
          Reverbify.Audio.signalBuffer = buf;
        });

        IonLoading.hide();
        alert('Selected audio signal loaded!');

        $('.continue-button').removeClass("disabled");
      };
      reader.readAsArrayBuffer(file);

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

      // alert('Default audio signal loaded!');
      IonLoading.hide();

      $('.default-confirmation').fadeIn("slow");

      // hide after 5 sec
      // setTimeout(function() {
      //   $('.default-confirmation').fadeOut("slow");        
      // }, 5000);

      // Store signal and kernel in global object Reverbify
      Reverbify.Audio = {};
      Reverbify.Audio.signalBuffer = signalBuffer;

      // Enable continuation
      $('.continue-button').removeClass('disabled');
    });

  }
});
