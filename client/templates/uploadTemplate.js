Template.uploadTemplate.events({
  'click #upload-button': function () {
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
  }
});