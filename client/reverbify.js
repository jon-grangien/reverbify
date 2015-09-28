Session.setDefault('counter', 0);

Template.hello.helpers({
  counter: function () {
    return Session.get('counter');
  }
});

Template.hello.events({
  'click button': function () {
    Session.set('counter', Session.get('counter') + 1);
  }
});

Template.uploadTest.events({
	// simple test
	'change .fileUploader': function(event, template) {
    var files = event.target.files;
    for (var i = 0, ln = files.length; i < ln; i++) {
      Images.insert(files[i], function (err, fileObj) {
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      	if (err) {
      		console.log("Error: " + err);
      	}
      });
    }
  }
});