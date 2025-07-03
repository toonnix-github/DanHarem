/** @jest-environment jsdom */
let handleRewards, heroStats;

beforeEach(() => {
  jest.resetModules();
  jest.useFakeTimers();
  global.Phaser = { Game: jest.fn() };
  ({ handleRewards, heroStats } = require('../public/main.js'));
  document.body.innerHTML = '<div id="reward-container"><div id="reward-message"></div><div id="level-up-message"></div></div>';
});

async function flushTimers() {
  while (jest.getTimerCount() > 0) {
    jest.runOnlyPendingTimers();
    await Promise.resolve();
  }
}

test('hero levels up after gaining sufficient experience', async () => {
  handleRewards();
  await flushTimers();
  expect(heroStats.level).toBe(1);
  handleRewards();
  expect(heroStats.level).toBe(2);
  expect(document.getElementById('level-up-message').textContent).toContain('Level 2');
  await flushTimers();
});
