Template.select.events({
  'click .reverbify-button': function () {
    Router.go('/play');
  },

  'click .option': function (event, template) {
    IonLoading.show();
    var target = event.target;

    var env_title = target.h2;
    // alert('Chose ' + env_title);

    Session.set('env_title', env_title);

    // Set correct image
    var irID = target.id;
    console.log("ir id: " + irID);
    Session.set('env_image_src', '/images/' + irID + '.jpg');

    // Set correct IR
    Reverbify.loadAudio('/audio/' + irID + '.wav', function (didLoad, audioBuffer) {
      if (!didLoad) {
        IonLoading.hide();
        alert('Failed to load kernel!');
        return;
      }
      // Store signal buffer and load kernel
      var kernelBuffer = audioBuffer;

      IonLoading.hide();
      alert('Selected kernel loaded!');

      // Store signal and kernel in global object Reverbify
      Reverbify.Audio.kernelBuffer = kernelBuffer;
    });

    $('.kernellist').hide();
    $('.environment-card').removeClass('hidden');
  },

  'click .cancel-button': function () {
    //loses ir ID!
    
    $('.kernellist').show();
    $('.environment-card').addClass('hidden');
  }
});



Template.select.helpers({
  env_title: function () {
    return Session.get('env_title');
  },
  env_image_src: function () {
    return Session.get('env_image_src');
  }
});