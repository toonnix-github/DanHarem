# Project: Dungeon Harem Online Game

## Overview
This project is an online retro pixel-art RPG inspired by **Danmachi** and **Harem in the Labyrinth of Another World**. Players create adventurers affiliated with one of five GOD clans, select jobs, and build parties by recruiting slaves to explore dungeons and engage in turn-based combat.

## Core Features
- **Player Registration & Clan Selection:** Players register accounts and select a GOD clan with unique perks.
- **Job Selection:** Choose from foundational jobs (Knight, Ranger, Mage) each with distinct stats.
- **Slave Management:** Purchase and level slaves to form a 3-person party (player + 2 slaves).
- **Party AI & Commands:** Slaves act autonomously with simple strategy commands (e.g., "GO ALL OUT").
- **Dungeon Exploration:** Navigate pixel-art town and dungeon maps.
- **Combat System:** Turn-based battles with retro style inspired by Golden Sun.
- **Free-to-play Model:** Players earn currency from dungeons to buy slaves; slaves cannot be sold.

## GOD Clans & Perks
| Clan       | Perks                                                                                       |
|------------|---------------------------------------------------------------------------------------------|
| ARES       | +10% physical attack, bonus damage on critical hits, increased rage meter build-up          |
| ATHENA     | +15% defense, reduced skill cooldowns, chance to counterattack when defending                |
| APOLLO     | +10% magic attack, faster mana regeneration, more effective healing spells                  |
| POSEIDON   | +10% stamina/endurance, chance to reduce elemental damage, faster movement in water/dungeons |
| HEPHAESTUS | +10% fire resistance, increased weapon durability, bonus crafting/gem socket chances         |

## Development Guidelines for AI Dev

### Code Quality
- Follow best practices for clean, maintainable, and well-documented code.
- Use meaningful variable and function names.
- Modularize code for easy testing and future extension.

### User Stories to Implement
Start with these MVP user stories:

1. Player Registration & Clan Selection  
2. Job Selection  
3. Slave Buying & Management  
4. Party Commands & Simple AI Behavior  
5. Dungeon Exploration & Map Navigation  
6. Turn-Based Combat System

### Technical Stack (suggested)
- Frontend: 2D pixel-art rendering framework (e.g., Phaser.js, Godot, or Unity 2D)  
- Backend: REST API for player data, matchmaking, and game logic (Node.js, Python, or your preferred tech)  
- Database: Store player profiles, slave data, inventory, and game states (SQL or NoSQL)  
- Authentication: Secure registration and login system

### AI Behavior for Slaves
- Implement simple command-based AI: party members follow overall commands, do not require direct control.
- Provide commands like "GO ALL OUT", "Defend first", "Save MP", "Heal only".

### How to Proceed
- Work story by story; start with registration and clan selection.
- For each user story, write code, unit tests, and acceptance criteria.
- Use test-driven development where applicable.
- Document any assumptions or questions in comments or separate files.

## How to Use This Repo
- Clone the repository.  
- Follow the instructions in `/docs` for environment setup.  
- Implement features branch by branch following user stories.  
- Submit pull requests for review (if applicable).

## Remark
- update this file regularly if you find anything new
- update user story that you are working on in the file userstory.md to record all of the work that happen here

## Contact & Collaboration
- Product Owner: Produtiva (AI)  
- Project Manager: Toonnix
- Developers: AI Devs

## Phaser Prototype Setup
This repository now includes a minimal [Phaser.js](https://phaser.io) prototype located in the `public` folder. To run it locally:

1. Ensure [Node.js](https://nodejs.org/) is installed.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   This runs **live-server** from the project root and automatically opens
   `public/index.html` in your browser so the Phaser script can load from
   `node_modules`.

You should see a window with a red square rendered by the Phaser game loop. This serves as the project foundation for future gameplay features.
