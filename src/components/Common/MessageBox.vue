<template lang="html">
  <transition name="msg-modal">
    <div class="msg-modal-mask">
      <div class="msg-modal-wrapper">
        <div class="msg-modal-container">
          <div class="msg-modal-header">
            <slot name="header">
              <!--  -->
            </slot>
          </div>

          <div class="msg-modal-body">
            <slot name="body">
              <!--  -->
            </slot>
          </div>

          <div class="msg-modal-footer">
            <slot name="footer">
              <!--  -->
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="css" scope>
.msg-modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}
.msg-modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.msg-modal-container {
    width: 280px;
    margin: 0px auto;
    /*padding: 20px 30px;*/
    background-color: #4E342E;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
}
/*PC인 경우*/
@media all and (min-width:800px) {
  .msg-modal-container {
    width: 300px;
    margin: 0px auto;
    background-color: #4E342E;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
  }
}
.msg-modal-header{
    padding: 5px 10px;
    border-radius: 5px 5px 0px 0px;
    background-color: #4E342E;
    display:flex;
}
.msg-modal-header :nth-child(1){
    display:flex;
    flex:1;
}
.msg-modal-header h5 {
    margin-top: 3px;
    margin-bottom: 3px;
    color: #fff;
}
.msg-modal-header .closeModalBtn {
    margin: 3px;
    color: #62acde;
}
.msg-modal-body {
    padding: 10px 15px;
    font-weight:bold;
    font-size: 0.9em;
    text-align: left;
    vertical-align: middle;
    background-color: #fff;
}
.msg-modal-body .msgBody{
   font-size: 0.65em;
}
.msg-modal-body .msgBigBody{
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 1em;
}
.msg-modal-footer {
    padding-top:5px;
    padding-right:5px;
    padding-bottom: 5px;
    display:flex;
    flex-direction: row-reverse;
    background-color: #4E342E;
    border-radius: 0px 0px 5px 5px;
}
.msg-modal-footer .v-btn {
    margin-left: 5px;
}
.msg-modal-default-button {
  float: right;
  padding-bottom: 5px;
}

.msg-modal-enter {
  opacity: 0;
}
.msg-modal-leave-active {
  opacity: 0;
}
.msg-modal-enter .msg-modal-container,
.msg-modal-leave-active .msg-modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>