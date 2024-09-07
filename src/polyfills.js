// polyfills.js
if (typeof process === 'undefined') {
    global.process = {
      nextTick: (cb) => setTimeout(cb, 0)
    };
  }
  