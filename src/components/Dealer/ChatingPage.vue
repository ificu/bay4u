<template>
  <div class="ChatingPage">
  <b-card no-body>
    <b-tabs v-model="tabIndex" card>
      <b-tab title="대화 목록" :title-link-class="linkClass(0)" active>
        <b-card-text>
          <div>
            <Message-List :msgs="msgDatas" class="msg-list"></Message-List>
          </div>
          <div>
            <Message-From v-on:submitMessage="sendMessage" class="msg-form" ></Message-From>
          </div>
        </b-card-text>
      </b-tab>
      <!--
      <b-tab title="동진 카센타" :title-link-class="linkClass(1)">
        <b-card-text>
            
        </b-card-text>
      </b-tab>-->
    </b-tabs>
  </b-card>
  </div>   
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
//import { mapMutations, mapState } from 'vuex';
//import Constant from '@/Constant';
import MessageList from '@/components/Chat/ChatMessageList.vue';
import MessageForm from '@/components/Chat/ChatMessageForm.vue';
import {datePadding, convertStringToDynamo} from '@/utils/common.js'

export default {
  name: 'ChatingPage',
  data () {
    return {
      tabIndex: 0,
      datas: [],
      chatItem:[],
      showChatArea:false
    }
  },
  components: {
    'Message-List': MessageList,
    'Message-From': MessageForm,
  },
  computed: {
    CarInfo: {
        get() { return this.$store.getters.CarInfo },
        set(value) { this.$store.dispatch('UpdateCarInfo',value) }
    },
    UserInfo: {
        get() { return this.$store.getters.UserInfo },
        set(value) { this.$store.dispatch('UpdateUserInfo',value) }
    },    
    msgDatas: {
        get() { return this.$store.getters.msgDatas },
        set(value) { this.$store.dispatch('UpdateMsgData',value) }
    },    
    /*
    ...mapState({
      'msgDatas': state => state.socket.msgDatas,
    }),*/
  },
  created : function() {
    if(this.$route.params.chatid !== undefined) {
      this.showMainPage = false;
      this.showChatPage = true;

      if(this.$route.params.append !== undefined) {
        this.showAppend = true;
      }
    }

    //const $ths = this;
    this.$socket.on('chat', (data) => {
      //this.pushMsgData(data);
      //$ths.datas.push(data);
      var chatMsg = {};
      chatMsg.from = {'name' : data.from.name};
      chatMsg.msg  = data.msg;
      this.msgDatas = chatMsg;
    });

    this.$EventBus.$on('click-chat', chatItem => {
        
        this.showchating(chatItem);
    });
  },  
  methods: {
    /*
    ...mapMutations({
      'pushMsgData': Constant.PUSH_MSG_DATA,
    }),*/
    sendMessage(msg) {
      /*
      this.pushMsgData({
        from: {
          name: '나',
        },
        msg,
      });*/
      var chatMsg = {};
      chatMsg.from = {'name' : '나'};
      chatMsg.msg  = msg;
      this.msgDatas = chatMsg;
      console.log("Type msg : ", JSON.stringify(chatMsg));
      this.$sendMessage({
        //name: this.$route.params.username,
        name: this.UserInfo.BsnID,
        msg,
      });
      this.saveChatMsg(chatMsg);
      console.log("Send Msgdatas : "  + JSON.stringify(this.msgDatas));

    },    
    linkClass(idx) {
      if (this.tabIndex === idx) {
        return ['text-warning']
      } else {
        return ['text-secondary']
      }
    },
    saveChatMsg(chatMsg) {
      var param = {};

      var now = new Date();
      var id = this.UserInfo.BsnID + now.getFullYear()%100 + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

      param.operation = "create";
      param.tableName = "BAY4U_CHAT";
      param.payload = {};
      param.payload.Item = {};
      param.payload.Item.ID = id;
      param.payload.Item.DocID = this.docId;
      param.payload.Item.ChatFrom = this.UserInfo.BsnID;
      param.payload.Item.ChatTo = "parts";
      param.payload.Item.Message = chatMsg.msg;
      param.payload.Item.Status = "0";

      console.log("Send Msg : ", JSON.stringify(param));

      axios({
          method: 'POST',
          url: 'https://2fb6f8ww5b.execute-api.ap-northeast-2.amazonaws.com/bay4u/backendService',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
      },
      data: param
      })
      .then((result) => {
        console.log("======= Chat Save result ========");
        console.log(result.data);
        })
      .catch((error) => {
        console.log(error);
      });
    },
    showchating(chatItem)
    {
      console.log("Chat Id : " +  chatItem.ID);

      if(this.msgDatas.length !== 0)
      {   
        this.$store.commit('InitMsgData');
      }

      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_CHAT";
      param.payload = {};
      param.payload.FilterExpression = "DocID = :id";
      param.payload.ExpressionAttributeValues = {};
      var key = ":id";
     
      param.payload.ExpressionAttributeValues[key] = chatItem.ID;

      axios({
        method: 'POST',
        url: 'https://2fb6f8ww5b.execute-api.ap-northeast-2.amazonaws.com/bay4u/backendService',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: param
      })
      .then((result) => {
        console.log("======= QT List result ========");
        console.log(result.data);

        result.data.Items.forEach(element => { 
          var chatMsg = {};
          chatMsg.from = {'name' : chatItem.reqSite};
          chatMsg.msg  =element['Message'];
          this.msgDatas = chatMsg;
        });

      });

    }
  },
  mounted() {
    datePadding();
    convertStringToDynamo();
  },
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
