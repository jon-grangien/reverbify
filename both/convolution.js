Reverbify = {};
Reverbify.Audio = {};

/**
 * Convolves the (1D array) signal with the (1D array) kernel and returns the convolved signal.
 * Adapted from (http://stackoverflow.com/a/8425094).
 * @param signal The signal to be convolved
 * @param kernel The kernel to be used in th econvolution
 * @returns {Array} The convolved signal
 */
Reverbify.convolve = function(signal, kernel) {
  "use strict";

  var signalLength = signal.length, kernelLength = kernel.length;
  var result = [];

  for (var n = 0; n < signalLength + kernelLength - 1; ++n) {
    var kMin = (n >= kernelLength - 1) ? n - (kernelLength - 1) : 0;
    var kMax = (n < signalLength - 1) ? n : signalLength - 1;

    // Pre-fill the slot with a zero
    result[n] = 0.0;

    for (var k = kMin; k <= kMax; ++k) {
      result[n] += signal[k] * kernel[n - k];
    }
  }

  return result;
};