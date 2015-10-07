// Load Web Audio API context
(function () {
  if (!window.AudioContext && !window.webkitAudioContext) {
    alert('Unfortunately, the "Web Audio API" is not supported in your browser, so Reverbify will NOT work.');
    throw new Error('Web Audio API not supported...');
  }
})();

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

function hasUserMedia() {
  if (!!navigator.getUserMedia)
    return true;

  if (!!navigator.webkitGetUserMedia) {
    navigator.getUserMedia = navigator.webkitGetUserMedia;
    return true;
  }

  if (!!navigator.mozGetUserMedia) {
    navigator.getUserMedia = navigator.mozGetUserMedia;
    return true;
  }

  if (!!navigator.msGetUserMedia) {
    navigator.getUserMedia = navigator.msGetUserMedia;
    return true;
  }

  return false;
}

Reverbify.AudioRecord = {};

Reverbify.AudioRecord.isRecording = false;

Reverbify.AudioRecord.stop = function() {
  Reverbify.AudioRecord.recorder.stop();
  Reverbify.AudioRecord.isRecording = false;

  var audio = document.querySelector('audio');
  Reverbify.AudioRecord.recorder.exportWAV(function(stream){
    audio.src = window.URL.createObjectURL(stream);
  });
};

Reverbify.AudioRecord.start = function() {
  if (!hasUserMedia()) {
    alert('Your browser does not support recording audio.');
    return;
  }

  navigator.getUserMedia({audio: true},
      Reverbify.AudioRecord.onStream,
      Reverbify.AudioRecord.onStreamError);
};

Reverbify.AudioRecord.onStream = function(stream) {
  var mediaStreamSource = Reverbify.AudioCtx.createMediaStreamSource(stream);

  console.log('onStream');
  console.log(Recorder);

  Reverbify.AudioRecord.recorder = new Recorder(mediaStreamSource);
  Reverbify.AudioRecord.isRecording = true;
  Reverbify.AudioRecord.recorder.record();
};

Reverbify.AudioRecord.onStreamError = function(e) {
  console.error('Error getting microphone', e);
};