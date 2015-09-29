Template.convolve.events({
  'click .reverbify-button': function () {
    Router.go('/play');
  },

  'click .option': function (event, template) {
    var target = event.target;

    var environment = target.innerHTML;
    alert('Chose ' + environment);
  }
});