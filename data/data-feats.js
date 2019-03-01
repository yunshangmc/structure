'use strict'

const FEATS = {
	science1: {
		desc : "完成35项研究.",
		map : 31
	},
	mana1: {
		desc: "10000000000000. 很好, 正确地读出这一串数字已经很厉害了, 但你还需要这么多法力.",
		map : 31
	},
	blood1: {
		desc : "完成进化后的血液虚拟地图.",
		minMap : 31,
		map : 32
	},
	fire1: {
		desc : "完成进化后的火焰虚拟地图.",
		minMap : 31,
		map : 32
	},
	ice1: {
		desc : "完成进化后的冰虚拟地图.",
		minMap : 31,
		map : 32
	},
	metal1: {
		desc : "完成进化后的金属虚拟地图.",
		minMap : 31,
		map : 32
	},
	noreal1 : {
		desc: "不使用任何真实滑块占领任何一个节点来完成一个进化后的虚拟地图.",
		minMap : 31,
		map : 33
	},
	noabsolute1 : {
		desc: "不使用任何均衡机器或来自工艺品的穿透伤害完成一个进化后的虚拟地图.",
		minMap : 31,
		map : 33
	},
	power1: {
		desc: "听说过对撞器吗? 好吧, 你需要一个力量增强器，人们通常称之为对撞器. ",
		map : 34
	},
	summonLevel9 : {
		desc: "获得一个9级的召唤物.",
		minMap : 34,
		map : 34
	},
	same0 : {
		desc: "完成一个和真实地图同等级的虚拟地图.",
		minMap : 36,
		map : 36
	},
	same1 : {
		desc: "完成一个和真实地图同等级的进化后的虚拟地图.",
		minMap : 36,
		map : 36
	},
	same2 : {
		desc: "完成一个和真实地图同等级的经过两次进化的虚拟地图.",
		minMap : 36,
		map : 36
	},
	same3 : {
		desc: "完成一个和真实地图同等级的经过三次进化的虚拟地图.",
		minMap : 36,
		map : 36
	},
	elemental1 : {
		desc: "每种元素都达到最大加成.",
		map : 37
	},
	null1 : {
		desc: "完成一个强制精神的虚空地图，只使用一个滑块并装备镇压人员.",
		minMap : 38,
		map : 38
	},
	mistery1 : {
		desc : "???",
		map : 100,
		minMap : 39
	},
	stars1 : {
		desc : "星尘产量达到 15 / 秒",
		map : 38,
		minMap : 38
	},
	memories1 : {
		desc : "每种内存至少有 1000 ",
		map : 39,
	},
	speedrun1 : {
		desc : "15分钟内完成一张虚拟地图",
		minMap : 39,
		map : 39,
	},
}

Object.keys(FEATS).map(x => FEATS[x].id = x)