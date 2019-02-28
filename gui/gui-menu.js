'use strict'

const MenuTab = Template({
	_init() {
		this.dvDisplay = createElement("div", "menu "+(this.className || ""), this.parent)

		this.tabs = TabGroup({
			parent : this.dvDisplay,
			name : "menu",
		})

		this.about = this.tabs.addTab("about", "关于游戏", AboutTab)
		this.saves = this.tabs.addTab("saves", "游戏存档管理", SavesTab)
		this.settings = this.tabs.addTab("settings", "设置", SettingsTab)
		this.statistics = this.tabs.addTab("statistics", "统计", StatisticsTab)
		this.achievements = this.tabs.addTab("achievements", "成就", AchievementsTab)

		this.tabs.setTab("saves")
	},
	
	onSet() {
		this.update(true)
	},
	
	update(forced) {
		if (this.tabs.activeTab == "statistics")
			this.statistics.update(forced)
	}
})