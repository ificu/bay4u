<template lang="html">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <!--  -->
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              <!--  -->
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="css" scoped>
.modal-mask {
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
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
	width: 300px;
	margin: 0px auto;
	/*padding: 20px 30px;*/
	background-color: #4E342E;
	border-radius: 5px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
	transition: all .3s ease;
}
.modal-header{
	/*padding: 5px 10px;*/
	height: 50px;
	border-radius: 5px 5px 0px 0px;
	background-color:#4E342E;
	display:flex;
  color: #fff;
  position: relative;
}
.modal-header :nth-child(1){
	display:flex;
	flex:1;
}
.modal-header h5 {
	color: #fff;
}
.modal-header :nth-child(2) {
  float: right;
  position:absolute;
	top:10px;
  right:10px;
}
.modal-body {
	font-weight:bold;
	font-size: 0.9em;
	text-align: left;
	vertical-align: middle;
	background-color:#fff;
}
.modal-body .msgBody{
   font-size: 0.65em;
}
.modal-body .msgBigBody{
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 1em;
}
.modal-default-button {
  float: right;
  padding-bottom: 5px;
}
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>