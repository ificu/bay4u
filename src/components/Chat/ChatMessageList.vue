<template>
  <div v-auto-bottom="msgs" class="Chating-chatingList" id="test">
    <transition-group name="list" >
      <div v-for="(msg,index) in msgs" v-bind:key="index" class="chatitem">
          <div v-if="msg.msgData.from.name === '나'">
            <div class="Chating-me">
                <div class="Chating-me-contents">
                    {{msg.msgData.msg}}
                </div>
            </div>
          </div>
          <div v-else>
            <div class="Chating-dealer">
            <div class="Chating-icon"> <img src="@/assets/user-icon.png"> </div>
            <div class="Chating-dealer-contents">
                {{msg.msgData.msg}}
            </div>
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

  },
  created : function() {
    console.log("Check msg : ", JSON.stringify(this.msgs));
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
  margin-bottom: 15px;
  display: inline-block;
  padding: 15px;
  font-size: 0.9rem;
  background-color: #fff;
  max-width: 90%;
}
.Chating-chatingList .Chating-me {
  text-align: right;
}
.Chating-chatingList .Chating-me-contents {
  border: 1px solid #bebebe;
  border-radius: 15px 0px 15px 15px;
  margin-bottom: 15px;
  display: inline-block;
  padding: 15px;
  font-size: 0.9rem;
  text-align: left;
  background-color: #fcf4df;
  font-weight: bold;
  max-width: 90%;
}
</style>