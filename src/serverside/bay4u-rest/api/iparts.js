var express  = require('express');
var router   = express.Router();
var request = require('request');

router.post('/GetROList',
  function(req, res, next){

      var param = req.body;
      //param.QAFlag = "QA";

      console.log("iparts param : ", req.body);

      request({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        uri: 'http://iparts.sknetworks.co.kr/BAY4UService.svc/GetROList',
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
router.post('/SaveQTData',
  function(req, res, next){

      var param = req.body;
      //param.QAFlag = "QA";

      console.log("iparts param : ", req.body);

      request({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        uri: 'http://iparts.sknetworks.co.kr/BAY4UService.svc/SaveQTData',
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
router.post('/GetQTData',
  function(req, res, next){

      var param = req.body;
      //param.QAFlag = "QA";

      console.log("iparts param : ", req.body);

      request({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        uri: 'http://iparts.sknetworks.co.kr/BAY4UService.svc/GetQTData',
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
router.post('/GetConfirmQTData',
  function(req, res, next){

      var param = req.body;
      //param.QAFlag = "QA";

      console.log("iparts param : ", req.body);

      request({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        uri: 'http://iparts.sknetworks.co.kr/BAY4UService.svc/GetConfirmQTData',
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
router.post('/GetROItemList',
  function(req, res, next){

      var param = req.body;
      //param.QAFlag = "QA";

      console.log("iparts param : ", req.body);

      request({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        uri: 'http://iparts.sknetworks.co.kr/BAY4UService.svc/GetROItemList',
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
router.post('/GetCarNoVinNo',
  function(req, res, next){

      var param = req.body;
      //param.QAFlag = "QA";

      console.log("iparts param : ", req.body);

      request({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        uri: 'http://iparts.sknetworks.co.kr/BAY4UService.svc/GetCarNoVinNo',
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

