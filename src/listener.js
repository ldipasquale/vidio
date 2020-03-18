function listen() {
  let audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  let source
  let stream

  const analyser = audioCtx.createAnalyser()
  analyser.minDecibels = -90
  analyser.maxDecibels = -10
  analyser.smoothingTimeConstant = 0.85
  analyser.fftSize = 256

  const distortion = audioCtx.createWaveShaper()
  const gainNode = audioCtx.createGain()
  const biquadFilter = audioCtx.createBiquadFilter()
  const convolver = audioCtx.createConvolver()

  return navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    source = audioCtx.createMediaStreamSource(stream)
    source.connect(distortion)
    distortion.connect(biquadFilter)
    biquadFilter.connect(gainNode)
    convolver.connect(gainNode)
    gainNode.connect(analyser)
    analyser.connect(audioCtx.destination)

    return {
      analyser,
      data: new Uint8Array(analyser.frequencyBinCount),
    }
  })
}

module.exports = listen
