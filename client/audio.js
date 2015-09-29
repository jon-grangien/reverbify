// Load Web Audio API context
Reverbify.AudioCtx = new (window.AudioContext || window.webkitAudioContext)();

/**
 * Loads the audio file located at "path" using the Web Audio API, and calls onLoad when completed
 * @param path The path to the audio file
 * @param onLoad Callback {{ function(didLoad, audioBuffer) }}. If didLoad is true, audioBuffer contains the loaded data.
 * If didLoad is false, audioBuffer is null.
 */
Reverbify.loadAudio = function (path, onLoad) {
  // Load the audio file using a GET request
  var xhr = new XMLHttpRequest();

  xhr.responseType = 'arraybuffer';
  xhr.open('GET', path, true);

  xhr.onload = function () {
    // The arraybuffer contains the audio data from the given file
    var audioData = xhr.response;

    Reverbify.AudioCtx.decodeAudioData(
        audioData,
        function (decodedData) {
          // The audio data loaded successfully, callback with success and the data
          onLoad(true, decodedData);
        },
        function (err) {
          // The audio data failed to load, callback with failure and AudioBuffer = null
          console.log("Error while decoding audio data: " + err);
          onLoad(false, null);
        }
    );
  };

  xhr.send();
};

// Test of the loadAudio function
/*
(function () {
  console.log('Test loadAudio function');
  Reverbify.loadAudio('/audio/K4_impulse_response.wav', function (didLoad, audioBuffer) {
    if (didLoad) {
      console.log('Audio file loaded');
      console.log(audioBuffer);

      for (var i = 0; i < audioBuffer.numberOfChannels; ++i) {
        console.log(audioBuffer.getChannelData(i));
      }
    }

    else {
      console.log('Failed to load audio file');
    }
  })
})();
    */