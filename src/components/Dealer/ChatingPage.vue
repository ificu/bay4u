<template>
  <div class="ChatingPage">
  <b-card no-body>
    <b-tabs v-model="tabIndex" card>
      <b-tab title="No.1 카센타" :title-link-class="linkClass(0)" active>
        <b-card-text>
          <div>
            <Message-List :msgs="msgDatas" class="msg-list"></Message-List>
          </div>
          <div>
            <Message-From v-on:submitMessage="sendMessage" class="msg-form" ></Message-From>
          </div>
        </b-card-text>
      </b-tab>
      <b-tab title="동진 카센타" :title-link-class="linkClass(1)">
        <b-card-text>
            
        </b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
  </div>   
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import MessageList from '@/components/Chat/ChatMessageList.vue';
import MessageForm from '@/components/Chat/ChatMessageForm.vue';
import Constant from '@/Constant';

export default {
  name: 'ChatingPage',
  data () {
    return {
      tabIndex: 0,
      datas: []
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
        name: "부품지원센터",
        msg,
      });
    },    
    linkClass(idx) {
        if (this.tabIndex === idx) {
          return ['text-warning']
        } else {
          return ['text-secondary']
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*
#696565 : 더 짙은 브라운
#afabab : 짙은 부라운
#fcf4df : 베이지
#ff9999 : 옅은 붉은색
#acd3ce : 옅은 녹색
#967d5f : 옅은 브라운
*/
.ChatingPage {
  height: 100%;
}

.ChatingPage .card {
  height: 100%;
}


</style>
