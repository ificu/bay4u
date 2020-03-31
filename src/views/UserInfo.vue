<template>
  <div class="UserInfo">
    <div class="UserInfo-contents">
      <div class="UserInfo-title">
        <span>사용자 정보</span>
        <CheckLogin></CheckLogin>
      </div>
      <div class="UserInfo-img">
        <img src="@/assets/user-icon.png">
      </div>
      <div class="UserInfo-info">
        <div class="info-name">{{UserInfo.Name}}</div>
        <div v-if="UserInfo.UserType !== 'SITEADMIN'" class="info-tel">{{siteInfo.TEL}}</div>
        <div v-if="UserInfo.UserType !== 'SITEADMIN'" class="info-tel">{{siteInfo.HP}}</div>
        <div v-if="UserInfo.UserType !== 'SITEADMIN'" class="info-addr">{{siteInfo.ADDR}}</div>
      </div>
      <div v-if="adminYn === 'Y' || UserInfo.UserType === 'SITEADMIN'">
        <b-button block class = "btnCarcenter" v-b-toggle.collapse-1>카센터 선택
          <span class="icon-down"><i class="fas fa-chevron-down"></i></span>
        </b-button>
      </div>
      <b-collapse id="collapse-1" class="mt-n6 mb-6 ml-3 carcenterList" v-model="carCenterClicked">
        <b-card no-body header="담당 카센터">
          <b-list-group flush>
            <b-list-group-item button v-for="(center, index) in carCenterLsit" v-bind:key="index" @click="SetCarCenter(center)">{{center.NAME}}</b-list-group-item>
          </b-list-group>
        </b-card>
      </b-collapse>
      <div class="UserInfo-itemMaster">
        <div class="itemMaster-title">내 부품 마스터</div>
        <div class="itemMaster-btn"><b-button>설 정</b-button></div>
      </div>
      <div class="UserInfo-maintenanceMaster">
        <div class="itemMaster-title">내 공임 마스터</div>
        <!--<div class="itemMaster-btn"><b-button @click="showMaintenanceMasterModal">설 정</b-button></div>-->
        <div class="itemMaster-btn"><b-button>설 정</b-button></div>
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
    <!--확인 메시지-->
    <MessageBox v-if="showAlert"  @close="showAlert=false">
      <div slot="header"><h5>알림</h5></div>
        <span slot="body" @click="showAlert=false"><pre>{{alertMsg}}</pre></span>
      <div slot="footer">
        <v-btn depressed small color="#967d5f" dark @click="showAlert=false">확인</v-btn>
      </div>
    </MessageBox>
  </div>
</template>

<script>
import MaintenanceMaster from '@/components/UserInfo/MaintenanceMaster.vue'
import CheckLogin from '@/components/Common/CheckLogin.vue'
import Constant from '@/Constant';
import MessageBox from '@/components/Common/MessageBox.vue'

const axios = require('axios').default;

export default {
  name: 'UserInfo',
  data () {
    return {
      showMaintenanceMaster: false,
      siteInfo: [],
      carCenterLsit: [],
      carCenterClicked: false,
      adminYn : "",
      alertMsg: "",
      showAlert: false,
    }
  },
  methods: {
    showMaintenanceMasterModal() {
      this.showMaintenanceMaster = !this.showMaintenanceMaster;
    },
    GetSiteInfo(){
      this.showSiteInfo = false;
      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_SITE";
      param.payload = {};
      param.payload.FilterExpression = "CODE = :id";
      param.payload.ExpressionAttributeValues = {};
      
      var key = ":id";
      param.payload.ExpressionAttributeValues[key] = this.UserInfo.BsnID;

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        console.log("======= Site result ========");
        console.log(result.data);
        if( result.data.Items.length > 0){
          this.siteInfo = result.data.Items[0];
        }
      });
    },
    GetCarCenter(){
      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_SITE_ADMIN";
      param.payload = {};
      param.payload.FilterExpression = "ADMIN = :id";
      param.payload.ExpressionAttributeValues = {};
      
      var key = ":id";
      param.payload.ExpressionAttributeValues[key] = this.UserInfo.UserID;

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        this.carCenterLsit = result.data.Items;
      });
    },
    SetCarCenter(item){
      this.carCenterClicked = false;
      var param = {};
      param.operation = "list";
      param.tableName = "BAY4U_USER";
      param.payload = {};
      param.payload.FilterExpression = "CODE = :id";
      param.payload.ExpressionAttributeValues = {};
      
      var key = ":id";
      param.payload.ExpressionAttributeValues[key] = item.SITE;

      axios({
        method: 'POST',
        url: Constant.LAMBDA_URL,
        headers: Constant.JSON_HEADER,
        data: param
      })
      .then((result) => {
        if(result.data.Items.length > 0){
          localStorage.setItem('AdminName', this.UserInfo.Name);
          this.UserInfo.BsnID = result.data.Items[0].CODE;
          this.UserInfo.Name = result.data.Items[0].NAME;
          this.UserInfo.EntNo = result.data.Items[0].ENTNO;
          this.UserInfo.UserType = result.data.Items[0].TYPE;

          this.$cookies.set('BsnID', result.data.Items[0].CODE, '864000s');
          this.$cookies.set('UserNM', result.data.Items[0].NAME, '864000s');
          this.$cookies.set('UserType', result.data.Items[0].TYPE, '864000s');
          this.$cookies.set('EntNo', result.data.Items[0].ENTNO, '864000s');

          this.GetSiteInfo();
        }
      });
    }
  },
  components: {
    MaintenanceMaster: MaintenanceMaster,
    CheckLogin:CheckLogin,
    MessageBox: MessageBox,
  },
  computed:{
      UserInfo: {
          get() { return this.$store.getters.UserInfo },
          set(value) { this.$store.dispatch('UpdateUserInfo',value) }
      },
  },
  mounted(){
    this.adminYn = localStorage.getItem('AdminYn');
    this.GetSiteInfo();
    this.GetCarCenter();
  },
  beforeRouteLeave (to, from, next) {
    if(to.name === "Login"){
      next();
    }
    else{
      if(this.UserInfo.UserType === 'SITEADMIN'){
        this.alertMsg = "카센터를 선택 해주세요.";
        this.showAlert = true;
        next(false);
      }
      else{
        next();
      }
    }
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
  display: flex;
}

.UserInfo-title span{
  width: 100%;
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
.btnCarcenter{
  width:200px;
  margin: 5px 5px 5px 16px;
}
.carcenterList{
  width:320px;
}
.icon-down{
  float: right;
}
</style>
