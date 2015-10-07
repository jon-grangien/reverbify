var currentSelection = null;

function updateCurrentSelection(newSelection) {
  if (currentSelection !== null) {
    currentSelection.addClass('button-outline');
  }
  currentSelection = newSelection;
  currentSelection.removeClass('button-outline');
}

Template.hello.events({
  'click #continue-button': function () {
    Router.go('/select');
  },

  'click #use-existing-button': function () {
    var btn = $('#use-existing-button');
    updateCurrentSelection(btn);
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
        alert('Failed to load default signal!');
        IonLoading.hide();
        return;
      }

      // Store signal buffer and load kernel
      var signalBuffer = audioBuffer;

      alert('Default audio signal loaded!');
      IonLoading.hide();

      // Store signal and kernel in global object Reverbify
      Reverbify.Audio.signalBuffer = signalBuffer;

      // Enable continuation
      $('.continue-button').removeClass('disabled');
    });

  }
});

Template.hello.helpers({
  continueButtonClass: function () {
    if (!Reverbify.Audio.signalBuffer) {
      return 'disabled';
    }
    return '';
  }
});