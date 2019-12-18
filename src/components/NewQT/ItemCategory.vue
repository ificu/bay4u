<template lang="html">
  <transition name="itemCategory">
    <div class="modal-mask" @keyup.esc="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <!--  -->
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>

         <!-- <div class="modal-footer">
            <slot name="footer">
                
            </slot>
          </div>-->
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
  background-color: rgba(0, 0, 0, .3);
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
  padding: 10px 10px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  margin:  10px 0px;
  padding: 0;
}

.modal-header h3 {
  margin-top: 0;
  font-weight: bold;
  color: #5d4038;
}

.modal-body {
  margin: 0px 5px;
}

.modal-default-button {
  float: right;
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
