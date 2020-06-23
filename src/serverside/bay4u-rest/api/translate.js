var express  = require('express');
var router   = express.Router();
var request = require('request');

const {Translate} = require('@google-cloud/translate').v2;
const translate = new Translate();

router.post('/',
  function(req, res, next){

      console.log("translate param : ", req.body);

      translate.translate(req.body.text, "ko")
      .then((result) => {
        console.log('result : ', result);
        res.json(result);
        res.end();        
      });      
  }
);

module.exports = router;

