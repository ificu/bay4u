<template>
  <div class="chatform">
  <b-card no-body>
    <!--<b-tabs v-model="tabIndex" card>
      <b-tab title="대화 목록" :title-link-class="linkClass(0)" active >-->
        <div  class="Chating-Title">{{chatItem.ReqName}} {{ chatItem.CarNo }} </div>
          <b-card-text>
            
            <div v-if="showChatArea">
              <div class="Chating-page">
                <Message-List :msgs="msgDatas" class="msg-list" v-auto-bottom></Message-List>
              </div>
              <div>
                <Message-From v-on:submitMessage="sendMessage" class="msg-form" ></Message-From>
              </div>
            </div>
            
          </b-card-text>
    <!--  </b-tab>      
      <b-tab title="동진 카센타" :title-link-class="linkClass(1)">
        <b-card-text>
            
        </b-card-text>
      </b-tab>
    </b-tabs>-->
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
      showChatArea:false,
      show:true,
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
      if(this.chatItem.ID === data.chatId) {
        var chatMsg = {};
        chatMsg.from = {'name' : data.from.name};
        chatMsg.to = {'name' : data.to.name};
        chatMsg.msg  = data.msg;
        chatMsg.Chatid = this.chatItem.ID;
        this.msgDatas = chatMsg;
      }
      else {
        var options = {
          body : data.msg
        };
        new Notification('채팅 메시지 (' + data.from.name + ')', options);
        this.$EventBus.$emit('update-chatMsg', data.chatId);  
      }
    });

    this.$EventBus.$on('click-qtInfo', chatItem => {  
        this.showchating(chatItem);
        this.chatItem = chatItem;     
    });

    this.$EventBus.$on('init-qtInfo', chatItem => {   
        this.chatItem = [];
        if(this.msgDatas.length !== 0)
        {   
          // msgDatas 초기화
          this.$store.commit('InitMsgData');
          this.showChatArea = false;
        }
    });

    this.$EventBus.$on('send-QTConfirm', qtMsg => {   
        this.msgDatas = qtMsg;
        this.saveChatMsg(qtMsg);
    });

    Notification.requestPermission(function(result) {
      if(result === 'granted') {
        console.log('Notification OK');
      }

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
      chatMsg.from = {'name' : this.UserInfo.BsnID};
      chatMsg.to = {'name' : this.chatItem.ReqSite};
      chatMsg.Chatid = this.chatItem.ID;
      chatMsg.msg  = msg;
      this.msgDatas = chatMsg;
      this.$sendMessage({
        //name: this.$route.params.username,
        name: this.UserInfo.BsnID,
        msg,
        recv: this.chatItem.ReqSite,
        chatId: this.chatItem.ID
      });
      this.saveChatMsg(chatMsg);
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

      var key = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

      param.operation = "create";
      param.tableName = "BAY4U_CHAT";
      param.payload = {};
      param.payload.Item = {};
      param.payload.Item.ID = id;
      param.payload.Item.DocID = this.chatItem.ID;  //docId
      param.payload.Item.ChatFrom = this.UserInfo.BsnID;
      param.payload.Item.ChatTo = this.chatItem.ReqSite;
      param.payload.Item.Message = chatMsg.msg;
      param.payload.Item.Status = "0";
      param.payload.Item.ReqTm = key;

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
    showchating(item)
    {
      console.log("Chat Id : " +  item.ID);

      if(this.msgDatas.length !== 0)
      {   
        // msgDatas 초기화
        this.$store.commit('InitMsgData');
        this.showChatArea = false;
      }

      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_CHAT";
      param.payload = {};
      param.payload.FilterExpression = "DocID = :id";
      param.payload.ExpressionAttributeValues = {};
      var key = ":id";
     
      param.payload.ExpressionAttributeValues[key] = item.ID;

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
        console.log("======= Chat Msg List result ========");
        console.log(result.data);

        if(Array.isArray(result.data.Items))
        {
          result.data.Items.sort(function(a, b){
            //return (a.ID.substring(a.ID.length,a.ID.length -12) > b.ID.substring(b.ID.length,b.ID.length -12)) ? 1 : -1;
            return (a.ReqTm> b.ReqTm) ? 1 : -1;
          });
        }

        result.data.Items.forEach(element => { 
          var chatMsg = {};
          chatMsg.from = {'name' : element['ChatFrom']};
          chatMsg.msg  =element['Message'];
          this.msgDatas = chatMsg;
        });

        this.showChatArea = true;

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
/*
.ChatingPage {
  height: 100%;
}

.ChatingPage .card {
  height: 100%;
}

.ChatingPage .card-text {
  height: 90%;
  background-color: beige;
}*/
.chatform{
  position: relative;
  width: 100%;
  height: 100%;
}
.chatform .card {
  height: 100%;
  width: 100%;
 /* background-color: blue;*/
}
.Chating-page {
    background-color: #ddd;
    position: absolute;
  /*min-height: calc(90vh - 50px - 80px);*/
    width: 100%;
    height: 92%;
}
.Chating-Title
{
  z-index: 1;
  background-color: rgb(52,58,62);
  height: 48px;
  color:white;
  font-weight: bold;
  padding: 10px 15px;
  border-top-left-radius: 5px 3px;
  border-top-right-radius: 5px 3px;
}
.msg-form {
  bottom: -5px;
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  border-bottom-left-radius: 5px 3px;
  border-bottom-right-radius: 5px 3px;
  border: 1px solid #ddd;
  background-color: white;
}
.msg-list {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 20px;
  margin-top: 0px;
  overflow-x: scroll-y;
  -ms-overflow-style: none;
  height: 95%; 
}
::-webkit-scrollbar {
display:none;
}
</style>
