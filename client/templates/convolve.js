Template.convolve.events({
  'click .reverbify-button': function () {
    Router.go('/play');
  },

  'click .option': function (event, template) {
    var target = event.target;

    var env_title = target.innerHTML;
    alert('Chose ' + env_title);

    Session.set('env_title', env_title);

    // Set correct image
    var irID = target.id;
    Session.set('env_image_src', '/images/' + irID + '.jpg');

    // Set correct IR
    Reverbify.loadAudio('/audio/' + irID + '.wav', function (didLoad, audioBuffer) {
      if (!didLoad) {
        alert('Failed to load kernel!');
        return;
      }
      // Store signal buffer and load kernel
      var kernelBuffer = audioBuffer;

      alert('Selected kernel loaded!');

      // Store signal and kernel in global object Reverbify
      Reverbify.Audio.kernelBuffer = kernelBuffer;
    });

    $('.environment-card').removeClass('hidden');
  }
});


//Session.setDefault('env_title', '>Default title<');
//Session.setDefault('env_image_src', '/images/env_image_default.jpg');

Template.convolve.helpers({
  env_title: function () {
    return Session.get('env_title');
  },
  env_image_src: function () {
    return Session.get('env_image_src');
  }
});