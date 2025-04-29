// @ts-check
class Command {
    /** @param {import('../types').RoleName} role @param {*} payload @param {number} [priority=1] */
    constructor(role, payload = {}, priority = 1) {
      this.id       = `${Game.time}_${role}_${Math.random().toString(36).substr(2,5)}`;
      this.role     = role;
      this.payload  = payload;
      this.priority = priority;
    }
  
    /** Push into global FIFO */
    queue() { Memory.commandStack.push(this); }
  }
  
  module.exports = Command;
  