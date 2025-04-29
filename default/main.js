// @ts-check
const boot          = require('./boot');
const { Kernel }    = require('./managers/kernel');
const profiler      = require('./utils/profiler');

boot();                       // guarantee Memory scaffolding
profiler.wrap(() => {         // comment out to disable CPU profiling
  Kernel.run();               // one clean call per tick
});
