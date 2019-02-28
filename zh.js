//汉化杂项
var cnItems = {
    'skills': '技能',
    'sliders': '滑块',
    'Power': '力量',
    'Spirit': '精神',
    'Unknown': '未知',
    'None': '无',
    'Low load mode': '低负载模式',
    'Master gilding touch control': '掌握镀金触摸控制',
    'Gilding touch': '镀金触摸',
    'Master imbuement control': '掌握灌输控制',
    'Safe': '安全',
    'Hide completed': '隐藏已完成',
    'Hide enchanted': '隐藏魔法',
    'Hide imprinted/unimprintable': '隐藏印记/不可打印',
    'Mining': '采矿',
    'No damage': '无伤害',
    'Attacking': '攻击',
    'Free': '空闲',
    'Target connected if possible': '如果有可能，连接目标',
    'Master channel control': '掌握通道控制',
    'Elemental summons avoid same element': '元素召唤避免相同的元素',
    'Distribute equally on change': '变化均匀分布',
    'Re-sort upon change': '改变后重新排序',
    'Research this': '研究这个',
    'Summons avoid narrow path': '避免狭窄路径',
    'Redistribute if exceeding total': '如果超过总数，重新分配',
    'Main story display': '主要故事显示',
    'Off': '关闭',
    'On': '开启',
    'Side story display': '侧面故事显示',
    'Story timing': '故事时间',
    'Highest damage': '最高伤害',
    'Deepest': '最大深度',
    'Farthest': '距离最远',
    'Closest': '距离最近',
    'Most defended': '最高防御',
    'Least defended': '最低防御',
    'Strongest': '最强输出',
    'Random': '随机',
    'Always': '经常',
    '30 minutes': '30分钟',
    '10 minutes': '10分钟',
    '5 minute': '5分钟',
    '1 minute': '1分钟',
    '1 hour': '1小时',
    'Least deep': '最小深度',
    'Weakest': '最弱输出',
    'Leader': '领导者',
    'Follower': '追随者',
    'Low load mode only': '仅低负载模式',
    '15 seconds': '15秒',
    'Autosave period': '自动保存周期',
    'From Map tab only': '只从地图选项卡',
    'From any tab': '从任何选项卡',
    'Node size scale': '缩放尺寸',
    'Maximum level': '最高等级',
    'Sort by': '排序',
    'Level': '等级',
    'Growth': '成长',
    'Depth': '深度',
    'Gold': '黄金',
    'Mana': '法术',
    'Science': '科学',
    'Focus': '焦点',
    'Blood': '血',
    'Fire': '火',
    'Ice': '冰',
    'Metal': '金属',
    'Short number format': '短数字格式',
    'Natural': '标准',
    'Scientific': '科学计数法',
    'Engineering': '工程符号',
    'Scientific number display': '科学数字显示',
    'Upper bound for full numbers': '上限为完整的数字',
    'Lower bound for full numbers': '下限为完整的数字',
    'Precision of short numbers': '简短数字的精确性',
    'Color theme': '主题颜色',
    'Light': '白灰',
    'Dark': '暗黑',
    'Distribute for equal growth on change': '分配平等的增长变化',
    'Invert lightness': '反转亮度',
    'Color blind mode': '色盲模式',
    'Artifact icons': '物品图标',
    'Text': '文字',
    'Images': '图片',
    'Rough ETA display': '粗略估计显示',
    'Numbers': '数字',
    'Fireworks': '烟花效果',
    'Miner/worker sparks': '矿工/工人火花',
    'Display dead zones': '显示死亡区域',
    'Display connectable distance': '显示连接距离',
    'Allow detached node placement': '允许分离节点的位置',
    'Mechanics guide display': '力学指南显示',
    'Game time': '游戏时间',
    'Ten times per second': '每秒10次',
    'Thirty times per second': '每秒30次',
    'Once per second': '每秒1次',
    'Once per five seconds': '每5秒1次',
    'Automatic low load mode when not active window': '当没有活动窗口时，自动进入低负载模式',
    'Node level display': '节点等级显示',
    'Number': '数字',
    'Show': '显示',
    'Hide': '隐藏',
    'Fade': '淡出',
    'Circles': '圆圈',
    'Uncaptured node lines': '未捕捉到的节点线',
    'Solid': '实线',
    '5 minutes': '5分钟',
    'Popup': '弹出框',
    'Log': '日志',
    'Lightning effects': '闪电效果',
    'Show overriden controls': '显示重载控制',
    'Show growth controls (available by click if hidden)': '显示增长控件(如果隐藏，点击显示)',
    'Cloud save period': '云端储存期',
    'Autoload cloud save if newer one found': '如果找到云存档，则自动加载云存档',
    'Hiberload': '休眠负载',
    'Target': '目标',
    'World time': '世界时间',
    'Game processing speed': '游戏处理速度',
    'Slow mode processing speed': '慢速模式处理速度',
    'Automatic low load mode when idling': '空转时自动进入低负载模式',
    'Display map progress while in automatic low load mode': '在自动低负载模式下显示地图进度',
    'Upload cloud saves if logged in': '如果登录了，上传云端保存',
    'Captured node notification': '捕获节点通知',
    'Role': '角色',
    'Lowest solo ETA': '最低solo ETA',
    'Dashed': '虚线',
    'Red': '红色',
    'Green': '绿色',
    'Blue': '蓝色',
    'Exp': '经验',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',

};

function cnItem(text) {
    //数组里面有的，返回中文
    for (var i in cnItems) {
        if (text == i) {
            return cnItems[i];
        }
    }
    //数组里面没有的，原样返回
    for (var i in cnItems) {
        if (text != i) {
            console.log("需汉化的英文Item：" + text);
            return text;
        }
    }
}



//汉化标题
var cntit = {
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    

};

function cntitle(text) {
    //数组里面有的，返回中文
    for (var i in cntit) {
        if (text == i) {
            return cntit[i];
        }
    }
    //数组里面没有的，原样返回
    for (var i in cntit) {
        if (text != i) {
            console.log("需汉化的英文标题：" + text);
            return text;
        }
    }
}

