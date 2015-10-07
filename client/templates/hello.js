var currentSelection = null;

function updateCurrentSelection(newSelection) {
  if (currentSelection !== null) {
    currentSelection.addClass('button-outline');
  }
  if (newSelection !== null){
      currentSelection = newSelection;
      currentSelection.removeClass('button-outline');
  }
    else {
      currentSelection = newSelection;
  }
}

Template.hello.events({
  'click #continue-button': function () {
    Router.go('/select');
  },



  'click .upload-first': function () {
    var btn = $('#open-upload-button');
    updateCurrentSelection(btn);
    // Enable uploading
    $(function(){
      if($('.input-btn').hasClass("hidden")){
        $(".input-btn").removeClass("hidden");  }
      else {  $(".input-btn").addClass("hidden");
        updateCurrentSelection(null); }
      })

  },

  'click .upload-button': function () {

    var file = document.getElementById('file_input').files[0];
    if (!file) {
      Reverbify.updateFeedback('Failed to find audio to upload', false);
      $('.default-confirmation').show();
      return;
    }

    // Store signal in global object Reverbify
    var reader = new FileReader();
    reader.onload = function (e) {

      var contents = e.target.result;
      console.log(contents);
      // Convert ArrayBuffer to AudioBuffer, and store it in Reverbify
      Reverbify.AudioCtx.decodeAudioData(contents, function (buf) {

        Reverbify.Audio.signalBuffer = buf;
        console.log(contents);
        console.log(buf);
        });

        $('.continue-button').removeClass("disabled");
      };
      reader.readAsArrayBuffer(file);

    Reverbify.updateFeedback('Selected audio loaded!', true);
    $('.default-confirmation').fadeIn();

    reader.readAsArrayBuffer(file);
  },

  'click #open-recordview-button': function () {
    var btn = $('#open-recordview-button');
    updateCurrentSelection(btn);
    $('#record-view').css('display', 'inline');

  },

  'click #default-audio-button': function () {
    var btn = $('#default-audio-button');
    updateCurrentSelection(btn);
    IonLoading.show();

    // Load default audio signal
    Reverbify.loadAudio('/audio/default_signal.wav', function (didLoad, audioBuffer) {
      if (!didLoad) {
        Reverbify.updateFeedback('Failed to load audio!', false);
        $('.default-confirmation').show();
        IonLoading.hide();
        return;
      }

      // Store signal buffer and load kernel
      var signalBuffer = audioBuffer;

      // alert('Default audio signal loaded!');
      IonLoading.hide();

      Reverbify.updateFeedback('Default audio loaded!', true);
      $('.default-confirmation').fadeIn("slow");

      // Store signal and kernel in global object Reverbify
      Reverbify.Audio.signalBuffer = signalBuffer;

      // Enable continuation
      $('.continue-button').removeClass('disabled');
    });

  }
});

Template.hello.helpers({
  confirmation: function () {
    return Session.get('confirmation');
  }
});
