/**
 * World and exploration - Downtown, hidden zones, faction hubs, pocket dimensions.
 */

function getConnections(areaId) {
  const area = getAreaById(areaId);
  return area ? (area.connections || []) : [];
}

function getAreaEncounters(areaId) {
  const area = getAreaById(areaId);
  if (!area) return [];
  const danger = area.danger || 1;
  const count = Math.min(3, Math.max(1, Math.floor(danger)));
  const pool = ENEMY_TEMPLATES.slice(0, Math.min(ENEMY_TEMPLATES.length, danger + 2));
  const encounters = [];
  for (let i = 0; i < count; i++) {
    encounters.push(createEnemy(pool[Math.floor(Math.random() * pool.length)]));
  }
  return encounters;
}

function getCultivationGain(areaId) {
  const area = getAreaById(areaId);
  const density = area ? area.qiDensity : 1;
  return Math.floor(density * (2 + Math.random() * 3));
}

function discoverArea(player, areaId) {
  const area = getAreaById(areaId);
  if (!area) return false;
  if (!canEnterArea(player, area)) return false;
  unlockArea(player, areaId);
  return true;
}
