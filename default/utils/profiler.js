// utils/profiler.js
// @ts-check
const profilerLib = require('../lib/screeps-profiler');
profilerLib.enable();              // starts collecting stats

module.exports = {
  /** @param {() => void} fn */
  wrap(fn) {
    profilerLib.wrap(fn)();        // profiler will time the callback
  }
};
