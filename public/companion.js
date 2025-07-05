const STORAGE_KEY = 'companionInventory';
const ID_KEY = 'companionIdCounter';
let companionInventory = [];

function generateId() {
  const next = (parseInt(localStorage.getItem(ID_KEY) || '0', 10) + 1);
  localStorage.setItem(ID_KEY, next);
  return next;
}

function loadInventory() {
  const stored = localStorage.getItem(STORAGE_KEY);
  companionInventory = stored ? JSON.parse(stored) : [];
}

function saveInventory() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(companionInventory));
}

function getInventory() {
  return companionInventory;
}

function addCompanion(companion) {
  const obj = { ...companion };
  if (!obj.id) obj.id = generateId();
  companionInventory.push(obj);
  saveInventory();
  updateInventoryUI();
  return obj;
}

function removeCompanion(id) {
  const idx = companionInventory.findIndex(c => c.id === id);
  if (idx !== -1) {
    companionInventory.splice(idx, 1);
    saveInventory();
    updateInventoryUI();
    return true;
  }
  return false;
}

function updateInventoryUI() {
  const list = document.getElementById('companion-inventory');
  if (!list) return;
  list.innerHTML = '';
  companionInventory.forEach(c => {
    const li = document.createElement('li');
    li.textContent = `${c.name} (${c.job}) Lv ${c.level}`;
    list.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadInventory();
  updateInventoryUI();
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    loadInventory,
    saveInventory,
    getInventory,
    addCompanion,
    removeCompanion,
    updateInventoryUI
  };
}
