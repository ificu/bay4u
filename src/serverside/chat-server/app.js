var fs = require('fs');
var app = require('express')();
var https = require('https');
//var server = require('http').createServer(app);
var server = https.createServer({
    key: fs.readFileSync('./private.key'),
    cert: fs.readFileSync('./certificate.crt'),
    ca: fs.readFileSync('./ca_bundle.crt'),
    requestCert: false,
    rejectUnauthorized: false
}, app);
var io = require('socket.io')(server, {
    pingTimeout: 1000,
});
var bodyParser = require('body-parser');
var AWS = require('aws-sdk');

app.use(bodyParser.json());

AWS.config.update({
    region: "ap-northeast-2",
    accessKeyId: "AKIARDFNMCT73WGWYSGY",
    secretAccessKey: "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"
});

var docClient = new AWS.DynamoDB.DocumentClient();

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/', function(req, res) {
    res.sendFile('Hellow Chating App Server');
});

app.post('/QTConfirm', function(req, res) {

    var carNo = req.body.CarNo;
    var carVin = req.body.CarVin;
    var carSeries = req.body.CarSeries;
    var sendId = req.body.SendId;
    var sendName = req.body.SendName;
    var sendTo = req.body.SendTo;
    var docId = req.body.DocId;
    var chatFrom = "PARTS";
    var chatMsg = carNo + " 차량에 대한 견적이 완료 되었습니다.";
    var qtInfo = {};
    qtInfo.CarNo = req.body.CarNo;
    qtInfo.ResDealer = "PARTS";

    var now = new Date();
    var nowTime = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);
    var chatId =  sendTo + now.getFullYear()%100 + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);


    var params = {
        TableName : QT_TABLE,
        Key: {
            ID: docId
        },
        UpdateExpression: 'Set CarSeries = :s, QTSts = :c, CarVin = :d, AgentName = :e, ResUserID = :f',
        ExpressionAttributeValues: {
            ":s" : carSeries,
            ":c" : "견적회신",
            ":d" : carVin,
            ":e" : sendName,
            ":f" : sendId
      },
      ReturnValues: "UPDATED_NEW"
    };

    // 1. 우선 견적 상태 업데이트
    docClient.update(params, function(err, data) {
        if(err) {
            console.error(nowTime + " / QT_LIST update error : ", JSON.stringify(err, null, 2));
        } else {
            console.log(nowTime + " / QT_LIST update OK : ", chatId);
            // 2. 정상 리턴이면 채팅 메시지 저장
            params = {
                TableName : CHAT_TABLE,
                Item : {
                    ID : chatId,
                    DocID : docId,
                    ChatFrom : chatFrom,
                    ChatTo : sendTo,
                    Message : chatMsg,
                    ReadYn : '0',
                    ReqTm : nowTime,
                    ChatType : 'R',
                    SaveName : sendName,
                    SaveID : sendId
              }
            };

            docClient.put(params, function(err, data){
                nowTime = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                               + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);
                if(err) {
                    console.error(nowTime + " / CHAT insert error : ", JSON.stringify(err, null, 2));
                } else {
                    console.log(nowTime + " / CHAT insert OK : ", chatId);
                    // 3. 정상 리턴이면 채팅 메시지 날림.
                    var msg = {
                        from: {
                            name: chatFrom,
                        },
                        to: {
                            name: sendTo,
                        },
                        msg: chatMsg,
                        chatId: chatId,
                        docId: docId,
                        reqTm: nowTime,
                        qtInfo: qtInfo,
                        chatType: 'R',
                        sendId: sendId,
                        sendName: sendName,
                        sendFlag: 'DEALER'
                    };
                
                    io.sockets.emit('chat', msg);
                }
            });
        }
    });

    res.end();
});

io.on('connection', function(socket) {
    console.log('user connected: ' + socket.id);

    // 클라이언트로부터의 메시지가 수신되면
    socket.on('chat', function(data) {
        console.log('Message from %s: %s', data.name, JSON.stringify(data));
        var now = new Date();

        var msg = {
            from: {
                name: data.name,
            },
            to: {
                name: data.recv,
            },
            msg: data.msg,
            chatId: data.chatId,
            docId: data.docId,
            imgId: data.imgId,
            reqTm: data.reqTm,
            qtInfo: data.qtInfo,
            refID: data.refID,
            chatType: data.chatType,
            status: data.status,
            chatDttm: now.toLocaleTimeString(),
            sendId: data.sendId,
            sendName: data.sendName,
            sendFlag: data.sendFlag
        };

        // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
        socket.broadcast.emit('chat', msg);
    });

    // 클라이언트로부터의 커멘드 명령이 수신되면
    socket.on('command', function(data) {
        console.log('Command from %s: %s', data.userId, JSON.stringify(data));
        var now = new Date();

        var msg = {
          command: data.command,
          userId: data.userId,
          bsnId: data.bsnId,
          message: data.message,
          chatId: data.chatId
        };


        console.log('Command message %s', JSON.stringify(msg));

        // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
        socket.broadcast.emit('command', msg);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected: ' + socket.id);
    });


});

function datePadding(n, digits) {
    var zero = '';
    var i = 0;
    var chk = '' + n;
    chk = chk.toString();

    if (chk.length < digits) {
        for (i = 0; i < digits - chk.length; i++)
            zero += '0';
    }

    return zero + chk;
}

///////////////////////////////// 배포시 세팅 영역 ///////////////////////////////////////

/*
const QT_TABLE = "BAY4U_QT_LIST";
const CHAT_TABLE = "BAY4U_CHAT";
server.listen(8083);
  운영 */

const QT_TABLE = "TEST_BAY4U_QT_LIST";
const CHAT_TABLE = "TEST_BAY4U_CHAT";
server.listen(8084);
 /*  개발 */

