var express  = require('express');
var router   = express.Router();
var request = require('request');

router.post('/reqCarInfo',
  function(req, res, next){

      var param = req.body;

      console.log("smartlink param : ", req.body);

      request({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        uri: 'https://lora-web.sksmartlink.com:447/cust/reqCarInfo',
        body: param,
        json: true,
        method: 'POST'
      }, function (err, resp, body) {
        console.log("return data : ", body);
        console.log("error data : ", err);

        res.json(body);
        res.end();
      });
  }
);
router.post('/reqMemberInfo',
  function(req, res, next){

      var param = req.body;

      console.log("smartlink param : ", req.body);

      request({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        uri: 'https://lora-web.sksmartlink.com:447/cust/reqMemberInfo',
        body: param,
        json: true,
        method: 'POST'
      }, function (err, resp, body) {
        console.log("return data : ", body);
        console.log("error data : ", err);

        res.json(body);
        res.end();
      });
  }
);
router.post('/reqMemberReg',
  function(req, res, next){

      var param = req.body;

      console.log("smartlink param : ", req.body);

      request({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        uri: 'https://lora-web.sksmartlink.com:447/cust/reqMemberReg',
        body: param,
        json: true,
        method: 'POST'
      }, function (err, resp, body) {
        console.log("return data : ", body);
        console.log("error data : ", err);

        res.json(body);
        res.end();
      });
  }
);
router.post('/reqDrvHst',
  function(req, res, next){

      var param = req.body;

      console.log("smartlink param : ", req.body);

      request({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        uri: 'https://lora-web.sksmartlink.com:447/cust/reqDrvHst',
        body: param,
        json: true,
        method: 'POST'
      }, function (err, resp, body) {
        console.log("return data : ", body);
        console.log("error data : ", err);

        res.json(body);
        res.end();
      });
  }
);
router.post('/reqDrvGps',
  function(req, res, next){

      var param = req.body;

      console.log("smartlink param : ", req.body);

      request({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        uri: 'https://lora-web.sksmartlink.com:447/cust/reqDrvGps',
        body: param,
        json: true,
        method: 'POST'
      }, function (err, resp, body) {
        console.log("return data : ", body);
        console.log("error data : ", err);

        res.json(body);
        res.end();
      });
  }
);
router.post('/reqGps',
  function(req, res, next){

      var param = req.body;

      console.log("smartlink param : ", req.body);

      request({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        uri: 'https://lora-web.sksmartlink.com:447/cust/reqGps',
        body: param,
        json: true,
        method: 'POST'
      }, function (err, resp, body) {
        console.log("return data : ", body);
        console.log("error data : ", err);

        res.json(body);
        res.end();
      });
  }
);
router.post('/reqDrvHstGps',
  function(req, res, next){

      var param = req.body;

      console.log("smartlink param : ", req.body);

      request({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        uri: 'https://lora-web.sksmartlink.com:447/cust/reqDrvHstGps',
        body: param,
        json: true,
        method: 'POST'
      }, function (err, resp, body) {
        console.log("return data : ", body);
        console.log("error data : ", err);

        res.json(body);
        res.end();
      });
  }
);
router.post('/reqFrstLstDrvDt',
  function(req, res, next){

      var param = req.body;

      console.log("smartlink param : ", req.body);

      request({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        uri: 'https://lora-web.sksmartlink.com:447/cust/reqFrstLstDrvDt',
        body: param,
        json: true,
        method: 'POST'
      }, function (err, resp, body) {
        console.log("return data : ", body);
        console.log("error data : ", err);

        res.json(body);
        res.end();
      });
  }
);
router.post('/reqDrvStat',
  function(req, res, next){

      var param = req.body;

      console.log("smartlink param : ", req.body);

      request({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        uri: 'https://lora-web.sksmartlink.com:447/reqDrvStat',
        body: param,
        json: true,
        method: 'POST'
      }, function (err, resp, body) {
        console.log("return data : ", body);
        console.log("error data : ", err);

        res.json(body);
        res.end();
      });
  }
);
router.post('/reqDrvStatSearch',
  function(req, res, next){

      var param = req.body;

      console.log("smartlink param : ", req.body);

      request({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        uri: 'https://lora-web.sksmartlink.com:447/reqDrvStatSearch',
        body: param,
        json: true,
        method: 'POST'
      }, function (err, resp, body) {
        console.log("return data : ", body);
        console.log("error data : ", err);

        res.json(body);
        res.end();
      });
  }
);
router.post('/reqDrvDyStat',
  function(req, res, next){

      var param = req.body;

      console.log("smartlink param : ", req.body);

      request({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        uri: 'https://lora-web.sksmartlink.com:447/reqDrvDyStat',
        body: param,
        json: true,
        method: 'POST'
      }, function (err, resp, body) {
        console.log("return data : ", body);
        console.log("error data : ", err);

        res.json(body);
        res.end();
      });
  }
);
router.post('/reqDrvrDrvDyStat',
  function(req, res, next){

      var param = req.body;

      console.log("smartlink param : ", req.body);

      request({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        uri: 'https://lora-web.sksmartlink.com:447/reqDrvrDrvDyStat',
        body: param,
        json: true,
        method: 'POST'
      }, function (err, resp, body) {
        console.log("return data : ", body);
        console.log("error data : ", err);

        res.json(body);
        res.end();
      });
  }
);
router.post('/reqSafeRanking',
  function(req, res, next){

      var param = req.body;

      console.log("smartlink param : ", req.body);

      request({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        uri: 'https://lora-web.sksmartlink.com:447/cust/reqSafeRanking',
        body: param,
        json: true,
        method: 'POST'
      }, function (err, resp, body) {
        console.log("return data : ", body);
        console.log("error data : ", err);

        res.json(body);
        res.end();
      });
  }
);
router.post('/reqImpact',
  function(req, res, next){

      var param = req.body;

      console.log("smartlink param : ", req.body);

      request({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        uri: 'https://lora-web.sksmartlink.com:447/cust/reqImpact',
        body: param,
        json: true,
        method: 'POST'
      }, function (err, resp, body) {
        console.log("return data : ", body);
        console.log("error data : ", err);

        res.json(body);
        res.end();
      });
  }
);
router.post('/SendSMS',
  function(req, res, next){

      var param = req.body;

      console.log("iparts param : ", req.body);

      var sms = "<s:Envelope xmlns:s='http://schemas.xmlsoap.org/soap/envelope/'>"
                +"<s:Body><ExtSMSMsgService xmlns='http://tempuri.org/'>"
                +"<system>"+req.body.system+"</system>"
                +"<telNo>"+req.body.telNo+"</telNo>"
                +"<callBack>"+req.body.callbackNo+"</callBack>"
                +"<smsSMS>"+req.body.msg+"</smsSMS>"
                +"</ExtSMSMsgService></s:Body></s:Envelope>";      

      request({
        headers: {
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://tempuri.org/IExtWSService/ExtSMSMsgService'
        },
        uri: 'https://iparts.sknetworks.co.kr/ExtWSService.svc',
        body: sms,
        method: 'POST'
      }, function (err, resp, body) {
        console.log("return data : ", body);
        console.log("error data : ", err);

        res.json(body);
        res.end();
      });

  }
);
module.exports = router;

