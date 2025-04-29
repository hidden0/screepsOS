// managers/defenseManager.js
// @ts-check

const { COLORS } = require('../constants');

// -----------------------------------------------------------------------------
// Config – tweak in one place
// -----------------------------------------------------------------------------
const WALL_TARGET      =  30_000;   // hit points you consider “safe enough”
const RAMPART_TARGET   = 100_000;
const ENERGY_BUFFER    =    300;    // towers below this skip repairs

// -----------------------------------------------------------------------------
// Public API – Kernel ticks this once
// -----------------------------------------------------------------------------
module.exports = {
  /**
   * Run defense logic for every owned room.
   * Keep it tiny so you stay under bucket on tense ticks.
   */
  runAll() {
    for (const room of Object.values(Game.rooms)) {
      if (!room.controller || !room.controller.my) continue;
      this._runRoom(room);
    }
  },

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------
  /**
   * Handle tower actions and trigger Safe Mode if needed.
   * @param {Room} room
   */
  _runRoom(room) {
    const hostiles = room.find(FIND_HOSTILE_CREEPS);

    // --- 1. Towers ------------------------------------------------------------
    /** @type {StructureTower[]} */
    const towers = /** @type any */ (room.find(FIND_MY_STRUCTURES, {
      filter: s => s.structureType === STRUCTURE_TOWER
    }));

    for (const tower of towers) {
      if (hostiles.length) {
        // Attack the closest hostile
        /** @type {Creep} */
        const target = tower.pos.findClosestByRange(hostiles);
        tower.attack(target);
        tower.room.visual.line(
          tower.pos, target.pos,
          { color: COLORS.defend, width: 0.1, opacity: 0.3 }
        );
        continue; // skip repairing this tick
      }

      // Heal friendly creeps if any are hurt
      const injured = tower.pos.findClosestByRange(
        room.find(FIND_MY_CREEPS, { filter: c => c.hits < c.hitsMax })
      );
      if (injured) {
        tower.heal(injured);
        continue;
      }

      // Optional repairs (walls/ramparts) if we have spare energy
      if (tower.store[RESOURCE_ENERGY] > ENERGY_BUFFER) {
        const target = tower.pos.findClosestByRange(
          room.find(FIND_STRUCTURES, {
            filter: s => (
              (s.structureType === STRUCTURE_WALL      && s.hits < WALL_TARGET) ||
              (s.structureType === STRUCTURE_RAMPART   && s.hits < RAMPART_TARGET)
            )
          })
        );
        if (target) tower.repair(target);
      }
    }

    // --- 2. Trigger Safe Mode if things look dire ----------------------------
    if (hostiles.length &&
        room.controller.safeModeAvailable &&
        !room.controller.safeMode &&
        room.find(FIND_MY_STRUCTURES, { filter: s =>
             s.structureType === STRUCTURE_SPAWN && s.hits < s.hitsMax / 2 }).length) {
      room.controller.activateSafeMode();
      console.log(`[DEFENSE] Safe Mode activated in ${room.name}`);
    }
  }
};
