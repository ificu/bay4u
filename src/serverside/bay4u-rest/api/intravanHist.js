
var express  = require('express');
var router   = express.Router();
var querystring = require('querystring');
var request = require('request');

// 정비이력 조회 서비스 (POST)
router.post('/',
  function(req, res, next){

      var param = {
          carno : req.body.carNo,
          comcode : 'SK',
          idno : req.body.idNo,
          sdate : req.body.sDate
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
        //uri: 'http://adbcp.goldauto.co.kr/pkg/CarHist.aspx',
        uri: 'http://adbcp.intravan.co.kr/pkg/CarHist.aspx',
        body: formData,
        method: 'POST'
      }, function (err, resp, body) {
        console.log("return data : ", body);
        console.log("error data : ", err);

        if(JSON.parse(body).result === "ok") {
          res.json({success:true, data: JSON.parse(body)});
          res.end();
        }
        else {
          res.json({success:false, data: JSON.parse(body)});
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

