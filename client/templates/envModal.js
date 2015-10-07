Template.envModal.events({
  'click .reverbify-button': function (event, template) {
    Router.go('/play');
  }
});

Template.envModal.helpers({
  title: function () {
    return Session.get('env_title');
  },
  image_src: function () {
    return Session.get('env_image_src');
  }
});