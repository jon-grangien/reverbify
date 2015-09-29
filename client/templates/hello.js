Template.hello.events({
  'click .continue-button': function () {
    Router.go('/convolve');
  },

  'click .use-existing-button': function () {
    $('.continue-button').removeClass("disabled");
  },

  'click .record-button': function () {
    $('.continue-button').removeClass("disabled");
  }
});