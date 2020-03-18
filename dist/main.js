/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const listen = __webpack_require__(/*! ./listener */ \"./src/listener.js\")\n\nfunction mapFrequencyToSymbols(frequency) {\n  const scale = frequency / 60 < 1 ? 1 : frequency / 60\n\n  return {\n    className: 'circle',\n    style: `transform: scale(${scale})`,\n  }\n}\n\nwindow.onclick = () => listen().then(({ data, analyser }) => {\n  const audioBar = document.querySelector('#audioBar')\n\n  const init = function() {\n    requestAnimationFrame(init)\n    analyser.getByteFrequencyData(data)\n\n    const symbol = mapFrequencyToSymbols(data[0])\n\n    if (symbol) {\n      console.log(symbol)\n\n      audioBar.style = symbol.style\n      audioBar.className = symbol.className\n    }\n  }\n\n  init()\n})\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/listener.js":
/*!*************************!*\
  !*** ./src/listener.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function listen() {\n  let audioCtx = new (window.AudioContext || window.webkitAudioContext)()\n  let source\n  let stream\n\n  const analyser = audioCtx.createAnalyser()\n  analyser.minDecibels = -90\n  analyser.maxDecibels = -10\n  analyser.smoothingTimeConstant = 0.85\n  analyser.fftSize = 256\n\n  const distortion = audioCtx.createWaveShaper()\n  const gainNode = audioCtx.createGain()\n  const biquadFilter = audioCtx.createBiquadFilter()\n  const convolver = audioCtx.createConvolver()\n\n  return navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {\n    source = audioCtx.createMediaStreamSource(stream)\n    source.connect(distortion)\n    distortion.connect(biquadFilter)\n    biquadFilter.connect(gainNode)\n    convolver.connect(gainNode)\n    gainNode.connect(analyser)\n    analyser.connect(audioCtx.destination)\n\n    return {\n      analyser,\n      data: new Uint8Array(analyser.frequencyBinCount),\n    }\n  })\n}\n\nmodule.exports = listen\n\n\n//# sourceURL=webpack:///./src/listener.js?");

/***/ })

/******/ });