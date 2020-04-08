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
          <li v-for="(qtReq, index) in qtReqList" v-bind:key = "index" v-on:click="chatingToggle(qtReq)" v-bind:class = "qtReq.Kbn">
            <div class="Chat-DivNormal" v-if="qtReq.Kbn==='list-normal'">
              <img height='15' v-if="qtReq.CarBrand === 'AUDI'" style="align-self:center" src="@/assets/BRAND-AUDI.png">
              <img height='25' v-else-if="qtReq.CarBrand === 'BENZ'" style="align-self:center;" src="@/assets/BRAND-BENZ.png">
              <img height='30' v-else-if="qtReq.CarBrand === 'BMW'" style="align-self:center;" src="@/assets/BRAND-BMW.png">
              <img height='30' v-else-if="qtReq.CarBrand === 'CADILLAC'" style="align-self:center;" src="@/assets/BRAND-CADILLAC.png">
              <img height='10' v-else-if="qtReq.CarBrand === 'CHRYSLER'" style="align-self:center;" src="@/assets/BRAND-CHRYSLER.png">
              <img height='25' v-else-if="qtReq.CarBrand === 'CITROEN'" style="align-self:center;" src="@/assets/BRAND-CITROEN.png">
              <img height='18' v-else-if="qtReq.CarBrand === 'DODGE'" style="align-self:center;" src="@/assets/BRAND-DODGE.png">
              <img height='30' v-else-if="qtReq.CarBrand === 'FIAT'" style="align-self:center;" src="@/assets/BRAND-FIAT.png">
              <img height='17' v-else-if="qtReq.CarBrand === 'FORD'" style="align-self:center;width:36px;" src="@/assets/BRAND-FORD.png">
              <img height='25' v-else-if="qtReq.CarBrand === 'HONDA'" style="align-self:center;" src="@/assets/BRAND-HONDA.png">
              <img height='15' v-else-if="qtReq.CarBrand === 'JEEP'" style="align-self:center;" src="@/assets/BRAND-JEEP.png">
              <img height='17' v-else-if="qtReq.CarBrand === 'LANDROVER'" style="align-self:center;" src="@/assets/BRAND-LANDROVER.png">
              <img height='17' v-else-if="qtReq.CarBrand === 'JAGUAR'" style="align-self:center;" src="@/assets/BRAND-JAGUAR.png">
              <img height='25' v-else-if="qtReq.CarBrand === 'LEXUS'" style="align-self:center;" src="@/assets/BRAND-LEXUS.png">
              <img height='30' v-else-if="qtReq.CarBrand === 'LINCOLN'" style="align-self:center;" src="@/assets/BRAND-LINCOLN.png">
              <img height='18' v-else-if="qtReq.CarBrand === 'MINI'" style="align-self:center;" src="@/assets/BRAND-MINI.png">
              <img height='25' v-else-if="qtReq.CarBrand === 'PEUGEOT'" style="align-self:center;" src="@/assets/BRAND-PEUGEOT.png">
              <img height='30' v-else-if="qtReq.CarBrand === 'PORSCHE'" style="align-self:center;" src="@/assets/BRAND-PORSCHE.png">
              <img height='25' v-else-if="qtReq.CarBrand === 'TOYOTA'" style="align-self:center;" src="@/assets/BRAND-TOYOTA.png">
              <img height='25' v-else-if="qtReq.CarBrand === 'VOLVO'" style="align-self:center;" src="@/assets/BRAND-VOLVO.png">
              <img height='25' v-else-if="qtReq.CarBrand === 'VW'" style="align-self:center;" src="@/assets/BRAND-VW.png">
              <img height='25' v-else-if="qtReq.CarBrand === 'NISSAN'" style="align-self:center;" src="@/assets/BRAND-NISSAN.png">
              <img height='25' v-else-if="qtReq.CarBrand === 'MASERATI'" style="align-self:center;" src="@/assets/BRAND-MASERATI.png">
              <img height='15' v-else-if="qtReq.CarBrand === 'INFINITI'" style="align-self:center;" src="@/assets/BRAND-INFINITI.png">
              <img height='17' v-else-if="qtReq.CarBrand === 'GM'" style="align-self:center;" src="@/assets/BRAND-GM.png">
              <i v-else class="Dealer-type fas fa-wrench" style="color:#fbc02e;"></i>
              
              <div class="Chart-qtinfo">
                <span class="Chart-carInfo">{{(qtReq.CarNo === "*empty*")?"미상차량" : qtReq.CarNo }}</span> / 
                <span  class="Chart-date">{{setReqDt(qtReq.ReqDt)}}</span>
              </div>
              <div class="dealer-info">
                <div class="Dealer-name">{{qtReq.ResDealerNm}}</div>
                <div class="Dealer-agent" v-if="qtReq.NickName === undefined || qtReq.NickName ==='*empty*' ">{{qtReq.AgentName}}</div>
                <div class="Dealer-agent" v-else>{{qtReq.NickName}}</div>
              </div>
              <div class="Chat-readCount"><b-badge v-if="qtReq.NotReadCnt !== 0" variant="warning" pill class="Chat-readbadge">{{qtReq.NotReadCnt}}</b-badge></div>
              <span type="button" class="Chat-detail">
                <i class="fas fa-angle-double-right"></i>
              </span>
              <div class="Chat-reqseq">{{GetUpdateTime(qtReq)}}</div>
            </div>

            <div class="Chat-DivIndent" v-if="qtReq.Kbn==='list-indent'">
              <div class="Chart-qtinfo">
                <span class="Chart-carInfo2">┗</span>
              </div>
              <div class="dealer-DivIndent">
                <div class="Dealer-name">{{qtReq.ResDealerNm}}</div>
                <div class="Dealer-agent" v-if="qtReq.NickName === undefined || qtReq.NickName ==='*empty*' ">{{qtReq.AgentName}}</div>
                <div class="Dealer-agent" v-else>{{qtReq.NickName}}</div>
              </div>
              <div class="Chat-readCount"><b-badge v-if="qtReq.NotReadCnt !== 0" variant="warning" pill class="Chat-readbadge">{{qtReq.NotReadCnt}}</b-badge></div>
              <span type="button" class="Chat-detail">
                <i class="fas fa-angle-double-right"></i>
              </span>
              <div class="Chat-reqseq">{{GetUpdateTime(qtReq)}}</div>
            </div>
          </li>
        </ul>
      </div>
      <BackToTop></BackToTop>
    </div>
    <!--ChatPage-->
    <div class="Chating-headerBar" v-if="showChatPage">
      <span type="button" class="headerBar-Back" v-on:click="chatingToggle(null)">
        <i class="fas fa-angle-double-left"></i>
      </span>
      <p class="headerBar-title">{{chatDealerName}}</p>
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

<!--<script src="https://unpkg.com/axios/dist/axios.min.js"></script>-->
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
//import { mapMutations, mapState } from 'vuex';
import Constant from '@/Constant';
import MessageList from '@/components/Chat/ChatMessageList.vue';
import MessageForm from '@/components/Chat/ChatMessageForm.vue';
import {datePadding, convertStringToDynamo, dataURItoBlob, sleep} from '@/utils/common.js'
import QTCamera from '@/components/NewQT/QTCamera.vue'
import CheckLogin from '@/components/Common/CheckLogin.vue'
import BackToTop from '@/components/Common/BackToTop.vue'

const axios = require('axios').default;

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
      chatDealerName : '',
      selectedQtData: [],
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
    this.showQTReqList();

    if(this.$route.params.chatid !== undefined) {

      // msgDatas 초기화
      this.$store.commit('InitMsgData');

      this.showMainPage = false;
      this.showChatPage = true;

      this.docId = this.$route.params.chatid;
      this.dealer =  this.$route.params.qtInfo.ResDealer;  

      // 초기 메시지 입력
      //console.log ('route : ', this.$route.params);
      if(this.$route.params.chatDealerNm !== undefined){
        this.chatDealerName = this.$route.params.chatDealerNm;
      }
  
      if(this.$route.params.chatType !== undefined && (this.$route.params.chatType === 'order' || this.$route.params.chatType === 'qt')){
        var item = {};
        item.ID =  this.docId;
        if(this.$route.params.chatTo !== undefined){
          this.dealer = this.$route.params.chatTo;  
        }
        this.selectedQtData = this.$route.params.qtInfo;
        this.showchating(item);
      }
      else{
        var now = new Date();
        var id = this.UserInfo.BsnID + now.getFullYear()%100 + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

        var msg = "";
        if(this.$route.params.carNo === null || this.$route.params.carNo.length === 0){
          msg = "미상차량에 대한 견적이 요청됐습니다.";
        }
        else{
          msg = this.$route.params.carNo + " 차량에 대한 견적이 요청됐습니다.";
        }

        var chatTime = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                  + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

        //console.log('route : ' , this.$route.params.qtInfo);
        var chatMsg = {};
        //chatMsg.from = {'name' : '나'};
        chatMsg.from = {'name' : this.UserInfo.BsnID};
        chatMsg.to = {'name' : this.dealer};
        chatMsg.Chatid = id;
        chatMsg.DocID = this.docId;
        chatMsg.msg  = msg;
        chatMsg.reqTm = chatTime;

        var adminYn = localStorage.getItem('AdminYn');
        var adminName = localStorage.getItem('AdminName');
        if(adminYn === "Y"){
          chatMsg.SaveName = adminName;
        }
        else{
          chatMsg.SaveName = this.UserInfo.Name;
        }
        
        chatMsg.SaveID = this.UserInfo.UserID;
        this.msgDatas = chatMsg;

        this.selectedQtData = this.$route.params.qtInfo;
        this.saveChatMsg(chatMsg,'Q', this.$route.params.qtInfo);
/*
        this.$sendMessage({
          name: this.UserInfo.BsnID,
          msg,
          recv:  this.dealer,
          chatId: this.docId,
          reqTm : chatTime,
          qtInfo : this.$route.params.qtInfo,
        });
*/
        if(this.$route.params.append !== undefined) {
          this.showAppend = true;
        }
      }
    }

    //const $ths = this;
    this.$socket.on('chat', (data) => {
      console.log('Chat Recv : ', data);
      if(this.docId === data.docId) {
        var chatMsg = {};
        chatMsg.from = {'name' : data.from.name};
        chatMsg.to = {'name' : data.to.name};
        chatMsg.msg  = data.msg;
        chatMsg.Chatid =  data.chatId;
        chatMsg.DocID =  this.docId;
        chatMsg.reqTm = data.reqTm;
        chatMsg.ChatType = data.chatType;
        chatMsg.RefID = data.refID;
        chatMsg.SaveName = data.sendName;
        chatMsg.SaveID = data.sendId;

        if(data.imgId !== undefined) {       

          sleep(5000);

          chatMsg.img = Constant.IMG_URL + data.imgId;
          chatMsg.imgId = data.imgId;    

          let index = this.msgDatas.findIndex(element => element.msgData.reqTm === chatMsg.reqTm);
          if(index === -1){
            this.msgDatas = chatMsg;
          }          
        }
        else {
          //console.log('msg : ' , this.msgDatas[0].msgData.DocID);
          //console.log('msg2 : ' , chatMsg.DocID);
          let index = this.msgDatas.findIndex(element => element.msgData.reqTm === chatMsg.reqTm && element.msgData.DocID === chatMsg.DocID);
          //let index = this.msgDatas.findIndex(element => element.msgData.reqTm === chatMsg.reqTm);
          if(index === -1){
            this.msgDatas = chatMsg;
          }
        }
        console.log('this.showChatPage:',this.showChatPage);
        if(this.showChatPage === true){
          // 읽음상태 저장
          this.saveChatState(data);
        }
        else{
          let index = this.qtReqList.findIndex(x => x.ID === data.docId);
          if(index > -1){
            this.qtReqList[index].NotReadCnt = this.qtReqList[index].NotReadCnt + 1;
          }
        }
      }
      else{
        let index = this.qtReqList.findIndex(x => x.ID === data.docId);
        if(index > -1){
          this.qtReqList[index].NotReadCnt = this.qtReqList[index].NotReadCnt + 1;
        }
      }
    });

    if(this.UserInfo.BsnID === '')
      this.UserInfo.BsnID = this.$cookies.get('BsnID');

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
      
      var id = this.UserInfo.BsnID + now.getFullYear()%100 + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
          + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

      var chatMsg = {};
      chatMsg.from = {'name' : this.UserInfo.BsnID};
      chatMsg.to = {'name' : this.dealer};
      chatMsg.Chatid = id;
      chatMsg.DocID =  this.docId;
      chatMsg.msg  = msg;
      chatMsg.reqTm  = chatTime;

      var adminYn = localStorage.getItem('AdminYn');
      var adminName = localStorage.getItem('AdminName');
      if(adminYn === "Y"){
        chatMsg.SaveName = adminName;
      }
      else{
        chatMsg.SaveName = this.UserInfo.Name;
      }
      chatMsg.SaveID = this.UserInfo.UserID;
      this.msgDatas = chatMsg;
      
      /*this.$sendMessage({
        //name: this.$route.params.username,
        name: this.UserInfo.BsnID,
        msg,
        recv: this.dealer,
        chatId: this.docId,
        chatDttm : chatTime,
      });*/
      this.saveChatMsg(chatMsg,'D', this.selectedQtData);
    },
    chatingToggle(item) {

      this.showMainPage = !this.showMainPage;
      this.showChatPage = !this.showChatPage;
      if(item !== null) 
      {
        item.NotChatIDList = [];
        item.NotReadCnt = 0;
        this.docId = item.ID;
        this.dealer = item.ResDealer;
        this.chatDealerName = item.ResDealerNm;
        this.selectedQtData = item;
        this.showchating(item);
      }
      else{
        this.selectedQtData = [];
        this.showQTReqList();
      }
    },
    saveChatMsg(chatMsg, chatType, qtData , imgId) {
      console.log('dealer:',this.dealer);
      var param = {};

      var now = new Date();
      var id = '';

      if(chatMsg.Chatid !== undefined && chatMsg.Chatid.length > 0){
        id = chatMsg.Chatid;
      }
      else{
        id = this.UserInfo.BsnID + now.getFullYear()%100 + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
          + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);
      }

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
      //param.payload.Item.Status = "0";
      param.payload.Item.ReadYn = "0";
      param.payload.Item.ReqTm = chatMsg.reqTm;
      param.payload.Item.IMG = chatMsg.imgId;
      param.payload.Item.ChatType = chatType;
      param.payload.Item.RefID = ' ';
      var adminYn = localStorage.getItem('AdminYn');
      var adminName = localStorage.getItem('AdminName');
      if(adminYn === "Y"){
        param.payload.Item.SaveName = adminName;
      }
      else{
        param.payload.Item.SaveName = this.UserInfo.Name;
      }
      param.payload.Item.SaveID = this.UserInfo.UserID;

      console.log("Send Msg2 : ", JSON.stringify(param));

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        console.log("======= Chat Save result ========");
        console.log(result.data);
        var sendNm = this.UserInfo.Name
        if(adminYn === "Y"){
          sendNm = adminName;
        }

        if(chatType !== "I"){
          this.$sendMessage({
            name: this.UserInfo.BsnID,
            msg: chatMsg.msg,
            recv:  this.dealer,
            chatId: id, 
            docId: this.docId,
            reqTm : chatMsg.reqTm,
            qtInfo : qtData,
            sendId: this.UserInfo.UserID,
            sendName: sendNm,
            sendFlag: "CARCENTER"
          });
        }
        else{
          this.$sendMessage({
            name: this.UserInfo.BsnID,
            msg: chatMsg.msg,
            recv:  this.dealer,
            chatId: id, 
            docId: this.docId,
            reqTm : chatMsg.reqTm,
            qtInfo : qtData,
            imgId: imgId,
            sendId: this.UserInfo.UserID,
            sendName: sendNm,
            sendFlag: "CARCENTER"
          });
        }

        this.UpdateChatTime(this.docId, chatMsg.reqTm);
  
      })
      .catch((error) => {
        console.log(error);
      });
    },
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

      console.log("======= Chat Msg List request ========");
      console.log(param);

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
          chatMsg.Chatid = element['ID'];
          chatMsg.DocID = this.docId;
          chatMsg.msg  = element['Message'];
          chatMsg.reqTm = element['ReqTm'];
          chatMsg.imgId = element['IMG']; 
          chatMsg.img = ''; 
          chatMsg.ChatType = element['ChatType'];
          chatMsg.RefID = element['RefID'];
          chatMsg.SaveName = element['SaveName'];
          chatMsg.SaveID = element['SaveID'];
          this.msgDatas = chatMsg;   
          
          // 읽음상태 저장
          if(element['ReadYn'] === '0' && element['ChatTo'] === this.UserInfo.BsnID ){  
            param = {};
            param.operation = "update";
            param.tableName = "BAY4U_CHAT";
            param.payload = {};
            param.payload.Key = {};
            param.payload.Key.ID = element['ID'];
            param.payload.Key.DocID = this.docId;
            param.payload.UpdateExpression = "Set ReadYn = :a";
            param.payload.ConditionExpression = "ChatTo = :p",
            param.payload.ExpressionAttributeValues = {
            ":a" : "1",
            ":p" : this.UserInfo.BsnID,
            };

            console.log("======= chat read update Request ========");
            console.log(JSON.stringify(param));

            axios({
              method: 'POST',
              url: Constant.LAMBDA_URL,
              headers: Constant.JSON_HEADER,
              data: param
            })
            .then((result) => {
              console.log("======= chat read update  result ========");
              console.log(result.data);
            })
            .catch((error) => {
              console.log(error);
            });
          }
        });
        this.setImg(this.msgDatas);
      });
    },
    SetUserColor(data){
      var sendList = [];
      for(var x of data){
        if(x.ChatFrom !== this.UserInfo.BsnID){
          let saveID = x.SaveID;
          let index = sendList.indexOf(saveID);
          if(index === -1){
            sendList.push(saveID);
          }
        }
      }
      
      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_USER";
      param.payload = {};
      param.payload.ExpressionAttributeValues = {};

      var filter = "";
      var idx = 1;
      for(var y of sendList){
        if(idx === 1){
          filter = filter + "ID = :id"+idx;
        }
        else{
          filter = filter + " OR ID = :id"+idx;
        }
        param.payload.ExpressionAttributeValues[":id"+idx] = y;   
        idx++;
      }
      param.payload.FilterExpression = filter;
      //console.log('param : ' , param);
     
      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        var userList = result.data.Items;
        for(var x of data){
          let idx = userList.findIndex(y => y.NAME === x.SaveName);
          if(idx > -1){
            x.COLOR = userList[idx].COLOR;
          }
        }

        data.forEach(element => { 
          var chatMsg = {};
          chatMsg.from = {'name' : element['ChatFrom']};
          chatMsg.to = {'name' : element['ChatTo']};
          chatMsg.Chatid = element['ID'];
          chatMsg.DocID = this.docId;
          chatMsg.msg  = element['Message'];
          chatMsg.reqTm = element['ReqTm'];
          chatMsg.imgId = element['IMG']; 
          chatMsg.img = ''; 
          chatMsg.ChatType = element['ChatType'];
          chatMsg.RefID = element['RefID'];
          chatMsg.SaveName = element['SaveName'];
          chatMsg.SaveID = element['SaveID'];
          chatMsg.Color = element['COLOR'];
          this.msgDatas = chatMsg;   
          
          // 읽음상태 저장
          if(element['ReadYn'] === '0'){  
            param = {};
            param.operation = "update";
            param.tableName = "BAY4U_CHAT";
            param.payload = {};
            param.payload.Key = {};
            param.payload.Key.ID = element['ID'];
            param.payload.Key.DocID = this.docId;
            param.payload.UpdateExpression = "Set ReadYn = :a";
            param.payload.ConditionExpression = "ChatTo = :p",
            param.payload.ExpressionAttributeValues = {
            ":a" : "1",
            ":p" : this.UserInfo.BsnID,
            };

            console.log("======= chat read update Request ========");
            console.log(JSON.stringify(param));

            axios({
              method: 'POST',
              url: Constant.LAMBDA_URL,
              headers: Constant.JSON_HEADER,
              data: param
            })
            .then((result) => {
              console.log("======= chat read update  result ========");
              console.log(result.data);
            })
            .catch((error) => {
              console.log(error);
            });
          }
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
    saveChatState(item)
    {
      let param = {};
      param.operation = "update";
      param.tableName = "BAY4U_CHAT";
      param.payload = {};
      param.payload.Key = {};
      param.payload.Key.ID = item.chatId;
      param.payload.Key.DocID = item.docId;
      param.payload.UpdateExpression = "Set ReadYn = :a";
      param.payload.ConditionExpression = "ChatTo = :p",
      param.payload.ExpressionAttributeValues = {
      ":a" : "1",
      ":p" : this.UserInfo.BsnID,
      };

      console.log("======= chat read update Request ========");
      console.log(JSON.stringify(param));

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        console.log("======= chat read update  result ========");
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
    },
    showQTReqList() {

      if(this.UserInfo.BsnID === '')
      this.UserInfo.BsnID = this.$cookies.get('BsnID');

      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_QT_LIST";
      param.payload = {};
      param.payload.FilterExpression = "ReqSite = :id";
      param.payload.ExpressionAttributeValues = {};
      var key = ":id";
      param.payload.ExpressionAttributeValues[key] = this.UserInfo.BsnID;

      //console.log("chating list pram : " + JSON.stringify(param));

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        
        if(Array.isArray(result.data.Items)){
          result.data.Items.sort(function(a, b){
            return (a.ReqSeq < b.ReqSeq) ? 1 : -1;
          });
        }
        
        var agentLsit = [];
        for(var i = 0; i<result.data.Items.length; i++) {      
          //if(i > 0 && (result.data.Items[i].ReqSeq === result.data.Items[i-1].ReqSeq)) {
          if(i > 0 && (result.data.Items[i].CarNo === result.data.Items[i-1].CarNo && result.data.Items[i].ReqDt === result.data.Items[i-1].ReqDt)) {
            result.data.Items[i].Kbn = "list-indent";
          }
          else {
            result.data.Items[i].Kbn = "list-normal";
          }
          result.data.Items[i].NotReadCnt = 0;
          if(result.data.Items[i].ResUserID !== undefined){
            var agentIdx = agentLsit.indexOf(result.data.Items[i].ResUserID);
            if(agentIdx === -1){
              agentLsit.push(result.data.Items[i].ResUserID);
            }
          }
        }

        //console.log("======= QT List result ========");
        //console.log(result.data.Items);        

        this.qtReqList = result.data.Items;

        var maxSeq = this.qtReqList[0].ReqSeq;
        var minSeq = this.qtReqList[this.qtReqList.length -1].ReqSeq;
        //console.log('max min :' , maxSeq + '/' + minSeq );
        
        this.getChatReadState(minSeq, maxSeq);
        this.getDealerNm();

        param.operation = "list";
        param.tableName = "BAY4U_USER";
        param.payload = {};
        param.payload.ExpressionAttributeValues = {};

        var filter = "";
        var idx = 1;
        for(var y of agentLsit){
          if(idx === 1){
            filter = filter + "ID = :id"+idx;
          }
          else{
            filter = filter + " OR ID = :id"+idx;
          }
          param.payload.ExpressionAttributeValues[":id"+idx] = y;   
          idx++;
        }
        param.payload.FilterExpression = filter;
      
        axios({
          method: 'POST',
          url: Constant.LAMBDA_URL,
          headers: Constant.JSON_HEADER,
          data: param
        })
        .then((result) => {
          var userList = result.data.Items;
          for(var x of this.qtReqList){
            let idx = userList.findIndex(y => y.ID === x.ResUserID);
            if(idx > -1){
              x.NickName = userList[idx].NickName;
            }
          }
          this.$forceUpdate();
        });
      });
    },
    getChatReadState(minDate , maxDate)
    {
      let param = {};
      param.operation = "list";
      param.tableName = "BAY4U_CHAT";
      param.payload = {};
      param.payload.ExpressionAttributeValues = {};
      param.payload.FilterExpression = "ReqTm between :startDt and :endDt";
      var key = ":startDt";
      var key2 = ":endDt";
      param.payload.ExpressionAttributeValues[key] = minDate;
      param.payload.ExpressionAttributeValues[key2] = maxDate;

      //console.log("======= chat state request result ========");
      //console.log(param);

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        //console.log("=======  chat state result ========");
        //console.log(result.data);

        let chatList = result.data.Items;
        for(let qt of this.qtReqList)
        {
          let newChatState = chatList.filter(x => x.DocID === qt.ID && x.ChatTo === this.UserInfo.BsnID && x.ReadYn === '0' );
          //console.log('newChatState:',newChatState);
          qt.NotChatIDList = newChatState;
          qt.NotReadCnt = newChatState.length;
        }
        //console.log('Read Count:', this.qtReqList);
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

      //console.log("Carcenter_Dealer pram : " + JSON.stringify(param));

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        //console.log("======= Carcenter_Dealer result ========");
        //console.log(result.data.Items);
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
      
      var id = this.UserInfo.BsnID + now.getFullYear()%100 + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
          + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

      var chatTime = now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

      var msg = '사진첨부';
      var chatMsg = {};
      chatMsg.from = {'name' : this.UserInfo.BsnID};
      chatMsg.to = {'name' : this.dealer};
      chatMsg.Chatid = id;
      chatMsg.DocID =  this.docId;
      chatMsg.msg = msg;
      chatMsg.img = pic;
      chatMsg.imgId = key + ".png";
      chatMsg.reqTm  = chatTime;

      var adminYn = localStorage.getItem('AdminYn');
      var adminName = localStorage.getItem('AdminName');
      if(adminYn === "Y"){
        chatMsg.SaveName = adminName;
      }
      else{
        chatMsg.SaveName = this.UserInfo.Name;
      }
      
      chatMsg.SaveID = this.UserInfo.ID;
      this.msgDatas = chatMsg;
      /*this.$sendMessage({
        name: this.UserInfo.BsnID,
        msg,
        recv: this.dealer,
        chatId: this.docId,
        imgId: key + ".png"
      });*/
      this.saveChatMsg(chatMsg, 'I',undefined,key + ".png");      

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
    },
    UpdateChatTime(docID, chatDtaeTime)
    {
      var param = {};
      param.operation = "update";
      param.tableName = "BAY4U_QT_LIST";
      param.payload = {};
      param.payload.Key = {};
      param.payload.Key.ID = docID;
      param.payload.UpdateExpression = "Set ReqSeq = :b ";
      param.payload.ExpressionAttributeValues = {
        ":b" : chatDtaeTime
      };

      //console.log("======= Chat time Update Request ========");
      //console.log(JSON.stringify(param));

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        //console.log("======= Chat time Update Request ========");
        //console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
    },
    GetUpdateTime(value){
      var now = new Date();
      var today = now.getFullYear() + "-" + datePadding(now.getMonth()+1,2) + "-" + datePadding(now.getDate(),2);

      var beforeDate = new Date();
      beforeDate.setDate(beforeDate.getDate() - 1);
      var yesterDay = beforeDate.getFullYear() + "-" + datePadding(beforeDate.getMonth()+1,2) + "-" + datePadding(beforeDate.getDate(),2);

      if(value.ReqDt === today){
        // 당일이면 시간 리턴
        var vStr = value.ReqSeq.substr(8,2) < 12 ? '오전 ' : '오후 ';
        var vHour = value.ReqSeq.substr(8,2);
        if (vHour !== 12) {
          vHour = vHour%12;
        } 
        var vMinute = value.ReqSeq.substr(10,2);
        return vStr + vHour + ":" + vMinute; 
      }
      else if(yesterDay === value.ReqDt){
        // 어제
        return '어제';
      }
      else{
        return value.ReqDt;
      }
    }
  },
  mounted() {
    datePadding();
    convertStringToDynamo();
    sleep();
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
  padding-bottom: 80px;
  position: relative;
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

.Chat-list .list-indent {
  margin-left: 80px;
  margin-top: -7px;
  border-style: dashed;
}

.Chat-DivNormal {
  display:contents;
}
.Dealer-type {
  align-self: center;
  font-size: 1.5rem;
}
.dealer-info{
  padding-left: 15px;
  margin-top: 15px;
}
.Dealer-name {
  line-height: 10px;
  font-weight: bold;
}
.Dealer-agent{
  line-height: 20px;
  text-align: center;
  font-size: 0.8em;
  margin-top: 0px;
}
.Chat-DivIndent {
  display:contents;
}
.dealer-DivIndent{
  margin-top: 5px;
}
.dealer-DivIndent .Dealer-name{
  line-height: 20px;
}
.Chat-DivIndent .Dealer-agent{
  line-height: 15px;
}
.Chart-qtinfo {
  padding-left: 10px;
}

.Chart-qtinfo .Chart-carInfo {
  font-weight: bold;
  font-size: 1.3em;
}
.Chart-qtinfo .Chart-carInfo2 {
  font-weight: bold;
  font-size: 1.7em;
  margin-left: -60px;
}

.Chart-qtinfo .Chart-date {
 font-size: 0.8em;
}

.Chat-detail {
  align-self: center;
  margin-left: auto;
  float: right;
  color: #5d4038;
  -webkit-appearance:none;
  -moz-appearance:none;
}
.Chat-readCount{
  position:absolute;
  right:0;
  margin-top: 14px;
}
.Chat-reqseq{
  position:absolute;
  font-size: 0.5em;
  color: #263238;
  margin-right: 6px;
  margin-top: 2px;
  right:0;
  line-height: 10px;
}
.Chat-readbadge{
  position:absolute;
  top:5px;
  right:25px;
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
