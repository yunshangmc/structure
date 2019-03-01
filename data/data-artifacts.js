'use strict'

const RESEARCH_LETTERS = 0
const RESEARCH_NUMBERS = 1

const LETTERS = Array(26).fill(0).map((x,n) => String.fromCharCode(n+65))
const LETTER_PAIRS = Array(26*26).fill(0).map((x,n) => LETTERS[n/26|0]+LETTERS[n%26])

const ARTIFACTS = {
	pickaxe: {
		name: "闪光的镐子",
		desc: "滑块挖掘速度更快",
		codeLength : 5,
		codeCost : 3e7,
		depth : 2.341e4,
		iconText: "⛏️\uFE0E",
		iconTextColor: "var(--foreground)",
		glyph : "none-pickaxe",
		active() {
			return this.equipped && this.equipped.target && !this.equipped.target.index
		}
	},
	doublePickaxe: {
		name : "加倍工作镐",
		desc : "滑块采集效率下降，但记为两名工人",
		researchType : RESEARCH_NUMBERS,
		codeLength : 5,
		codeCost : 1e15,
		codeDigits : 2,
		depth : 8.645e45,
		active() {
			return this.equipped && this.equipped.target && !this.equipped.target.index
		},
		glyph : "power-pickaxe",
		iconText: "⛏️\uFE0E",
		iconTextColor: "var(--bg-power)",		
	},
	alwaysPickaxe: {
		name : "自动镐",
		desc : "即使不挖掘，也会有一名工人的产出",
		researchType : RESEARCH_NUMBERS,
		codeLength : 5,
		codeCost : 1e15,
		codeDigits : 2,
		depth : 3.165e48,
		active() {
			return this.equipped && (!this.equipped.target || this.equipped.target.index)
		},
		glyph : "spirit-pickaxe",
		iconText: "⛏️\uFE0E",
		iconTextColor: "var(--bg-spirit)",		
	},
	expOrb: {
		name : "经验珠",
		desc : "装备的滑块获得三倍经验值",
		codeLength : 5,
		codeCost : 1e7,
		depth : 1.43e2,
		active() {
			return this.equipped && this.equipped.real && this.equipped.real.producingExp
		},
		iconText : "🔮️\uFE0E",
		iconTextColor : "var(--shade5)",
		glyph : "none-emptyorb",
	},
	channelOrb: {
		name : "传递球",
		desc : "传递不再影响成长",
		codeLength : 12,
		codeCost : 2e9,
		depth : 7.777e16,
		active() {
			return this.equipped && (masterSlider.masterChannel?masterSlider:this.equipped).channel.length
		},
		iconText : "🔮️\uFE0E",
		iconTextColor : "var(--foreground)",
		glyph : "none-orb",
	},
	summonOrb: {
		name : "召唤珠",
		desc : "传递效果翻倍并不影响成长, 但只对召唤有效",
		codeLength : 29,
		codeCost : 75e12,
		depth : 2.456e39,
		active() {
			return this.equipped && (masterSlider.masterChannel?masterSlider:this.equipped).channel.length && game.sliders.filter(x => x.clone == 2).length
		},
		iconText : "🔮️\uFE0E",
		iconTextColor : "var(--enchantdoom)",
		glyph : "mana-emptyorb",
	},
	growthOrb: {
		name : "成长珠",
		desc : "装备的滑块获得三倍成长",
		codeLength : 13,
		codeCost : 32e9,
		depth : 2.627e21,
		active() {
			return this.equipped && this.equipped.real && Object.values(this.equipped.real.growth).reduce((v,x) => v+x, 0)
		},
		iconText : "🔮️\uFE0E",
		iconTextColor : "var(--enchantgrowth)",
		glyph : "storm-emptyorb",
	},
	powerOrb: {
		name : "力量珠",
		desc : "滑块的所有成长转化为力量",
		codeLength : 6,
		codeCost : 1e8,
		depth : 3.141e6,
		active() {
			return this.equipped && this.equipped.real && this.equipped.real.growth.power
		},
		glyph : "power-orb",
		iconText : "🔮️\uFE0E",
		iconTextColor : "var(--bg-power)"
	},
	bloodOrb: {
		name : "血液珠",
		desc : "滑块的所有元素成长转换为血液成长",
		codeLength : 8,
		codeCost : 3e8,
		depth : 6.264e12,
		active() {
			return this.equipped && this.equipped.real && this.equipped.real.growth.blood
		},
		glyph : "blood-orb",
		iconText : "🔮️\uFE0E",
		iconTextColor : "var(--bg-blood)"
	},
	fireOrb: {
		name : "火焰珠",
		desc : "滑块的所有元素成长转换为火焰成长",
		codeLength : 9,
		codeCost : 4e8,
		depth : 4.91e17,
		active() {
			return this.equipped && this.equipped.real && this.equipped.real.growth.fire
		},
		glyph : "fire-orb",
		iconText : "🔮️\uFE0E",
		iconTextColor : "var(--bg-fire)"
	},
	iceOrb: {
		name : "冰珠",
		desc : "滑块的所有元素成长转换为冰成长",
		codeLength : 9,
		codeCost : 5e8,
		depth : 9.326e14,
		active() {
			return this.equipped && this.equipped.real && this.equipped.real.growth.ice
		},
		glyph : "ice-orb",
		iconText : "🔮️\uFE0E",
		iconTextColor : "var(--bg-ice)"
	},
	metalOrb: {
		name : "金属珠",
		desc : "滑块的所有元素成长转换为金属成长",
		codeLength : 9,
		codeCost : 6e8,
		depth : 1.61e18,
		active() {
			return this.equipped && this.equipped.real && this.equipped.real.growth.metal
		},
		glyph : "metal-orb",
		iconText : "🔮️\uFE0E",
		iconTextColor : "var(--bg-metal)"
	},
	greatOrb: {
		name : "大元素珠",
		desc : "重新分配元素成长",
		codeLength : 21,
		codeCost : 5e12,
		depth : 7.634e35,
		active() {
			return this.equipped && (this.equipped.growth.power || this.equipped.learn.includes(1))
		},
		glyph : "storm-orb",
		iconText : "🔮️\uFE0E",
		iconTextColor : "var(--foreground)"
	},	
	targetOrb: {
		name : "吸取珠",
		desc : "目标为元素节点时，基于目标元素成长增强滑块元素成长",
		researchType : RESEARCH_NUMBERS,
		codeLength : 5,
		codeCost : 1e15,
		codeDigits : 3,
		depth : 3.606e46,
		active() {
			return this.equipped && this.equipped.target && this.equipped.target.type > 2
		},
		glyph : "spirit-orb",
		iconText : "🔮️\uFE0E",
		iconTextColor : "var(--bg-spirit)"
	},
	superTargetOrb: {
		name : "至高吸取珠",
		desc : "目标为元素节点时, 所有滑块基于目标元素成长都获得元素成长增强",
		researchType : RESEARCH_NUMBERS,
		codeLength : 6,
		codeCost : 2e16,
		codeDigits : 4,
		depth : 5.222e54,
		active() {
			return this.equipped && this.equipped.target && this.equipped.target.type > 2
		},
		glyph : "spirit-emptyorb",
		iconText : "🔮️\uFE0E",
		iconTextColor : "var(--bg-spirit)"
	},
	masterOrb: {
		name : "主宰珠",
		desc : "目标为元素节点时, 滑块元素成长增强相当于目标的成长削弱",
		researchType : RESEARCH_NUMBERS,
		codeLength : 7,
		codeCost : 7e15,
		codeDigits : 3,
		depth : 2.157e50,
		active() {
			return this.equipped && this.equipped.target && this.equipped.target.type > 2
		},
		glyph : "dark-orb",
		iconText : "🔮️\uFE0E",
		iconTextColor : "var(--shade8)"
	},
	superMasterOrb: {
		name : "至高主宰球",
		desc : "目标为元素节点时, 所有滑块元素成长增强相当于目标的成长削弱",
		researchType : RESEARCH_NUMBERS,
		codeLength : 7,
		codeCost : 2e16,
		codeDigits : 4,
		depth : 9.455e55,
		active() {
			return this.equipped && this.equipped.target && this.equipped.target.type > 2
		},
		glyph : "dark-emptyorb",
		iconText : "🔮️\uFE0E",
		iconTextColor : "var(--shade8)"
	},
	bloodRod: {
		name : "血液之杖",
		desc : "造成相当于血液伤害 5% 的穿透伤害",
		codeLength : 9,
		codeCost : 5e8,
		depth : 5.251e15,
		active() {
			return this.equipped && this.equipped.real && this.equipped.target && this.equipped.target.index && this.equipped.real.blood
		},
		glyph : "blood-rod",
		iconText: "/️",
		iconTextColor : "var(--bg-blood)"
	},
	fireRod: {
		name : "火焰之杖",
		desc : "造成相当于火焰伤害 5% 的穿透伤害",
		codeLength : 8,
		codeCost : 3e8,
		depth : 8.326e11,
		active() {
			return this.equipped && this.equipped.real && this.equipped.target && this.equipped.target.index && this.equipped.real.fire
		},
		glyph : "fire-rod",
		iconText: "/️",
		iconTextColor : "var(--bg-fire)"
	},
	iceRod: {
		name : "冰之杖",
		desc : "造成相当于冰伤害 5% 的穿透伤害",
		codeLength : 6,
		codeCost : 3e8,
		depth : 8.231e8,
		active() {
			return this.equipped && this.equipped.real && this.equipped.target && this.equipped.target.index && this.equipped.real.ice
		},
		glyph : "ice-rod",
		iconText: "/️",
		iconTextColor : "var(--bg-ice)"
	},
	metalRod: {
		name : "金属之杖",
		desc : "造成相当于金属伤害 5% 的穿透伤害",
		codeLength : 9,
		codeCost : 4e8,
		depth : 7.272e13,
		active() {
			return this.equipped && this.equipped.real && this.equipped.target && this.equipped.target.index && this.equipped.real.metal
		},
		glyph : "metal-rod",
		iconText: "/️",
		iconTextColor : "var(--bg-metal)"
	},
	pierceRod: {
		name : "元素之杖",
		desc : "造成相当于元素伤害 2% 的穿透伤害",
		codeLength : 14,
		codeCost : 3e9,
		depth : 1.234e23,
		active() {
			return this.equipped && this.equipped.real && this.equipped.target && this.equipped.target.index && (this.equipped.real.metal + this.equipped.real.ice + this.equipped.real.fire + this.equipped.real.blood)
		},
		glyph : "storm-rod",
		iconText: "/️",
		iconTextColor : "var(--foreground)"
	},
	nullRod: {
		name : "镇压人员",
		desc : "攻击时目标节点的滑块属性归零",
		codeLength : 20,
		codeCost : 1e11,
		depth : 1.51e27,
		active() {
			return this.equipped && this.equipped.real && this.equipped.target && this.equipped.target.index
		},
		glyph : "dark-staff",
		iconText : "/",
		iconTextColor : "var(--shade13)"
	},
	bloodStaff: {
		name : "杀戮人员",
		desc : "造成血液的穿透伤害",
		codeLength : 23,
		codeCost : 15e12,
		depth : 1.743e45,
		active() {
			return this.equipped && this.equipped.real && this.equipped.real.blood && this.equipped.target && this.equipped.target.index
		},
		glyph : "blood-staff",
		iconText : "╱",
		iconTextColor : "var(--bg-blood)"
	},
	fireStaff: {
		name : "纵火人员",
		desc : "造成火焰的穿透伤害",
		codeLength : 23,
		codeCost : 15e12,
		depth : 3.764e37,
		active() {
			return this.equipped && this.equipped.real && this.equipped.real.fire && this.equipped.target && this.equipped.target.index
		},
		glyph : "fire-staff",
		iconText : "╱",
		iconTextColor : "var(--bg-fire)"
	},
	iceStaff: {
		name : "冷冻人员",
		desc : "造成冰的穿透伤害",
		codeLength : 23,
		codeCost : 15e12,
		depth : 4.335e42,
		active() {
			return this.equipped && this.equipped.real && this.equipped.real.ice && this.equipped.target && this.equipped.target.index
		},
		glyph : "ice-staff",
		iconText : "╱",
		iconTextColor : "var(--bg-ice)"
	},
	metalStaff: {
		name : "切割人员",
		desc : "造成金属的穿透伤害",
		codeLength : 23,
		codeCost : 15e12,
		depth : 9.985e39,
		active() {
			return this.equipped && this.equipped.real && this.equipped.real.metal && this.equipped.target && this.equipped.target.index
		},
		glyph : "metal-staff",
		iconText : "╱",
		iconTextColor : "var(--bg-metal)"
	},
	stormStaff: {
		name : "风暴人员",
		desc : "获得基于离滑块最近的节点上的均衡机器数量的元素加成",
		researchType : RESEARCH_NUMBERS,
		codeLength : 4,
		codeCost : 2e16,
		codeDigits : 4,
		depth : 2.046e55,
		active() {
			return this.equipped && this.equipped.target && this.equipped.target.parent && this.equipped.target.parent.buildings && this.equipped.target.parent.buildings["earthquakeMachine"]
		},
		glyph : "storm-staff",
		iconText : "/",
		iconTextColor : "#5588DD"
	},
	channelReceiver: {
		name: "学生的护身符",
		desc: "滑块传递获得两倍效果",
		codeLength : 7,
		codeCost : 5e8,
		depth : 2.515e10,
		active() {
			return this.equipped && this.equipped.real && this.equipped.real.gotChannel
		},
		glyph : "none-amulet",
		iconText: "V",
		iconTextColor: "var(--foreground)"
	},
	warAmulet: {
		name : "无尽战斗护身符",
		desc : "持续攻击同一个节点时滑块获得攻击加成",
		codeLength : 12,
		codeCost : 1e10,
		depth : 3.126e28,
		active() {
			return this.equipped && this.equipped.target && this.equipped.target.index
		},
		glyph : "power-amulet",
		iconText : "V",
		iconTextColor : "var(--bg-power)"
	},
	victoryAmulet: {
		name : "胜利护身符",
		desc : "滑块获得攻击加成基于夺取一个节点一分钟每地图",
		codeLength : 11,
		codeCost : 12e9,
		depth : 6.654e28,
		active() {
			return this.equipped && this.equipped.target && this.equipped.target.index && this.equipped.victoryTimer
		},
		glyph : "blood-amulet",
		iconText : "V",
		iconTextColor : "var(--bg-blood)"
	},
	summonAmulet: {
		name : "学徒护身符",
		desc : "如果没有召唤物在攻击目标节点，滑块在攻击目标节点时有概率免费召唤一个力量节点",
		codeLength : 24,
		codeCost : 1e11,
		depth : 1.220e30,
		active() {
			return this.equipped && this.equipped.target && this.equipped.target.index && this.equipped.target.attackers && [...this.equipped.target.attackers].filter(x => x.clone == 2).length == 0
		},
		glyph : "spirit-amulet",
		iconText : "V",
		iconTextColor : "var(--bg-spirit)"
	},
	masterSummonAmulet: {
		name : "大师护身符",
		desc : "如果没有召唤物在攻击目标节点，滑块在攻击目标节点时有概率免费召唤一个元素节点",
		codeLength : 28,
		codeCost : 3e11,
		depth : 8.131e30,
		active() {
			return this.equipped && this.equipped.target && this.equipped.target.index && this.equipped.target.attackers && [...this.equipped.target.attackers].filter(x => x.clone == 2).length == 0
		},
		glyph : "fire-amulet",
		iconText : "V",
		iconTextColor : "var(--bg-fire)"
	},
	legendarySummonAmulet: {
		name : "特级大师护身符",
		desc : "滑块有几率召唤强大的元素",
		codeLength : 30,
		codeCost : 5e13,
		depth : 1.481e43,
		active() {
			return this.equipped && this.equipped.target && this.equipped.target.index
		},
		glyph : "ice-amulet",
		iconText : "V",
		iconTextColor : "var(--bg-ice)"
	},
	emeraldSword: {
		name : "翡翠剑",
		desc : "造成无视所有抵抗的精神和恐惧伤害",
		codeLength : 11,
		codeCost : 23e9,
		depth : 6.666e19,
		active() {
			return this.equipped && this.equipped.target && this.equipped.target.index && this.equipped.real.spirit && game.resources.fears
		},
		iconText : "T",
		iconTextColor : "var(--bg-spirit)",
		glyph : "spirit-sword"
	},
	loneSword: {
		name : "陌生人的剑",
		desc : "如果滑块独自攻击节点，额外造成元素的穿透伤害.",
		codeLength : 20,
		codeCost : 5e10,
		depth : 3.654e29,
		active() {
			return !!(this.equipped && this.equipped.real && this.equipped.target && this.equipped.target.index && this.equipped.target.attackers && this.equipped.target.attackers.size == 1 && (this.equipped.real.metal + this.equipped.real.ice + this.equipped.real.fire + this.equipped.real.blood))
		},
		glyph : "none-sword",
		iconText : "T",
		iconTextColor : "var(--	foreground)"
	},
	channelSword: {
		name : "导电剑",
		desc : "当攻击一个具有反传递防御的节点时, 伤害减少但是允许10%的传递",
		researchType : RESEARCH_NUMBERS,
		codeLength : 4,
		codeCost : 6e15,
		codeDigits : 4,
		depth : 5.170e51,
		active() {
			return this.equipped && this.equipped.target && this.equipped.target.special == SPECIAL_NOCHANNEL
		},
		glyph : "power-sword",
		iconText : "T",
		iconTextColor : "var(--bg-power)"
	},
	stormSword: {
		name : "神圣闪电之剑",
		desc : "滑块的元素伤害受附近的均衡机器影响",
		researchType : RESEARCH_NUMBERS,
		codeLength : 4,
		codeCost : 2e15,
		codeDigits : 3,
		depth : 1.775e47,
		active() {
			return this.equipped && this.equipped.target && this.equipped.target.parent && this.equipped.target.parent.buildings && this.equipped.target.parent.buildings["earthquakeMachine"]
		},
		glyph : "storm-sword",
		iconText : "T",
		iconTextColor : "#5588DD"
	},
	channelCrown: {
		name : "领导者头冠",
		desc : "和这个滑块进攻同一个目标的滑块获得基于这个滑块的传递加成",
		codeLength : 10,
		codeCost : 25e9,
		depth : 7.651e25,
		active() {
			return this.equipped && this.equipped.target && this.equipped.target.attackers && this.equipped.target.attackers.size > 1
		},
		glyph : "none-crown",
		iconText : "👑\uFE0E",
		iconTextColor : "var(--foreground)"
	},
	selflessCrown: {
		name : "无私头冠",
		desc : "如果不是独自进攻, 降低自身伤害但提高翻倍其它滑块伤害",
		codeLength : 17,
		codeCost : 42e10,
		depth : 9.364e33,
		active() {
			return this.equipped && this.equipped.target && this.equipped.target.index && this.equipped.target.attackers && this.equipped.target.attackers.size > 1
		},
		glyph : "blood-crown",
		iconText : "👑\uFE0E",
		iconTextColor : "var(--bg-blood)"
	},	
	puppetCrown: {
		name : "木偶头冠",
		desc : "如果和召唤物一起攻击, 降低伤害并提升召唤物四倍伤害",
		codeLength : 19,
		codeCost : 50e10,
		depth : 2.46e34,
		active() {
			return this.equipped && this.equipped.target && this.equipped.target.index && this.equipped.target.attackers && [...this.equipped.target.attackers].filter(x => x.clone == 2).length
		},
		glyph : "fire-crown",
		iconText : "👑\uFE0E",
		iconTextColor : "var(--bg-fire)"
	},	
	soloCrown: {
		name : "自私头冠",
		desc : "如果不是独自攻击, 降低其它滑块伤害并将自身伤害翻倍",
		researchType : RESEARCH_NUMBERS,
		codeLength : 5,
		codeCost : 5e15,
		codeDigits : 3,
		depth : 5.406e49,
		active() {
			return this.equipped && this.equipped.target && this.equipped.target.index && this.equipped.target.attackers && this.equipped.target.attackers.size > 1
		},
		glyph : "dark-crown",
		iconText : "👑\uFE0E",
		iconTextColor : "var(--shade8)"
	},
	shareCrown: {
		name : "导电头冠",
		desc : "如果不是独自攻击, 不再进行任何传递出入，但其它滑块传递效果翻倍",
		researchType : RESEARCH_NUMBERS,
		codeLength : 7,
		codeCost : 3e15,
		codeDigits : 2,
		depth : 7.498e47,
		active() {
			return this.equipped && this.equipped.target && this.equipped.target.index && this.equipped.target.attackers && this.equipped.target.attackers.size > 1
		},
		glyph : "power-crown",
		iconText : "👑\uFE0E",
		iconTextColor : "var(--bg-power)"
	},
	bloodRing: {
		name : "出血戒指",
		desc : "滑块可以免费补充血液",
		codeLength : 18,
		codeCost : 5e10,
		depth : 2.197e32,
		active() {
			return this.equipped && this.equipped.real && this.equipped.real.imbuement == 3
		},
		glyph : "blood-ring",
		iconText : "💍\uFE0E",
		iconTextColor : "var(--bg-blood)"
	},
	fireRing: {
		name : "燃烧戒指",
		desc : "滑块可以免费补充火焰",
		codeLength : 18,
		codeCost : 5e10,
		depth : 4.623e30,
		active() {
			return this.equipped && this.equipped.real && this.equipped.real.imbuement == 4
		},
		glyph : "fire-ring",
		iconText : "💍\uFE0E",
		iconTextColor : "var(--bg-fire)"
	},
	iceRing: {
		name : "冰冻戒指",
		desc : "滑块可以免费补充冰",
		codeLength : 18,
		codeCost : 5e10,
		depth : 2.316e31,
		active() {
			return this.equipped && this.equipped.real && this.equipped.real.imbuement == 5
		},
		glyph : "ice-ring",
		iconText : "💍\uFE0E",
		iconTextColor : "var(--bg-ice)"
	},
	metalRing: {
		name : "暗钢戒指",
		desc : "滑块可以免费补充金属",
		codeLength : 18,
		codeCost : 5e10,
		depth : 8.147e32,
		active() {
			return this.equipped && this.equipped.real && this.equipped.real.imbuement == 6
		},
		glyph : "metal-ring",
		iconText : "💍\uFE0E",
		iconTextColor : "var(--bg-metal)"
	},
	imbueRing: {
		name : "魔法戒指",
		desc : "滑块在充能时仍然保持活跃",
		researchType : RESEARCH_NUMBERS,
		codeLength : 5,
		codeCost : 2e16,
		codeDigits : 3,
		depth : 3.292e53,
		active() {
			return this.equipped && this.equipped.real && this.equipped.real.imbuement
		},
		glyph : "power-ring",
		iconText : "💍\uFE0E",
		iconTextColor : "var(--bg-power)"
	},
	goldShield: {
		name : "黄金盾",
		desc : "被滑块占领的节点为黄金着迷",
		codeLength : 12,
		codeCost : 5e9,
		depth : 5.015e27,
		active() {
			return this.equipped && this.equipped.target && this.equipped.target.index && !this.equipped.target.enchanted
		},
		glyph : "power-shield",
		iconText : "O",
		iconTextColor : "var(--enchantgold)"
	},
	manaShield: {
		name : "法力盾",
		desc : "被滑块占领的节点为法力着迷",
		codeLength : 12,
		codeCost : 5e9,
		depth : 1.724e28,
		active() {
			return this.equipped && this.equipped.target && this.equipped.target.index && !this.equipped.target.enchanted
		},
		glyph : "mana-shield",
		iconText : "O",
		iconTextColor : "var(--enchantmana)"
	},	
	physicalShield: {
		name : "恐惧盾",
		desc : "被滑块占领的未保护的节点获得一个物理防护",
		codeLength : 17,
		codeCost : 1e10,
		depth : 1.313e29,
		active() {
			return this.equipped && this.equipped.target && this.equipped.target.index && !this.equipped.target.special
		},
		glyph : "none-shield",
		iconText : "O",
		iconTextColor : "#DD88DD"
	},
	magicalShield: {
		name : "云之盾",
		desc : "被滑块占领的未保护的节点获得一个魔法防护",
		codeLength : 16,
		codeCost : 12e9,
		depth : 7.663e29,
		active() {
			return this.equipped && this.equipped.target && this.equipped.target.index && !this.equipped.target.special
		},
		glyph : "storm-shield",
		iconText : "O",
		iconTextColor : "#DD55DD"
	},
	doomShield: {
		name : "毁灭之盾",
		desc : "当滑块占领一个节点, 与之连接的随机一个未占领节点被毁灭",
		codeLength : 15,
		codeCost : 4e13,
		depth : 6.498e37,
		active() {
			return this.equipped && this.equipped.target && this.equipped.target.index
		},
		glyph : "dark-shield",
		iconText : "O",
		iconTextColor : "var(--enchantdoom)"
	},
	reloadShield: {
		name : "Shield of acclaim",
		desc : "Slider refills full spirit charge when it changes target",
		researchType : RESEARCH_NUMBERS,
		codeLength : 4,
		codeCost : 1e16,
		codeDigits : 4,
		depth : 1.060e53,
		active() {
			return this.equipped
		},
		glyph : "spirit-shield",
		iconText : "O\uFE0E",
		iconTextColor : "var(--bg-spirit)"
	},
	stormGem: {
		name : "Gem of storms",
		desc : "Boosts Mean machine damage to slider's target",
		codeLength : 15,
		codeCost : 17e10,
		depth : 5.794e31,
		active() {
			return this.equipped && this.equipped.target && this.equipped.target.index && this.equipped.target.special != SPECIAL_BLOCK && this.equipped.target.parent && this.equipped.target.parent.buildings && this.equipped.target.parent.buildings["earthquakeMachine"]
		},
		glyph : "storm-gem",
		iconText : "💎\uFE0E",
		iconTextColor : "#5588DD"
	},	
	powerGem: {
		name : "Gem of light",
		desc : "Elemental nodes block less physical damage",
		codeLength : 20,
		codeCost : 26e10,
		depth : 1.613e33,
		active() {
			return this.equipped && this.equipped.target && this.equipped.target.index && this.equipped.target.type > 2
		},
		glyph : "power-gem",
		iconText : "💎\uFE0E",
		iconTextColor : "var(--bg-power)"
	},	
	bloodGem: {
		name : "Gem of metallic blood",
		desc : "Triples damage to target blood node",
		codeLength : 20,
		codeCost : 26e10,
		depth : 3.582e31,
		active() {
			return this.equipped && this.equipped.target && this.equipped.target.index && this.equipped.target.type == 3
		},
		glyph : "blood-gem",
		iconText : "💎\uFE0E",
		shineColor : "var(--bg-metal)",
		iconTextColor : "var(--bg-blood)"
	},	
	fireGem: {
		name : "Gem of bloody fire",
		desc : "Triples damage to target fire node",
		codeLength : 20,
		codeCost : 26e10,
		depth : 5.622e32,
		active() {
			return this.equipped && this.equipped.target && this.equipped.target.index && this.equipped.target.type == 4
		},
		glyph : "fire-gem",
		iconText : "💎\uFE0E",
		shineColor : "var(--bg-blood)",
		iconTextColor : "var(--bg-fire)"
	},	
	iceGem: {
		name : "Gem of fiery ice",
		desc : "Triples damage to target ice node",
		codeLength : 20,
		codeCost : 26e10,
		depth : 9.412e31,
		active() {
			return this.equipped && this.equipped.target && this.equipped.target.index && this.equipped.target.type == 5
		},
		glyph : "ice-gem",
		iconText : "💎\uFE0E",
		shineColor : "var(--bg-fire)",
		iconTextColor : "var(--bg-ice)"
	},	
	metalGem: {
		name : "Gem of icy metal",
		desc : "Triples damage to target metal node",
		codeLength : 20,
		codeCost : 26e10,
		depth : 3.179e33,
		active() {
			return this.equipped && this.equipped.target && this.equipped.target.index && this.equipped.target.type == 6
		},
		glyph : "metal-gem",
		iconText : "💎\uFE0E",
		shineColor : "var(--bg-ice)",
		iconTextColor : "var(--bg-metal)"
	},	
	expScales: {
		name : "Scales of rogue decimals",
		desc : "Doubles growth if your exp change speed is zero or negligibly small",
		codeLength : 16,
		codeCost : 5e11,
		depth : 1.623e35,
		active() {
			return this.equipped && game.real && game.real.production && Math.abs(game.real.production.exp) < game.real.growth.power / 1e12
		},
		glyph : "storm-scales",
		iconText : "⚖\uFE0E",
		iconTextColor : "var(--foreground)"
	},	
	bloodBracelet: {
		name : "Bracelet of blood knight",
		desc : "Focus all the elemental power in blood",
		codeLength : 25,
		codeCost : 1e13,
		depth : 2.608e36,
		active() {
			return this.equipped
		},
		glyph : "blood-bracelet",
		iconText : "o",
		iconTextColor : "var(--bg-blood)"
	},
	fireBracelet: {
		name : "Bracelet of keeper of fire",
		desc : "Focus all the elemental power in fire",
		codeLength : 25,
		codeCost : 1e13,
		depth : 5.377e38,
		active() {
			return this.equipped
		},
		glyph : "fire-bracelet",
		iconText : "o",
		iconTextColor : "var(--bg-fire)"
	},
	iceBracelet: {
		name : "Bracelet of icepicker",
		desc : "Focus all the elemental power in ice",
		codeLength : 25,
		codeCost : 1e13,
		depth : 2.623e41,
		active() {
			return this.equipped
		},
		glyph : "ice-bracelet",
		iconText : "o",
		iconTextColor : "var(--bg-ice)"
	},
	metalBracelet: {
		name : "Bracelet of metallurgist",
		desc : "Focus all the elemental power in metal",
		codeLength : 25,
		codeCost : 1e13,
		depth : 8.261e43,
		active() {
			return this.equipped
		},
		glyph : "metal-bracelet",
		iconText : "o",
		iconTextColor : "var(--bg-metal)"
	},
	reloadFlag: {
		name : "Flag of high spirits",
		desc : "Spirit charge lasts longer and provides higher bonus with high charge",
		codeLength : 22,
		codeCost : 3e13,
		depth : 7.754e41,
		active() {
			return this.equipped && this.equipped.charge
		},
		glyph : "spirit-flag",
		iconText : "⚑\uFE0E",
		iconTextColor : "var(--bg-spirit)"
	},
	bloodFlag: {
		name : "Banner of infliction",
		desc : "Halves slider's final blood attribute, channelling the other half to every blood elemental",
		researchType : RESEARCH_NUMBERS,
		codeLength : 6,
		codeCost : 4e15,
		codeDigits : 3,
		depth : 1.168e49,
		active() {
			return this.equipped
		},
		glyph : "blood-flag",
		iconText : "⚑\uFE0E",
		iconTextColor : "var(--bg-blood)"
	},
	fireFlag: {
		name : "Banner of ignition",
		desc : "Halves slider's final fire attribute, channelling the other half to every fire elemental",
		researchType : RESEARCH_NUMBERS,
		codeLength : 6,
		codeCost : 4e15,
		codeDigits : 3,
		depth : 1.076e51,
		active() {
			return this.equipped
		},
		glyph : "fire-flag",
		iconText : "⚑\uFE0E",
		iconTextColor : "var(--bg-fire)"
	},
	iceFlag: {
		name : "Banner of cooling",
		desc : "Halves slider's final ice attribute, channelling the other half to every ice elemental",
		researchType : RESEARCH_NUMBERS,
		codeLength : 6,
		codeCost : 4e15,
		codeDigits : 3,
		depth : 2.314e52,
		active() {
			return this.equipped
		},
		glyph : "ice-flag",
		iconText : "⚑\uFE0E",
		iconTextColor : "var(--bg-ice)"
	},
	metalFlag: {
		name : "Banner of quenching",
		desc : "Halves slider's final metal attribute, channelling the other half to every metal elemental",
		researchType : RESEARCH_NUMBERS,
		codeLength : 6,
		codeCost : 4e15,
		codeDigits : 3,
		depth : 1.099e54,
		active() {
			return this.equipped
		},
		glyph : "metal-flag",
		iconText : "⚑\uFE0E",
		iconTextColor : "var(--bg-metal)"
	},
	aligner: {
		name : "Radiant stone",
		desc : "Slider has a chance to realign accompanying elementals to strong element",
		codeLength : 20,
		codeCost : 3e13,
		depth : 9.797e36,
		active() {
			return this.equipped && this.equipped.target && this.equipped.target.type > 2 && this.equipped.target.index && this.equipped.target.attackers && [...this.equipped.target.attackers].filter(x => x.clone == 2 && x.element > 2).length
		},
		glyph : "power-stone",
		iconText : "☀\uFE0E",
		iconTextColor : "var(--bg-power)"
	},
	summonBreaker: {
		name : "Oblivion stone",
		desc : "Accompanying summons deal 10% unblockable damage",
		codeLength : 20,
		codeCost : 85e12,
		depth : 5.546e44,
		active() {
			return this.equipped && this.equipped.target && this.equipped.target.index && this.equipped.target.attackers && [...this.equipped.target.attackers].filter(x => x.clone == 2).length
		},
		glyph : "spirit-stone",
		iconText : "☀\uFE0E",
		iconTextColor : "var(--bg-spirit)"
	},
	stormStone: {
		name : "Thunderstone shard",
		desc : "Boosts power of Mean machine on a nearby node",
		codeLength : 15,
		codeCost : 1e13,
		depth : 3.004e40,
		active() {
			return this.equipped && this.equipped.target && this.equipped.target.index && this.equipped.target.parent && this.equipped.target.parent.buildings && this.equipped.target.parent.buildings["earthquakeMachine"]
		},
		glyph : "storm-stone",
		iconText : "☀\uFE0E",
		iconTextColor : "#5588DD"
	},
}

Object.keys(ARTIFACTS).map(x => ARTIFACTS[x].id = x)