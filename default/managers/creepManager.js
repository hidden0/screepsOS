// managers/creepManager.js
// @ts-check
const roleModules = {
    harvester: require('../roles/harvester'),
    upgrader : require('../roles/upgrader'),
    builder  : require('../roles/builder'),
    defender : require('../roles/defender')
  };
  
  module.exports = {
    /** Iterate existing creeps */
    runAll() {
      for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        const role  = /** @type {import('../types').RoleName} */(creep.memory.role);
        roleModules[role]?.run(creep);
      }
    },
  
    /** Assign a queued command to an idle creep or trigger spawn */
    assign(cmd) {
      const idle = _.find(Game.creeps, c => c.memory.role === cmd.role && !c.memory.busy);
      if (idle) {
        idle.memory.busy = cmd;
        // …attach payload & start role behaviour next tick
      } else {
        // delegate to spawn manager to create a new creep for this role
        // (not shown here to keep skeleton lean)
      }
    }
  };
  