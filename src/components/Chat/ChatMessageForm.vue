<template>
    <div class="Chating-inputArea">
        <input 
            v-model = "msg"
            @keyup.13="submitMessageFunc"
            type="text" class="inputArea-inputBox" />
        <span type="button" class="inputArea-send">
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
    };
  },
  methods: {
    submitMessageFunc() {
      if (this.msg.length === 0) return false;
      this.$emit('submitMessage', this.msg);
      this.msg = '';
      return true;
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
  width: auto;
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
  /*flex: 85%;*/
  border: none;
  padding: 3px;
  width: 87%;
}
.Chating-inputArea input[type=text]:focus {
  outline: none;
}
.Chating-inputArea .inputArea-send {
  flex: 15%;
  align-self: center;
  text-align: center;
  color: #ff9999;
  font-size: 2rem;
  -webkit-appearance:none;
  -moz-appearance:none;
}


</style>