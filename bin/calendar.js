#!/usr/bin/env node
'use strict';

/**
 * 程序员老黄历命令行版
 *
 * 本程序灵感来源于 http://sandbox.runjs.cn/show/ydp3it7b
 * 部分代码也来自该项目
 *
 * 佛祖图案来源于 https://github.com/ottomao/bugfreejs
 *
 * @author Zongmin Sei <leizongmin@gmail.com>
 */

const path = require('path');
const fs = require('fs');
const clc = require('cli-color');
const calendar = require('../lib/calendar');
const bugfree = fs.readFileSync(path.resolve(__dirname, '../lib/bugfree.txt')).toString().split(/\r?\n/);


const screenWidth = process.stdout.columns;
const screenHeight = process.stdout.rows;
const printWidth = 80;
const printWidthHalf = printWidth / 2;
const printOffsetLeft = parseInt((screenWidth - printWidth) / 2);

function print(str) {
  console.log(take(printOffsetLeft, ' ') + str);
}

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
  print(fix(str, printWidth, S));
}

function S0(str) {
  return clc.xterm(227).bgXterm(0)(str);
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

////////////////////////////////////////////////////////////////////////////////

let offsetLeft = '                 ';
for (let str of bugfree) {
  print(fix(S0(offsetLeft + str), printWidth, S0));
}

L(S1(''), S1);
L(S1(offsetLeft + '    ' + calendar.getTodayString()), S1);
L(S1(''), S1);
L(S1(offsetLeft +  '    座位朝向：面向' + clc.green(calendar.getDirectionString()) + '写程序，BUG 最少。'), S1);
L(S1(offsetLeft +  '    今日宜饮：' + calendar.getDrinkString()), S1);
L(S1(offsetLeft +  '    女神亲近指数：' + clc.xterm(205)(calendar.getStarString())), S1);
L(S1(''), S1);

let lucks = calendar.pickTodaysLuck();
let luckLength = Math.max(lucks.good.length, lucks.bad.length);
let middleIndex = parseInt(luckLength / 2 + 0.5);

print(fix(S3('    '), printWidthHalf, S2) + fix(S5('    '), printWidthHalf, S4));

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

  left = fix(left + S2('  ' + clc.xterm(0)(good.name)), printWidthHalf, S2);
  right = fix(right + S4('  ' + clc.xterm(0)(bad.name)), printWidthHalf, S4);
  print(left + right);

  left = fix(S3('    ') + S2('    ' + clc.xterm(240)(good.good)), printWidthHalf, S2);
  right = fix(S5('    ') + S4('    ' + clc.xterm(240)(bad.bad)), printWidthHalf, S4);
  print(left + right);
}

print(fix(S3('    '), printWidthHalf, S2) + fix(S5('    '), printWidthHalf, S4));
