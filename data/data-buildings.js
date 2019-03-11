'use strict'

const BUILDINGS = {//function context == point
	goldFactory : {
		name : "黄金工厂",
		desc : "生产黄金",
		level : 1,
		production(point) {
			return(point.depth * point.map.level ** 2 * ((point.level || 0) + 1) * (game.skills.greed ? point.map.level ** 2 / 16.9 : 1) * (game.skills.magicBoost1 && (point.distance < point.map.ownedRadius)?(point.map.ownedRadius - point.distance + 1):1))**(point.enchanted == ENCHANT_GOLD?point.map.level/10:1)
		},
		cost(point) { 
			return point.depth * 68400
		},
		info(point) {
			return "Production: " + displayNumber(this.production(point)) + "/s"
		},
		build(point) {
			game.production.gold += this.production(point)
		},
		destroy(point) {
			game.production.gold -= this.production(point)
		},
		iconText : "G",
		iconColor : "gold",
	},
	scienceLab : {
		name : "科学实验室",
		desc : "生产科学",
		level : 1,
		cost(point) { 
			return point.depth * 1000000
		},
		production(point) {
			return point.depth * point.map.level ** 2 / 1e5 * ((point.level || 0) + 1) * (game.skills.magicBoost1 && (point.distance < point.map.ownedRadius)?point.map.ownedRadius * (point.map.ownedRadius - point.distance + 1):1) * (point.enchanted == ENCHANT_DOOM?point.map.level:1)
		},
		info(point) {
			return "Production: " + displayNumber(this.production(point))
		},
		build(point) {
			game.production.science += this.production(point)
		},
		destroy(point) {
			game.production.science -= this.production(point)
		},
		iconText : "S",
		iconColor : "purple",
	},
	obelisk : {
		name : "钢铁之心战旗",
		desc : "增强从本节点出击的滑块的精神",
		level : 1,
		cost(point) { 
			return (point.depth * point.outs * 1000000) || -1
		},
		info(point) {
			return "Spirit bonus: x + ((point.level || 0) + 1)
		},
		build(point) {},
		destroy(point) {},
		iconText : "⚑\uFE0E",
		iconColor : "#ADFF2F",
	},
	banner : {
		name : "刑罚战旗",
		desc : "增强全局的力量成长产出",
		level : 2,
		cost(point) {
			return point.depth * 1e9
		},
		production (point) {
			return (point.depth * point.bonus) ** 0.5 / 1e5
		},
		info(point) {
			return "Power bonus: x" + displayNumber(this.production(point))
		},
		build(point) {
			game.multi.power = (game.multi.power || 1) + this.production(point)
		},
		destroy(point) {
			game.multi.power = (game.multi.power || 1) - this.production(point)
		},
		iconText : "⚑\uFE0E",
		iconColor : "#FFFF55"
	},
	hopeFactory : {
		name : "恐惧工厂",
		desc : "从被物理保护的区域提取恐惧",
		level : 2,
		cost(point) {
			return (point.special == SPECIAL_BLOCK)?100e9:-1
		},
		production(point){
			return 1e-10 * point.map.level ** 6
		},
		info(point) {
			return "Production: " + displayNumber(this.production(point))
		},
		build(point) {
			game.production.fears += this.production(point)
		}, 
		destroy(point) {
			game.production.fears -= this.production(point)
		},
		iconText : "F",
		iconColor : "#FF44CC"
	},
	cloudFactory : {
		name : "云工厂",
		desc : "从被魔法保护的区域提取云",
		level : 2,
		cost(point) {
			return (point.special == SPECIAL_RESIST)?100e9:-1
		},
		production(point){
			return 2e-11 * point.map.level ** 6
		},
		info(point) {
			return "Production: " + displayNumber(this.production(point))
		},
		build(point) {
			game.production.clouds += this.production(point)
		}, 
		destroy(point) {
			game.production.clouds -= this.production(point)
		},
		iconText : "C",
		iconColor : "#44CCFF"
	},
	manalith : {
		name : "黑方尖碑",
		desc : "产出魔法",
		level : 3,
		production(point) {
			return point.distance < point.map.ownedRadius?point.depth * point.map.level / 1000 * (1 + (point.map.ownedRadius - point.distance) / 100) * (point.enchanted == ENCHANT_MANA?point.map.level ** (point.map.level / 10):1):0
		},
		cost(point) {
			return point.distance < point.map.ownedRadius?1e15:-1
		},
		info(point) {
			return "Production: " + displayNumber(this.production(point))
		},
		build(point) {
			game.production.mana += this.production(point)
		},
		destroy(point) {
			game.production.mana -= this.production(point)
		},
		iconText : "M",
		iconColor : "#113388"
	},
	powerTower : {
		name : "象牙塔",
		desc : "基于节点的成长给予力量成长",
		level : 3,
		cost(point) {
			return point.children.size?-1:point.power ** 0.5
		},
		production(point){
			return point.totalBonus
		},
		info(point) {
			return "Production: " + displayNumber(this.production(point))
		},
		build(point) {
			game.growth["power"] += this.production(point)
		},
		destroy(point) {
			game.growth["power"] -= this.production(point)
		},
		iconText : "P",
		iconColor : "#888833"
	},
	spiritTower : {
		name : "无限之塔",
		desc : "基于节点成长增强精神成长",
		level : 3,
		cost(point) {
			return point.children.size?point.power ** 0.5:-1
		},
		production(point){
			return point.totalBonus
		},
		info(point) {
			return "Production: " + displayNumber(this.production(point))
		},
		build(point) {
			game.growth["spirit"] += this.production(point)
		},
		destroy(point) {
			game.growth["spirit"] -= this.production(point)
		},
		iconText : "S",
		iconColor : "#338833"
	},
	rainbowTower : {
		name : "彩虹之塔",
		desc : "基于节点成长提升元素成长",
		level : 4,
		cost(point) {
			return (point.children.size == 1)?point.power ** 0.6:-1
		},
		production(point){
			return point.totalBonus
		},
		info(point) {
			return "Production: " + displayNumber(this.production(point))
		},
		build(point) {
			const value = this.production(point)
			game.growth["fire"]  += value
			game.growth["ice"]   += value
			game.growth["blood"] += value
			game.growth["metal"] += value
		},
		destroy(point) {
			const value = this.production(point)
			game.growth["fire"]  -= value
			game.growth["ice"]   -= value
			game.growth["blood"] -= value
			game.growth["metal"] -= value
		},
		iconText : "R",
		iconColor : "#FF8844"
	},
	thunderstoneFactory : {
		name : "雷霆尖塔",
		desc : "收集雷石的力量",
		level : 4,
		cost(point) {
			return 1e22
		},
		production(point){
			return (point.map.level - 10) ** 5 / 1e6 * point.depth
		},
		info(point) {
			return "Production: " + displayNumber(this.production(point))
		},
		build(point) {
			game.production.thunderstone += this.production(point) 
		}, 
		destroy(point) {
			game.production.thunderstone -= this.production(point)
		},
		iconText : "T",
		iconColor : "#4488FF"
	},
	earthquakeMachine : {
		name : "均衡机器",
		desc : "持续对周围节点造成伤害，基于雷石加成和技能消耗",
		level : 4,
		cost(point) {
			return [...point.children].filter(x => !x.owned && (x.special != SPECIAL_BLOCK) && !x.locked && (!x.boss || x.boss <= x.map.level) ).length?10 ** (10 + (point.map.level) / 2):-1
		},
		info(point) {
			return ""
		},
		build(point) {
		},
		destroy(point) {
		},
		iconText : "M",
		iconColor : "#883333"
	}
}

Object.keys(BUILDINGS).map(x => BUILDINGS[x].id = x)

function BuildingIcon(x, parent) {
	let icon = {
		id : x,
		building : BUILDINGS[x]
	}
	icon.dvDisplay = createElement("div", "icon", parent)
	icon.dvDisplay.innerText = getString(icon.building.iconText)
	icon.dvDisplay.style.backgroundColor = icon.building.iconColor
	return icon
}