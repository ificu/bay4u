<template>
  <!--<div v-auto-bottom="msgs" class="Chating-chatingList" id="test">-->
  <div v-auto-bottom="msgs" :class="SetCahtpageStyle()" id="test">
    <transition-group name="list" >
      <div v-for="(msg,index) in msgs" v-bind:key="index" class="chatitem">
          <div v-if="msg.msgData.from.name === UserInfo.BsnID">
            <div class="Chating-me">
                <div class="Chating-me-contents" v-if="msg.msgData.imgId === undefined">
                    <span class="order-chat" v-if="msg.msgData.ChatType !== undefined && msg.msgData.ChatType ==='O'" @click="goChating(msg.msgData,'order')"> {{msg.msgData.msg}}</span>
                    <span class="order-end-chat" v-else-if="msg.msgData.ChatType !== undefined && msg.msgData.ChatType ==='E'"> {{msg.msgData.msg}}</span>
                    <!--<span v-else>{{msg.msgData.msg}}</span>-->
                    <span v-else v-html="msg.msgData.msg" ></span>
                </div>
                <div class="Chating-me-contents" v-if="msg.msgData.imgId !== undefined">
                    <v-img class="grey lighten-3"  v-bind:src="msg.msgData.img" max-width="200px" @click="$EventBus.$emit('click-showImage' , msg.msgData.img)"></v-img>
                </div>
                <div class="Chating-me-requestTime" v-if="msg.msgData.SaveName === undefined "> 
                  {{setRequestTime(msg.msgData.reqTm)}}
                </div>
                <div class="Chating-me-requestTime" v-else> 
                  {{setRequestTime(msg.msgData.reqTm)}} ({{msg.msgData.SaveName}})
                </div>
            </div>
          </div>
          <div v-else>
            <div class="Chating-dealer">
              <div class="Chating-icon"> <!--<img src="@/assets/user-icon.png">--> 
                <div v-if="msg.msgData.SaveName === undefined || msg.msgData.SaveName.length <= 0">
                  <img src="@/assets/user-icon.png">
                </div>
                <div v-else class="div-circle" :style="SetColor(msg.msgData)"><span>{{msg.msgData.SaveName.substring(0,3)}}</span></div>
              </div>
              <div class="Chating-dealer-contents" v-if="msg.msgData.imgId === undefined">
                  <span class="order-chat" v-if="msg.msgData.ChatType !== undefined && msg.msgData.ChatType ==='O'">{{msg.msgData.msg}}</span>
                  <span class="order-end-chat" v-else-if="msg.msgData.ChatType !== undefined && msg.msgData.ChatType ==='E'" @click="goChating(msg.msgData,'order')">{{msg.msgData.msg}}</span>
                  <span v-else-if="msg.msgData.ChatType !== undefined && msg.msgData.ChatType ==='R'" @click="goChating(msg.msgData,'qt')" v-html="msg.msgData.msg"></span>
                  <span v-else v-html="msg.msgData.msg" ></span>
              </div>
              <div class="Chating-dealer-contents" v-if="msg.msgData.imgId !== undefined">
                  <v-img class="grey lighten-3"  v-bind:src="msg.msgData.img" max-width="200px" @click="$EventBus.$emit('click-showImage' , msg.msgData.img)"></v-img>
              </div> 
            </div>
            <div class="Chating-dealer-requestTime"  v-if="msg.msgData.SaveName === undefined "> 
                {{setRequestTime(msg.msgData.reqTm)}}
            </div>
            <div class="Chating-me-requestTime" v-else> 
                {{setRequestTime(msg.msgData.reqTm)}} ({{msg.msgData.SaveName}})
            </div>
          </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import Constant from '@/Constant';
const axios = require('axios').default;

export default {
  name: 'MessageList',
  props: ['msgs'],
  data () {
    return {
     blankColor: 'background-color: #37474F',
     colorList: []
    }
  },
  updated() {
    //console.log("Update msg : ", JSON.stringify(this.msgs));
    this.SetUserColor(); 
  },
  created : function() {
    //console.log("Check msg : ", JSON.stringify(this.msgs));
    //console.log(this.$store.state.UserInfo.BsnID); 
  },
  computed: {
    UserInfo: {
        get() { return this.$store.getters.UserInfo },
        set(value) { this.$store.dispatch('UpdateUserInfo',value) }
    },
  },
  methods:
  {
    SetUserColor(){
      /*for(var x of this.msgs){
        if(x.msgData.from.name !== this.UserInfo.BsnID){
          let idx = this.colorList.findIndex(y => y.name === x.msgData.SaveName);
          if(idx === -1){
            let item = {};
            item.name = x.msgData.SaveName;
            item.color = '#' + Math.floor(Math.random()*16777215).toString(16);
            this.colorList.push(item);
          }
        }
      }*/

      var sendList = [];
      for(var x of this.msgs){
        if(x.msgData.from.name !== this.UserInfo.BsnID){
          let saveID = x.msgData.SaveID;
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
        for(var x of this.msgs){
          let idx = userList.findIndex(y => y.NAME === x.msgData.SaveName);
          if(idx > -1){
            x.msgData.Color = userList[idx].COLOR;
          }
        }
      });
    },
    SetColor(item){
      if(item.Color === undefined){
        let idx = this.msgs.findIndex(y => y.msgData.SaveID === item.SaveID && y.msgData.Color !== undefined);
        
        if(idx > -1){
          item.Color = this.msgs[idx].msgData.Color;
          return 'background-color:' + this.msgs[idx].msgData.Color;
        }
        else{   
          var param = {};
          param.operation = "list";
          param.tableName = "BAY4U_USER";
          param.payload = {};
          param.payload.ExpressionAttributeValues = {};
          param.payload.FilterExpression = "ID = :id";
          var key = ":id";
          param.payload.ExpressionAttributeValues[key] = item.SaveID;  

          axios({
            method: 'POST',
            url: Constant.LAMBDA_URL,
            headers: Constant.JSON_HEADER,
            data: param
          })
          .then((result) => {
            if(result.data.Items.length > 0){
              var pickColor = result.data.Items[0].COLOR;
              if(pickColor === undefined){
                return this.blankColor;
              }
              else{
                this.$forceUpdate();
                return 'background-color:' + pickColor;
              }
            }
            else{
              return this.blankColor;
            }
          });
          return this.blankColor;
        }
      }
      else{
        return 'background-color:' + item.Color;
      }
    },
    setRequestTime(value)
    { 
      if(value !== undefined){
        var month = value.substring(4, 6);
        var date = value.substring(6, 8);
        var hour = value.substring(8, 10);
        var minute = value.substring(10, 12);
        return month + '.' + date + ' '+ hour + ':' + minute;
      }
      else{
        return "";
      }
    },
    goChating(msg , chatType)
    { 
      if(msg.RefID === ' ') return;

      this.$router.push({name:'QTList', 
                      params:{
                            DocID: msg.DocID, 
                            RefID: msg.RefID,
                            Type:chatType
                      }});
    },
    SetCahtpageStyle(){
      var agent = navigator.userAgent.toLowerCase();
      if(agent.search("iphone") > -1){
        if(agent.indexOf('safari') !== -1 && agent.search('naver') === -1){
          return 'Chating-chatingList-iphone';
        }
        else{
          return 'Chating-chatingList';
        }
      }
      else{
        return 'Chating-chatingList';
      } 
    },
  }
};
</script>

<style>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  /*transform: translateX(-30px);*/
}

.Chating-chatingList {
  margin:auto;
  width: 90%;
  padding-top: 70px;
  height: calc(100vh - 50px - 70px + 10px);
  overflow:auto;
  overflow-x:hidden;
}

/*PC인 경우*/
@media all and (min-width:800px) {
  .Chating-chatingList {
    margin:auto;
    width: 90%;
    padding-top: 30px;
    height: calc(100vh - 50px - 70px + 10px);
    overflow:auto;
    overflow-x:hidden;
  }
}
.Chating-chatingList-iphone{
  margin:auto;
  width: 90%;
  padding-top: 70px;
  height: calc(100vh - 50px - 70px - 90px);
  overflow:auto;
  overflow-x:hidden;
  padding-bottom: 10px;
}
.chatitem{ 
z-index: 1;
}
 .Chating-dealer {
  display:flex;
}
.Chating-dealer .Chating-icon{
  font-size: 2.5rem;
  color: #5d4038;
  margin-top: -10px;
  margin-right: -20px;
  padding-right: 25px;
}
.Chating-dealer .Chating-icon img{
  width: 60%;
}
.Chating-dealer .Chating-dealer-contents {
  border: 1px solid #bebebe;
  border-radius: 0px 15px 15px 15px;
  margin-bottom: 0px;
  display: inline-block;
  padding: 5px 10px 5px 15px;
  font-size: 0.8rem;
  background-color: #fff;
  max-width: 90%;
}
.Chating-me {
  text-align: right;
}
.Chating-me-contents {
  border: 1px solid #bebebe;
  border-radius: 15px 0px 15px 15px;
  margin-bottom: 0px;
  display: inline-block;
  padding: 5px 10px 5px 15px;
  font-size: 0.8rem;
  text-align: left;
  background-color: #fcf4df;
  font-weight: bold;
  max-width: 90%;
}
.Chating-dealer-requestTime{
   font-size: 0.4em;
   margin-bottom: 10px;
   margin-left: 60px;
}
.Chating-me-requestTime{
  font-size: 0.5em;
  margin-bottom: 10px;
  margin-right: 10px;
}
.order-chat{
  color: #E50914;
}
.order-end-chat{
  color: #E65100;
}
.div-circle{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position:relative;
}
.div-circle span{
  font-size: 0.25em;
  color:#fff;
  position: absolute;
  top:11px;
  left:6px;
}
</style>