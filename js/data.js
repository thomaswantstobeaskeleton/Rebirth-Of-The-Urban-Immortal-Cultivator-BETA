/**
 * Rebirth of the Urban Immortal Cultivator - Canonical Game Data
 *
 * Sources (RUIC Fandom Wiki):
 * - Main: https://rebirth-of-the-urban-immortal-cultivator.fandom.com/wiki/Rebirth_of_the_Urban_Immortal_Cultivator_Wiki
 * - Timeline: https://rebirth-of-the-urban-immortal-cultivator.fandom.com/wiki/Timeline
 * - Chen Fan Chronology: https://rebirth-of-the-urban-immortal-cultivator.fandom.com/wiki/Chen_Fan/Chronology
 * - Earth Cultivation: https://rebirth-of-the-urban-immortal-cultivator.fandom.com/wiki/Earth_Cultivation
 * - Techniques: https://rebirth-of-the-urban-immortal-cultivator.fandom.com/wiki/Category:Techniques
 *
 * Timeline: Game begins on Earth (Chuzhou, urban + hidden zones). Vol 1–7 = Earth/Kunxu; leave Earth via Star Gate
 * (Kunxu Path of Heaven) after Golden Core in novel; Qi Xiao brought Chinese to Tianhuang at Nascent Soul. We lock
 * interplanetary at Nascent Soul. Soul Formation cannot enter Earth (arrays).
 *
 * Earth Cultivation equivalents (wiki): Internal Force = Foundation; Transcendent = Profound Connection;
 * Divine Realm = Spirit Sea; Earth Immortal = Xiantian (500y); Celestial Immortal = Golden Core; Heavenly Lord = Nascent Soul.
 */

const GAME_DATA = {
  // === WORLD LAYERS (Canonical cosmological order - wiki) ===
  // Earth (Abandoned Star Region) → Planet Tianhuang → Little Southern Heavenly Realm → Central Galaxy World
  // Leave Earth: Nascent Soul (realmIndex 5). Transform God can travel star regions but cannot enter Earth.
  worldLayers: [
    { id: 'earth', name: 'Earth (Planet East)', nameCn: '地球', minRealmIndex: 0, description: 'Abandoned Star Region. Urban cultivation, hidden sects, spirit treasures. Arrays restrict Soul Formation from entering.', narrativePhase: 'early' },
    { id: 'abandoned_star', name: 'Abandoned Star Region', minRealmIndex: 5, description: 'Beyond Earth. Backwater star region. Planet Tianhuang is its center.', narrativePhase: 'late' },
    { id: 'tianhuang', name: 'Planet Tianhuang (Heavenly Desolate Star)', nameCn: '天荒星', minRealmIndex: 5, description: 'Largest cultivation star in Abandoned Star Region. Connate and Divine Sea widespread; Golden Core elites; Nascent Soul Heavenly Lords. Reached by teleportation.', narrativePhase: 'late' },
    { id: 'little_southern', name: 'Little Southern Heavenly Realm', minRealmIndex: 6, description: 'Galaxy-level. Soul Formation = Sect Masters. Seven Imperishable Sects. Earth is mediocre by comparison.', narrativePhase: 'endgame' },
    { id: 'central_galaxy', name: 'Central Galaxy World', nameCn: '中央星河世界', minRealmIndex: 7, description: 'Center of the universe. Nine Great Immortal Sects. Spirit qi a hundred times Tianhuang. Golden Cores 7th–9th grade.', narrativePhase: 'endgame' }
  ],
  // Canon: interplanetary travel possible at Nascent Soul (realmIndex 5). Wiki: Qi Xiao brought Chinese to Tianhuang at Nascent Soul; Chen Fan reaches Tianhuang via teleportation at advanced stage.
  leaveEarthMinRealmIndex: 5,

  // === NARRATIVE PHASES (mirror novel structure) ===
  narrativePhases: [
    { id: 'early', name: 'Early Game', realmRange: [0, 2], description: 'Urban cultivation, sect rivalries, hidden masters, spirit treasures. Confined to modern urban environments and hidden cultivation zones.' },
    { id: 'mid', name: 'Mid Game', realmRange: [3, 4], description: 'National and global conflicts. Xiantian and Golden Core. Earth-level stakes.' },
    { id: 'late_earth', name: 'Late Earth', realmRange: [5, 5], description: 'Peak on Earth. Nascent Soul. Departure from Earth becomes possible—major narrative milestone.' },
    { id: 'interplanetary', name: 'Interplanetary', realmRange: [5, 6], description: 'Abandoned Star Region, Planet Tianhuang. Larger cultivation civilizations.' },
    { id: 'endgame', name: 'Endgame', realmRange: [6, 9], description: 'Little Southern Heavenly Realm, Central Galaxy World. High-realm immortal politics, cosmic-scale threats.' }
  ],

  // === CULTIVATION REALMS (Canonical order - Qi Refinement has 3 sub-levels) ===
  // Wiki: Foundation Establishment → Profound Connection → Spirit Sea (Qi Refinement); then Xiantian, Golden Core, Nascent Soul, Transform God, Void Returning, Dao Fusion, Transcends Tribulation
  cultivationRealms: [
    { id: 'foundation', name: 'Foundation Establishment', nameCn: '筑基', stage: 'early', realmIndex: 0, subRealm: 'Qi Refinement', lifespan: 150, description: 'First sub-realm of Qi Refinement. Establishing a strong foundation. Comparable to Internal Force Earth Cultivator.', qiMultiplier: 1, unlockTechniques: ['basic_fist', 'qi_gather'] },
    { id: 'foundation_mid', name: 'Foundation Establishment', nameCn: '筑基', stage: 'middle', realmIndex: 0, subRealm: 'Qi Refinement', lifespan: 150, description: 'Middle stage. Immense strength, speed, agility; minor spells.', qiMultiplier: 1.5, unlockTechniques: ['true_martial_36_form_1'] },
    { id: 'foundation_late', name: 'Foundation Establishment', nameCn: '筑基', stage: 'late', realmIndex: 0, subRealm: 'Qi Refinement', lifespan: 150, description: 'Late stage. Beyond human limits.', qiMultiplier: 2, unlockTechniques: [] },
    { id: 'profound', name: 'Profound Connection', nameCn: '通玄', stage: 'early', realmIndex: 1, subRealm: 'Qi Refinement', lifespan: 500, description: 'Second sub-realm. Supernatural powers, call wind and rain. Comparable to Transcendent Realm.', qiMultiplier: 3, unlockTechniques: ['profound_spell', 'ward_basic'] },
    { id: 'profound_mid', name: 'Profound Connection', nameCn: '通玄', stage: 'middle', realmIndex: 1, subRealm: 'Qi Refinement', lifespan: 500, description: 'Immortal Enlightenment phase.', qiMultiplier: 4, unlockTechniques: [] },
    { id: 'profound_late', name: 'Profound Connection', nameCn: '通玄', stage: 'late', realmIndex: 1, subRealm: 'Qi Refinement', lifespan: 500, description: 'Can survive without nutrients for months. Control area within 10 miles.', qiMultiplier: 5, unlockTechniques: ['soul_refining_art_basic'] },
    { id: 'spirit_sea', name: 'Spirit Sea', nameCn: '神海', stage: 'early', realmIndex: 2, subRealm: 'Qi Refinement', lifespan: 500, description: 'Third sub-realm. Condense soul essence, Out of Body, spiritual thoughts. Comparable to Divine Realm.', qiMultiplier: 6, unlockTechniques: ['divine_will_basic', 'void_body_1'] },
    { id: 'spirit_sea_mid', name: 'Spirit Sea', nameCn: '神海', stage: 'middle', realmIndex: 2, subRealm: 'Qi Refinement', lifespan: 500, description: 'Spirit Sea middle.', qiMultiplier: 8, unlockTechniques: [] },
    { id: 'spirit_sea_late', name: 'Spirit Sea', nameCn: '神海', stage: 'late', realmIndex: 2, subRealm: 'Qi Refinement', lifespan: 500, description: 'Wandering for hundreds of miles with spiritual thoughts.', qiMultiplier: 10, unlockTechniques: ['true_martial_divine_fist_1'] },
    { id: 'xiantian', name: 'Xiantian / Innate', nameCn: '先天', stage: 'early', realmIndex: 3, subRealm: 'Xiantian', lifespan: 500, description: 'Innate/Connate. Earth: Earth Immortal (地仙). Final level attainable on Earth until star ocean forces arrived. Arhats, Saints, Demigods.', qiMultiplier: 15, unlockTechniques: ['true_martial_divine_fist_2', 'battling_immortal_pre'] },
    { id: 'xiantian_mid', name: 'Xiantian', nameCn: '先天', stage: 'middle', realmIndex: 3, subRealm: 'Xiantian', lifespan: 500, description: 'Xiantian middle.', qiMultiplier: 20, unlockTechniques: [] },
    { id: 'xiantian_late', name: 'Xiantian', nameCn: '先天', stage: 'late', realmIndex: 3, subRealm: 'Xiantian', lifespan: 500, description: 'Xiantian late.', qiMultiplier: 25, unlockTechniques: [] },
    { id: 'golden_core', name: 'Golden Core', nameCn: '金丹', stage: 'early', realmIndex: 4, subRealm: 'Golden Core', lifespan: 1000, description: 'Jin Dan. True Monarchs. Earth: Celestial Immortal (天仙). Control space, territories, magic forms. Timeline: Chen Fan left Earth via Star Gate after forming Golden Core.', qiMultiplier: 50, unlockTechniques: ['true_martial_sacred_body', 'golden_core_arts'] },
    { id: 'nascent_soul', name: 'Nascent Soul', nameCn: '元婴', stage: 'early', realmIndex: 5, subRealm: 'Nascent Soul', lifespan: 3000, description: 'Yuan Ying. Earth: Heavenly Lord / Heavenly Monarch (元婴). Overlords on Planet Tianhuang. Qi Xiao brought Chinese to Tianhuang at this realm. Seal of Heaven and Earth.', qiMultiplier: 100, unlockTechniques: ['battling_immortal_art'] },
    { id: 'transform_god', name: 'Transform God / Soul Formation', nameCn: '化神', stage: 'early', realmIndex: 6, subRealm: 'Transform God', lifespan: 10000, description: 'Divine Monarch, Great Power. Transform into god. Travel star regions.', qiMultiplier: 200, unlockTechniques: [] },
    { id: 'void_returning', name: 'Void Returning', nameCn: '返虚', stage: 'early', realmIndex: 7, subRealm: 'Void Returning', lifespan: 100000, description: 'Saints. Can become Ancient Sage.', qiMultiplier: 400, unlockTechniques: [] },
    { id: 'dao_fusion', name: 'Dao Fusion', nameCn: '合道', stage: 'early', realmIndex: 8, subRealm: 'Dao Fusion', lifespan: 1000000, description: 'True Immortals. Peak of universe. Perfected Immortal.', qiMultiplier: 800, unlockTechniques: [] },
    { id: 'transcends_tribulation', name: 'Transcends Tribulation', nameCn: '渡劫', stage: 'early', realmIndex: 9, subRealm: 'Transcends Tribulation', lifespan: null, description: 'Profound Immortal. Cross calamity. Only Chen Beixuan reached peak in millions of years.', qiMultiplier: 1600, unlockTechniques: [] }
  ],

  // === TECHNIQUES (From wiki Category:Techniques) ===
  techniques: [
    { id: 'basic_fist', name: 'Basic Fist', type: 'martial', realmRequired: 0, description: 'Fundamental martial strike.', damage: 10, qiCost: 0, cooldown: 0 },
    { id: 'qi_gather', name: 'Qi Gathering', type: 'mystic', realmRequired: 0, description: 'Gather spiritual qi. Minor spell.', damage: 0, qiCost: -5, cooldown: 2 },
    { id: 'true_martial_36_form_1', name: 'True Martial Thirty-Six Forms (First)', type: 'martial', realmRequired: 1, description: 'True Martial Immortal Sect foundational forms.', damage: 25, qiCost: 5, cooldown: 1 },
    { id: 'profound_spell', name: 'Profound Spell', type: 'mystic', realmRequired: 3, description: 'Call wind and rain, supernatural effect.', damage: 30, qiCost: 15, cooldown: 2 },
    { id: 'ward_basic', name: 'Basic Ward', type: 'mystic', realmRequired: 3, description: 'Simple qi ward for defense.', damage: 0, qiCost: 10, cooldown: 3 },
    { id: 'soul_refining_art_basic', name: 'Soul Refining Art (Basic)', type: 'mystic', realmRequired: 5, description: 'Soul Refining Art - rare among cultivators. Strengthen soul.', damage: 20, qiCost: 20, cooldown: 4 },
    { id: 'divine_will_basic', name: 'Divine Will (Basic)', type: 'mystic', realmRequired: 6, description: 'Spiritual thought attack.', damage: 35, qiCost: 25, cooldown: 3 },
    { id: 'void_body_1', name: 'Void Body Refining Art (First Layer)', type: 'martial', realmRequired: 6, description: 'Void Body Refining Art - defensive body refinement.', damage: 15, qiCost: 18, cooldown: 2 },
    { id: 'true_martial_divine_fist_1', name: 'True Martial Divine Fist (1st Form)', type: 'martial', realmRequired: 8, description: 'Zhenwu Shenquan. Strongest fist of True Martial Immortal Sect. Surpasses moves, pure strength.', damage: 60, qiCost: 30, cooldown: 2 },
    { id: 'true_martial_divine_fist_2', name: 'True Martial Divine Fist (2nd Form)', type: 'martial', realmRequired: 9, description: 'Second form. Cross galaxy undefeated among same generation.', damage: 90, qiCost: 40, cooldown: 3 },
    { id: 'battling_immortal_pre', name: 'Battling Immortal Art (Preliminary)', type: 'martial', realmRequired: 9, description: 'Douzhan Xianjue. Top cultivation method. Requires Soul Formation + True Martial Sacred Body to fully learn.', damage: 50, qiCost: 35, cooldown: 3 },
    { id: 'true_martial_sacred_body', name: 'True Martial Sacred Body', type: 'martial', realmRequired: 13, description: 'Body refinement of True Martial Immortal Sect. Required for Battling Immortal Art.', damage: 0, qiCost: 50, cooldown: 10 },
    { id: 'golden_core_arts', name: 'Golden Core Arts', type: 'mystic', realmRequired: 13, description: 'Dharma Form techniques at Golden Core.', damage: 80, qiCost: 45, cooldown: 2 },
    { id: 'battling_immortal_art', name: 'Battling Immortal Art', type: 'martial', realmRequired: 14, description: 'Supreme immortal skill of True Martial Immortal Sect. Top ten in Universe.', damage: 120, qiCost: 60, cooldown: 4 }
  ],

  // === FACTIONS (From wiki - Earth & Nine Great Immortal Sects) ===
  factions: [
    { id: 'north_qiong', name: 'North Qiong Sect', type: 'sect', description: 'Rules Earth. Mount North Qiong. Chen Beixuan as Patriarch.', reputation: 0, territory: 'Earth' },
    { id: 'kunlun', name: 'Kunlun', type: 'sect', description: 'Earth cultivation force. Secret realm.', reputation: 0, territory: 'Earth' },
    { id: 'dragon_hall', name: 'Dragon Hall', type: 'organization', description: 'Earth organization.', reputation: 0, territory: 'Earth' },
    { id: 'dark_witch_hall', name: 'Dark Witch Hall', type: 'sect', description: 'Dark Witch Sect.', reputation: 0, territory: 'Earth' },
    { id: 'pill_refining_hall', name: 'Pill Refining Hall', type: 'organization', description: 'Medicine God Valley. Alchemy.', reputation: 0, territory: 'Earth' },
    { id: 'true_martial', name: 'True Martial Immortal Sect', type: 'immortal_sect', description: 'One of Nine Great Immortal Sects. First fighting sect in Universe. Northern Central Galaxy.', reputation: 0, territory: 'Central Galaxy' },
    { id: 'taiyi', name: 'Taiyi Immortal Sect', type: 'immortal_sect', description: 'Nine Great Immortal Sects. Central Galaxy.', reputation: 0, territory: 'Central Galaxy' },
    { id: 'five_elements', name: 'Five Elements Immortal Sect', type: 'immortal_sect', description: 'Nine Great Immortal Sects. Five Elemental arts.', reputation: 0, territory: 'Central Galaxy' },
    { id: 'ascension', name: 'Ascension Immortal Sect', type: 'immortal_sect', description: 'Nine Great Immortal Sects.', reputation: 0, territory: 'Central Galaxy' },
    { id: 'spiritual_sword', name: 'Spiritual Sword Immortal Sect', type: 'immortal_sect', description: 'Nine Great Immortal Sects. Sword arts.', reputation: 0, territory: 'Central Galaxy' },
    { id: 'red_blood', name: 'Red Blood Immortal Sect', type: 'immortal_sect', description: 'Nine Great Immortal Sects. At war with True Martial.', reputation: 0, territory: 'Central Galaxy' },
    { id: 'heaven_kill', name: "Heaven's Kill", type: 'organization', description: 'Earth clandestine organization.', reputation: 0, territory: 'Earth' },
    { id: 'green_gang', name: 'Green Gang', type: 'organization', description: 'Earth underworld.', reputation: 0, territory: 'Earth' }
  ],

  // === ITEMS / ARTIFACTS (From wiki Category:Items) ===
  items: [
    { id: 'spirit_gathering_pill', name: 'Spirit Gathering Pill', type: 'pill', rarity: 'common', effect: { qi: 20 }, description: 'Restores qi. Common alchemy.' },
    { id: 'vital_essence_pill', name: 'Vital Essence Pill', type: 'pill', rarity: 'uncommon', effect: { qi: 50, hp: 30 }, description: 'Vital nourishment.' },
    { id: 'red_flame_spirit_pill', name: 'Red Flame Spirit Pill', type: 'pill', rarity: 'rare', effect: { qi: 100, fireRes: 10 }, description: 'Spirit pill with fire affinity.' },
    { id: 'longevity_pill', name: 'Longevity Pill', type: 'pill', rarity: 'treasure', effect: { lifespan: 100 }, description: 'Heavenly Treasure. Extends lifespan.' },
    { id: 'heaven_mending_medicine', name: 'Heaven Mending Medicine', type: 'pill', rarity: 'treasure', effect: { heal: 'major', qi: 200 }, description: 'Heavenly Treasure. Major restoration.' },
    { id: 'nine_orifices_divine_infant', name: 'Nine Orifices Divine Infant', type: 'pill', rarity: 'treasure', effect: { breakthrough: true }, description: 'Divine pill for breakthrough.' },
    { id: 'talisman_of_thunder', name: 'Talisman of Thunder', type: 'artifact', rarity: 'uncommon', effect: { damage: 40, element: 'thunder' }, description: 'Thunder seal. Qi-based attack.' },
    { id: 'five_thunder_seal', name: 'Five Thunder Seal', type: 'artifact', rarity: 'spirit', effect: { damage: 55, element: 'thunder' }, description: 'Spirit Artifact from wiki. Runic/energy spell tied to thunder.' },
    { id: 'dimension_altering_treasure', name: 'Dimension Altering Dharma Treasure', type: 'artifact', rarity: 'spirit', effect: { pocketDimension: true }, description: 'Spirit artifact. Access pocket dimension.' },
    { id: 'immortal_feather', name: 'Immortal Feather', type: 'artifact', rarity: 'immortal', effect: { speed: 20, dodge: 10 }, description: 'Immortal Treasure. Rare passive boost.' },
    { id: 'essence_restoring_sword', name: 'Essence Restoring Flying Sword', type: 'weapon', rarity: 'rare', effect: { damage: 35, qi: 5 }, description: 'Flying sword. Restores essence.' },
    { id: 'blade_of_divine_will', name: 'Blade of Divine Will', type: 'weapon', rarity: 'spirit', effect: { damage: 60, divineWill: true }, description: 'Spirit artifact. Divine Will blade.' },
    { id: 'spirit_gathering_plate', name: 'Spirit Gathering Plate', type: 'artifact', rarity: 'uncommon', effect: { cultivationSpeed: 1.2 }, description: 'Increases cultivation speed.' },
    { id: 'ethereal_opening_grass', name: 'Ethereal Opening Grass', type: 'herb', rarity: 'rare', effect: { breakthrough: 0.3 }, description: 'Spirit herb. Aids breakthrough.' },
    { id: 'clear_jade_pill_manual', name: 'Clear Jade Pill Manual', type: 'manual', rarity: 'treasure', effect: { alchemy: true }, description: 'Alchemy manual. Unlocks recipes.' },
    { id: 'spirit_stone', name: 'Spirit Stone', type: 'currency', rarity: 'common', effect: {}, description: 'Currency and qi source for cultivators.' }
  ],

  // === WORLD AREAS ===
  // All early areas are Earth-only (worldLayer: 'earth'). Beyond-Earth areas unlock at canonical realm (Nascent Soul for Tianhuang).
  areas: [
    // --- EARTH (Abandoned Star Region - Planet East). Game begins here. ---
    { id: 'chuzhou_downtown', name: 'Chuzhou Downtown', worldLayer: 'earth', type: 'downtown', description: 'Night markets, corporate towers. Contested turf. Modern urban surface.', danger: 1, qiDensity: 2, factions: ['green_gang', 'north_qiong'], connections: ['chuzhou_alley', 'corporate_tower', 'night_market'] },
    { id: 'chuzhou_alley', name: 'Chuzhou Alleyways', worldLayer: 'earth', type: 'downtown', description: 'Hidden alleyways. Sect scouts. Beneath the surface of normal society.', danger: 2, qiDensity: 3, factions: ['heaven_kill'], connections: ['chuzhou_downtown', 'subway_entrance'] },
    { id: 'night_market', name: 'Night Market', worldLayer: 'earth', type: 'downtown', description: 'Spirit herbs, pills, rumors. Cultivator gathering.', danger: 1, qiDensity: 4, factions: [], connections: ['chuzhou_downtown', 'pill_refining_hall_entrance'] },
    { id: 'corporate_tower', name: 'Corporate Tower', worldLayer: 'earth', type: 'downtown', description: 'High-rise. Corporate front for sects.', danger: 2, qiDensity: 2, factions: [], connections: ['chuzhou_downtown', 'rooftop_garden'] },
    { id: 'rooftop_garden', name: 'Rooftop Garden', worldLayer: 'earth', type: 'hidden', description: 'Abandoned immortal relic hidden here. Qi vein.', danger: 3, qiDensity: 7, factions: [], connections: ['corporate_tower'], questHub: true },
    { id: 'subway_entrance', name: 'Abandoned Subway Entrance', worldLayer: 'earth', type: 'hidden', description: 'Tunnels with qi veins. Ancient seals. Hidden cultivation zone.', danger: 3, qiDensity: 6, factions: [], connections: ['chuzhou_alley', 'qi_vein_tunnel'] },
    { id: 'qi_vein_tunnel', name: 'Qi Vein Tunnel', worldLayer: 'earth', type: 'hidden', description: 'Spiritual qi concentration. Cultivation spot.', danger: 4, qiDensity: 9, factions: ['kunlun'], connections: ['subway_entrance', 'ancient_temple_entrance'] },
    { id: 'ancient_temple_entrance', name: 'Ancient Temple Entrance', worldLayer: 'earth', type: 'faction_hub', description: 'Hidden temple. Sect territory.', danger: 4, qiDensity: 8, factions: ['kunlun'], connections: ['qi_vein_tunnel', 'kunlun_hall'] },
    { id: 'kunlun_hall', name: 'Kunlun Sect Hall', worldLayer: 'earth', type: 'faction_hub', description: 'Kunlun sect hall. Missions and training.', danger: 2, qiDensity: 7, factions: ['kunlun'], connections: ['ancient_temple_entrance'], factionHub: 'kunlun' },
    { id: 'pill_refining_hall_entrance', name: 'Pill Refining Hall Gate', worldLayer: 'earth', type: 'faction_hub', description: 'Medicine God Valley entrance. Alchemy and pills.', danger: 1, qiDensity: 5, factions: ['pill_refining_hall'], connections: ['night_market', 'pill_refining_hall'], factionHub: 'pill_refining_hall' },
    { id: 'pill_refining_hall', name: 'Pill Refining Hall', worldLayer: 'earth', type: 'faction_hub', description: 'Interior. Cauldrons, spirit herbs.', danger: 1, qiDensity: 6, factions: ['pill_refining_hall'], connections: ['pill_refining_hall_entrance'], factionHub: 'pill_refining_hall' },
    { id: 'underground_arena', name: 'Underground Fight Arena', worldLayer: 'earth', type: 'faction_hub', description: 'Wuji Arena. Earn spirit artifacts through combat.', danger: 5, qiDensity: 4, factions: [], connections: ['chuzhou_alley'], arena: true },
    { id: 'mount_north_qiong_gate', name: 'Mount North Qiong Gate', worldLayer: 'earth', type: 'faction_hub', description: 'North Qiong Sect. Rules Earth.', danger: 2, qiDensity: 8, factions: ['north_qiong'], connections: ['chuzhou_downtown', 'teleport_platform_earth'], factionHub: 'north_qiong' },
    { id: 'pocket_dimension_entrance', name: 'Pocket Dimension Rift', worldLayer: 'earth', type: 'pocket', description: 'Dimension Altering Dharma Treasure opens rift. Challenge zone.', danger: 6, qiDensity: 10, factions: [], connections: ['rooftop_garden'], requiresItem: 'dimension_altering_treasure' },
    { id: 'deity_ground_entrance', name: 'Deity Ground Entrance', worldLayer: 'earth', type: 'pocket', description: 'Earth Deity Ground. Great Opportunity. Restricted to those at Golden Core or beyond.', danger: 8, qiDensity: 12, factions: ['north_qiong'], connections: ['mount_north_qiong_gate'], minRealmIndex: 4 },
    // --- BEYOND EARTH: Unlocked at Nascent Soul (canon). Transition is a major narrative milestone. ---
    { id: 'teleport_platform_earth', name: 'Star Teleportation Platform', worldLayer: 'earth', type: 'milestone', description: 'Ancient platform. Only those at Nascent Soul or beyond can endure the crossing. Beyond lies the Abandoned Star Region and Planet Tianhuang.', danger: 0, qiDensity: 5, factions: ['north_qiong'], connections: ['mount_north_qiong_gate', 'tianhuang_arrival'], minRealmIndex: 5, milestoneLeaveEarth: true },
    { id: 'tianhuang_arrival', name: 'Planet Tianhuang — Arrival', worldLayer: 'tianhuang', type: 'downtown', description: 'Heavenly Desolate Star. Spirit qi floods from afar; Connate and Divine Sea cultivators are widespread. Earth-level cultivators are weak here.', danger: 6, qiDensity: 25, factions: [], connections: ['teleport_platform_earth', 'tianhuang_city', 'beihan_region_gate', 'little_southern_gate'], minRealmIndex: 5 },
    { id: 'tianhuang_city', name: 'Zhuyan City', worldLayer: 'tianhuang', type: 'downtown', description: 'City on Tianhuang. Large sects, overlords. A Golden Core from Mount Emperor once defeated all True Gods on Earth.', danger: 7, qiDensity: 28, factions: [], connections: ['tianhuang_arrival'], minRealmIndex: 5 },
    { id: 'beihan_region_gate', name: 'Beihan Region Gate', worldLayer: 'tianhuang', type: 'faction_hub', description: 'Region spanning millions of miles. Lord Beihan rules; thousands of cities. Soul Formation cultivators have been rare here over millions of years.', danger: 8, qiDensity: 30, factions: [], connections: ['tianhuang_arrival'], minRealmIndex: 5 },
    { id: 'little_southern_gate', name: 'Little Southern Heavenly Realm — Border', worldLayer: 'little_southern', type: 'faction_hub', description: 'Galaxy-level. Soul Formation = Sect Masters. Seven Imperishable Sects. Earth is mediocre by comparison.', danger: 10, qiDensity: 60, factions: [], connections: ['tianhuang_arrival', 'central_galaxy_gate'], minRealmIndex: 6 },
    { id: 'central_galaxy_gate', name: 'Central Galaxy World — Border', worldLayer: 'central_galaxy', type: 'faction_hub', description: 'Center of the universe. Nine Great Immortal Sects. Spirit qi a hundred times Tianhuang.', danger: 12, qiDensity: 100, factions: ['true_martial', 'taiyi'], connections: ['little_southern_gate'], minRealmIndex: 7 }
  ],

  // === BACKGROUNDS (Player choice - non-protagonist) ===
  backgrounds: [
    { id: 'mortal_awakened', name: 'Awakened Mortal', description: 'You were an ordinary city dweller until spiritual qi surged and you awakened.', bonus: { qi: 5, hp: 10 } },
    { id: 'sect_outer', name: 'Outer Sect Disciple', description: 'You joined an Earth sect as an outer disciple before the great awakening.', bonus: { qi: 10, technique: 'true_martial_36_form_1' } },
    { id: 'herb_gatherer', name: 'Spirit Herb Gatherer', description: 'You gathered herbs in the mountains and absorbed trace qi.', bonus: { alchemy: 5, qi: 5 } },
    { id: 'corporate_heir', name: 'Corporate Heir', description: 'Your family runs a front for cultivator interests.', bonus: { reputation: 10, gold: 100 } },
    { id: 'street_fighter', name: 'Street Fighter', description: 'You fought in underground rings. Now qi flows in your fists.', bonus: { hp: 20, damage: 5 } }
  ],

  // === AVATARS (visual choice) ===
  avatars: [
    { id: 'male_young', name: 'Young Cultivator', sprite: '🧑', description: 'Young man in modern attire.' },
    { id: 'female_young', name: 'Young Cultivator', sprite: '👩', description: 'Young woman in modern attire.' },
    { id: 'martial', name: 'Martial Artist', sprite: '🥋', description: 'Martial arts gi, focused.' },
    { id: 'mystic', name: 'Mystic', sprite: '🔮', description: 'Robe and talisman.' },
    { id: 'alchemist', name: 'Alchemist', sprite: '⚗️', description: 'Herb pouch and cauldron.' }
  ]
};

// Canonical realm index for progression checks
function getRealmIndex(realmId) {
  const r = GAME_DATA.cultivationRealms.find(x => x.id === realmId);
  return r ? r.realmIndex : -1;
}

function getTechniqueById(id) {
  return GAME_DATA.techniques.find(t => t.id === id);
}

function getAreaById(id) {
  return GAME_DATA.areas.find(a => a.id === id);
}

function getFactionById(id) {
  return GAME_DATA.factions.find(f => f.id === id);
}

function getItemById(id) {
  return GAME_DATA.items.find(i => i.id === id);
}
