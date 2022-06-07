'use strict'

const WORLD_POINT_CORE = 0
const WORLD_POINT_ACTIVE = 1
const WORLD_POINT_PASSIVE = 2

const WORLD_BONUS_ADD = 1
const WORLD_BONUS_MUL = 2
const WORLD_BONUS_ADD_MULT = 3

const WORLD_STATS = {
	goldSpeed : {
		name: "采矿速度 x",
		default: 1
	},
	harvestSpeed : {
		name: "印刷速度 x",
		default: 1
	},
	scienceSpeed : {
		name: "研究速度 x",
		default: 1
	},
	bloodBoost : {
		name: "工人血液加成 x",
		default: 1
	},
	fireBoost : {
		name: "工人火焰加成 x",
		default: 1
	},
	iceBoost : {
		name: "工人冰加成 x",
		default: 1
	},
	metalBoost : {
		name: "工人金属加成 x",
		default: 1
	},
	manaSpeed : {
		name: "魔法生成 x",
		default: 1
	},
	maxSummons : {
		name: "召唤上限: ",
		default: 10
	},
	meanBoost : {
		name: "均衡机器伤害 x",
		default: 1
	},
}

const BASE_WORLD_STATS = Object.keys(WORLD_STATS).reduce((v,x) => (v[x]=WORLD_STATS[x].default, v), {})

const WORLD_ELEMENTS = {
	entryPoint: {
		name : "世界核心",
		desc : "把世界保存在一起",
		type : WORLD_POINT_CORE,
		family : "core",
		radius : 5,
		deadZone : 10,
		reach : 15,
		iconText : "🏠\uFE0E",
	},
	goldMine: {
		name : "金矿",
		desc : "增强采矿速度",
		type : WORLD_POINT_PASSIVE,
		family : "resource",
		radius : 5,
		deadZone : 10,
		reach : 20,
		effect : WORLD_BONUS_MUL,
		value : (depth) => 1 + 2 ** (0.5 - depth / 2),
		stat : "goldSpeed",
		cost : {
			_1 : 3,
			_2 : 3,
		},
		iconText : "⛏\uFE0E"
	},
	imprinter: {
		name : "内存池",
		desc : "增强印刷速度",
		type : WORLD_POINT_PASSIVE,
		family : "imprint",
		radius : 5,
		reach : 25,
		deadZone : 15,
		effect : WORLD_BONUS_MUL,
		value : (depth) => 1 + 2 ** (0.5 - depth / 2),
		stat : "harvestSpeed",
		cost : {
			_1 : 5,
			_2 : 5,
			_3 : 5,
			_4 : 5,
			_5 : 5,
			_6 : 5,
		},
		iconText : "M",
	},
	library : {
		name : "图书馆",
		desc : "增强研究速度",
		type : WORLD_POINT_PASSIVE,
		family : "resource",
		blueprint : "science1",
		radius : 7,
		deadZone : 20, 
		reach : 25,
		iconText : "🔍\uFE0E",
		effect : WORLD_BONUS_ADD_MULT,
		stat : "scienceSpeed",
		value : (depth) => 1,
		cost : {
			_1 : 5,
			_2 : 5,
			_3 : 1,
			_4 : 1,
			_5 : 1,
			_6 : 1,
		}
	},
	bloodSelf: {
		name : "战场",
		desc : "加强工人血液加成",
		type : WORLD_POINT_ACTIVE,
		family : "blood",
		blueprint : "blood1",
		radius : 10,
		deadZone : 25,
		reach : 30,
		iconText : "B",
		effect : WORLD_BONUS_ADD_MULT,
		value : (depth) => 1,
		stat : "bloodBoost",
		cost : {
			_3 : 15
		}	
	},
	fireSelf: {
		name : "火山",
		desc : "加强工人火焰加成",
		type : WORLD_POINT_ACTIVE,
		family : "fire",
		blueprint : "fire1",
		radius : 10,
		deadZone : 25,
		reach : 30,
		iconText : "F",
		effect : WORLD_BONUS_ADD_MULT,
		value : (depth) => 1,
		stat : "fireBoost",
		cost : {
			_4 : 15
		}	
	},
	iceSelf: {
		name : "冰川",
		desc : "加强工人冰加成",
		type : WORLD_POINT_ACTIVE,
		family : "ice",
		blueprint : "ice1",
		radius : 10,
		deadZone : 25,
		reach : 30,
		iconText : "I",
		effect : WORLD_BONUS_ADD_MULT,
		value : (depth) => 1,
		stat : "iceBoost",
		cost : {
			_5 : 15
		}	
	},
	metalSelf: {
		name : "垃圾场",
		desc : "加强工人金属加成",
		type : WORLD_POINT_ACTIVE,
		family : "metal",
		blueprint : "metal1",
		radius : 10,
		deadZone : 25,
		reach : 30,
		iconText : "M",
		effect : WORLD_BONUS_ADD_MULT,
		value : (depth) => 1,
		stat : "metalBoost",
		cost : {
			_6 : 15
		}	
	},
	manaPool: {
		name : "魔法池",
		desc : "加强魔法生成",
		type : WORLD_POINT_ACTIVE,
		family : "imprint",
		blueprint : "mana1",
		radius : 15,
		deadZone : 25,
		reach : 45,
		iconText : "✨\uFE0E",
		effect : WORLD_BONUS_MUL,
		value : (depth) => 1 + 2 ** (0.5 - depth / 2),
		stat : "manaSpeed",
		cost : {
			_3 : 4,
			_4 : 4,
			_5 : 4,
			_6 : 4
		}
	},
	stabilizer: {
		name : "稳定器",
		desc : "增加额外召唤上限",
		type : WORLD_POINT_ACTIVE,
		family : "summon",
		blueprint : "summon1",
		radius : 10,
		deadZone : 20,
		reach : 25,
		iconText : "S",
		effect : WORLD_BONUS_ADD,
		value : (depth) => 1,
		stat : "maxSummons",
		cost : {
			_1 : 4,
			_2 : 4,
			_3 : 2,
			_4 : 2,
			_5 : 2,
			_6 : 2
		}
	},
	charger: {
		name : "闪电站",
		desc : "增强雷石能力",
		type : WORLD_POINT_ACTIVE,
		family : "summon",
		blueprint : "mean1",
		radius : 5,
		deadZone : 35,
		reach : 40,
		iconText : "T",
		effect : WORLD_BONUS_MUL,
//		value : (depth) => 1 + 2 ** (0.5 - (depth ** 1.5) * 0.15),
		value : (depth) => 1 + 2 ** (0.5 - depth * 0.3),
		stat : "meanBoost",
		legacyCost : {
			_1 : 5,
			_2 : 5,
			_3 : 8,
			_4 : 8,
			_5 : 8,
			_6 : 8
		},
		cost : {
			_1 : 4,
			_2 : 4,
			_3 : 6,
			_4 : 6,
			_5 : 6,
			_6 : 6
		}
	},
	powerLift: {
		name : "虚空",
		desc : "什么也没有",
		type : WORLD_POINT_ACTIVE,
		family : "core",
		blueprint : "power1_disabled",
		radius : 5,
		deadZone : 15,
		reach : 0,
		iconText : " ",
		cost : {
		},
		legacyCost : {
			_1 : 75,
			_2 : 30,
		}
	},
	minorConnector : {
		name : "平原",
		desc : "用于连接网点",
		type : WORLD_POINT_ACTIVE,
		family : "core",
		blueprint : "connect1",
		radius : 5,
		deadZone : 10,
		reach : 75,
		iconText : " ",
		cost : {
			_1 : 50,
			_2 : 50,
			_3 : 30,
			_4 : 30,
			_5 : 30,
			_6 : 30,
		}
	},
	minusConnector : {
		name : "岛屿",
		desc : "用于连接核心, 不增加深度",
		type : WORLD_POINT_ACTIVE,
		family : "core",
		blueprint : "connect2",
		radius : 5,
		deadZone : 10,
		reach : 25,
		nodepth : 1,
		iconText : "+",
		cost : {
			_1 : 100,
			_2 : 100,
			_3 : 60,
			_4 : 60,
			_5 : 60,
			_6 : 60,
		}
	},
	bigMinusConnector : {
		name : "山",
		desc : "用于连接核心, 不增加深度",
		type : WORLD_POINT_ACTIVE,
		family : "core",
		blueprint : "connect3",
		radius : 5,
		deadZone : 55,
		reach : 50,
		nodepth : 1,
		iconText : "+",
		cost : {
			_1 : 100,
			_2 : 100,
			_3 : 60,
			_4 : 60,
			_5 : 60,
			_6 : 60,
		}
	},
}

Object.keys(WORLD_ELEMENTS).map(x => WORLD_ELEMENTS[x].id = x)