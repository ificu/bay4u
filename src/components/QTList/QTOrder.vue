<template lang="html">
  <transition name="QTOrder">
    <div class="modal-mask" @keyup.esc="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h4>
            <slot name="header">
              <!--  -->
            </slot>
            </h4>
          </div>

          <div class="modal-body">
            <div class="body-subTitle">
              <h6>주문 요청 리스트</h6>
            </div>
            <div class="body-orderList">
              <slot name="orderlist">
              </slot>
            </div>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <!--  -->
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="css" scoped>
.body-orderList
{
  height: 300px;
  overflow:auto;
  overflow-x:hidden;
}
.body-orderList
{
  height: 300px;
  overflow:auto;
  overflow-x:hidden;
}

.body-subTitle {
  margin-top: 15px;
}

.body-subTitle input {
  margin-left: 20px;
}

.body-subTitle h6 {
  font-weight: bold;
}

.modal-body .custom-control {
  margin-left: 15px;
  font-size: 0.9rem;
}

.body-dealerTitle {
  width: 98%;
  margin: auto;
  background-color: #eee;
  border-style: solid;
  border-width: thin;
  border-color: #ddd;
  padding: 5px 10px;
  font-size: 0.9rem;
  font-weight: bold;
}
.body-dealerList {
  width: 98%;
  margin: auto;
  border-style: solid;
  border-width: thin;
  border-color: #ddd;
  padding: 5px 10px;
  font-size: 0.9rem;
  border-top-style: none;
}

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
  width: 320px;
  margin: 0px auto;
  background-color: transparent;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  background-color: #696565;
  border: none;
  color: #fcf4df;
  text-align: center;
  display: flex;
  height: 80px;
}

.modal-header h4 {
  margin-top: 0;
  font-weight: bold;
  flex: auto;
}

.modal-body {
  background-color: #fff;
}

.modal-default-button {
  float: right;
}

.modal-footer {
  background-color: #fff;
  font-size: 0.9rem;
  font-weight: bold;
  height: 55px;
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
