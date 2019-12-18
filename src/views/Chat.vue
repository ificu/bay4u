<template>
  <div class="Chat">
    <!--MainPage-->
    <div class="Chat-contents" v-if="showMainPage">
      <div class="Chat-title">
        <span>채팅 목록</span>
        <CheckLogin></CheckLogin>
      </div>
      <div class="Chat-list">
        <ul>
          <li v-for="(qtReq, index) in qtReqList" v-bind:key = "index" v-on:click="chatingToggle(qtReq)">
            <i class="Dealer-type fas fa-wrench" style="color:#fbc02e;"></i>
            <div class="Chart-qtinfo">
              <span class="Chart-carInfo">{{(qtReq.CarNo === "*empty*")?"미상차량" : qtReq.CarNo }}</span> / 
              <span  class="Chart-date">{{setReqDt(qtReq.ReqDt)}}</span></div>
            <span class="Dealer-name">{{SetDealerNm(qtReq.ResDealer)}}</span>
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
      <BackToTop></BackToTop>
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
import Constant from '@/Constant';
import MessageList from '@/components/Chat/ChatMessageList.vue';
import MessageForm from '@/components/Chat/ChatMessageForm.vue';
import {datePadding, convertStringToDynamo, dataURItoBlob} from '@/utils/common.js'
import QTCamera from '@/components/NewQT/QTCamera.vue'
import CheckLogin from '@/components/Common/CheckLogin.vue'
import BackToTop from '@/components/Common/BackToTop.vue'

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
      dealer:"",
      showQTCamera: false,
    }
  },
  components: {
    'Message-List': MessageList,
    'Message-From': MessageForm,
    'QTCamera': QTCamera,
    CheckLogin:CheckLogin,
    BackToTop:BackToTop
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

      var now = new Date();
      var chatTime = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

      this.dealer = this.$route.params.qtInfo.ResDealer;
      console.log('route : ' , this.$route.params.qtInfo);
      var chatMsg = {};
      //chatMsg.from = {'name' : '나'};
      chatMsg.from = {'name' : this.UserInfo.BsnID};
      chatMsg.to = {'name' : this.dealer};
      chatMsg.msg  = msg;
      chatMsg.reqTm = chatTime;
      this.msgDatas = chatMsg;

      this.docId = this.$route.params.chatid;
  
      this.saveChatMsg(chatMsg);

      this.$sendMessage({
        name: this.UserInfo.BsnID,
        msg,
        recv:  this.dealer,
        chatId: this.docId,
        reqTm : chatTime,
        qtInfo : this.$route.params.qtInfo,
      });

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
        chatMsg.reqTm = data.reqTm;
        if(data.imgId !== undefined) {       

          chatMsg.img = Constant.IMG_URL + data.imgId;
          chatMsg.imgId = data.imgId;    

          this.msgDatas = chatMsg;
          
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
      var now = new Date();
      var chatTime = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

      var chatMsg = {};
      chatMsg.from = {'name' : this.UserInfo.BsnID};
      chatMsg.to = {'name' : this.dealer};
      chatMsg.Chatid = this.docId;
      chatMsg.msg  = msg;
      chatMsg.reqTm  = chatTime;
      this.msgDatas = chatMsg;
      this.$sendMessage({
        //name: this.$route.params.username,
        name: this.UserInfo.BsnID,
        msg,
        recv: this.dealer,
        chatId: this.docId,
        chatDttm : chatTime,
      });
      this.saveChatMsg(chatMsg);
    },
    chatingToggle(item) {

      this.showMainPage = !this.showMainPage;
      this.showChatPage = !this.showChatPage;
      if(item !== null) 
      {
        this.docId = item.ID;
        this.dealer = item.ResDealer;
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
      param.payload.Item.ChatTo =  this.dealer;
      param.payload.Item.Message = chatMsg.msg;
      param.payload.Item.Status = "0";
      param.payload.Item.ReqTm = chatMsg.reqTm;
      param.payload.Item.IMG = chatMsg.imgId;

      console.log("Send Msg : ", JSON.stringify(param));

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
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
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
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
          chatMsg.reqTm = element['ReqTm'];
          chatMsg.imgId = element['IMG']; 
          chatMsg.img = ''; 

          this.msgDatas = chatMsg;    
        });
        
        this.setImg(this.msgDatas);

      });

    },
    setImg(data)
    {
        data.forEach(element => { 
          if(element.msgData.imgId !== undefined) {
            element.msgData.img = Constant.IMG_URL + element.msgData.imgId;
          }
          
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
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
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

        this.getDealerNm();

      });
    },
    getDealerNm()
    {
      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_CARCENTER_DEALER";
      param.payload = {};
      param.payload.FilterExpression = "CARCENTER = :id";
      param.payload.ExpressionAttributeValues = {};
      var key = ":id";
   
      param.payload.ExpressionAttributeValues[key] =  this.UserInfo.BsnID;

      console.log("Carcenter_Dealer pram : " + JSON.stringify(param));

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        console.log("======= Carcenter_Dealer result ========");
        console.log(result.data.Items);
        this.resDealerNm = result.data.Items;
      });
    },
    SetDealerNm(val)
    {
      var dealerNm = this.resDealerNm.find(j => j.DEALER === val);

      if(dealerNm !== undefined)
      {
        return dealerNm.DEALER_NAME;
      }
    },
    cameraShow(flag) {
      this.showQTCamera = flag;
    },
    updatePic(pic) {

      var now = new Date();
      var key = this.UserInfo.BsnID + now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

      var param = {};
      param.name = key + ".png";
      param.type = "image/png";

      axios({
          method: 'POST',
          url: Constant.IMGUPLOAD_URL,
          headers: Constant.IMGUPLOAD_HEADER,
          data: param
      })
      .then((result) => {
        console.log("======= IMG Save result ========");
        console.log(result.data);

        param = dataURItoBlob(pic);

        axios({
            method: 'PUT',
            url: result.data.uploadURL,
            data: param
        })
        .then((result) => {
          console.log("======= IMG Upload result ========");
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        }); 

      })
      .catch((error) => {
        console.log(error);
      }); 
      
      var chatTime = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

      var msg = '사진첨부';
      var chatMsg = {};
      chatMsg.from = {'name' : this.UserInfo.BsnID};
      chatMsg.to = {'name' : this.dealer};
      chatMsg.Chatid = this.docId;
      chatMsg.msg = msg;
      chatMsg.img = pic;
      chatMsg.imgId = key + ".png";
      chatMsg.reqTm  = chatTime;
      this.msgDatas = chatMsg;
      this.$sendMessage({
        name: this.UserInfo.BsnID,
        msg,
        recv: this.dealer,
        chatId: this.docId,
        imgId: key + ".png"
      });
      this.saveChatMsg(chatMsg);      

    },  
    setReqDt(value)
    { 
      if(value !== undefined){
        var str = value.substring(2, 10);
        return str;
      }
      else{
        return "";
      }
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
  display:flex;
}
.Chat-title span{
  width: 100%;
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
  padding-left: 15px;
}
.Chart-qtinfo {
  padding-left: 10px;
}

.Chart-qtinfo .Chart-carInfo {
  font-weight: bold;
  font-size: 1.4em;
}

.Chart-qtinfo .Chart-date {
 font-size: 0.8em;
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
