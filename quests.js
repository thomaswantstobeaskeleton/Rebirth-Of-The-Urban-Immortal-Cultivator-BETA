/**
 * Narrative and quests - Main story + side quests rooted in cultivation world.
 * Canon-compliant objectives; no contradiction with established lore.
 */

const QUEST_DEFS = [
  {
    id: 'relic_rooftop',
    name: 'Abandoned Immortal Relic',
    type: 'main',
    description: 'Rumors speak of an abandoned immortal relic hidden in a rooftop garden above the corporate tower.',
    objectives: [{ id: 'go_rooftop', text: 'Reach the Rooftop Garden', done: false }, { id: 'find_relic', text: 'Find the hidden relic', done: false }],
    rewards: { cultivation: 50, spiritStones: 20, item: 'ethereal_opening_grass' },
    areaId: 'rooftop_garden'
  },
  {
    id: 'defend_hall',
    name: 'Defend the Sect Hall',
    type: 'side',
    description: 'A rival cultivator assault is imminent. Help defend a faction hall.',
    objectives: [{ id: 'reach_hall', text: 'Reach the faction hall', done: false }, { id: 'win_fight', text: 'Defeat the assault leader', done: false }],
    rewards: { reputation: 25, spiritStones: 15, factionId: 'north_qiong' },
    factionId: 'north_qiong'
  },
  {
    id: 'arena_challenge',
    name: 'Underground Arena Challenge',
    type: 'side',
    description: 'Challenge the underground arenas to earn rare spirit artifacts.',
    objectives: [{ id: 'enter_arena', text: 'Enter the Underground Fight Arena', done: false }, { id: 'win_three', text: 'Win three arena battles', done: false }],
    rewards: { item: 'talisman_of_thunder', spiritStones: 25 },
    areaId: 'underground_arena'
  },
  {
    id: 'qi_vein',
    name: 'Qi Vein in the Tunnels',
    type: 'side',
    description: 'Ancient subway tunnels are said to hold a qi vein. Find and cultivate there.',
    objectives: [{ id: 'reach_tunnel', text: 'Reach the Qi Vein Tunnel', done: false }, { id: 'cultivate', text: 'Cultivate at the qi vein (gain 30 progress)', done: false }],
    rewards: { cultivation: 40, spiritStones: 10 },
    areaId: 'qi_vein_tunnel'
  }
];

function getQuestDef(id) {
  return QUEST_DEFS.find(q => q.id === id);
}

function startQuest(player, questId) {
  const def = getQuestDef(questId);
  if (!def) return false;
  if (player.quests.active.some(q => q.id === questId)) return false;
  player.quests.active.push({
    id: def.id,
    name: def.name,
    description: def.description,
    objectives: JSON.parse(JSON.stringify(def.objectives)),
    rewards: def.rewards
  });
  return true;
}

function updateQuestObjective(player, questId, objectiveId) {
  const q = player.quests.active.find(x => x.id === questId);
  if (!q) return false;
  const obj = q.objectives.find(x => x.id === objectiveId);
  if (obj) obj.done = true;
  if (q.objectives.every(o => o.done)) completeQuest(player, questId);
  return true;
}

function completeQuest(player, questId) {
  const q = player.quests.active.find(x => x.id === questId);
  if (!q) return false;
  const def = getQuestDef(questId);
  if (def && def.rewards) {
    if (def.rewards.cultivation) addCultivationProgress(player, def.rewards.cultivation);
    if (def.rewards.spiritStones) player.spiritStones += def.rewards.spiritStones;
    if (def.rewards.reputation) {
      const fid = def.rewards.factionId || def.factionId;
      if (fid) player.factionRep[fid] = (player.factionRep[fid] || 0) + def.rewards.reputation;
    }
    if (def.rewards.item) addItem(player, def.rewards.item, 1);
  }
  player.quests.active = player.quests.active.filter(x => x.id !== questId);
  player.quests.completed.push(questId);
  return true;
}

function getAvailableQuests(player) {
  return QUEST_DEFS.filter(q => !player.quests.completed.includes(q.id) && !player.quests.active.some(a => a.id === q.id));
}
