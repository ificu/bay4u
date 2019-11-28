<template>
  <div class="Chat">
    <!--MainPage-->
    <div class="Chat-contents" v-if="showMainPage">
      <div class="Chat-title">
        채팅 목록
      </div>
      <div class="Chat-list">
        <ul>
          <li v-for="(qtReq, index) in qtReqList" v-bind:key = "index" v-on:click="chatingToggle(qtReq)">
            <i class="Dealer-type fas fa-wrench" style="color:#fbc02e;"></i>
            <p class="Dealer-name">{{(qtReq.CarNo === "*empty*")?"미상차량" : qtReq.CarNo }}</p><!--<p>{{getDealerNm(qtReq.ResDealer)}}</p>-->
            <span type="button" class="Chat-detail">
              <i class="fas fa-angle-double-right"></i>
            </span>
          </li>
          <!--
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
          -->
        </ul>
      </div>
    </div>
    <!--ChatPage-->
    <div class="Chating-headerBar" v-if="showChatPage">
      <span type="button" class="headerBar-Back" v-on:click="chatingToggle(null)">
        <i class="fas fa-angle-double-left"></i>
      </span>
      <p class="headerBar-title">채팅</p>
    </div>
    <div class="Chating-page" v-if="showChatPage">
      <Message-List :msgs="msgDatas" class="msg-list"></Message-List>
    </div>

    <!-- 카메라 표시 팝업 -->
    <transition>
        <QTCamera 
          v-if="showQTCamera" 
          v-on:closeQTCameraModal="cameraShow(false)"
          v-on:updatePic="updatePic"
          >
        </QTCamera>
    </transition>        
    <!--Footer-->
    <div class="Chat-footer">
      <div class="Chating-input" v-if="showChatPage">
        <Message-From 
          v-on:submitMessage="sendMessage" 
          v-on:showImageModal="cameraShow" 
          class="msg-form" >
        </Message-From>
      </div>      
      <div  class="Chating-footer">
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
  </div>
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
//import { mapMutations, mapState } from 'vuex';
//import Constant from '@/Constant';
import MessageList from '@/components/Chat/ChatMessageList.vue';
import MessageForm from '@/components/Chat/ChatMessageForm.vue';
import {datePadding, convertStringToDynamo} from '@/utils/common.js'
import QTCamera from '@/components/NewQT/QTCamera.vue'

export default {
  name: 'Chat',
  data () {
    return {
      datas: [],
      showMainPage : true,
      showChatPage : false,
      showAppend : false,
      qtReqList: [],
      resDealers: [],
      resDealerNm: [],
      docId : "",
      showQTCamera: false,
    }
  },
  components: {
    'Message-List': MessageList,
    'Message-From': MessageForm,
    'QTCamera': QTCamera,
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

      // msgDatas 초기화
      this.$store.commit('InitMsgData');

      this.showMainPage = false;
      this.showChatPage = true;

      // 초기 메시지 입력
      var msg = "";
      if(this.$route.params.carNo === null || this.$route.params.carNo.length === 0){
        msg = "미상차량에 대한 견적이 요청됐습니다.";
      }
      else{
        msg = this.$route.params.carNo + " 차량에 대한 견적이 요청됐습니다.";
      }
      
      var chatMsg = {};
      //chatMsg.from = {'name' : '나'};
      chatMsg.from = {'name' : this.UserInfo.BsnID};
      chatMsg.to = {'name' : "parts"};
      chatMsg.msg  = msg;
      this.msgDatas = chatMsg;

      this.docId = this.$route.params.chatid;
      
      this.$sendMessage({
        name: this.UserInfo.BsnID,
        msg,
        recv: "parts",
        chatId: this.docId
      });

      this.saveChatMsg(chatMsg);

      if(this.$route.params.append !== undefined) {
        this.showAppend = true;

      }
    }

    //const $ths = this;
    this.$socket.on('chat', (data) => {
      console.log('Chat Recv : ', data);
      if(this.docId === data.chatId) {
        var chatMsg = {};
        chatMsg.from = {'name' : data.from.name};
        chatMsg.to = {'name' : data.to.name};
        chatMsg.msg  = data.msg;
        chatMsg.Chatid = this.docId;
        if(data.imgId !== undefined) {       
          var param = {};
          param.operation = "list";
          param.tableName = "BAY4U_IMG";
          param.payload = {};
          param.payload.FilterExpression = "ID = :id";
          param.payload.ExpressionAttributeValues = {};
          var key = ":id";

          param.payload.ExpressionAttributeValues[key] = data.imgId;

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
            console.log("======= Image Data result ========");
            console.log(result.data);

            chatMsg.img = result.data.Items[0].IMG;
            chatMsg.imgId = data.imgId;    

            this.msgDatas = chatMsg;
          })
          .catch((error) => {
            console.log(error);
            this.msgDatas = chatMsg;
          });  
        }
        else {
          this.msgDatas = chatMsg;
        }
      }
    });

    if(this.UserInfo.BsnID === '')
      this.UserInfo.BsnID = this.$cookies.get('BsnID');

    this.showQTReqList();

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
      chatMsg.to = {'name' : "parts"};
      chatMsg.Chatid = this.docId;
      chatMsg.msg  = msg;
      this.msgDatas = chatMsg;
      this.$sendMessage({
        //name: this.$route.params.username,
        name: this.UserInfo.BsnID,
        msg,
        recv: "parts",
        chatId: this.docId
      });
      this.saveChatMsg(chatMsg);
    },
    chatingToggle(item) {

      this.showMainPage = !this.showMainPage;
      this.showChatPage = !this.showChatPage;
      if(item !== null) 
      {
        this.docId = item.ID;
        this.showchating(item);
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
      param.payload.Item.DocID = this.docId;
      param.payload.Item.ChatFrom = this.UserInfo.BsnID;
      param.payload.Item.ChatTo = "parts";
      param.payload.Item.Message = chatMsg.msg;
      param.payload.Item.Status = "0";
      param.payload.Item.ReqTm = key;
      param.payload.Item.IMG = chatMsg.imgId;

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
    }
    ,
    showchating(item)
    {
      console.log("Chat Id : " +  item.ID);
      //if(this.msgDatas.length !== 0)
      //{   
        // msgDatas 초기화
        this.$store.commit('InitMsgData');
      //}

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
            return (a.ReqTm > b.ReqTm) ? 1 : -1;
          });
        }

        result.data.Items.forEach(element => { 
          var chatMsg = {};
          chatMsg.from = {'name' : element['ChatFrom']};
          chatMsg.to = {'name' : element['ChatTo']};
          chatMsg.Chatid = this.docId;
          chatMsg.msg  = element['Message'];
          if(element['IMG'] !== undefined) {
            param = {};
            param.operation = "list";
            param.tableName = "BAY4U_IMG";
            param.payload = {};
            param.payload.FilterExpression = "ID = :id";
            param.payload.ExpressionAttributeValues = {};
            var key = ":id";

            param.payload.ExpressionAttributeValues[key] = element['IMG'];

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
              console.log("======= Image Data result ========");
              console.log(result.data);

              chatMsg.img = result.data.Items[0].IMG;
              chatMsg.imgId = element['IMG'];    

              this.msgDatas = chatMsg;
            })
            .catch((error) => {
              console.log(error);
              this.msgDatas = chatMsg;
            });  
          }
          else {
            this.msgDatas = chatMsg;
          }       
        });

      });

    },
    showQTReqList() {
      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_QT_LIST";
      param.payload = {};
      param.payload.FilterExpression = "ReqSite = :id";
      param.payload.ExpressionAttributeValues = {};
      var key = ":id";
      param.payload.ExpressionAttributeValues[key] = this.UserInfo.BsnID;

       console.log("chating list pram : " + JSON.stringify(param));

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
        console.log(result.data.Items);

        if(Array.isArray(result.data.Items))
        {
       
          result.data.Items.sort(function(a, b){
            return (a.ReqSeq < b.ReqSeq) ? 1 : -1;
          });
        }

        this.qtReqList = result.data.Items;

        /*
        result.data.Items.forEach(element => { 
         if(this.resDealers.indexOf(element['ResDealer']) === -1)
         {
            this.resDealers.push(element['ResDealer']);
         }
        });
        */

      });
    },
    getDealerNm(value)
    {
      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_USER";
      param.payload = {};
      param.payload.FilterExpression = "ID = :id";
      param.payload.ExpressionAttributeValues = {};
      var key = ":id";
   
      param.payload.ExpressionAttributeValues[key] = value;

      console.log("user list pram : " + JSON.stringify(param));

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
        console.log("======= User List result ========");
        console.log(result.data.Items);
        this.resDealerNm = result.data.Items;
      });
    },
    setDealerNm(val)
    {
       return "";
      /*return this.resDealerNm.filter(j => j.CODE == val).CODE;*/
      /*
      this.resDealerNm.forEach(element => { 
        if(element['CODE'] === val)
        {
              
        }
      });
      console.log(val + "/" + index);

      if(index === -1)
      {
          return "부품지원센터";
      }
      else{
         return this.resDealerNm[index].NAME;
      }
      */
    },
    cameraShow(flag) {
      this.showQTCamera = flag;
    },
    updatePic(pic) {

      var now = new Date();
      var key = this.UserInfo.BsnID + now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

      var param = {};

      param.operation = "create";
      param.tableName = "BAY4U_IMG";
      param.payload = {};
      param.payload.Item = {};
      param.payload.Item.ID = key;
      param.payload.Item.IMG = pic;

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
        console.log("======= IMG Save result ========");
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });    
      
      var msg = '사진첨부';
      var chatMsg = {};
      chatMsg.from = {'name' : this.UserInfo.BsnID};
      chatMsg.to = {'name' : "parts"};
      chatMsg.Chatid = this.docId;
      chatMsg.msg = msg;
      chatMsg.img = pic;
      chatMsg.imgId = key;
      this.msgDatas = chatMsg;
      this.$sendMessage({
        name: this.UserInfo.BsnID,
        msg,
        recv: "parts",
        chatId: this.docId,
        imgId: key
      });
      this.saveChatMsg(chatMsg);      

    },  
    getImgData(imgId) {

      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_IMG";
      param.payload = {};
      param.payload.FilterExpression = "ID = :id";
      param.payload.ExpressionAttributeValues = {};
      var key = ":id";

      param.payload.ExpressionAttributeValues[key] = imgId;

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
        console.log("======= Image Data result ========");
        console.log(result.data);

        return result.data.Items[0].IMG;
      });        
      return "";
    }
  },
  mounted() {
    datePadding();
    convertStringToDynamo();
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
  z-index: 100;
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
.Chating-input {
  z-index: 100;
  position: fixed;
  bottom: 70px;
  display:flex;
  width: 100%;
  background: white;
}
.Chating-footer {
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

.Chating-footer a {
  flex:25%;
  text-align: center;
  color: #848180;
  margin-top: 5px;
}

.Chating-footer a span i {
  font-size: 2.5rem;
}

.footer-selected {
  color : #5d4038;
}

</style>
