// typings/memory.d.ts
/// <reference types="screeps" />

// Re-open the global namespace and extend Memory
declare global {
    interface Memory {
      /** FIFO of work items pushed by managers */
      commandStack: CommandSerialized[];
  
      /** Live creep counters keyed by role name */
      roles: Record<string, number>;
  
      /** One-shot flag used by boot.js */
      _bootstrapped?: boolean;
    }
  
    /** ───── Support types ───────────────────────────────────────── */
  
    /**
     * “On-disk” shape of a queued command.
     * Keep this tiny—no functions, just JSON-serialisable data.
     */
    interface CommandSerialized {
      id: string;
      role: RoleName;
      priority: number;
      payload: any;
    }
  
    type RoleName = 'harvester' | 'upgrader' | 'builder' | 'defender';
  }
  
  export {};               // ← makes the file a module so it doesn’t pollute scope
  