// constants.js
// @ts-check

/**
 * List of all role names in one canonical place.
 * Anywhere you need to loop through roles (boot, analytics, spawn logic)
 * you can import this and stay in sync.
 */
const ROLES = /** @type {const} */ ([
    'harvester',
    'upgrader',
    'builder',
    'defender'
  ]);
  
  /**
   * Basic creep body blueprints keyed by role.
   * Tweak as your room gains energy capacity or split into tiers later.
   */
  const BODY = {
    harvester: [WORK, WORK, CARRY, MOVE],
    upgrader : [WORK, CARRY, CARRY, MOVE],
    builder  : [WORK, WORK, CARRY, MOVE, MOVE],
    defender : [TOUGH, ATTACK, MOVE, MOVE]
  };
  
  /**
   * FIFO “priority codes”.  Higher wins.
   * Kernel can sort the command stack with these if you switch from plain
   * shift/ push to a proper priority queue.
   */
  const PRIORITY = {
    emergency: 100,
    high     : 75,
    normal   : 50,
    low      : 25
  };
  
  /**
   * Path colours for `creep.moveTo()` calls—purely cosmetic.
   */
  const COLORS = {
    harvest : '#ffaa00',
    upgrade : '#44ff44',
    build   : '#2196f3',
    defend  : '#ff3333'
  };
  
  module.exports = {
    ROLES,
    BODY,
    PRIORITY,
    COLORS
  };
  