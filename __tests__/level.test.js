/** @jest-environment jsdom */
let handleRewards, heroStats, allocateAttribute;

beforeEach(() => {
  jest.resetModules();
  jest.useFakeTimers();
  global.Phaser = { Game: jest.fn() };
  ({ handleRewards, heroStats, allocateAttribute } = require('../public/main.js'));
  document.body.innerHTML = `
    <div id="reward-container">
      <div id="reward-message"></div>
      <div id="level-up-message"></div>
      <div id="attribute-container">
        <div>Points left: <span id="points-remaining">0</span></div>
        <button id="str-plus"></button>
        <button id="spd-plus"></button>
        <button id="mag-plus"></button>
      </div>
    </div>`;
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

test('attribute points awarded and can be allocated', async () => {
  handleRewards();
  await flushTimers();
  handleRewards();
  const container = document.getElementById('reward-container');
  expect(heroStats.attributePoints).toBe(3);
  jest.runOnlyPendingTimers();
  expect(container.style.display).toBe('block');
  allocateAttribute('str');
  allocateAttribute('spd');
  allocateAttribute('mag');
  expect(heroStats.attributePoints).toBe(0);
  expect(container.style.display).toBe('none');
});
