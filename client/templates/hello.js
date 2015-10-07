Template.hello.events({
  'click .continue-button': function () {
    Router.go('/select');
  },


  'click .upload-button': function () {


      var file = document.getElementById('file_input').files[0];
      if (!file) {
        alert('Failed to find selected signal!');
        return;
      }

    // Store signal in global object Reverbify
      var reader = new FileReader();
      reader.onload = function (e) {

        var contents = e.target.result;
        console.log(contents);
        console.log("Innan");
        // Convert ArrayBuffer to AudioBuffer, and store it in Reverbify
        Reverbify.AudioCtx.decodeAudioData(contents, function(buf) {

          Reverbify.Audio.signalBuffer = buf;
          console.log(contents);
          console.log(buf);
          console.log("Här");
        });
        console.log("Där");
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
    Reverbify.loadAudio('/audio/default_signal.wav', function (didLoad, audioBuffer) {
      if (!didLoad) {
        Session.set('confirmation', 'Failed to load audio.');
        $('.default-confirmation').find('p').removeClass('balanced');
        $('.default-confirmation').find('p').addClass('assertive');
        $('.default-confirmation').show();
        IonLoading.hide();
        return;
      }

      // Store signal buffer and load kernel
      var signalBuffer = audioBuffer;

      // alert('Default audio signal loaded!');
      IonLoading.hide();

      Session.set('confirmation', 'Default audio loaded!');
      
      if ($('.default-confirmation').find('p').hasClass('assertive')) {
        $('.default-confirmation').find('p').removeClass('assertive');
        $('.default-confirmation').find('p').addClass('balanced');
      }

      $('.default-confirmation').fadeIn("slow");

      // hide after 5 sec
      // setTimeout(function() {
      //   $('.default-confirmation').fadeOut("slow");        
      // }, 5000);

      // Store signal and kernel in global object Reverbify

      Reverbify.Audio.signalBuffer = signalBuffer;

      // Enable continuation
      $('.continue-button').removeClass('disabled');
    });

  }
});

Template.hello.helpers({
  confirmation: function() {
    return Session.get('confirmation');
  }
});