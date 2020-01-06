<template>
  <div v-auto-bottom="msgs" class="Chating-chatingList" id="test">
    <transition-group name="list" >
      <div v-for="(msg,index) in msgs" v-bind:key="index" class="chatitem">
          <div v-if="msg.msgData.from.name === UserInfo.BsnID">
            <div class="Chating-me">
                <div class="Chating-me-contents" v-if="msg.msgData.imgId === undefined">
                    <span class="order-chat" v-if="msg.msgData.ChatType !== undefined && msg.msgData.ChatType ==='O'" @click="goChating(msg.msgData,'order')"> {{msg.msgData.msg}}</span>
                    <span v-else>{{msg.msgData.msg}}</span>
                </div>
                <div class="Chating-me-contents" v-if="msg.msgData.imgId !== undefined">
                    <v-img class="grey lighten-3"  v-bind:src="msg.msgData.img" max-width="200px" @click="$EventBus.$emit('click-showImage' , msg.msgData.img)"></v-img>
                </div>
                <div class="Chating-me-requestTime"> 
                  {{setRequestTime(msg.msgData.reqTm)}}
                </div>
            </div>
          </div>
          <div v-else>
            <div class="Chating-dealer">
              <div class="Chating-icon"> <img src="@/assets/user-icon.png"> </div>
              <div class="Chating-dealer-contents" v-if="msg.msgData.imgId === undefined">
                  <span class="order-chat" v-if="msg.msgData.ChatType !== undefined && msg.msgData.ChatType ==='O'">{{msg.msgData.msg}}</span>
                  <span v-else-if="msg.msgData.ChatType !== undefined && msg.msgData.ChatType ==='R'" @click="goChating(msg.msgData,'qt')">{{msg.msgData.msg}}</span>
                  <span v-else>{{msg.msgData.msg}}</span>
              </div>
              <div class="Chating-dealer-contents" v-if="msg.msgData.imgId !== undefined">
                  <v-img class="grey lighten-3"  v-bind:src="msg.msgData.img" max-width="200px" @click="$EventBus.$emit('click-showImage' , msg.msgData.img)"></v-img>
              </div> 
            </div>
            <div class="Chating-dealer-requestTime"> 
                {{setRequestTime(msg.msgData.reqTm)}}
            </div>
          </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'MessageList',
  props: ['msgs'],
  updated() {
    //console.log("Update msg : ", JSON.stringify(this.msgs));
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
      this.$router.push({name:'QTList', 
                      params:{
                            DocID: msg.Chatid, 
                            RefID: msg.RefID,
                            Type:chatType
                      }});
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
.chatitem{ 
z-index: 1;
}
.Chating-chatingList .Chating-dealer {
  display: flex;
}
.Chating-chatingList .Chating-dealer .Chating-icon{
  font-size: 2.5rem;
  color: #5d4038;
  margin-top: -10px;
  margin-right: -20px;
}
.Chating-chatingList .Chating-dealer .Chating-icon img{
  width: 60%;
}
.Chating-chatingList .Chating-dealer .Chating-dealer-contents {
  border: 1px solid #bebebe;
  border-radius: 0px 15px 15px 15px;
  margin-bottom: 0px;
  display: inline-block;
  padding: 5px 10px 5px 15px;
  font-size: 0.8rem;
  background-color: #fff;
  max-width: 90%;
}
.Chating-chatingList .Chating-me {
  text-align: right;
}
.Chating-chatingList .Chating-me-contents {
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
.Chating-chatingList .Chating-dealer-requestTime{
   font-size: 0.4em;
   margin-bottom: 10px;
   margin-left: 60px;
}
.Chating-chatingList .Chating-me-requestTime{
  font-size: 0.5em;
  margin-bottom: 10px;
  margin-right: 10px;
}
.order-chat{
  color: #E50914;
}
</style>