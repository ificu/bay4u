import Vue from 'vue';
import io from 'socket.io-client';
import Constant from '@/Constant';

//const socket = io('http://169.56.92.40:8083');
//const socket = io('https://bay4u.co.kr/chatif');
//const socket = io('https://bay4u.co.kr:8083');
const socket = io(Constant.CHAT_URL);

const SocketPlugin = {
    install(vue) {
        vue.mixin({});

        vue.prototype.$sendMessage = ($payload) => {
            socket.emit('chat', {
                msg: $payload.msg,
                name: $payload.name,
                recv: $payload.recv,
                chatId: $payload.chatId,
                docId: $payload.docId,
                imgId: $payload.imgId,
                reqTm: $payload.reqTm,
                qtInfo: $payload.qtInfo,
                chatType: $payload.chatType,
                refID: $payload.refId,
                sendId: $payload.sendId,
                sendName: $payload.sendName,
                sendFlag: $payload.sendFlag,
            });
        };

        vue.prototype.$sendCommand = ($payload) => {
            socket.emit('command', {
                command: $payload.command,
                userId: $payload.userId,
                bsnId: $payload.bsnId,
                title: $payload.title,
                message: $payload.message,
                chatId: $payload.chatId,
                docId: $payload.docId,
            });
        };

        vue.prototype.$sendJoin = ($payload) => {
            socket.emit('join', {
                userId: $payload.userId,
                bsnId: $payload.bsnId,
            });
        };

        vue.prototype.$sendDetach = ($payload) => {
            socket.emit('detach', {
                userId: $payload.userId,
                bsnId: $payload.bsnId,
            });
        };

        // 인스턴스 메소드 추가
        vue.prototype.$socket = socket;
    },
};

Vue.use(SocketPlugin);