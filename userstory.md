## User Story list
- User Story 0: Set up project backbone and basic game loop in JavaScript.
- User Story 1a: Player Registration Form UI.
- User Story 1b: Registration Input Validation.
- User Story 1c: Clan Selection UI.
- User Story 1d: Save Clan Selection Locally.
- User Story 2: Initiate Automated Testing Framework.
- User Story 3: Integrate CSS with Sass Preprocessor.
- User Story 3a: Hero Movement in Dungeon.
- User Story 3b: Basic Dungeon Map Rendering.
- User Story 3c: Monster Encounter Trigger.
- User Story 3d: Turn-Based Combat Initiation.
- User Story 3e: Basic Combat Actions.
- User Story 9: Reward System After Combat.
- User Story 10: Monster Respawn System.
- User Story 11: Hero Leveling and Stats Progression.
- User Story 16: Hero Attribute Allocation.
- User Story 22f: Weapon Equip Logic for One-Handed and Two-Handed Weapons.
- User Story 22g: Add Weapon Attributes and Integrate Them into Combat Calculations.
- User Story 22b: Weapon Durability Tracking with Status Visualization.
- User Story 31a: Companion Data Model and Inventory.

### User Story 22b Notes
The durability system attaches a `durability` value to each weapon object. Durability
starts at **100%** when equipped and decreases by 5% on every attack. Weapons never
break, but their damage output scales linearly with remaining durability. When a
weapon falls below 30% it is considered in **bad shape** and shown in red.

#### UI and Visualization
- Equipment slots are labeled "Left Hand" and "Right Hand".
- Each slot displays weapon name, base damage and current durability percentage.
- Slot backgrounds change color based on durability (green >70%, yellow 30-70%, red <30%).

#### Implementation Highlights
- `equipWeapon` initializes durability and handles two-handed logic.
- `degradeWeapon` reduces durability when an attack occurs.
- `weaponDamage` factors durability into the damage calculation.
- `updateEquipmentUI` updates slot text and status classes in real time.

### User Story 20a Notes
Implemented Fireball casting for the Mage. A new **Fireball** button appears in
combat controls when it's the player's turn. The button becomes disabled if the
hero has less than 10 MP. Casting the spell reduces MP immediately and damages
the target using `MAG` plus a small base value. The existing attack action
remains for weapon strikes. Added unit tests covering mana consumption, button
state, and insufficient mana handling.

### User Story 28 Notes
Added **Double Shot** for Rangers and **Shield Bash** for Knights. Each skill has
a cooldown timer tracked between turns. Buttons display remaining cooldown and are
hidden for other jobs. Shield Bash can stun or weaken the enemy for one turn.
Cooldown counters decrease after the enemy phase. Unit tests cover damage, stun
behavior, cooldown updates, and job-specific visibility.

### User Story 21a Notes
Enemies now have elemental attributes and resistance percentages. Each monster
is created with an `element` field and a `resistances` map merging defaults for
Physical, Fire and Water. The combat UI includes a **monster-info** section that
shows the element and current resistances. Damage from attacks or spells is
reduced according to these values via `applyResistance`. A helper
`modifyMonsterResistance` allows buffs or debuffs to adjust resistances during
battle and updates the display immediately. Unit tests verify that monsters are
spawned with these properties, the UI reflects them, damage calculations respect
resistances and changes apply correctly.

### User Story 21b Notes
Each monster now displays a small icon representing its elemental attribute. Icons
are generated as Base64 PNG data URLs embedded directly in the code and shown
next to the monster sprite in combat. `updateMonsterInfo` updates the icon source
and tooltip text so it changes whenever a monster's element is modified through
the new `setMonsterElement` helper. Tests ensure the icon image and title update
correctly.

### User Story 29: New Healing and Crowd-Control Skills
Add foundational abilities beyond Fireball, Double Shot, and Shield Bash.
- **Heal**: Mage skill that costs 10 MP and restores 25 HP to a chosen party member.
- **Stunning Strike**: Knight skill that deals light damage and has a 30% chance to stun for one turn with a 2-turn cooldown.
- Skills appear only for the relevant job, consume MP, and track cooldown like existing actions.
- Unit tests verify MP deduction, cooldown behavior, HP recovery, and stun chance.

#### User Story 29 Notes
- Buttons are disabled when the hero lacks enough MP.
- Cooldown counters decrement after the enemy phase, matching current skill logic.
- The combat UI shows each new skill with remaining cooldown.
- The test suite covers both abilities, ensuring correct visibility and effect.

### User Story 30 Notes
The town now spawns three NPCs at random locations. Each NPC wanders around the map at its own speed and shows a short text bubble above its head when the hero approaches. Players can still press **E** or click an NPC to bring up a larger dialogue box. NPCs respawn whenever the player returns to town.

### User Story 31b Notes
Implemented a basic companion shop. Monsters now drop 1 gold along with XP. The HUD shows current gold and the shop lists available recruits with their stats and price (currently 1). Buying a companion deducts gold, adds them to the inventory and shows a confirmation or an insufficient funds warning. Unit tests cover purchase validation, currency deduction and the gold reward from combat.
The shop now appears as a dedicated building in town with a clear banner. Players can click the building or press **E** nearby to open the recruitment menu.

### User Story 31a Notes
Companion data uses a simple schema:
`{ id, name, job, level, stats: { hp, attack, defense, speed } }`.
All owned companions are stored in an array saved to `localStorage` under
`companionInventory` with an incremental `companionIdCounter` for unique IDs.
The `companion.js` module exposes `addCompanion`, `removeCompanion`, and
`getInventory` helpers. On page load it restores saved companions and populates
the new `#companion-inventory` list so the roster persists across sessions.
Unit tests cover inventory operations, DOM updates, and persistence.