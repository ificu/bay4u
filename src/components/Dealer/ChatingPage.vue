<template>
  <v-app>
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
                    <Message-From 
                      v-on:submitMessage="sendMessage" 
                      v-on:showImageModal="imageSelect" 
                      class="msg-form" >
                    </Message-From>
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
    <v-dialog v-model="showImageSelectFlag" width="500px">
      <v-card>
        <v-card-title class="headline" >이미지 선택</v-card-title>
        <v-img id="fileImageView"></v-img>
        <v-file-input
            label="이미지 파일 선택"
            accept="image/*"
            filled
            prepend-icon="mdi-image"
            class="pr-6 pl-6"
            v-model="selectFiles"
            v-on:change="selectedFileChage"
          ></v-file-input>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="#FF5252"
            outlined
            @click="selectedFileSend"
          >
            입력
          </v-btn>
          <v-btn
            color="#00BFA5"
            outlined
            @click="showImageSelectFlag = false"
          >
            닫기
          </v-btn>          
        </v-card-actions>
      </v-card>
    </v-dialog>      
  </v-app>
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
      showImageSelectFlag:false,
      selectFiles: [],
      itemImage: ''
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
        console.log("Chat Data Recv : ", data);

        var chatMsg = {};
        chatMsg.from = {'name' : data.from.name};
        chatMsg.to = {'name' : data.to.name};
        chatMsg.msg  = data.msg;
        chatMsg.Chatid = this.chatItem.ID;

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

    if(this.UserInfo.BsnID === '')
      this.UserInfo.BsnID = this.$cookies.get('BsnID');
    if(this.UserInfo.Name === '')
      this.UserInfo.Name = this.$cookies.get('UserNM');

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
      //if(this.msgDatas.length !== 0)
      //{   
        // msgDatas 초기화
        this.$store.commit('InitMsgData');
      //}

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

      var checkMsg = false;

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
        if(checkMsg === false) {
          console.log("======= Chat Msg List result ========");
          console.log(result.data);
          checkMsg = true;

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

          this.showChatArea = true;
        }

      });
    },
    imageSelect() {
      this.showImageSelectFlag = true;
      var fileImage = document.querySelector('#fileImageView');
      fileImage.src = '';
      this.selectFiles = '';
      this.itemImage = '';      
    },
    selectedFileChage() {
      console.log('selected File Change : ', this.selectFiles);
      //itemImage

      var bsnId = this.UserInfo.BsnID;
      var reqSite = this.chatItem.ReqSite;
      var chatId = this.chatItem.ID;

      var itemImage = this.itemImage;

      var fileImage = document.querySelector('#fileImageView');

      var reader = new FileReader();
      reader.onload = function(e) {
        console.log('Image Data : ', e.target.result);
        fileImage.src = e.target.result;
      }
      reader.readAsDataURL(this.selectFiles);      
    },
    selectedFileSend() {
      this.showImageSelectFlag = false;
      var fileImage = document.querySelector('#fileImageView');

      var now = new Date();
      var key = this.UserInfo.BsnID + now.getFullYear() + datePadding(now.getMonth()+1,2) + datePadding(now.getDate(),2) 
                + datePadding(now.getHours(),2) + datePadding(now.getMinutes(), 2) + datePadding(now.getSeconds(),2);

      var param = {};

      param.operation = "create";
      param.tableName = "BAY4U_IMG";
      param.payload = {};
      param.payload.Item = {};
      param.payload.Item.ID = key;
      param.payload.Item.IMG = fileImage.src;

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
      chatMsg.to = {'name' : this.chatItem.ReqSite};
      chatMsg.Chatid = this.chatItem.ID;
      chatMsg.msg = msg;
      chatMsg.img = fileImage.src;
      chatMsg.imgId = key;
      this.msgDatas = chatMsg;
      this.$sendMessage({
        name: this.UserInfo.BsnID,
        msg,
        recv: this.chatItem.ReqSite,
        chatId: this.chatItem.ID,
        imgId: key
      });
      this.saveChatMsg(chatMsg);     

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
.v-application{
  width: 100%;
  height: 100%;
}
.chatform{
  width: 100%;
  height: 100%;
}
.chatform .card {
  position: relative;
  height: 87%;
  width: 100%;
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
