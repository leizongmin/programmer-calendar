#!/usr/bin/env node
'use strict';

/**
 * 程序员老黄历命令行版
 *
 * 本程序灵感来源于 http://sandbox.runjs.cn/show/ydp3it7b
 * 部分代码也来自该项目
 *
 * @author Zongmin Sei <leizongmin@gmail.com>
 */

const clc = require('cli-color');
const calendar = require('../lib/calendar');


const screenWidth = process.stdout.columns;
const screenHeight = process.stdout.rows;

function take(n, s) {
  let r = '';
  for (let i = 0; i < n; i++) {
    r += s;
  }
  return r;
}

function printLength(c) {
  var n = 0;
  for (let i = 0; i < c.length; i++) {
    let p = c.charCodeAt(i);
    if (p < 128 || p ==  9733 || p == 9734) {
      n++;
    } else {
      n +=2 ;
    }
  }
  return n;
}

function fix(str, len, S) {
  let l = printLength(clc.strip(str));
  return str + S(take(len - l, ' '));
}

function L(str, S) {
  console.log(fix(str, 80, S));
}

function S1(str) {
  return clc.xterm(0).bgXterm(250)(str);
}

function S2(str) {
  return clc.xterm(0).bgXterm(229)(str);
}

function S3(str) {
  return clc.xterm(0).bgXterm(220)(str);
}

function S4(str) {
  return clc.xterm(0).bgXterm(210)(str);
}

function S5(str) {
  return clc.xterm(0).bgXterm(196)(str);
}


L(S1(''), S1);
L(S1(calendar.getTodayString()), S1);
L(S1(''), S1);
L(S1('座位朝向：面向' + clc.green(calendar.getDirectionString()) + '写程序，BUG 最少。'), S1);
L(S1('今日宜饮：' + calendar.getDrinkString()), S1);
L(S1('女神亲近指数：' + clc.xterm(205)(calendar.getStarString())), S1);
L(S1(''), S1);

let lucks = calendar.pickTodaysLuck();
let luckLength = Math.max(lucks.good.length, lucks.bad.length);
let middleIndex = parseInt(luckLength / 2 + 0.5);

console.log(fix(S3('    '), 40, S2) + fix(S5('    '), 40, S4));

for (let i = 0; i < luckLength; i++) {
  let good = lucks.good[i] || {name: '', good: ''};
  let bad = lucks.bad[i] || {name: '', bad: ''};

  let left = '';
  let right = '';

  if (i === middleIndex) {
    left = S3(' 宜 ');
    right = S5(' 忌 ');
  } else {
    left = S3('    ');
    right = S5('    ');
  }

  left = fix(left + S2('  ' + clc.xterm(0)(good.name)), 40, S2);
  right = fix(right + S4('  ' + clc.xterm(0)(bad.name)), 40, S4);
  console.log(left + right);

  left = fix(S3('    ') + S2('    ' + clc.xterm(240)(good.good)), 40, S2);
  right = fix(S5('    ') + S4('    ' + clc.xterm(240)(bad.bad)), 40, S4);
  console.log(left + right);
}

console.log(fix(S3('    '), 40, S2) + fix(S5('    '), 40, S4));
