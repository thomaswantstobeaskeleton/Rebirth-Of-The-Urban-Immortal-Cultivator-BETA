/**
 * Character creation and progression - Rebirth of the Urban Immortal Cultivator
 * Macro-structure: Earth is the cradle. Interplanetary travel locked until Nascent Soul (canon).
 */

function createNewCharacter(options = {}) {
  const realm = GAME_DATA.cultivationRealms[0]; // Foundation Establishment Early
  const background = GAME_DATA.backgrounds.find(b => b.id === (options.backgroundId || 'mortal_awakened')) || GAME_DATA.backgrounds[0];
  const avatar = GAME_DATA.avatars.find(a => a.id === (options.avatarId || 'male_young')) || GAME_DATA.avatars[0];

  const char = {
    name: options.name || 'Cultivator',
    backgroundId: background.id,
    avatarId: avatar.id,
    avatarSprite: avatar.sprite,
    realmId: realm.id,
    realmIndex: 0,
    stage: 'early',
    qi: 100 + (background.bonus?.qi || 0),
    qiMax: 100 + (background.bonus?.qi || 0),
    hp: 100 + (background.bonus?.hp || 0),
    hpMax: 100 + (background.bonus?.hp || 0),
    gold: background.bonus?.gold || 50,
    spiritStones: 10,
    cultivationProgress: 0,
    cultivationNext: 100,
    techniques: ['basic_fist', 'qi_gather'],
    inventory: [],
    equipment: { weapon: null, armor: null, artifact: null },
    factionRep: {},
    currentAreaId: 'chuzhou_downtown',
    quests: { active: [], completed: [] },
    specialization: null,
    stats: {
      martial: 10 + (background.bonus?.damage || 0),
      mystic: 10,
      alchemy: 5 + (background.bonus?.alchemy || 0)
    },
    combos: [],
    unlockedAreas: ['chuzhou_downtown', 'chuzhou_alley', 'night_market', 'corporate_tower'],
    hasLeftEarth: false,
    narrativePhase: 'early'
  };

  if (background.bonus?.technique) char.techniques.push(background.bonus.technique);
  GAME_DATA.factions.forEach(f => { char.factionRep[f.id] = background.bonus?.reputation ? 10 : 0; });
  return char;
}

/** Canon: Nascent Soul (realmIndex 5) is when one can leave Earth (Qi Xiao to Tianhuang; Chen Fan via teleportation). */
function canLeaveEarth(player) {
  return (player.realmIndex || 0) >= (GAME_DATA.leaveEarthMinRealmIndex ?? 5);
}

function getNarrativePhase(player) {
  const idx = player.realmIndex ?? 0;
  const phases = GAME_DATA.narrativePhases || [];
  for (let i = phases.length - 1; i >= 0; i--) {
    const [lo, hi] = phases[i].realmRange || [0, 0];
    if (idx >= lo && idx <= hi) return phases[i];
  }
  return phases[0] || { id: 'early', name: 'Early Game' };
}

function updateNarrativePhase(player) {
  player.narrativePhase = getNarrativePhase(player).id;
}

function getCurrentRealm(player) {
  return GAME_DATA.cultivationRealms.find(r => r.id === player.realmId) || GAME_DATA.cultivationRealms[0];
}

function canLearnTechnique(player, techniqueId) {
  const tech = getTechniqueById(techniqueId);
  if (!tech) return false;
  if (player.techniques.includes(techniqueId)) return false;
  const realm = getCurrentRealm(player);
  const realmIdx = realm.realmIndex;
  return realmIdx >= tech.realmRequired;
}

function addCultivationProgress(player, amount) {
  player.cultivationProgress = (player.cultivationProgress || 0) + amount;
  while (player.cultivationProgress >= player.cultivationNext) {
    player.cultivationProgress -= player.cultivationNext;
    advanceRealm(player);
  }
}

function advanceRealm(player) {
  const current = GAME_DATA.cultivationRealms.findIndex(r => r.id === player.realmId);
  if (current < 0 || current >= GAME_DATA.cultivationRealms.length - 1) return;
  const next = GAME_DATA.cultivationRealms[current + 1];
  player.realmId = next.id;
  player.realmIndex = next.realmIndex;
  player.stage = next.stage;
  player.qiMax = Math.floor(player.qiMax * 1.3);
  player.qi = player.qiMax;
  player.hpMax = Math.floor(player.hpMax * 1.2);
  player.hp = player.hpMax;
  next.unlockTechniques.forEach(tid => {
    if (tid && !player.techniques.includes(tid)) player.techniques.push(tid);
  });
  player.cultivationNext = Math.floor(player.cultivationNext * 1.5);
  updateNarrativePhase(player);
  return next;
}

function addItem(player, itemId, count = 1) {
  const item = getItemById(itemId);
  if (!item) return false;
  const entry = player.inventory.find(i => i.id === itemId);
  if (entry) entry.count += count;
  else player.inventory.push({ id: itemId, count });
  return true;
}

function hasItem(player, itemId, count = 1) {
  const entry = player.inventory.find(i => i.id === itemId);
  return entry && entry.count >= count;
}

function removeItem(player, itemId, count = 1) {
  const entry = player.inventory.find(i => i.id === itemId);
  if (!entry || entry.count < count) return false;
  entry.count -= count;
  if (entry.count <= 0) player.inventory = player.inventory.filter(i => i.id !== itemId);
  return true;
}

function canEnterArea(player, area) {
  if (area.requiresItem && !hasItem(player, area.requiresItem)) return false;
  if (area.minRealm != null && (player.realmIndex || 0) < area.minRealm) return false;
  if (area.minRealmIndex != null && (player.realmIndex || 0) < area.minRealmIndex) return false;
  return true;
}

function unlockArea(player, areaId) {
  if (!player.unlockedAreas.includes(areaId)) player.unlockedAreas.push(areaId);
}
