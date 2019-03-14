const GUIDE = {
	level21: {
		title : "恭喜你!",
		content: [{
			text: `你完成了游戏的教程部分. 你现在已经学会了大部分规则，不过接下来会有一些改变.`,
		},{
			subtitle: "那么, 会有什么改变?",
			text: `首先, 再也没有克隆了. 你只能依赖你自己. 别灰心, 你的新技能会帮助你克服这个困难.
			
			第二点也是最重要的一点就是元素都变得疯狂了. `,
		},{
			subtitle: "元素狂暴",
			text: `力量只能对元素节点造成 0.1% 伤害.
			
			元素节点会吸收同种元素的伤害. 你只能用克制的元素对它造成全额的伤害. 对位元素造成 10% 伤害, 被克制的元素伤害会被忽略.
			
			血克制火, 火被血克制.
			
			火克制冰, 冰被火克制.
			
			冰克制金属, 金属被冰克制.
			
			金属克制血, 血被金属克制.
			`,
		},{
			subtitle: "Have fun!",
			text: ``
		}]
	},
	map: {
		title : "Main window",
		content : [{
			subtitle : "Map tab",
			text : `This is game's main window. You can see the map you are exploring and order your sliders around.`
		}, {
			subtitle : "Node information",
			text: `When hovering a node on a map, you can see information related to it.
			
			Type: The main attribute of the node. If a node has an attribute, your growth in that attribute will increase upon capturing it.`
		}, {
			condition: () => game.growth.fire,
			newBlock : true,
			text: `Different types of nodes interact with your attributes differently:`
		}, {
			condition: () => game.growth.fire && !game.growth.ice,
			text: `Namely, fire node ignores fire damage fom attackers.`
		}, {
			condition: () => game.growth.fire && game.growth.ice && !game.growth.metal,
			text: `Fire ignores fire damage and receives halved damage from ice.
			Ice receives quadruple fire damage and ignores ice damage.`
		}, {
			condition: () => game.growth.fire && game.growth.ice && game.growth.metal && !game.map.virtual && game.map.level < 21,
			text: `Every element ignores itself, deals quadruple damage to the next, straight damage to opposite element, halved damage to previous one.
			
			Elements go in the same order they are usually listed : Blood beats fire, Fire beats ice, Ice beats metal, Metal beats blood.`
		}, {
			condition: () => game.map.virtual || game.map.level >= 21,
			text: `每种元素的伤害都会被同种元素节点吸收, 对克制元素造成全额伤害, 对位元素造成 10% 伤害, 被克制的元素伤害会被忽略. 力量只能对元素节点造成 0.1% 伤害.
			
			元素总是遵从这个规则 : 血克火, 火克冰, 冰克金属, 金属克血.`
		}, {
			newBlock : true,
			text: `Power: This number determines how strong the node is. Most of other values depend on this one. 
			
			Barrier: Remaining amount of health you have to deplete from the node to capture it. Starting value is its power multiplied by distance to it.`
		}, {
			condition: () => !game.skills.power,
			newBlock : true,
			text: `Barrier power: The force the node resists your attacks. When attackers' spirit is below this value, it gets damage reduced by double the difference. Equals to node's power multiplier by your progress towards it. So, to effectively attack a node all the way, your attacker's spirit should exceed that node's power.`
		}, {
			condition: () => game.sliders.some(x => x.clone == 1),
			text: `Clones ignore spirit penalty.`
		}, {
			condition: () => !game.skills.power && game.map.boss,
			text: `Boss nodes don't give you spirit penalty.`
		}, {
			condition: () => !game.skills.power && (game.skills.fire || game.skills.ice || game.skills.blood || game.skills.metal),
			text: `Some of the elements ignore spirit penalty`
		}, {
			newBlock : true,
			text: `Progress: How close are you to capturing a node. This is not linear, and a triangle by its side demonstrates that. 50% progress fills left half of the triangle, which is 25% its square, so it only has 25% of the barrier down.
			
			Growth: The amount of growth of node's type it provides to you. If node does not have a type, it provides no growth.
			
			Rough ETA: The approximate node capture time based on current damage. Can be very unreliable, especially early on.`
		}, {
			condition: () => game.skills.upgradePoints,
			newBlock : true,
			text: `Level: How many times was the node upgraded. Maximum level is 4.`
		}, {
			condition: () => game.skills.build4,
			newBlock : true,
			text: `被动伤害: 滑块以外的东西造成的伤害.`
		}, {
			condition: () => game.map.level > 0 || game.resources.stars,
			subtitle : "Node specials",
			text : `Star (🌟\uFE0E): Collect stars by capturing these nodes. Getting enough stars allows you to ascend.`
		}, {
			condition: () => game.map.level > 0,
			newBlock : true,
			text : `Lock with a number (🔒\uFE0E): A locked node. Requires you to capture a node with a key with the corresponding number.

			Key with a number (⚷\uFE0E): Unlocker node. You need to capture it to be able to attack the locked node with the same number.`
		}, {
			condition: () => game.map.level > 5 || game.map.boss,
			newBlock : true,
			text : `Crossed swords (⚔\uFE0E): A boss node. Boss nodes hide until you try to ascend. Boss nodes don't give you spirit penalty. You can't ascend until you find and capture every boss node.`
		}, {
			condition: () => game.statistics.special_blocks,
			newBlock : true,
			text : `物理免疫 (看上去像个盾牌): 这个节点忽略力量的伤害.`
		}, {
			condition: () => game.statistics.special_blocks && game.skills.build4,
			text : `均衡机器也无法对它造成伤害.`
		}, {
			condition: () => game.statistics.special_resists,
			newBlock : true,
			text : `魔法免疫 (看上去像有个魔法盾围绕着它): 这个节点忽略元素的伤害.`
		}, {
			condition: () => game.statistics.special_resists && game.skills.build4,
			text : `均衡机器对它造成三倍伤害.`
		}, {
			condition: () => game.realMap.level > 5 && game.realMap.level % 5 == 1,
			newBlock : true,
			text : `Radiowave: The node emits radiowaves. The new slider will join you upon capturing that node. You can't ascend until you find this node.`
		}, {
			condition: () => game.statistics.special_clones && !game.map.virtual && game.map.level <= 20,
			newBlock : true,
			text : `Clone factory (looks like a cogwheel): A clone will join you as you capture the node. Clones ignore spirit penalty. They are created with mean power value of your sliders and can't grow. Clones can't ascend with you. Channelling upon clones increases their power.`
		}, {
			condition: () => game.statistics.special_noclones,
			newBlock : true,
			text : `Summoning shield (looks like 8 spikes extending from node): Node can't be attacked by clones or summons.`
		}, {
			condition: () => game.statistics.special_nobuilds,
			newBlock : true,
			text : `Building shield (looks like brick wall covering node): You can't build on a node leading to this one. That node is marked with a cross.`
		}, {
			condition: () => game.statistics.special_nochannels,
			newBlock : true,
			text : `Anti-channel shield (looks like double hexagon around node): Channelling is cut off for sliders attacking such node.`
		}, {
			condition: () => game.statistics.special_nochannels && game.skills.build4,
			text : `Mean machines only deal 10% damage to it.`
		}, {
			condition: () => game.statistics.special_alones,
			newBlock : true,
			text : `Narrow path (looks like two borders at sides of path): Only one slider can attack the node at a time.`
		}, {
			subtitle : "Controls",
			text : `Click a node to see its information (explained above) and available actions. 
			
			If a node is not captured, a list of available attackers will appear. Clicking attacker info toggles its attacking state.`
		}, {
			condition : () => game.sliders.length > 1,
			text : `You can use "All" button to assign/free all the attackers available.`
		}, {
			condition : () => game.sliders.some(x => x.clone == 1),
			text : `Similarly, "Clone" and "Real" buttons affect only clones and only real sliders.`
		}, {
			condition : () => game.skills.mining,
			text : `If a node is a mine, you can similarly assign attackers to mine gold.`
		}, {
			condition : () => game.skills.upgradePoints,
			newBlock : true,
			text : `If a node is already captured, you will be able to invest gold into upgrading it. Every upgrade multiplies node growth bonus by 4. Maximum level is 4, with a total multiplier of 256.`
		}, {
			condition : () => game.map.boss,
			text : `You can't upgrade boss nodes.`
		}, {
			condition : () => game.skills.upgradePoints && !game.skills.build1,
			text : `There's no merit in upgrading 'Type : None' nodes except for statistics.`
		}, {
			condition : () => game.skills.build1,
			newBlock : true,
			text : `You can build several types of structures on an owned node, if its level is enough. Some types of buildings have special requirements besides level. 
			
			Note: You can build on "Type : None" nodes as well.`
		}, {
			condition : () => game.skills.magic,
			subtitle : "Magic circle",
			text : `Magic circle expands from starting point to the closest uncaptured node (you may not be able to see it yet in some cases). It produces mana based on square and map level.`
		}, {
			condition : () => game.skills.magicBoost1,
			text : `Level 1 buildings are boosted within magical circle proportionally to distance to the edge of it.`

		}, {
			subtitle : "Ascension",
			condition : () => game.resources.stars || game.map.level > 0,
			text : `You advance through the game by ascending. By spending stars, you get to a next map that has higher node power and growth returns. Higher level maps unlock new skills and mechanics. All the growth and production from old map is retained. You can't return to the maps you have left.`
			
		}, {
			subtitle : "Memories",
			condition : () => game.skills.imprint,
			text : `Memories can be obtained by imprinting nodes. Every imprinted node provides one memory of its type. `
		}, {
			newBlock : true,
			condition : () => game.skills.imprint && !game.skills.virtualImprint,
			text : `You can imprint every fully leveled and built node on a real map.`
		}, {
			newBlock : true,
			condition : () => game.skills.imprint && game.skills.virtualImprint,
			text : `You can imprint any node on a real map and any stardust node on a virtual map of the same level if that node is fully upgraded and built.`
		}, {
			newBlock : true,
			condition : () => game.skills.imprint,
			text : `The time it takes to imprint a node depends on how many you have imprinted. Every imprint progresses simultaneously and imprinting speed is spread among nodes being imprinted. `
		}, {
			newBlock : true,
			condition : () => game.skills.imprint && !game.skills.virtualImprint,
			text : `Imprinting continues even if you are exploring a virtual map, but ascending from map with unfinished imprints would lose you all unfinished imprints on that map. `
		}, {
			newBlock : true,
			condition : () => game.skills.imprint && game.skills.virtualImprint,
			text : `Imprinting continues even if you are exploring another map, as long as the map node belongs to is still on the list. Ascending from map with unfinished imprints or deleting such virtual map would lose you all unfinished imprints on that map. `
		}, {
			newBlock : true,
			condition : () => game.skills.world && !game.skills.worldCore,
			text : `You can use memories to build your own world.`
		}, {
			newBlock : true,
			condition : () => game.skills.world && game.skills.worldCore,
			text : `You can use memories to build your own world and upgrade its core.`
			
		}, {
			subtitle : "Evolution",
			condition : () => game.skills.evolveVirtual,
			text : `High-level virtual maps can be evolved up to three times. Every evolutions adds large amounts of new, more powerful nodes. Evolved maps are really strong, have larger magical circle and provide much larger bonus to growth and production.`
		}, {
			condition : () => game.skills.evolveVirtual && game.skills.starfall,
			newBlock : true,
			text : `Completed evolved virtual maps that have same level as a real map produce stardust over time.`
			
		}, {
			subtitle : "Low load mode",
			text : `This mode is designed to decrease load on your CPU while you are idling. It lists all nearby nodes so you can watch progress and control it to some extent. 
			
			By default, low load mode is turned on automagically when you idle for a long time or switch to another browser tab or window, this behavior can be changed in the settings (Menu => Settings => Performance).`
		}],
	},
	resources: {
		title : "Resources",
		content : [{
			subtitle: "Experience",
			condition : () => game.resources.exp || game.production.exp,
			text: `You gain experience by capturing nodes.`
		},{
			condition : () => (game.resources.exp || game.production.exp) && game.map.level > 0,
			text: `You can use experience to obtain skills from "Skills" tab .`
		},{
			condition : () => (game.resources.exp || game.production.exp) && (game.skills.invest),
			newBlock : true,
			text: `You can reduce sliders growth multiplier in "Sliders" tab to produce experience.`
		},{
			condition : () => (game.resources.exp || game.production.exp) && (game.skills.learn),
			text: `Similarly, you can enable growth boost to consume exp for faster growth. Boosts will be disabled automatically if you run out of experience.`
		},{

			subtitle: "Stars",
			condition : () => game.resources.stars || game.production.stars,
			text: `You gain stars by capturing nodes with a star.
			
			You can use stars to ascend to the next map. It's recommended to find all the stars on the map, as this resource is very scarce and unstable.`
		},{
			condition : () => (game.resources.stars || game.production.stars) && (game.resources.stardust || game.production.stardust) && !game.skills.starfire,
			text: `Stars that were not used for ascending for two maps crumble to dust.`
		},{
			condition : () => (game.resources.stars || game.production.stars) && game.skills.spiritStar,
			newBlock : true,
			text: `Every star increases spirit growth multiplier for every stardust you have.`
		},{

			subtitle: "Stardust",
			condition : () => (game.resources.stardust || game.production.stardust),
			text: `Stardust is what remains of unused stars.`
		},{
			condition : () => (game.resources.stardust || game.production.stardust) && !game.skills.stardust,
			text: `While it does not seem to have any use right now, it's really worth collecting.`
		},{
			condition : () => (game.resources.stardust || game.production.stardust) && game.skills.starfall,
			newBlock : true,
			text: `Completed evolved virtual maps produce stardust for every evolution they have if their level is equal to real map level.`
		},{
			condition : () => (game.resources.stardust || game.production.stardust) && game.skills.stardust,
			newBlock : true,
			text: `You can distribute it to boost elemental growth multipliers.`
		},{
			condition : () => (game.resources.stardust || game.production.stardust) && game.skills.virtualMaps,
			text: `You can spend stardust to create virtual maps. Star nodes on those maps give you stardust back instead of stars.`
		},{
			condition : () => (game.resources.stardust || game.production.stardust) && game.skills.world && !game.skills.worldCore,
			text: `You can spend stardust to create worlds.`
		},{
			condition : () => (game.resources.stardust || game.production.stardust) && game.skills.worldCore,
			text: `You can spend stardust to create worlds and reset world core.`
		},{
			condition : () => (game.resources.stardust || game.production.stardust) && game.skills.spiritStar,
			newBlock : true,
			text: `Every stardust increases spirit growth multiplier for every star you have.`
		},{

			subtitle: "Gold",
			condition : () => game.resources.gold || game.production.gold,
			text: `Gold is a shiny resource you can mine at your starting point.`
		},{
			condition : () => game.skills.build1,
			text: `Gold is also produced by Gold factories built on nodes.`
		},{
			condition : () => game.skills.gild,
			text: `You can spend mana to make sliders produce gold while fighting.`
		},{
			condition : () => (game.resources.gold || game.production.gold) && !game.skills.upgradePoints,
			newBlock : true,
			text: `While it does not seem to have any use right now, it might be worth collecting some when you can't do anything else.`
		},{
			condition : () => (game.resources.gold || game.production.gold) && game.skills.upgradePoints && !game.skills.build1,
			newBlock : true,
			text: `You can spend it to upgrate captured nodes.`
		},{
			condition : () => (game.resources.gold || game.production.gold) && game.skills.build1,
			newBlock : true,
			text: `You can spend it to upgrate captured nodes and build on them.`
		},{

			subtitle: "Science",
			condition : () => (game.resources.science || game.production.science),
			text: `Science is produced by science labs.
			
			Its used a threshold value to unlock more skills, most of them being "Quality of life" ones. The science is not consumed upon unlocking.`
		},{
			condition : () => (game.resources.science || game.production.science) && game.skills.artifacts,
			text: `You can redirect science production into researching an artifact. In that case, Science value wont grow, and increase will be displayed as "Researching".`
		},{

			subtitle: "Mana",
			condition : () => (game.resources.mana || game.production.mana),
			text: `Mana is produced by magic circle and production depends on its square and map level.`
		},{
			condition : () => (game.resources.mana || game.production.mana) && game.skills.build3,
			text: `Black obelisks produce mana as well, and their production scales with distance from the edge of the circle`
		},{
			condition : () => (game.resources.mana || game.production.mana) && game.skills.gild,
			newBlock : true,
			text: `Any slider can be enchanted for producing gold while fighting with constant influx of mana.`
		},{
			condition : () => (game.resources.mana || game.production.mana) && game.skills.imbuement,
			newBlock : true,
			text: `Mana can also be spent to imbue slider's power with element. The cost depends heavily on hat slider's power / target element ratio. When you run out of mana, all mana-supported effects are automatically disabled.`
		},{
			condition : () => (game.resources.mana || game.production.mana) && game.skills.spellcasting,
			newBlock : true,
			text: `It can be spent for casting spells that you unlock with spellbooks.`
		},{

			subtitle: "Fears",
			condition : () => (game.resources.fears || game.production.fears),
			text: `Fears are produced by Fear factories that can only be placed on physically-protected nodes.`
		},{
			condition : () => (game.resources.fears || game.production.fears) && game.skills.fear,
			newBlock : true,
			text: `Fears provide bonus to your sliders' power based on its spirit.`
		},{

			subtitle: "Clouds",
			condition : () => (game.resources.clouds || game.production.clouds),
			text: `Clouds are produced by Cloud factories that can only be placed on magically-protected nodes.`
		},{
			condition : () => (game.resources.clouds || game.production.clouds) && game.skills.stardust,
			newBlock : true,
			text: `Clouds provide bonus to your sliders elemental growth based on amount of stardust assigned in "Stardust" tab.`
		},{
			condition : () => (game.resources.clouds || game.production.clouds) && game.world.coreStats.spiritElements,
			text: `Clouds provide bonus to your sliders' elements based on its spirit.`
		},{

			subtitle: "Thunderstone",
			condition : () => (game.resources.thunderstone || game.production.thunderstone),
			text: `Thunderstone is produced by Thunder spires.
			
			Thunderstones power the Mean machines.`
		}],
	},
	growth: {
		title : "Growth",
		content : [{
			text: `This list displays accumulated growth speed of your sliders, supported by nodes you have captured. Every second your sliders gain increase in displayed attrubites unless some other mechanics alter the change.`
		},{
			condition : () => (game.skills.invest),
			text: `Namely, "Exp <-> Growth" sliders allow you to convert some of this growth to Experience.`
		},{
			newBlock : true,
			condition : () => (game.skills.stardust || game.statistics.built_banner),
			text: `Multipliers affect growth speed as well, actually applied growth is displayed after an arrow. Multipliers can be obtained with various game mechanics, skills, resources and buildings. Theres a limit to how big your multiplier can be. Capped multiplier is designated with "(CAP)".`
		}]
	},	
	sliders: {
		title : "Sliders tab",
		content : [{
			text: `In this tab you can control your sliders, which are your main means of advancing through the game. You can change slider's displayed color by double-clicking its header.`

		},{
			condition : () => (game.sliders.length > 1),
			newBlock : true,
			text: `You can rearrange sliders by dragging them around by their color header. Rearranging can be done by dragging slider target preview icons on map tab as well. Clicking on those previews calls up slider setup window similar to ones you see here.`

		},{
			subtitle : "Autotargetting",
			condition : () => (game.skills.autoTarget),
			text: `While any kind of autotargetting is enabled, slider will check for new available target every time a node is captured on a map.`
		},{
			condition : () => (game.skills.autoTarget && game.skills.autoTargetFilter),
			text: `You can set up a lot of different autotargetting rules with some of them unlocked over time with separate skills.`

		},{
			subtitle : "Growth control",
			condition : () => (game.skills.invest),
			text: `By adjusting Exp<->Growth sliders, you can set up, how much of growth will be applied to given attribute of given slider, and how much is converted into Experience.`
		},{
			newBlock : true,
			condition : () => (game.skills.learn),
			text: `You can enable boosting of an attribute. That way, slider will consume attribute growth worth of experience to grow the attribute at triple speed. Boosting is disabled automatically if you run out of experience.`

		},{
			subtitle : "通道",
			condition : () => (game.skills.channel),
			text: `你可以把滑块的任意属性共享给所有滑块. 滑块在开启通道时对应属性将无法成长也无法转换为经验, 相对的这个属性会叠加到所有其他滑块上.`
		},{
			condition : () => (game.sliders.some(x => x.clone==1)),
			text: `Clones receive any channeling as bonus to their power.`
		},{
			condition : () => (game.sliders.some(x => x.clone==2)),
			text: `Summons receive any channeling as bonus to their main attribute.`

		},{
			subtitle : "Gilding touch",
			condition : () => (game.skills.gild),
			text: `消耗法力, 你可以让滑块在战斗时获得黄金.`

		},{
			subtitle : "灌输",
			condition : () => (game.skills.imbuement),
			text: `你可以把滑块的力量转换成一种元素. 这会消耗大量的法力, 消耗很大程度取决于滑块对应元素的强度. 转换成滑块不擅长的元素消耗会非常大, 所以为了避免你不小心把所有法力都浪费掉, 最好开启 "安全" 选项. 它会在你剩余 10 秒就用完法力时强行终止你的灌输. 否则, 灌输只会在用完法力时停止.`

		},{
			subtitle : "Artifacts",
			condition : () => (game.skills.artifacts),
			text: `For each slot the slider has, you can assign up to one artifact. Artifacts that are active glow slightly. To equip artifact, it must be fully researched and unlocked.`

		},{
			subtitle : "Levels",
			condition : () => (game.skills.sliderLevels),
			text: `You can spend experience to level up sliders, which provides permanent multipliers to its growth speed. For every level, multipliers can be raised up to 5x, which is also done automatically when you get a new level. Multipliers stack between levels.New level multipliers are arbitrary head-ups you get based on how slider was used recently. Whenever you level up a slider, all its attributes are reset, and on every odd level you get an extra artifact slot.`

		},{
			subtitle : "Party",
			condition : () => (game.skills.sliderLevels),
			text: `You can have up to 4 slider parties active. Whenever "Leader" slider changes target, every "Follower" slider from same color team tries to switch to that target as well. You can change sliders team by clicking same role more than once.`

		},{
			subtitle : "Master controls",
			condition : () => (game.skills.masterSlider),
			text: `Master controls allow you to override various individual settings. You can also save sliders setups as presets. If a slider was not present while preset was saved, it wont be affected by loading, except all artifacts will be unequipped. Presets only save settings, attribute values persist.`
		}]
	},	
	skills: {
		title : "Skills tab",
		content : [{
			text: `You can obtain new skills here. Most skills require experience to obtain. Experience cost multiplier is applier to every cost, and obtaining a skill makes every other skill more expensive. 
			
			New skills can be unlocked by acsending, obtaining more sliders, discovering new resources and other means.`
		},{
			subtitle : "Science",
			condition : () => (game.resources.science),
			text: `Some skills require you to have certain amount of science. Once threshold is achieved, the skill can be obtained as usual. While early science costs seem huge, you are not supposed to get them early on, and most of them are 'Quality of life' upgrades that don't affect progression speed.`
		},{
			newBlock : true,
			condition : () => (game.skills.artifacts),
			text: `Note: Science value does not grow while researching an artifact. ETA displayed is only valid when there's no artifact research active.`
		},{
			subtitle : "Spellbooks",
			condition : () => (game.skills.magic),
			text: `Some skills are designated as "Spellbooks". Those skills provide you new spells.`
		},{
			subtitle : "Blueprints",
			condition : () => (game.skills.world),
			text: `Some skills are designated as "Blueprints". Those skills provide you new types of nodes for the world. They are unlocked by completing specific feats.`
		}]
	},	
	management: {
		title : "Management tab",
		content : [{
			text: `This tab is focused on optimization and automation of your map management. Some science-locked skills contribute towards features on this tab. On larger maps with lots of nodes this tab can take time to display. Sorry for the inconvenience.`
		}]
	},	
	stardust: {
		title : "Stardust tab",
		content : [{
			text: `Here you can distribute stardust you have to boost sliders' elemental growth.`
		},{
			subtitle : "Virtual maps",
			condition : () => (game.skills.virtualMaps),
			text: `You can spend stardust to create virtual maps here. You find stardust instead of stars on virtual maps. Maps of same level as real map are free to create, one level below they cost half the stardust they produce, anything lower costs as much as you can get back by completing a map. Once map is created and cost is paid, it can't be refunded, except by completing that map.
			
			Virtual maps are stronger than same-level map and may have a different layout. 
			
			Sliders start virtal maps with zero stats, but the growth is retained. Sliders only grow on a virtual map if it's active. Real map growth happens all the time. 
			
			No damage is dealt to nodes on an inactive map. 
			
			You lose summons when switching maps.`
		},{
			condition : () => (game.skills.virtualMaps) && (!game.skills.retainVirtualBonus),
			newBolck : true,
			text: `删除地图会失去该地图所有成长, 加成和其它生产. 但已获得的东西会保留.`
		},{
			condition : () => (game.skills.virtualMapFocus),
			text: `Focused virtual maps have more nodes of focused type than others.`
		}, {
			subtitle : "Evolution",
			condition : () => game.skills.evolveVirtual,
			text : `High-level virtual maps can be evolved up to three times. Every evolutions adds large amounts of new, more powerful nodes. Evolved maps are really strong, have larger magical circle and provide much larger bonus to growth and production.`
		},{
			condition : () => (Object.values(game.maps).some(x => x.starfield)),
			subtitle : "Starfields",
			text: `Starfields are the special virtual map type that can appear randomly. Every node without a special role is a stardust node on a starfield!`
		}]
	},	
	artifacts: {
		title : "Artifacts tab",
		content : [{
			text: `You can see artifacts you have found here. Artifacts are unlocked by digging them out. 
			
			To be able to use an artifact, you should research and activate it with a code word first. 
			
			Activated artifacts can be equipped at "Sliders" tab.`
		},{
			subtitle : "Research",
			text: `For every artifact there's a puzzle you must solve. 
			
			By investing science into research, you get clues that are displayed on artifact's tablet. While you are researching an artifact, science value does not grow.
			
			You then have to guess a correct code word to activate it. A code word is a sequence of letters of given length.`
		}]
	},	
	world: {
		title : "World tab",
		content : [{
			text: `Here you can create your new world that affects progression of the game.
			
			For every world you create, you have access to all memories you have to build it from scratch. Only one world can be active at a time.`
		},{
			subtitle: "Building worlds",
			text: `Building of a world consists of two phases: planning and buying. 
			
			First, you plan out your node placement. There are some rules on how you can place nodes: 
			- Every node has a "dead zone". No node can intersect with it.
			- Every node has a "reach zone". Every pair of node with intersecting reach zones will be connected.
			- Nodes of same type (color) can't be connected.
			
			Planned nodes then can be bought to be actually activated and used. Once bought, node can't be refunded, only stored for later use.`,
		},{
			subtitle: "Activating nodes",
			text: `To activate nodes, you need workers. Every slider assigned to mine is considered a worker.
			
			To be active, node should be connected to a core either directly or through other cores. Node depth is the shortest route to the core. Node wont be active if your worker number is less than node's depth.`,
		},{
			subtitle: "World core",
			condition : () => game.skills.worldCore,
			text: `For each world you can refine its core, which decreases number of memories you can use. Most core fragments have threshold building number requirements to activate. You can't activate three fragments that share a single corner.`,
		},{
			subtitle: "Feats",
			text: `Feats are various tasks for you to complete. Most of feats unlock blueprint skills `,
		},{
			condition : () => game.skills.worldCore,
			text: `or core fragments`,
		},{
			text: `upon completion. Some feats have map level requirements. They can be done on a virtual map of corresponding level. If a feat is grayed out, it can't be completed or has been failed at current map. You may unlock new feats as you ascend.`,
		}]
	},	
}

Object.keys(GUIDE).map(x => {
	GUIDE[x].id = x
	const guide = GUIDE[x].content
	if (guide) {
		for (let i = 0; i < guide.length; i++) {
			if (!guide[i].text) continue
			guide[i].text = guide[i].text.replace(/\t/g,"")
			const blocks = guide[i].text.split("\n\n")
			if (blocks.length) {
				const base = guide[i]
				guide.splice(i,1)
				blocks.map((block,n) => {
					const record = Object.assign({newBlock : n}, base, {text : block})
					if (n) delete record.subtitle
					guide.splice(i,0,record)
					i++
				})
				i--
			}
		}
	}
})
