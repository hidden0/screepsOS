// @ts-check

const roomManager   = require('./roomManager');
const creepManager  = require('./creepManager');
const defense       = require('./defenseManager');

/** Tick-level orchestrator */
class Kernel {
  static run() {
    this._serviceCommandStack();   // handle queued orders
    roomManager.runAll();
    creepManager.runAll();
    defense.runAll();
  }

  /** Simple FIFO; swap for heap queue if you want weighted priority */
  static _serviceCommandStack() {
    const q = Memory.commandStack;
    if (!q || !q.length) return;
    const next = q.shift();        // {id, role, priority, payload}
    creepManager.assign(next);     // delegate assignment logic
  }
}

module.exports = { Kernel };
