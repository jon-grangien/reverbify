var currentSelection = null;

function updateCurrentSelection(newSelection) {
  if (currentSelection !== null) {
    currentSelection.addClass('button-outline');
  }
  if (newSelection !== null) {
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
    $(function () {
      if ($('.input-btn').hasClass("hidden")) {
        $(".input-btn").removeClass("hidden");
      }
      else {
        $(".input-btn").addClass("hidden");
        updateCurrentSelection(null);
      }
    })

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
  },
  menuItems: [
    {
      title: 'Upload',
      icon: 'ion-ios-upload',
      hasContent: true,
      meteorTemplate: 'uploadTemplate'
    },
    {
      title: 'Record',
      icon: 'ion-mic-a',
      hasContent: true,
      meteorTemplate: 'recordTemplate'
    },
    {
      title: 'Use default audio',
      icon: 'ion-ios-play',
      id: 'default-audio-button',
      hasContent: false,
      meteorTemplate: 'useDefaultTemplate'
    }
  ]
});

Template.hello.rendered = function () {
  var accord = $('.ui.accordion');

  accord.accordion({
    onOpen: function() {
      var title = $('.title.active')[0];

    }
  })
  ;
};