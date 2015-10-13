Template.recordTemplate.events({
  'click .toggle-record-button': function () {
    console.log('click');

    var toggleRecordButton = $('.toggle-record-button');
    if (Reverbify.AudioRecord.isRecording) {
      Reverbify.AudioRecord.stop();
      toggleRecordButton.innerHTML = '<strong>Start</strong>/Stop';
      toggleRecordButton.removeClass('button-assertive').addClass('button-positive');
      return;
    }

    Reverbify.AudioRecord.start();
    toggleRecordButton.innerHTML = 'Start/<strong>Stop</strong>';
    toggleRecordButton.addClass('button-assertive').removeClass('button-positive');
  },
  'click .reset-record-button': function () {
  }
});