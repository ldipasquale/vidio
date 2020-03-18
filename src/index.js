const listen = require('./listener')

function mapFrequencyToSymbols(frequency) {
  const scale = frequency / 60 < 1 ? 1 : frequency / 60

  return {
    className: 'circle',
    style: `transform: scale(${scale})`,
  }
}

window.onclick = () => listen().then(({ data, analyser }) => {
  const audioBar = document.querySelector('#audioBar')

  const init = function() {
    requestAnimationFrame(init)
    analyser.getByteFrequencyData(data)

    const symbol = mapFrequencyToSymbols(data[0])

    if (symbol) {
      console.log(symbol)

      audioBar.style = symbol.style
      audioBar.className = symbol.className
    }
  }

  init()
})
