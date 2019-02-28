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
    'Deepest': '采矿最深',
    'Farthest': '距离最远',
    'Closest': '距离最近',
    'Most defended': '最高防御',
    'Least defended': '最低防御',
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

