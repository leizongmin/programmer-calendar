'use strict';

/**
 * 程序员老黄历命令行版
 *
 * 本程序灵感来源于 http://sandbox.runjs.cn/show/ydp3it7b
 * 部分代码也来自该项目
 *
 * 佛祖图案来源于 https://github.com/ottomao/bugfreejs
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

/*
 * 注意：本程序中的“随机”都是伪随机概念，以当前的天为种子。
 */
function random(dayseed, indexseed) {
  var n = dayseed % 11117;
  for (var i = 0; i < 100 + indexseed; i++) {
    n = n * n;
    n = n % 11117; // 11117 是个质数
  }
  return n;
}

const today = new Date();
const iday = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

const weeks = ["日", "一", "二", "三", "四", "五", "六"];
const directions = ["北方", "东北方", "东方", "东南方", "南方", "西南方", "西方", "西北方"];
const activities = [{
  name: "写单元测试",
  good: "写单元测试将减少出错",
  bad: "写单元测试会降低你的开发效率"
}, {
  name: "洗澡",
  good: "你几天没洗澡了？",
  bad: "会把设计方面的灵感洗掉",
  weekend: true
}, {
  name: "锻炼一下身体",
  good: "",
  bad: "能量没消耗多少，吃得却更多",
  weekend: true
}, {
  name: "抽烟",
  good: "抽烟有利于提神，增加思维敏捷",
  bad: "除非你活够了，死得早点没关系",
  weekend: true
}, {
  name: "白天上线",
  good: "今天白天上线是安全的",
  bad: "可能导致灾难性后果"
}, {
  name: "重构",
  good: "代码质量得到提高",
  bad: "你很有可能会陷入泥潭"
}, {
  name: "使用%t",
  good: "你看起来更有品位",
  bad: "别人会觉得你在装逼"
}, {
  name: "跳槽",
  good: "该放手时就放手",
  bad: "鉴于当前的经济形势，你的下一份工作未必比现在强"
}, {
  name: "招人",
  good: "你面前这位有成为牛人的潜质",
  bad: "这人会写程序吗？"
}, {
  name: "面试",
  good: "面试官今天心情很好",
  bad: "面试官不爽，会拿你出气"
}, {
  name: "提交辞职申请",
  good: "公司找到了一个比你更能干更便宜的家伙，巴不得你赶快滚蛋",
  bad: "鉴于当前的经济形势，你的下一份工作未必比现在强"
}, {
  name: "申请加薪",
  good: "老板今天心情很好",
  bad: "公司正在考虑裁员"
}, {
  name: "晚上加班",
  good: "晚上是程序员精神最好的时候",
  bad: "",
  weekend: true
}, {
  name: "在妹子面前吹牛",
  good: "改善你矮穷挫的形象",
  bad: "会被识破",
  weekend: true
}, {
  name: "撸管",
  good: "避免缓冲区溢出",
  bad: "强撸灰飞烟灭",
  weekend: true
}, {
  name: "浏览成人网站",
  good: "重拾对生活的信心",
  bad: "你会心神不宁",
  weekend: true
}, {
  name: "命名变量\"%v\"",
  good: "",
  bad: ""
}, {
  name: "写超过%l行的方法",
  good: "你的代码组织的很好，长一点没关系",
  bad: "你的代码将混乱不堪，你自己都看不懂"
}, {
  name: "提交代码",
  good: "遇到冲突的几率是最低的",
  bad: "你遇到的一大堆冲突会让你觉得自己是不是时间穿越了"
}, {
  name: "代码复审",
  good: "发现重要问题的几率大大增加",
  bad: "你什么问题都发现不了，白白浪费时间"
}, {
  name: "开会",
  good: "写代码之余放松一下打个盹，有益健康",
  bad: "小心被扣屎盆子背黑锅"
}, {
  name: "打DOTA",
  good: "你将有如神助",
  bad: "你会被虐的很惨",
  weekend: true
}, {
  name: "晚上上线",
  good: "晚上是程序员精神最好的时候",
  bad: "你白天已经筋疲力尽了"
}, {
  name: "修复BUG",
  good: "你今天对BUG的嗅觉大大提高",
  bad: "新产生的BUG将比修复的更多"
}, {
  name: "设计评审",
  good: "设计评审会议将变成头脑风暴",
  bad: "人人筋疲力尽，评审就这么过了"
}, {
  name: "需求评审",
  good: "",
  bad: ""
}, {
  name: "上微博",
  good: "今天发生的事不能错过",
  bad: "今天的微博充满负能量",
  weekend: true
}, {
  name: "上AB站",
  good: "还需要理由吗？",
  bad: "满屏兄贵亮瞎你的眼",
  weekend: true
}, {
  name: "玩FlappyBird",
  good: "今天破纪录的几率很高",
  bad: "除非你想玩到把手机砸了",
  weekend: true
}];

const specials = [{
  date: 20160214,
  type: 'bad',
  name: '待在男（女）友身边',
  description: '脱团火葬场，入团保平安。'
}];

const tools = ["Eclipse写程序", "MSOffice写文档", "记事本写程序", "Windows8", "Linux", "MacOS", "IE", "Android设备", "iOS设备"];

const varNames = ["jieguo", "huodong", "pay", "expire", "zhangdan", "every", "free", "i1", "a", "virtual", "ad", "spider", "mima", "pass", "ui"];

const drinks = ["水", "茶", "红茶", "绿茶", "咖啡", "奶茶", "可乐", "鲜奶", "豆奶", "果汁", "果味汽水", "苏打水", "运动饮料", "酸奶", "酒"];

function is_someday() {
  return today.getMonth() == 5 && today.getDate() == 4;
}

function getTodayString() {
  return "今天是" + today.getFullYear() + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日 星期" + weeks[today.getDay()];
}

function star(num) {
  var result = [];
  var i = 0;
  while (i < num) {
    result.push('★');
    i++;
  }
  while (i < 5) {
    result.push('☆');
    i++;
  }
  return result.join(' ');
}

// 生成今日运势
function pickTodaysLuck() {
  let _activities = filter(activities);

  let numGood = random(iday, 98) % 3 + 2;
  let numBad = random(iday, 87) % 3 + 2;
  let eventArr = pickRandomActivity(_activities, numGood + numBad);

  let specialSize = pickSpecials();

  let goodList = [];
  let badList = [];

  for (let i = 0; i < numGood; i++) {
    goodList.push(eventArr[i]);
  }

  for (let i = 0; i < numBad; i++) {
    badList.push(eventArr[numGood + i]);
  }

  return {good: goodList, bad: badList};
}

// 去掉一些不合今日的事件
function filter(activities) {
  let result = [];

  // 周末的话，只留下 weekend = true 的事件
  if (isWeekend()) {

    for (let i = 0; i < activities.length; i++) {
      if (activities[i].weekend) {
        result.push(activities[i]);
      }
    }

    return result;
  }

  return activities;
}

function isWeekend() {
  return today.getDay() == 0 || today.getDay() == 6;
}

// 添加预定义事件
function pickSpecials() {
  let specialSize = [0, 0];

  for (let i = 0; i < specials.length; i++) {
    let special = specials[i];

    if (iday == special.date) {
      if (special.type == 'good') {
        specialSize[0]++;
        addToGood({
          name: special.name,
          good: special.description
        });
      } else {
        specialSize[1]++;
        addToBad({
          name: special.name,
          bad: special.description
        });
      }
    }
  }

  return specialSize;
}

// 从 activities 中随机挑选 size 个
function pickRandomActivity(activities, size) {
  let picked_events = pickRandom(activities, size);

  for (let i = 0; i < picked_events.length; i++) {
    picked_events[i] = parse(picked_events[i]);
  }

  return picked_events;
}

// 从数组中随机挑选 size 个
function pickRandom(array, size) {
  let result = [];

  for (let i = 0; i < array.length; i++) {
    result.push(array[i]);
  }

  for (let j = 0; j < array.length - size; j++) {
    let index = random(iday, j) % result.length;
    result.splice(index, 1);
  }

  return result;
}

// 解析占位符并替换成随机内容
function parse(event) {
  let result = {
    name: event.name,
    good: event.good,
    bad: event.bad
  }; // clone

  if (result.name.indexOf('%v') != -1) {
    result.name = result.name.replace('%v', varNames[random(iday, 12) % varNames.length]);
  }

  if (result.name.indexOf('%t') != -1) {
    result.name = result.name.replace('%t', tools[random(iday, 11) % tools.length]);
  }

  if (result.name.indexOf('%l') != -1) {
    result.name = result.name.replace('%l', (random(iday, 12) % 247 + 30).toString());
  }

  return result;
}

// 获得座位朝向
function getDirectionString() {
  return directions[random(iday, 2) % directions.length];
}

// 获得今日宜饮
function getDrinkString() {
  return pickRandom(drinks, 2).join('，');
}

// 获得女神亲近指数
function getStarString() {
  return star(random(iday, 6) % 5 + 1);
}


exports.getTodayString = getTodayString;
exports.getDirectionString = getDirectionString;
exports.getDrinkString = getDrinkString;
exports.getStarString = getStarString;
exports.pickTodaysLuck = pickTodaysLuck;
