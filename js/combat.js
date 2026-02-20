/**
 * Combat system - Real-time/tactical with combos.
 * Martial prowess + qi techniques. Canonical technique damage/qi costs from data.js.
 */

function getTechniqueDamage(techniqueId, player) {
  const tech = getTechniqueById(techniqueId);
  if (!tech) return 0;
  const realm = getCurrentRealm(player);
  const mult = realm.qiMultiplier || 1;
  let dmg = (tech.damage || 0) * (mult / 5);
  if (player.stats.martial && tech.type === 'martial') dmg *= 1 + (player.stats.martial - 10) / 100;
  if (player.stats.mystic && tech.type === 'mystic') dmg *= 1 + (player.stats.mystic - 10) / 100;
  return Math.max(1, Math.floor(dmg));
}

function getTechniqueQiCost(techniqueId, player) {
  const tech = getTechniqueById(techniqueId);
  if (!tech) return 0;
  return Math.max(0, (tech.qiCost || 0));
}

function canUseTechnique(player, techniqueId) {
  if (!player.techniques.includes(techniqueId)) return false;
  const cost = getTechniqueQiCost(techniqueId, player);
  return player.qi >= cost;
}

function createEnemy(template) {
  const t = template || {};
  return {
    name: t.name || 'Rival Cultivator',
    realmId: t.realmId || 'foundation',
    hp: t.hp || 80,
    hpMax: t.hpMax || 80,
    qi: t.qi || 50,
    qiMax: t.qiMax || 50,
    techniques: t.techniques || ['basic_fist'],
    damage: t.damage || 15,
    reward: t.reward || { spiritStones: 5, cultivation: 10 }
  };
}

const ENEMY_TEMPLATES = [
  { name: 'Sect Scout', hp: 60, qi: 40, techniques: ['basic_fist', 'qi_gather'], reward: { spiritStones: 3, cultivation: 5 } },
  { name: 'Alley Thug', hp: 70, damage: 18, techniques: ['basic_fist'], reward: { spiritStones: 2, gold: 20 } },
  { name: 'Profound Connection Cultivator', realmId: 'profound', hp: 120, qi: 80, techniques: ['basic_fist', 'profound_spell'], reward: { spiritStones: 8, cultivation: 15 } },
  { name: 'Spirit Sea Expert', realmId: 'spirit_sea', hp: 180, qi: 120, techniques: ['true_martial_36_form_1', 'divine_will_basic'], reward: { spiritStones: 15, cultivation: 25 } },
  { name: 'Arena Champion', hp: 200, qi: 100, techniques: ['true_martial_divine_fist_1', 'void_body_1'], reward: { spiritStones: 30, item: 'talisman_of_thunder' } }
];

function runCombatRound(player, enemy, playerTechniqueId) {
  const results = { playerDamage: 0, enemyDamage: 0, playerQiUsed: 0, log: [] };
  if (!canUseTechnique(player, playerTechniqueId)) {
    results.log.push('You cannot use that technique.');
    return results;
  }
  const cost = getTechniqueQiCost(playerTechniqueId, player);
  player.qi -= cost;
  results.playerQiUsed = cost;
  const dmg = getTechniqueDamage(playerTechniqueId, player);
  enemy.hp -= dmg;
  results.playerDamage = dmg;
  results.log.push(`You use ${getTechniqueById(playerTechniqueId).name} for ${dmg} damage.`);
  if (enemy.hp <= 0) {
    results.log.push(`${enemy.name} is defeated.`);
    return results;
  }
  const enemyTech = enemy.techniques[Math.floor(Math.random() * enemy.techniques.length)];
  const enemyDmg = Math.floor(enemy.damage * (1 + Math.random() * 0.5));
  player.hp -= enemyDmg;
  results.enemyDamage = enemyDmg;
  const enemyTechName = getTechniqueById(enemyTech) ? getTechniqueById(enemyTech).name : enemyTech;
  results.log.push(`${enemy.name} uses ${enemyTechName} for ${enemyDmg} damage.`);
  return results;
}

function applyCombatReward(player, enemy) {
  const r = enemy.reward || {};
  if (r.spiritStones) player.spiritStones = (player.spiritStones || 0) + r.spiritStones;
  if (r.gold) player.gold = (player.gold || 0) + r.gold;
  if (r.cultivation) addCultivationProgress(player, r.cultivation);
  if (r.item) addItem(player, r.item, 1);
}
