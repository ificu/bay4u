<template>
  <div class="Chat">
    <!--MainPage-->
    <div class="Chat-contents" v-if="showMainPage">
      <div class="Chat-title">
        채팅 목록
      </div>
      <div class="Chat-list">
        <ul>
          <li>
            <i class="Dealer-type fas fa-wrench" style="color:#fbc02e;"></i>
            <p class="Dealer-name">부품드림</p>
            <span type="button" class="Chat-detail" v-on:click="chatingToggle">
              <i class="fas fa-angle-double-right"></i>
            </span>
          </li>
          <li>
            <i class="Dealer-type fas fa-wrench" style="color:#967d5f;"></i>
            <p class="Dealer-name">제로무역</p>
            <span type="button" class="Chat-detail" v-on:click="chatingToggle">
              <i class="fas fa-angle-double-right"></i>
            </span>
          </li>
          <li>
            <i class="Dealer-type fas fa-wrench" style="color:#967d5f;"></i>
            <p class="Dealer-name">파트파츠</p>
            <span type="button" class="Chat-detail" v-on:click="chatingToggle">
              <i class="fas fa-angle-double-right"></i>
            </span>
          </li>
          <li>
            <i class="Dealer-type fas fa-wrench" style="color:#ccc;"></i>
            <p class="Dealer-name">오토비</p>
            <span type="button" class="Chat-detail" v-on:click="chatingToggle">
              <i class="fas fa-angle-double-right"></i>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <!--ChatPage-->
    <div class="Chating-headerBar" v-if="showChatPage">
      <span type="button" class="headerBar-Back" v-on:click="chatingToggle">
        <i class="fas fa-angle-double-left"></i>
      </span>
      <p class="headerBar-title">채팅</p>
    </div>
    <div class="Chating-page" v-if="showChatPage">
      <Message-List :msgs="msgDatas" class="msg-list"></Message-List>
    </div>
    <div v-if="showChatPage">
      <Message-From v-on:submitMessage="sendMessage" class="msg-form" ></Message-From>
    </div>
    <!--Footer-->
    <div class="Chat-footer">
      <router-link to="/NewQT">
        <span>
          <i class="far fa-clipboard"></i>
        </span>
      </router-link >
      <router-link to="/Chat">
        <span class="footer-selected">
          <i class="fas fa-comment-dots"></i>
        </span>
      </router-link >
      <router-link to="/QTList">
        <span>
          <i class="far fa-copy"></i>
        </span>
      </router-link >
      <router-link to="/UserInfo">
        <span>
          <i class="far fa-address-card"></i>
        </span>
      </router-link >
    </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import MessageList from '@/components/Chat/ChatMessageList.vue';
import MessageForm from '@/components/Chat/ChatMessageForm.vue';
import Constant from '@/Constant';

export default {
  name: 'Chat',
  data () {
    return {
      datas: [],
      showMainPage : true,
      showChatPage : false,
      showAppend : false
    }
  },
  components: {
    'Message-List': MessageList,
    'Message-From': MessageForm,
  },
  computed: {
    ...mapState({
      'msgDatas': state => state.socket.msgDatas,
    }),
  },
  created : function() {
    console.log('param : ' + this.$route.params.test);
    if(this.$route.params.chatid !== undefined) {
      this.showMainPage = false;
      this.showChatPage = true;

      if(this.$route.params.append !== undefined) {
        this.showAppend = true;
      }
    }

    const $ths = this;
    this.$socket.on('chat', (data) => {
      this.pushMsgData(data);
      $ths.datas.push(data);
    });
  },
  methods: {
    ...mapMutations({
      'pushMsgData': Constant.PUSH_MSG_DATA,
    }),
    sendMessage(msg) {
      this.pushMsgData({
        from: {
          name: '나',
        },
        msg,
      });
      this.$sendMessage({
        //name: this.$route.params.username,
        name: "s009",
        msg,
      });
    },
    chatingToggle() {
      this.showMainPage = !this.showMainPage;
      this.showChatPage = !this.showChatPage;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.Chat-title {
  margin:auto;
  width: 90%;
  padding-top: 25px;
  margin-bottom: 10px;
  font-size: 1.5rem;
  font-weight: bold;
}

.Chat-list {
  margin:auto;
  width: 90%;
  height: 60px;
}

.Chat-list ul {
  list-style-type: none;
  padding: 0px;
}

.Chat-list li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  border-width: thin;
  border-style: solid;
  border-radius: 5px;
  border-color: #bebebe;
  background-color: #fcf4df;
}

.Dealer-type {
  align-self: center;
  font-size: 1.5rem;
}
.Dealer-name {
  padding-left: 10px;
  font-weight: bold;
}
.Chat-detail {
  align-self: center;
  margin-left: auto;
  color: #5d4038;
  -webkit-appearance:none;
  -moz-appearance:none;
}

.Chating-headerBar {
  display: flex;
  height: 50px;
  width: 100%;
  background-color: #696565;
  position: fixed;
  box-shadow: 0 2px 3px rgba(0, 0, 0, .33);
}
.Chating-headerBar .headerBar-Back {
  flex: 10%;
  align-self: center;
  margin-left: 10px;
  color: white;
  -webkit-appearance:none;
  -moz-appearance:none;
}
.Chating-headerBar .headerBar-title {
  flex: 90%;
  text-align: center;
  align-self: center;
  font-weight: bold;
  font-size: 1.3rem;
  margin: auto;
  color: #acd3ce;
}
.Chating-page {
  background-color: #ddd;
  min-height: calc(100vh - 50px - 70px + 10px);
}

.Chat-footer {
  z-index: 100;
  position: fixed;
  display:flex;
  bottom: 0;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  height: 70px;
  border-top: 1px solid #bebebe;
  background: #eeeeee;
}

.Chat-footer a {
  flex:25%;
  text-align: center;
  color: #848180;
  margin-top: 5px;
}

.Chat-footer a span i {
  font-size: 2.5rem;
}

.footer-selected {
  color : #5d4038;
}

</style>
