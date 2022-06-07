'use strict'

const SPELL_TYPE_POINT = 1
const SPELL_TYPE_GLOBAL = 2

const ENCHANT_GOLD = 1
const ENCHANT_GROWTH = 2
const ENCHANT_MANA = 3
const ENCHANT_DOOM = 4

const SPELLS = {//function context == point
	destroyResist : {
		name : "驱散魔法护罩",
		desc : "解除节点魔免效果",
		book : "dispels1",
		type : SPELL_TYPE_POINT,
		cost(point) { 
			return point.owned?-1:point.special == SPECIAL_RESIST?(point.bonus ** 0.5 / 10):-1
		},
		cast(point) {
			delete point.special
			game.updateMapBackground = true
		},
		iconText : "D",
		iconColor : "#DD55DD",
	},
	destroyBlock : {
		name : "驱散物理护罩",
		desc : "解除节点物免效果",
		book : "dispels1",
		type : SPELL_TYPE_POINT,
		cost(point) { 
			return point.owned?-1:point.special == SPECIAL_BLOCK?(point.bonus ** 0.5 / 10):-1
		},
		cast(point) {
			delete point.special
			game.updateMapBackground = true
		},
		iconText : "D",
		iconColor : "#DD55DD",
	},
	destroyNoclone : {
		name : "驱散召唤护罩",
		desc : "解除节点反召唤效果",
		book : "dispels2",
		type : SPELL_TYPE_POINT,
		cost(point) { 
			return point.owned?-1:point.special == SPECIAL_NOCLONE?(point.bonus ** 0.5 / 10):-1
		},
		cast(point) {
			delete point.special
			game.updateMapBackground = true
		},
		iconText : "D",
		iconColor : "#DD55DD",
	},
/*	destroyNobuild : {
		name : "Dispel build shield",
		desc : "Removes shield from building-preventing point",
		book : "dispels2",
		type : SPELL_TYPE_POINT,
		cost(point) { 
			return point.owned?-1:point.special == SPECIAL_NOBUILD?(point.bonus ** 0.5 / 10):-1
		},
		cast(point) {
			delete point.special
			game.updateMapBackground = true
		},
		iconText : "D",
		iconColor : "#DD55DD",
	},*/
	destroyLock : {
		name : "让钥匙休息",
		desc : "解锁附近被锁住的节点",
		book : "unlocks1",
		type : SPELL_TYPE_POINT,
		cost(point) { 
			const locks = [...point.children].filter(x => !x.owned && x.locked == 1).length
			return point.owned && locks?(point.baseCost ** 0.5 / 10)* 1.5 ** ((point.map.unlocked || 0) + locks - 1):-1
		},
		cast(point) {
			for (let child of point.children)
				if (child.locked == 1) child.unlocked = true
			game.update()
		},
		iconText : "⚷\uFE0E",
		iconColor : "#DD55DD",
	},
	summonPower : {
		name : "强大的克隆",
		desc : "召唤一个克隆去进攻目标节点",
		book : "summons1",
		type : SPELL_TYPE_POINT,
		cost(point) { 
			if (point.noclone || point.special == SPECIAL_ALONE && point.attackers.size) return -1
			if (game.sliders.filter(x => x.clone == 2).length >= game.world.stats.maxSummons) return -1
			return point.owned?-1:(point.bonus ** 0.5 / 100)
		},
		cast(point) {
			createSummon(point, 1)
		},
		iconText : "P",
		iconColor : "var(--bg-power)",
	},
	summonRandom : {
		name : "随机元素",
		desc : "召唤一个随机元素克隆进攻目标节点",
		book : "summons1",
		type : SPELL_TYPE_POINT,
		cost(point) { 
			if (point.noclone || point.special == SPECIAL_ALONE && point.attackers.size) return -1
			if (game.sliders.filter(x => x.clone == 2).length >= game.world.stats.maxSummons) return -1
			return point.owned?-1:(point.bonus ** 0.5 / 50)
		},
		cast(point) {
			createSummon(point, 3 + Math.random() * 4 | 0)
		},
		iconText : "R",
		iconColor : "gray",
	},
	summonBlood : {
		name : "血液元素",
		desc : "召唤一个血液元素克隆去进攻目标节点",
		book : "summons2",
		type : SPELL_TYPE_POINT,
		cost(point) { 
			if (point.noclone || point.special == SPECIAL_ALONE && point.attackers.size) return -1
			if (game.sliders.filter(x => x.clone == 2).length >= game.world.stats.maxSummons) return -1
			return point.owned?-1:(point.bonus ** 0.5 / 10)
		},
		cast(point) {
			createSummon(point, 3)
		},
		iconText : "B",
		iconColor : "var(--bg-blood)",
	},
	summonFire : {
		name : "火焰元素",
		desc : "召唤一个火焰元素克隆去进攻目标节点",
		book : "summons2",
		type : SPELL_TYPE_POINT,
		cost(point) { 
			if (point.noclone || point.special == SPECIAL_ALONE && point.attackers.size) return -1
			if (game.sliders.filter(x => x.clone == 2).length >= game.world.stats.maxSummons) return -1
			return point.owned?-1:(point.bonus ** 0.5 / 10)
		},
		cast(point) {
			createSummon(point, 4)
		},
		iconText : "F",
		iconColor : "var(--bg-fire)",
	},
	summonIce : {
		name : "冰元素",
		desc : "召唤一个冰元素克隆去进攻目标节点",
		book : "summons2",
		type : SPELL_TYPE_POINT,
		cost(point) { 
			if (point.noclone || point.special == SPECIAL_ALONE && point.attackers.size) return -1
			if (game.sliders.filter(x => x.clone == 2).length >= game.world.stats.maxSummons) return -1
			return point.owned?-1:(point.bonus ** 0.5 / 10)
		},
		cast(point) {
			createSummon(point, 5)
		},
		iconText : "I",
		iconColor : "var(--bg-ice)",
	},
	summonMetal : {
		name : "金属元素",
		desc : "召唤一个金属元素克隆去进攻目标节点",
		book : "summons2",
		type : SPELL_TYPE_POINT,
		cost(point) { 
			if (point.noclone || point.special == SPECIAL_ALONE && point.attackers.size) return -1
			if (game.sliders.filter(x => x.clone == 2).length >= game.world.stats.maxSummons) return -1
			return point.owned?-1:(point.bonus ** 0.5 / 10)
		},
		cast(point) {
			createSummon(point, 6)
		},
		iconText : "M",
		iconColor : "var(--bg-metal)",
	},
	summonExplosion : {
		name : "召唤爆炸",
		desc : "召唤一个对目标节点的爆破, 降低剩余屏障的 5% + 5% 每滑块等级",
		book : "explosive1",
		type : SPELL_TYPE_POINT,
		cost(point) { 
			const clones = [...point.attackers].reduce((v,x) => x.clone==2?v+(x.level || 0)+1:v,0)
			if (!clones) return -1
			return clones * point.baseCost ** 0.4/25
		},
		cast(point) {
			[...point.attackers].filter(x => x.clone == 2).map(slider => {
				const level = 5 + (slider.level || 0) * 5
				point.dealDamage(level, true)
				const {x,y} = point.coordinatesOn(point.progress, true)
				animations.Fireworks(x, y, gui.theme.typeColors[slider.element], level * 3, level * 3)
				slider.fullDestroy()
			})
			if (gui.target.point == point)
				gui.target.set(point, -1)
		},
		iconText : "X",
		iconColor : "var(--bg-fire)",
	},
	summonAlignment : {
		name : "召唤转换",
		desc : "把进攻目标节点的召唤物转换为最有效的元素",
		book : "realign1",
		type : SPELL_TYPE_POINT,
		cost(point) { 
			const clones = [...point.attackers].reduce((v,x) => x.clone==2?v+1:v,0)
			if (!clones) return -1
			return (clones ** 0.9) * point.bonus ** 0.5/10
		},
		cast(point) {
			[...point.attackers].filter(x => x.clone == 2).map(slider => {
				slider.realign([1,3,4,5,6].map(element => {
					slider.realign(element, false)
					return [element, slider.predictDamage(point)]
				}).sort((x,y) => y[1]-x[1])[0][0], false)
				slider.setColor(gui.theme.typeColors[slider.element])
				slider.updateFullVisibility()
			})
			if (gui.target.point == point)
				gui.target.set(point, -1)
		},
		iconText : "C",
		iconColor : "#111111",
	},
	enchantGold: {
		name: "黄金之地",
		desc: "工厂生产更多黄金",
		book: "enchantments1",
		type: SPELL_TYPE_POINT,
		managed :true,
		recalc : true,
		cost(point) {
			return point.owned && !point.enchanted && point.buildings.goldFactory?point.baseCost ** 0.4/10:-1
		},
		cast(point) {
			point.enchanted = ENCHANT_GOLD
		},
		iconText : "G",
		iconColor : "#888866"
	},
	enchantMana: {
		name: "魔法之地",
		desc: "方尖碑法力产出提升",
		book: "enchantments1",
		type: SPELL_TYPE_POINT,
		managed :true,
		recalc : true,
		cost(point) {
			return point.owned && !point.enchanted && point.buildings.manalith?point.baseCost ** 0.4/10:-1
		},
		cast(point) {
			point.enchanted = ENCHANT_MANA
		},
		iconText : "M",
		iconColor : "#886688"
	},
	enchantGrowth: {
		name: "成长之地",
		desc: "成长产出提升",
		book: "enchantments2",
		type: SPELL_TYPE_POINT,
		managed :true,
		recalc : true,
		cost(point) {
			return !point.boss && point.index && point.owned && !point.enchanted?point.baseCost ** 0.4/10:-1
		},
		cast(point) {
			point.enchanted = ENCHANT_GROWTH
		},
		iconText : "G",
		iconColor : "#668888"
	},
	enchantDoom: {
		name: "毁灭之地",
		desc: "对目标造成的伤害获得巨大提升. 被毁灭的目标成长产出下降，但科学产出提升.",
		book: "enchantments2",
		type: SPELL_TYPE_POINT,
		managed :true,
		recalc : true,
		cost(point) {
			return !point.boss && (point.special != SPECIAL_RESIST || point.owned) && point.index && !point.enchanted?point.baseCost ** 0.4/10:-1
		},
		cast(point) {
			point.enchanted = ENCHANT_DOOM
		},
		iconText : "D",
		iconColor : "#330000"
	},
}

Object.keys(SPELLS).map(x => SPELLS[x].id = x)

function SpellIcon(x, parent) {
	let icon = {
		id : x,
		spell : SPELLS[x]
	}
	icon.dvDisplay = createElement("div", "icon spell", parent)
	icon.dvDisplay.innerText = getString(icon.spell.iconText)
	icon.dvDisplay.style.backgroundColor = icon.spell.iconColor
	return icon
}
