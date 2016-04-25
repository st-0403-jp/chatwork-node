/*do.js*/
var api = require('./api');
var util = require('./util');

/*
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
  process.stdout.write('data: ' + chunk);
});

process.stdin.on('end', function () {
  process.stdout.write('end');
});
*/

var fpathAll = [];
process.argv.forEach(function (val, index, array) {
  fpathAll.push(val);
});

var fpath2 = fpathAll[2];
var fpath3 = fpathAll[3];
var fpath4 = fpathAll[4];
var fpath5 = fpathAll[5];

if (util.isEmpty(fpath2)) {
  console.log('fpath2 none error');
  process.exit();
} else {
  console.log(fpath2);
}
/* GETリクエスト */
if (fpath2 === 'GET') {
  if (util.isEmpty(fpath3)) {
    console.log('fpath3 none error');
    //process.exit();
  } else {
    console.log(fpath3);
  }
  if (util.isEmpty(fpath4)) {
    console.log('fpath4 none error');
    //process.exit();
  } else {
    console.log(fpath4);
  }
  if (util.isEmpty(fpath5)) {
    console.log('fpath5 none error');
    //process.exit();
  } else {
    console.log(fpath5);
  }

  api.reqGET({
    apiName: fpath3,
    apiSubName: fpath5,
    apiType: fpath4
  });
}
/* POSTリクエスト */
if (fpath2 === 'POST') {
  if (util.isEmpty(fpath3)) {
    console.log('fpath3 none error');
    //process.exit();
  } else {
    console.log(fpath3);
  }
  if (util.isEmpty(fpath4)) {
    console.log('fpath4 none error');
    //process.exit();
  } else {
    console.log(fpath4);
  }
  if (util.isEmpty(fpath5)) {
    console.log('fpath5 none error');
    //process.exit();
  } else {
    console.log(fpath5);
  }

  api.post({
    apiName: fpath3,
    apiSubName: fpath5,
    apiType: fpath4
  });
}
