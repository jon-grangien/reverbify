// Load Web Audio API context
Reverbify.AudioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Initialize loadedAudio to null
Reverbify.decodedAudioData = null;

Reverbify.loadAudio = function (path, onLoad) {
  // Load the audio file using a GET request
  var request = new XMLHttpRequest();

  request.open('GET', path, true);
  request.responseType = 'arraybuffer';

  request.onload = function () {
    // The arraybuffer contains the audio data from the given file
    var audioData = request.response;

    Reverbify.AudioCtx.decodeAudioData(audioData).then(function (decodedData) {
      // Here we use the decoded data
      Reverbify.decodedAudioData = decodedData;
      onLoad();
    });
  };
}