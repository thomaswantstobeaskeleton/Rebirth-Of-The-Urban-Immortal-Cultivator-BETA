/**
 * Main game loop and UI - Rebirth of the Urban Immortal Cultivator (Browser RPG)
 * Macro-structure: Earth is the cradle. Interplanetary locked until Nascent Soul (canon).
 */

let gameState = 'character';
let player = null;
let currentEnemy = null;
let combatLog = [];
let arenaWins = 0;
let pendingMilestone = null;

const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => el.querySelectorAll(sel);

function showScreen(screenId) {
  $$('.screen').forEach(s => s.classList.remove('active'));
  const el = $('#' + screenId);
  if (el) el.classList.add('active');
}

function renderCharacterCreation() {
  const nameInput = $('#char-name');
  const bgList = $('#char-backgrounds');
  const avatarList = $('#char-avatars');
  if (nameInput) nameInput.value = '';
  if (bgList) {
    bgList.innerHTML = GAME_DATA.backgrounds.map(b =>
      `<label class="bg-option"><input type="radio" name="bg" value="${b.id}"> <strong>${b.name}</strong>: ${b.description}</label>`
    ).join('');
  }
  if (avatarList) {
    avatarList.innerHTML = GAME_DATA.avatars.map(a =>
      `<label class="avatar-option"><input type="radio" name="avatar" value="${a.id}"> <span class="avatar-sprite">${a.sprite}</span> ${a.name}</label>`
    ).join('');
  }
}

function startGame() {
  const name = ($('#char-name') && $('#char-name').value.trim()) || 'Cultivator';
  const bgId = ($('input[name="bg"]:checked') && $('input[name="bg"]:checked').value) || 'mortal_awakened';
  const avatarId = ($('input[name="avatar"]:checked') && $('input[name="avatar"]:checked').value) || 'male_young';
  player = createNewCharacter({ name, backgroundId: bgId, avatarId });
  gameState = 'playing';
  showScreen('game');
  renderGame();
}

function renderGame() {
  if (!player) return;
  const realm = getCurrentRealm(player);
  const phase = getNarrativePhase(player);
  const area = getAreaById(player.currentAreaId);
  $('#player-name').textContent = player.name;
  $('#player-avatar').textContent = player.avatarSprite;
  $('#player-realm').textContent = `${realm.name} (${realm.stage})`;
  $('#player-hp').textContent = `${player.hp}/${player.hpMax}`;
  $('#player-qi').textContent = `${player.qi}/${player.qiMax}`;
  $('#player-cultivation').textContent = `${player.cultivationProgress}/${player.cultivationNext}`;
  $('#player-area').textContent = area ? area.name : '';
  $('#player-gold').textContent = player.gold;
  $('#player-stones').textContent = player.spiritStones;
  const phaseEl = $('#player-phase');
  if (phaseEl) phaseEl.textContent = phase.name;
  const worldEl = $('#player-world');
  if (worldEl) worldEl.textContent = area && area.worldLayer ? (area.worldLayer === 'earth' ? 'Earth' : area.worldLayer.replace(/_/g, ' ') : 'Earth');

  const conns = getConnections(player.currentAreaId);
  const canGo = conns.filter(id => {
    const a = getAreaById(id);
    return a && canEnterArea(player, a);
  });
  const areaList = $('#area-connections');
  if (areaList) {
    areaList.innerHTML = canGo.map(id => {
      const a = getAreaById(id);
      const locked = !player.unlockedAreas.includes(id);
      const isLeaveEarth = a && a.milestoneLeaveEarth;
      const isBeyondEarth = a && a.worldLayer && a.worldLayer !== 'earth';
      let label = a.name;
      if (locked) label += ' (undiscovered)';
      else if (isLeaveEarth) label = '★ ' + label + ' (beyond Earth)';
      else if (isBeyondEarth) label = '★ ' + label;
      return `<button class="area-btn" data-area="${id}" ${locked ? 'data-unlock="1"' : ''}>${label}</button>`;
    }).join('');
  }

  $('#area-desc').textContent = area ? area.description : '';
  $('#area-danger').textContent = area ? `Danger: ${area.danger} | Qi density: ${area.qiDensity}` : '';
  showPendingMilestone();

  const questList = $('#quest-list');
  if (questList) {
    const active = player.quests.active.map(q => `<div class="quest-item"><strong>${q.name}</strong>: ${q.objectives.map(o => (o.done ? '✓ ' : '') + o.text).join(', ')}</div>`).join('');
    questList.innerHTML = active || 'No active quests.';
  }

  const invList = $('#inventory-list');
  if (invList) {
    invList.innerHTML = player.inventory.length ? player.inventory.map(i => {
      const item = getItemById(i.id);
      return `<span>${item.name} x${i.count}</span>`;
    }).join(', ') : 'Empty';
  }

  const techList = $('#technique-list');
  if (techList) {
    techList.innerHTML = player.techniques.map(tid => {
      const t = getTechniqueById(tid);
      return t ? `<span class="tech-tag">${t.name}</span>` : '';
    }).filter(Boolean).join('');
  }
}

function showPendingMilestone() {
  if (!pendingMilestone) return;
  const msg = pendingMilestone;
  pendingMilestone = null;
  setTimeout(() => alert(msg), 100);
}

function moveToArea(areaId) {
  const area = getAreaById(areaId);
  if (!area) return;
  if (!canEnterArea(player, area)) {
    alert('You cannot enter this area yet. (Realm or item required)');
    return;
  }
  unlockArea(player, areaId);
  player.currentAreaId = areaId;
  if (area.worldLayer && area.worldLayer !== 'earth') {
    if (!player.hasLeftEarth) {
      player.hasLeftEarth = true;
      pendingMilestone = 'Major milestone: You have left Earth.\n\nThe path beyond the Abandoned Star Region is open. Planet Tianhuang—the Heavenly Desolate Star—awaits. Earth was the cradle. The cosmos is earned.';
    }
  }
  renderGame();
  checkAreaQuests(areaId);
}

function checkAreaQuests(areaId) {
  player.quests.active.forEach(q => {
    if (q.id === 'relic_rooftop' && areaId === 'rooftop_garden') {
      updateQuestObjective(player, 'relic_rooftop', 'go_rooftop');
      updateQuestObjective(player, 'relic_rooftop', 'find_relic');
    }
    if (q.id === 'qi_vein' && areaId === 'qi_vein_tunnel') updateQuestObjective(player, 'qi_vein', 'reach_tunnel');
    if (q.id === 'arena_challenge' && areaId === 'underground_arena') updateQuestObjective(player, 'arena_challenge', 'enter_arena');
    if (q.id === 'defend_hall' && areaId === 'mount_north_qiong_gate') updateQuestObjective(player, 'defend_hall', 'reach_hall');
  });
}

function onCultivate() {
  const gain = getCultivationGain(player.currentAreaId);
  const realmBefore = player.realmIndex;
  addCultivationProgress(player, gain);
  if (realmBefore < 5 && player.realmIndex >= 5 && !player.sawNascentSoulMilestone) {
    player.sawNascentSoulMilestone = true;
    pendingMilestone = 'You have reached Nascent Soul (元婴).\n\nHeavenly Monarch. You may command heaven and earth. The ancient arrays that seal Earth no longer bind you—the Star Teleportation Platform at Mount North Qiong can take you beyond Earth. Interplanetary travel is now possible.';
  }
  renderGame();
  const q = player.quests.active.find(x => x.id === 'qi_vein');
  if (q && player.currentAreaId === 'qi_vein_tunnel') {
    const obj = q.objectives.find(o => o.id === 'cultivate');
    if (obj && !obj.done && gain >= 15) updateQuestObjective(player, 'qi_vein', 'cultivate');
  }
}

function onExplore() {
  const encounters = getAreaEncounters(player.currentAreaId);
  if (encounters.length === 0) return;
  currentEnemy = encounters[0];
  gameState = 'combat';
  combatLog = [];
  showScreen('combat');
  renderCombat();
}

function renderCombat() {
  if (!currentEnemy || !player) return;
  $('#combat-enemy-name').textContent = currentEnemy.name;
  $('#combat-enemy-hp').textContent = `${currentEnemy.hp}/${currentEnemy.hpMax}`;
  $('#combat-player-hp').textContent = `${player.hp}/${player.hpMax}`;
  $('#combat-player-qi').textContent = `${player.qi}/${player.qiMax}`;
  $('#combat-log').innerHTML = combatLog.map(l => `<div>${l}</div>`).join('');
  const techDiv = $('#combat-techniques');
  techDiv.innerHTML = player.techniques.filter(tid => canUseTechnique(player, tid)).map(tid => {
    const t = getTechniqueById(tid);
    return `<button class="combat-tech-btn" data-tech="${tid}">${t.name} (Qi: ${getTechniqueQiCost(tid, player)})</button>`;
  }).join('');
}

function useCombatTechnique(techniqueId) {
  const result = runCombatRound(player, currentEnemy, techniqueId);
  combatLog.push(...result.log);
  renderCombat();
  if (currentEnemy.hp <= 0) {
    applyCombatReward(player, currentEnemy);
    if (player.currentAreaId === 'underground_arena') {
      arenaWins++;
      const q = player.quests.active.find(x => x.id === 'arena_challenge');
      if (q && arenaWins >= 3) updateQuestObjective(player, 'arena_challenge', 'win_three');
    }
    const defendQ = player.quests.active.find(x => x.id === 'defend_hall');
    if (defendQ && player.currentAreaId === 'mount_north_qiong_gate') updateQuestObjective(player, 'defend_hall', 'win_fight');
    setTimeout(() => {
      currentEnemy = null;
      gameState = 'playing';
      showScreen('game');
      renderGame();
    }, 1500);
  }
  if (player.hp <= 0) {
    player.hp = Math.floor(player.hpMax / 2);
    player.qi = Math.floor(player.qiMax / 2);
    currentEnemy = null;
    gameState = 'playing';
    showScreen('game');
    renderGame();
  }
}

function openQuestPanel() {
  const list = $('#available-quests');
  const available = getAvailableQuests(player);
  list.innerHTML = available.map(q => `<button class="quest-accept-btn" data-quest="${q.id}">${q.name}</button>`).join('');
  $('#quest-panel').classList.add('active');
}

function acceptQuest(questId) {
  startQuest(player, questId);
  $('#quest-panel').classList.remove('active');
  renderGame();
}

function init() {
  renderCharacterCreation();
  $('#btn-start').addEventListener('click', startGame);
  $('#game').addEventListener('click', e => {
    const areaBtn = e.target.closest('.area-btn');
    if (areaBtn) moveToArea(areaBtn.dataset.area);
    const cultBtn = e.target.closest('#btn-cultivate');
    if (cultBtn) onCultivate();
    const expBtn = e.target.closest('#btn-explore');
    if (expBtn) onExplore();
    const questBtn = e.target.closest('#btn-quests');
    if (questBtn) openQuestPanel();
  });
  $('#combat').addEventListener('click', e => {
    const techBtn = e.target.closest('.combat-tech-btn');
    if (techBtn) useCombatTechnique(techBtn.dataset.tech);
  });
  $('#available-quests').addEventListener('click', e => {
    const btn = e.target.closest('.quest-accept-btn');
    if (btn) acceptQuest(btn.dataset.quest);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') $('#quest-panel').classList.remove('active');
  });
}

document.addEventListener('DOMContentLoaded', init);
