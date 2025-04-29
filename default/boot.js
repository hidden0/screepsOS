// @ts-check

const { ROLES } = require('./constants');

module.exports = function boot() {
  // Only run once per (soft) reset
  if (!Memory._bootstrapped) {
    console.log('[BOOT] First-time initialisation');
    Memory.commandStack = [];              // global FIFO for commands
    Memory.roles       = Object.create(null);
    for (const r of ROLES) Memory.roles[r] = 0;  // live creep counters
    Memory._bootstrapped = true;
  }
};
