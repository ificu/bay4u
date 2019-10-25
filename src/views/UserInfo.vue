<template>
  <div class="UserInfo">
    <div class="UserInfo-contents">
      <div class="UserInfo-title">
        사용자 정보
      </div>
      <div class="UserInfo-img">
        <img src="@/assets/user-icon.png">
      </div>
      <div class="UserInfo-info">
        <div class="info-name">No.1 카센터</div>
        <div class="info-tel">02-266-5011</div>
        <div class="info-tel">010-2222-3534</div>
        <div class="info-addr">서울 성남시 분당구 성남대로343번길 9</div>
      </div>
      <div class="UserInfo-itemMaster">
        <div class="itemMaster-title">내 부품 마스터</div>
        <div class="itemMaster-btn"><b-button>설 정</b-button></div>
      </div>
      <div class="UserInfo-maintenanceMaster">
        <div class="itemMaster-title">내 공임 마스터</div>
        <div class="itemMaster-btn"><b-button @click="showMaintenanceMasterModal">설 정</b-button></div>
      </div>
    </div>
    <div class="UserInfo-footer">
      <router-link to="/NewQT">
        <span>
          <i class="far fa-clipboard"></i>
        </span>
      </router-link >
      <router-link to="/Chat">
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
        <span class="footer-selected">
          <i class="fas fa-address-card"></i>
        </span>
      </router-link >
    </div>

    <MaintenanceMaster v-if="showMaintenanceMaster" @close="showMaintenanceMaster=false">
      <h4 slot="header">내 공임 마스터</h4>
      <span slot="footer" @click="showMaintenanceMaster=false">
        확인 <i class="fas fa-check"></i>
      </span>
    </MaintenanceMaster>

  </div>
</template>

<script>
import MaintenanceMaster from '@/components/UserInfo/MaintenanceMaster.vue'

export default {
  name: 'UserInfo',
  data () {
    return {
      text: '',
      showMaintenanceMaster: false
    }
  },
  methods: {
    showMaintenanceMasterModal() {
      this.showMaintenanceMaster = !this.showMaintenanceMaster;
    }
  },
  components: {
    MaintenanceMaster: MaintenanceMaster
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.UserInfo-title {
  margin:auto;
  width: 90%;
  padding-top: 25px;
  margin-bottom: 10px;
  font-size: 1.5rem;
  font-weight: bold;
}

.UserInfo-img {
  margin:auto;
  width: 90%;
  text-align: center;
}

.UserInfo-info {
  background-color: #f6f6f6;
  padding: 20px;
  margin-top: 20px;
  text-align: center;
}

.UserInfo-info .info-name {
  font-weight: bold;
  font-size: 1.3rem;
  color: #455a63;
}
.UserInfo-info .info-tel {
  margin-top: 5px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #5d4038;
}
.UserInfo-info .info-addr {
  margin-top: 5px;
}

.UserInfo-margin {
  margin:auto;
  width: 90%;
  display: flex;
  margin-top: 20px;
}
.UserInfo-margin .margin-title {
  flex: 70%;
  font-weight: bold;
  font-size: 1.2rem;
  align-self: center;
}
.UserInfo-margin .margin-value {
  flex: 20%;
}
.UserInfo-margin .margin-value input {
  text-align: right;
}
.UserInfo-margin .margin-unit {
  flex: 10%;
  font-weight: bold;
  font-size: 1.2rem;
  text-align: right;
  align-self: center;
}
.UserInfo-itemMaster {
  width: 90%;
  margin:auto;
  display: flex;
  margin-top: 20px;
}
.UserInfo-itemMaster .itemMaster-title {
  flex: 70%;
  font-weight: bold;
  font-size: 1.2rem;
  align-self: center;
}
.UserInfo-itemMaster .itemMaster-btn {
  flex: 30%;
}
.UserInfo-itemMaster .itemMaster-btn button {
  width: 100%;
  background-color: #696565;
  color: #ececec;
  font-weight: bold;
  border: none;
}
.UserInfo-maintenanceMaster {
  width: 90%;
  margin:auto;
  display: flex;
  margin-top: 20px;
}
.UserInfo-maintenanceMaster .itemMaster-title {
  flex: 70%;
  font-weight: bold;
  font-size: 1.2rem;
  align-self: center;
}
.UserInfo-maintenanceMaster .itemMaster-btn {
  flex: 30%;
}
.UserInfo-maintenanceMaster .itemMaster-btn button {
  width: 100%;
  background-color: #696565;
  color: #ececec;
  font-weight: bold;
  border: none;
}



.UserInfo-footer {
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

.UserInfo-footer a {
  flex:25%;
  text-align: center;
  color: #848180;
  margin-top: 5px;
}

.UserInfo-footer a span i {
  font-size: 2.5rem;
}
.footer-selected {
  color : #5d4038;
}


</style>
