/*api.js*/

var request = require('request');
var fs = require('fs');
//自分便利モジュール
var util = require('./util');
//コンソールに綺麗に出力する
var show = require('./showConsole');

module.exports = (function () {

  var method = {};

  var apiToken = ''; // APIトークン
  var apiBase = 'https://api.chatwork.com/v1';

  var options = {
      url: apiBase,
      headers: {
          'X-ChatWorkToken': apiToken
      },
      json: true
  };

  //フィールド
  method.apiName = null;

  method.apiSubName = null;

  method.requestType = null;

  method.init = function (field) {
    this.apiName = field.apiName;
    this.apiSubName = field.apiSubName;
    this.requestType = field.apiType;
  };

  // APIにGETリクエストする
  method.reqGET = function (reqData) {

    //リクエストデータをセット
    this.init(reqData);

    var that = this;

    options.url += '/' + that.apiName;
    if (that.apiSubName) {
      options.url += '/' + that.apiSubName;
    }

    console.log(options.url);
    console.log(that);

    request.get(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        if (util.isEqual('me', that.apiName)) {
          console.log(body);
        }
        if (util.isEqual('contacts', that.apiName)) {
          if (util.isEqual('-l', that.requestType) || util.isEqual('--length', that.requestType)) {
            // only length
            show.k2v({key: '全コンタクト数', val: body.length});
          } else if (util.isEqual('-i', that.requestType) || util.isEqual('--ids', that.requestType)) {
            // only ids
            var accountIds = [];
            body.forEach(function (ele) {
              accountIds.push(ele.account_id);
            });
            show.each({key: 'アカウントID', val: accountIds});
          } else {
            // allMyContacts
            show.each({key: 'マイコンタクト', val: body});
          }
        }
        if (util.isEqual('rooms', that.apiName)) {
          if (that.apiSubName) {
            // rooms/******
            show.k2v({key: 'チャット', val: body});
          } else {
            // rooms/null
            show.each({key: 'チャット一覧', val: body});
          }
        }
        /*
        //apiフォルダにtest.json作る
        fs.readdir('api', function (err, files) {
          if (err) {
            console.log(err);
            fs.mkdirSync('api', 0755);
          }
          var buf = new Buffer(JSON.stringify({'api': body, 'length': body.length}, null, ''));
          fs.writeFile(__dirname + '/api/data.json', buf, function (err) {
            if (err) {throw err;}
          });
        });
        */
      } else {
        console.log('error: '+ response.statusCode);
      }
    });
  };

  method.post = function (reqData) {
    this.init(reqData);

    var that = this;
    console.log(that);

    options.url += '/' + that.apiName;
    if (that.apiSubName) {
      options.url += '/' + that.apiSubName;
    }
    if (that.requestType === '-t' || that.requestType === '--task') {
      options.url += '/tasks';
    }

    options.form = {
      body: 'hello',
      to_ids: 1486962
    };
    
    console.log(options);

    request.post(options, function (error, response, body) {
      console.log(body);
    });
  };

  return method;

})();