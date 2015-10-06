Template.select.events({
  'click .reverbify-button': function () {
    Router.go('/play');
  },

  'click .option': function (event, template) {
    IonLoading.show();
    var env_title = this.title;

    Session.set('env_title', env_title);

    // Set correct image
    var irID = this.id;
    // console.log("ir id: " + irID);
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
    //loses audio kernel!
    
    $('.kernellist').show();
    $('.environment-card').addClass('hidden');    
  }
});


//Session.setDefault('env_title', '>Default title<');
//Session.setDefault('env_image_src', '/images/env_image_default.jpg');

Template.select.helpers({
  environments: [
    {
      id: "Matteus", 
      title: "Matteus Church",
      desc: "Nice church in Norrköping"
    },
    {
      id: "K4", 
      title: "K4",
      desc: "Förståsch."
    },
    {
      id: "Bath_House", 
      title: "Bath House",
      desc: ""
    },
    {
      id: "Car_Park", 
      title: "Car Park",
      desc: "Large open space."
    },
    {
      id: "Cavern", 
      title: "Cavern",
      desc: "Creepy. Adventure."
    },
    {
      id: "Cinema_Room", 
      title: "Cinema Room",
      desc: "Bouncy."
    },
    {
      id: "Concert_Hall", 
      title: "Concert Hall",
      desc: "wow."
    },
    {
      id: "Old_Chamber", 
      title: "Old Chamber",
      desc: "Very old."
    },
    {
      id: "Stone_Quarry", 
      title: "Stone Quarry",
      desc: "It rocks."
    }
  ],
  env_title: function () {
    return Session.get('env_title');
  },
  env_image_src: function () {
    return Session.get('env_image_src');
  }
});