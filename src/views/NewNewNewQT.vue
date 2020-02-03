<template>
  <div class="NewQT">
    <div class="NewQT-contents">
      <div class="NewQT-title">
        <span>신규 견적 요청</span>
        <CheckLogin></CheckLogin>
      </div>
      <QTLayout :NewQTData = "newQtData"></QTLayout>
    </div>

    <div class="NewQT-footer">
      <router-link to="/NewQT">
        <span class="footer-selected">
          <i class="fas fa-clipboard"></i>
        </span>
      </router-link >
      <router-link  to="/Chat">
        <span>
          <i class="far fa-comment-dots"></i>
        </span>
      </router-link >
      <router-link to="/QTList">
        <span>
          <i class="far fa-copy"></i>
        </span>
      </router-link >
      <router-link to="/UserInfo">
        <span>
          <i class="far fa-address-card"></i>
        </span>
      </router-link >
    </div>
  </div>

</template>

<!--<script src="https://unpkg.com/axios/dist/axios.min.js"></script>-->
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script>

import QTLayout from '@/components/NewQT/QTLayout.vue'
import CheckLogin from '@/components/Common/CheckLogin.vue'

const axios = require('axios').default;

export default {
  name: 'NewQT',
  data() {
        return {
          newQtData: {},
        }
  },
  components: {
    QTLayout: QTLayout,
    CheckLogin:CheckLogin
  },
  created: function(){
     if(this.$route.params.NewQTData !== undefined) {
       this.newQtData = this.$route.params.NewQTData;
     }
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.NewQT-title {
  margin:auto;
  width: 90%;
  height: 60px;
  padding-top: 25px;
  font-size: 1.5rem;
  font-weight: bold;
  display:flex;
}
.NewQT-title span{
  width: 100%;
}
.NewQT-desc {
  margin:auto;
  width: 90%;
  font-size: 0.8rem;
  font-style: italic;
  text-align: right;
  color: #aaa;
}

.NewQT-camera {
  margin:auto;
  width: 90%;
  height: 30px;
  display: flex;
}

.NewQT-camera span:first-child {
  flex:90%;
}

.NewQT-camera span input {
  background-color: #ebebeb;
  height: 30px;
  line-height: 30px;
  width: 95%;
  border-style: none;
  font-size: 1rem;
}

.NewQT-camera span:last-child {
  flex:10%;
}

.NewQT-camera span i {
  color: #ff9999;
  font-size: 2rem;
}

.NewQT-carInfo {
  margin:auto;
  width: 90%;
  height: 90px;
}

.NewQT-carInfo span input {
  background-color: #ebebeb;
  height: 40px;
  line-height: 30px;
  width: 95%;
  border-style: none;
  font-size: 1rem;
  margin-bottom: 5px;
  padding: 5px;
}

.NewQT-itemSelect-wiper {
  width: 90%;
}

.NewQT-itemList {
  width: 90%;
  margin: auto;
}

.NewQT-itemList .list-group .list-group-item {
  padding : 2px;
}

.NewQT-itemList .list-group .list-group-item .container {
  padding : 2px;
}

.NewQT-itemList .list-group .list-group-item .container .row .col:first-child {
  flex : 15%;
}
.NewQT-itemList .list-group .list-group-item .container .row .col:nth-child(2) {
  flex : 60%;
}
.NewQT-itemList .list-group .list-group-item .container .row .col:nth-child(2) .row:first-child {
  height: 30px;
}
.NewQT-itemList .list-group .list-group-item .container .row .col:nth-child(2) .row:first-child {
  height: 30px;
}
.itemList-title {
  font-weight: bold;
  font-size: 1.1rem;
}
.itemList-brand {
  margin-left: auto;
  font-size: 0.8rem;
}
.NewQT-itemList .list-group .list-group-item .container .row .col:nth-child(2) .row:last-child .input-group {
  margin-left:auto;
  width: 80px;
}
.NewQT-itemList .list-group .list-group-item .container .row .col:nth-child(2) .row:last-child .input-group .btn:first-child {
  height: 30px;
  padding: 3px;
  border-radius: 7px 0px 0px 7px;
}
.NewQT-itemList .list-group .list-group-item .container .row .col:nth-child(2) .row:last-child .input-group .btn:last-child {
  height: 30px;
  padding: 3px;
  border-radius: 0px 7px 7px 0px;
}
.NewQT-itemList .list-group .list-group-item .container .row .col:nth-child(2) .row:last-child .input-group .form-control {
  height: 30px;
  padding: 3px;
  text-align: center;
  border-color: #6c757d;
  border-left: none;
  border-right: none;
}
.NewQT-itemList .list-group .list-group-item .container .row .col:last-child {
  flex : 15%;
}

.NewQT-QTMemo {
  width: 90%;
  margin: auto;
}

.NewQT-footer {
  z-index: 100;
  position: fixed;
  display:flex;
  bottom: 0;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  height: 70px;
  border-top: 1px solid #bebebe;
  background: #eeeeee;
}

.footer-selected {
  color : #5d4038;
}

.NewQT-footer a {
  flex:25%;
  text-align: center;
  color: #848180;
  margin-top: 5px;
}

.NewQT-footer a span i {
  font-size: 2.5rem;
}

.swiper-slide {
  height: 160px;
}

.qtConfirm-dealerList {
  margin-bottom: 0px;
  padding-left: 20px;
}
.qtConfirm-itemList {
  width: 90%;
  margin: auto;
  border-style: solid;
  border-width: thin;
  border-radius: 5px;
  border-color: #ddd;
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 5px;
  padding: 3px 5px;
  display: flex;
}
.qtConfirm-itemDel {
  margin-left: auto;
  text-align: right;
  flex: auto;
  align-self: center;
}

.submit-YES {
  margin:auto;
  flex: 50%;
  margin-right: 5px;
  background-color: #acd3ce;
  color: #333;
  font-weight: bold;
  border-color: #cccccc;
  margin-left: 10px;
}
.submit-NO {
  margin:auto;
  flex: 50%;
  margin-left: 5px;
  background-color: #afabab;
  border: none;
  color: #ececec;
}

.custom-control {
  margin-bottom: 20px;
}


</style>
