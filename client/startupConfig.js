Template.registerHelper('isIOS', function() {
  return Platform.isIOS();
});
Template.registerHelper('isAndroid', function() {
  return Platform.isAndroid();
});
Template.registerHelper('isMobile', function() {
  return Platform.isIOS() || Platform.isAndroid();
});
Template.registerHelper('isNotMobile', function() {
  return !(Platform.isIOS() || Platform.isAndroid());
});