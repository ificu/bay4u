<template>
  <div class="Chating-inputArea">
      <input 
          v-model = "msg"
          @keyup.13="submitMessageFunc"
          type="text" class="inputArea-inputBox" />
      <span type="button" class="inputArea-send">
          <i class="far fa-images" @click="showImageModal"></i>&nbsp;
          <i class="fab fa-telegram" @click="submitMessageFunc"></i>
      </span>
  </div>    
</template>

<script>

export default {
  name: 'MessageForm',
  data() {
    return {
      msg: '',
      showQTCamera: true,
    };
  },
  methods: {
    submitMessageFunc() {
      if (this.msg.length === 0) return false;
      this.$emit('submitMessage', this.msg);
      this.msg = '';
      return true;
    },
    showImageModal(){
      this.$emit('showImageModal', this.showQTCamera);
    },
   
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.Chating-inputArea {

  z-index: 90;
  /*position: fixed;*/
  display:flex;
  bottom: 70px;
  width: 100%;
  height: 40px;
  border-top: 1px solid #bebebe;
}
@media screen and (min-width: 769px) {
  .Chating-inputArea { 
  /* 데스크탑에서 사용될 스타일을 여기에 작성합니다. */
  position: absolute;
  left: 0.1rem;
  bottom: 0;
  width: 98%;
  height: 40px;
  bottom: 20px;
  padding: 2px 0;
  border-top: 1px solid #bebebe;
  }
}

.Chating-inputArea .inputArea-inputBox {
  border: none;
  padding: 3px;
  width: 75%;
}
.Chating-inputArea input[type=text]:focus {
  outline: none;
}
.Chating-inputArea .inputArea-send {
  position: fixed;
  right:0;
  align-self: center;
  text-align: right;
  padding-right: 4px;
  color: #ff9999;
  font-size: 2rem;
  -webkit-appearance:none;
  -moz-appearance:none;
}
@media screen and (min-width: 769px) {
  .Chating-inputArea .inputArea-send  { 
  /* 데스크탑에서 사용될 스타일을 여기에 작성합니다. */
  position: absolute;
  flex:25%;
  align-self: center;
  text-align: right;
  padding-right: 4px;
  color: #ff9999;
  font-size: 2rem;
  -webkit-appearance:none;
  -moz-appearance:none;
  }
}

</style>