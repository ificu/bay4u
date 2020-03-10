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
},app);
var io = require('socket.io')(server,{
  pingTimeout: 1000,
});

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// localhost:3000서버에 접속하면 클라이언트로 메세지을 전송한다
app.get('/', function(req, res) {
  res.sendFile('Hellow Chating App Server');
});

io.on('connection', function(socket){
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
      chatDttm: now.toLocaleTimeString()
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

server.listen(8083); /* 운영 */
/* 
server.listen(8084); 개발 */