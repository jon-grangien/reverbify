Template.convolve.events({
  'click .reverbify-button': function () {
    Router.go('/play');
  },

  'click .option': function (event, template) {
    var target = event.target;

    var env_title = target.innerHTML;
    alert('Chose ' + env_title);

    Session.set('env_title', env_title);

    $('.environment-card').removeClass('hidden');
  }
});

Session.setDefault('env_title', '>Default title<');
Session.setDefault('env_image_src', '/images/env_image_default.jpg');

Template.convolve.helpers({
  env_title: function () {
    return Session.get('env_title');
  },
  env_image_src: function () {
    return Session.get('env_image_src');
  }
});