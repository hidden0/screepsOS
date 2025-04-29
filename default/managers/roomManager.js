// managers/roomManager.js
// @ts-check
const Command      = require('../commands/Command');
const matrix       = require('../strategies/rclMatrix');

/** Tick-level handler per room */
module.exports = {
  runAll() {
    for (const room of Object.values(Game.rooms)) {
      this.plan(room);   // ← NEW
      // …other per-room chores (tower logic, visuals, etc.)
    }
  },

  /** Decide what should be in the room and queue commands */
  plan(room) {
    const target  = matrix[room.controller.level];
    if (!target) return;                    // no rules? bail early

    // Count *live* creeps of each role in this room
    /** @type {Partial<Record<import('../types').RoleName, number>>} */
    const live = { harvester: 0, upgrader: 0, builder: 0, defender: 0 };

    for (const creep of room.find(FIND_MY_CREEPS)) {
      live[creep.memory.role]++;            // cheap O(n) scan
    }

    // Compare live vs target and queue new Commands as needed
    for (const role in target) {
      const deficit = target[role] - (live[role] || 0);
      for (let i = 0; i < deficit; i++) {
        new Command(role /** @type any */, { roomName: room.name }).queue();
      }
    }
  }
};
