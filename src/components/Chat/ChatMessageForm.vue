<template>
    <div class="Chating-inputArea">
        <input 
            v-model = "msg"
            @keyup.13="submitMessageFunc"
            type="text" class="inputArea-inputBox"/>
        <span type="button" class="inputArea-send">
            <i class="fab fa-telegram"></i>
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
  position: fixed;
  display:flex;
  bottom: 70px;
  width: auto;
  height: 40px;
  border-top: 1px solid #bebebe;
}
.Chating-inputArea .inputArea-inputBox {
  flex: 85%;
  border: none;
  padding: 5px;
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