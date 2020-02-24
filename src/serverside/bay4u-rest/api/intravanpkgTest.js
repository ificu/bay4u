
var express  = require('express');
var router   = express.Router();
var querystring = require('querystring');
var request = require('request');

// 차대번호 조회 서비스 (POST)
router.post('/',
  function(req, res, next){

      var param = {
          carno : req.body.carNo,
          comcode : 'SK',
          imprmn_entnum : req.body.entNo
      };

      var formData = querystring.stringify(param);
      var contentLength = formData.length;

      console.log("POST Param : ", param);
      console.log("POST FormParam : ", formData);

      request({
        headers: {
          'Content-Length': contentLength,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        //uri: 'http://adbcp.goldauto.co.kr/pkg/Carinfo.aspx',
        uri: 'http://adbcp.intravan.co.kr/pkg/Carinfo.aspx',
        body: formData,
        method: 'POST'
      }, function (err, resp, body) {
        console.log("return data : ", body);
        console.log("error data : ", err);

        if(JSON.parse(body).result === "ok") {
          res.json({success:true, data: JSON.parse(body).car_vinary_no});
          res.end();

          // 정상적으로 조회 되었다면 DB에도 저장하자.
          var param = {};
          var now = new Date();

           param.operation = "create";
           param.tableName = "BAY4U_CAR_VIN";
           param.payload = {};
           param.payload.Item = {};
           param.payload.Item.CAR = req.body.carNo;
           param.payload.Item.VIN = JSON.parse(body).car_vinary_no;
           param.payload.Item.DATE = now.getFullYear() + "-" + datePadding(now.getMonth()+1,2) + "-" + datePadding(now.getDate(),2);

           request({
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            uri: 'https://2fb6f8ww5b.execute-api.ap-northeast-2.amazonaws.com/bay4u/backendService',
            body: param,
            json: true,
            method: 'POST'
          }, function (err, resp, dbody) {
            console.log("DynamoDB return : ", dbody);
          });
        }
        else {
          // 정상적으로 조회 되었다면 DB에도 저장하자.
          res.json({success:false, data: JSON.parse(body).msg});
          res.end();

        }
        
      });
  }
);

function datePadding(n, digits) {
  var zero = '';
  var i = 0;
  var chk = ''+n;
  chk = chk.toString();

  if (chk.length < digits) {
    for (i = 0; i < digits - chk.length; i++)
      zero += '0';
  }

  return zero + chk;
};


module.exports = router;

