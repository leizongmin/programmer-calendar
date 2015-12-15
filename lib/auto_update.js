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

module.exports = function (file) {

  const path = require('path');
  const fs = require('fs');
  const util = require('util');
  const clc = require('cli-color');
  const updateUrl = 'https://raw.githubusercontent.com/leizongmin/programmer-calendar/master/lib/define.json';

  fs.stat(file, (err, stats) => {
    if (err) {
      if (err.code !== 'ENOENT') {
        console.error(err);
      }
      var update = true;
    } else {
      if (stats.atime.getTime() - (new Date().getTime()) > 3600000 * 24 * 7) {
        var update = true;
      } else {
        var update = false;
      }
    }

    if (!update) return;

    startUpdate();
  });

  function startUpdate() {

    console.log('');
    console.log('正在自动更新...');
    const download = require('lei-download');

    download(updateUrl, file, (size, total) => {

      process.stdout.write(clc.move.to(0, clc.windowSize.height));
      process.stdout.write(clc.erase.line);
      process.stdout.write(util.format('进度：%s%% [%s/%s]', (size / total * 100).toFixed(1), size, total));

    }, err => {

      console.log('更新完成。');
      process.exit();

    });

  }

};
