import Vue from 'vue';
import io from 'socket.io-client';

const socket = io('http://169.56.92.40:8083');
//const socket = io('https://bay4u.co.kr/chatif');


const SocketPlugin = {
  install(vue) {
    vue.mixin({
    });

    vue.prototype.$sendMessage = ($payload) => {
      socket.emit('chat', {
        msg: $payload.msg,
        name: $payload.name,
      });
    };

    // 인스턴스 메소드 추가
    vue.prototype.$socket = socket;
  },
};

Vue.use(SocketPlugin);