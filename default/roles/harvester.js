// @ts-check
const roleHarvester = {
    /** @param {Creep} creep */
    run(creep) {
      // ultra-minimal proof-of-life
      if (creep.store.getFreeCapacity() > 0) {
        const source = creep.pos.findClosestByPath(FIND_SOURCES);
        if (source) {
          if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
          }
        }
      } else {
        const spawn = creep.room.find(FIND_STRUCTURES, {
          filter: s => s.structureType === STRUCTURE_SPAWN
        })[0];
        if (spawn) creep.transfer(spawn, RESOURCE_ENERGY);
      }
    }
  };
  
  module.exports = roleHarvester;
  