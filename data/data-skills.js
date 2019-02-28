'use strict'

const SKILLS = {
	autoTarget: {
		name: "自动搜索",
		desc: "完成目标后自动选择新目标",
		map : 1,
		mult : 5,
		exp : 500
	},
	sensor: {
		name: "翻山越岭",
		desc: "增强探测周围目标的能力",
		map : 1,
		mult : 1.2,
		exp : 500
	},
	charge: {
		name: "装填",
		desc: "停止的时候也能增强士气",
		map : 2,
		mult : 2,
		exp : 1000
	},
	autoTargetFilter: {
		name: "Destination set to nowhere",
		desc: "允许设定自动搜索的基础优先级",
		req : ["autoTarget"],
		map : 3,
		mult : 1.5,
		exp : 2500
	},
	invest: {
		name: "没有牺牲就没有胜利",
		desc: "允许把成长转化为经验",
		map : 3,
		mult : 10,
		exp : 7500
	},
	mining: {
		name: "又深又黑",
		desc: "允许在起点采集黄金",
		map : 4,
		mult: 2,
		exp : 2500
	},
	autoTargetSelector: {
		name: "灵魂的旅途",
		desc: "允许设定自动搜索的高级优先级",
		map : 5,
		req : ['autoTargetFilter'],
		mult: 1.5,
		exp : 10000
	},
	learn: {
		name: "指引我如何活着",
		desc: "允许把相当于成长加成的三倍的经验值转换为成长",
		sliders : 2,
		req : ['invest'],
		mult: 3,
		exp : 55555.55556
	},
	upgradePoints: {
		name: "魔域交响曲",
		desc: "允许升级占领点数",
		map : 7,
		mult: 2,
		exp : 92592.592593
	},
	fire: {
		name: "穿越火焰",
		desc: "火焰伤害不再受到精神惩罚",
		map : 8,
		mult: 3,
		exp : 200000
	},
	build1: {
		name: "超大城市",
		desc: "获得1点建筑能力",
		map : 9,
		req : ['upgradePoints'],
		mult: 2,
		exp : 3086419.75308644
	},
	autoTargetElements: {
		name: "元素, pt.1",
		desc: "允许在自动搜索中设定元素优先级",
		map : 11,
		req : ['autoTargetFilter'],
		mult: 1.5,
		exp : 15432098.7654323
	},
	channel: {
		name: "战歌",
		desc: "允许将属性直接通灵到其它滑块，代替成长",
		mult: 2,
		exp : 257201646.09053498,
		sliders : 3
	},
	management: {
		name: "创建王国",
		desc: "允许在一个地方一次性管理所有点",
		req : ['upgradePoints'],
		res : ['science'],
		map : 9,
		mult: 1.2,
		exp : 128600823.0452675,
		science : 100000
	},
	ice : {
		name: "冰之大地",
		desc: "冰冻伤害不再受到精神惩罚",
		map : 12,
		mult: 2.5, 
		exp : 1286008230.452675
	},
	build2 : {
		name: "超大城市 2.0",
		desc: "解锁 2 级建筑",
		map : 12,
		mult: 5, 
		exp : 1286008230.452675,
		req : ['upgradePoints'],
	},
	greed : {
		name: "黄金强化",
		desc: "黄金工厂生产更多黄金",
		map : 13,
		mult: 1.3, 
		exp : 1286008230.452675,
		req : ['build1'],
		onGet: () => game.production.gold *= game.realMap.level ** 2 / 16.9,
	},
	fear : {
		name : "恐怖统治",
		desc : "滑块的恐惧效果受到滑块的力量加成",
		map : 14,
		mult : 2.4,
		exp : 98923710034.82115 / 3,
		req : ['build2'],
		res : ['fears'],
	},
	automation: {
		name : "宏伟的设计",
		desc : "解锁自动点数提升",
		map : 9,
		mult : 3,
		exp : 12860082304.52675,
		req : ["management"],
		res : ['science'],
		science : 1e6
	},
	stardust: {
		name: "掌控天空",
		desc: "星云中每个云会加成100%元素产出",
		map : 15,
		mult : 5,
		req : ['build2'],
		res : ['clouds', 'stardust'],
		exp : 98923710034.82115 / 3,
	},
	magic: {
		name: "强大的魔法英雄",
		desc: "解锁整个魔法世界",
		map : 16,
		mult : 2,
		sliders : 4,
		exp : 98923710034.82115,
	},
	magicBoost1: {
		name: "神奇王国",
		desc: "魔圈内1级建筑产出提升",
		map : 16,
		mult : 3,
		req : ["magic"],
		exp : 2e10,
	},
	smartHome: {
		name: "到家了",
		desc: "滑块无法找到目标时自动回到初始点挖矿",
		req : ["autoTarget"],
		res : ['science'],
		map : 9,
		mult : 1.1,
		exp : 2e10,
		science : 1.75e6,
	},
	smartMine: {
		name: "回首往事",
		desc: "Mining and attacking sliders can keep checking for better targets",
		req : ["smartHome"],
		res : ['science'],
		map : 9,
		mult : 1.0,
		exp : 2e10,
		science : 2e6,
	},
	buildAutomation: {
		name : "Built to last",
		desc : "Unlock building automation",
		map : 9,
		mult : 3,
		exp : 2e10,
		req : ["management"],
		res : ['science'],
		science : 2.5e6
	},
	smartAuto: {
		name: "Walk away in silence",
		desc: "Sliders change target when dealing no damage and avoid such strong points when autotargetting",
		req : ["autoTarget", "mining"],
		res : ['science'],
		map : 9,
		mult : 1.1,
		exp : 2e10,
		science : 1e7,
	},
	autoTargetDistance: {
		name: "Far from the end of the world",
		desc: "Set distance-based priorities for autotargetting",
		req : ["smartAuto","autoTargetSelector"],
		res : ['science'],
		map : 9,
		mult : 1.5,
		exp : 2e10,
		science : 1e10,
	},
	imbuement: {
		name: "Elements, pt.2",
		desc: "Use mana to imbue power with element",
		req : ["magic"],
		map : 17,
		mult: 4,
		exp : 4e12
	},
	blood: {
		name: "Halo of blood",
		desc: "Blood damage ignores spirit penalty",
		map : 17,
		mult : 2,
		exp : 2e11,
	},
	metal: {
		name: "Metal mass",
		desc: "Metal damage ignores spirit penalty",
		map : 17,
		mult : 2,
		exp : 2e11,
	},
	magicGrowthBoost: {
		name: "Magic forest",
		desc: "Elemental growth bonus boosted within magic circle",
		map : 18,
		mult : 3,
		req : ["magic"],
		exp : 4e12,
	},
	gild: {
		name: "Golden Dawn",
		desc: "Sliders produce gold by fighting and spending mana",
		map : 18,
		mult : 1.5,
		req : ["magic"],
		exp : 2e12,
	},
	build3: {
		name: "Tomorrowland",
		desc: "Unlock level 3 buildings",
		req : ["build2"],
		map : 19,
		mult: 2,
		exp : 1e13
	},
	power: {
		name: "Absolute power",
		desc: "Physical attack ignores spirit penalty",
		map : 21,
		mult: 2,
		exp : 1e17
	},
	spellcasting : {
		name: "Secrets of the Magick Grimoire",
		desc: "Ability to learn and cast spells",
		sliders : 5,
		mult : 2,
		exp : 1e18
	},
	book_summons1 : {
		name: "The warrior's spell",
		desc: "Spellbook - Summon clones to attack chosen point",
		req : ["spellcasting"],
		science : 10e12,
		exp : 1e19,
		mult : 1,
	},
	virtualMaps: {
		name : "Virtual empire",
		desc : "Use stardust to create and explore virtual maps",
		map : 22,
		mult : 2,
		exp : 2e20
	},
	book_dispels1 : {
		name: "Breaking the law",
		desc: "Spellbook - Break protected point shields",
		req : ["spellcasting"],
		map : 23,
		science : 30e12,
		exp : 1e19,
		mult : 1,
	},
	build4: {
		name : "Angry machines",
		desc : "Build at level 4 points",
		map : 24,
		mult : 3,
		exp : 1e22
	},
	book_enchantments1: {
		name : "Symphony of enchanted lands II",
		desc : "Spellbook - Use mana to enchant captured points",
		map : 25,
		req : ["spellcasting"],
		science : 1e14,
		exp : 2e21,
		mult : 1		
	},
	masterSlider : {
		name : "The art of war",
		desc : "Add tools to control all sliders at once",
		req : ["channel", "imbuement", "gild"],
		sliders : 4,
		science : 2e14,
		exp : 1e18,
		mult : 1.05
	},
	magicManagement : {
		name : "Wishmaster",
		desc : "Add magic elements to management",
		req : ["book_enchantments1", "management"],
		science : 4e14,
		exp : 1e22,
		mult : 1.5
	},
	massEnchant : {
		name : "Every last thing",
		desc : "Add mass enchantment to management",
		req : ["magicManagement"],
		science : 6.5e14,
		exp : 1e22,
		mult : 1.5
	},
	smartSummons : {
		name : "For those who walk the path forlorn",
		desc : "Summons choose new target in a more smart way",
		req : ["book_summons1"],
		science : 3e14,
		map : 27,
		exp : 1e22,
		mult : 1.1
	},
	controlSummons : {
		name : "Change direction",
		desc : "Advanced summon targetting",
		req : ["smartSummons", "masterSlider"],
		science : 5e17,
		map : 36,
		exp : 1e22,
		mult : 1.1
	},
	artifacts: {
		name : "Hidden treasure",
		desc : "Research artifacts found during mining",
		sliders : 6,
		mult : 2,
		exp : 5e22
	},
	virtualMapFocus: {
		name : "Heavenseeker",
		desc : "Create virtual maps focused on specific attribute",
		map : 26,
		mult : 2,
		exp : 5e22
	},
	retainVirtualBonus: {
		name : "Beyond reality",
		desc : "Retain virtual map bonuses when deleting them",
		map : 27,
		mult : 2,
		exp : 2e22
	},
	book_summons2 : {
		name: "Master of puppets",
		desc: "Spellbook - Summon specific elementals to attack chosen point",
		req : ["spellcasting"],
		map : 27,
		science : 2e14,
		exp : 1e19,
		mult : 1,
	},
	book_enchantments2: {
		name : "Into the enchanted chamber",
		desc : "Spellbook - More enchantments for points",
		map : 28,
		req : ["book_enchantments1","spellcasting"],
		science : 5e14,
		exp : 2e20,
		mult : 1.5
	},
	book_realign1 : {
		name: "Welcome to the other side",
		desc: "Spellbook - Summon conversion",
		req : ["spellcasting", "book_summons2"],
		map : 28,
		science : 3e14,
		exp : 3e20,
		mult : 1.1,
	},
	book_dispels2 : {
		name: "Break the silence",
		desc: "Spellbook - Break antisummon shields",
		req : ["spellcasting"],
		map : 28,
		science : 6e14,
		exp : 2e19,
		mult : 1.5,
	},
	book_unlocks1 : {
		name: "Keeper of the seven keys",
		desc: "Spellbook - Unlock all the ways from chosen point",
		req : ["spellcasting"],
		map : 28,
		science : 1e15,
		exp : 2e19,
		mult : 1.5,
	},
	spiritStar : {
		name : "Stargazer",
		desc : "Spirit growth is boosted by stars times stardust",
		map : 28,
		exp : 2e28,
		mult : 2
	},
	sliderLevels : {
		name : "Evolution 4.0",
		desc : "Invest experience into levelling up sliders",
		map : 29,
		exp : 1e30,
		mult : 5.203
	},
	smartTablet : {
		name : "Carved in stone",
		desc : "Smart input for artifact research",
		req : ["artifacts"],
		map : 29,
		exp : 1e28,
		science : 5e14,
		mult : 2
	},
	party : {
		name : "As one",
		desc : "Assign leader and follower roles to sliders to form teams",
		map : 30,
		exp : 1e30,
		mult : 2
	},
	imprint : {
		name : "Memories of a time to come",
		desc : "Imprint nodes information in your memory",
		req : ["build4"],
		sliders : 7,
		science : 7.5e14,
		exp : 1e30,
		mult : 2
	},
	virtualImprint : {
		name : "Memories of a dream",
		desc : "Imprint stardust nodes from current-level virtual maps",
		req : ["imprint"],
		science : 8.5e14,
		map : 33,
		exp : 1e30,
		mult : 2
	},
	world : {
		name : "Brave new world",
		desc : "Build a new world based on your memories",
		req : ["imprint"],
		map : 31,
		res : ["_1","_2","_3","_4","_5","_6"],
		exp : 1e30,
		mult : 2
	},
	evolveVirtual : {
		name : "Land beyond the edge",
		desc : "Evolve completed virtual maps of level 31 and above",
		req : ["virtualMaps"],
		map : 32,
		exp : 1e30,
		mult : 2
	},
	levelSummons : {
		name : "Rising force",
		desc : "Summons gain a level and build up strength upon capturing a point",
		req : ["smartSummons"],
		map : 34,
		exp : 1e30,
		mult : 2
	},
	starfall : {
		name : "Starfall",
		desc : "Completed virtual maps of real map level produce stardust for each evolution until deleted",
		req : ["evolveVirtual"],
		map : 36,
		exp : 1e40,
		mult : 2
	},
	worldCore : {
		name : "Kingdom for a heart",
		desc : "Filter memories for more efficient worlds",
		req : ["world"],
		sliders : 8,
		exp : 1e40,
		mult : 2
	},
	autoStar : {
		name : "Astronomy",
		desc : "Automated stardust redistribution",
		req : ["starfall"],
		map : 37,
		exp : 1e41,
		mult : 2
	},
	book_explosive1 : {
		name: "Suicide by my side",
		desc: "Spellbook - Summon explosions",
		req : ["spellcasting"],
		map : 38,
		science : 1e16,
		exp : 1e42,
		mult : 1.1,
	},
	starfire : {
		name : "Starfire",
		desc : "Stars don't crumble to dust on ascension",
		map : 41,
		exp : 1e45,
		mult : 2
	},

	world_blood1 : {
		name : "Upon haunted battlefields",
		desc : "Blueprint - Battlefield",
		req : ["world"],
		feat : "blood1",
		exp : 0,
		mult : 2
	},
	world_science1 : {
		name : "Rise of the wise",
		desc : "Blueprint - Library",
		req : ["world"],
		feat : "science1",
		exp : 0,
		mult : 2
	},
	world_fire1 : {
		name : "Forged in fire",
		desc : "Blueprint - Volcano",
		req : ["world"],
		feat : "fire1",
		exp : 0,
		mult : 2
	},
	world_ice1 : {
		name : "World of ice",
		desc : "Blueprint - Glacier",
		req : ["world"],
		feat : "ice1",
		exp : 0,
		mult : 2
	},
	world_metal1 : {
		name : "Metallic tragedy",
		desc : "Blueprint - Scrapyard",
		req : ["world"],
		feat : "metal1",
		exp : 0,
		mult : 2
	},
	world_mana1 : {
		name : "Magic moments",
		desc : "Blueprint - Mana pool",
		req : ["world"],
		feat : "mana1",
		exp : 0,
		mult : 2
	},
	world_summon1 : {
		name : "Wild beast show",
		desc : "Blueprint - Stabilizer",
		req : ["world"],
		feat : "noabsolute1",
		exp : 0,
		mult : 2
	},
	world_mean1 : {
		name : "A storm to come",
		desc : "Blueprint - Thunder station",
		req : ["world"],
		feat : "noreal1",
		exp : 0,
		mult : 2
	},
	world_power1 : {
		name : "Maximum overload",
		desc : "Blueprint - Power station",
		req : ["world"],
		feat : "power1_disabled",
		map : 52,
		exp : 0,
		mult : 2
	},
	world_connect1 : {
		name : "Fields of ascension",
		desc : "Blueprint - Plains",
		req : ["world"],
		feat : "same1",
		exp : 0,
		mult : 2
	},
	world_connect2 : {
		name : "Old routes - new waters",
		desc : "Blueprint - Island",
		req : ["world"],
		feat : "same3",
		exp : 0,
		mult : 2
	},
}

Object.keys(SKILLS).map(x => SKILLS[x].id = x)
