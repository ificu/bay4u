<template>
  <div class="LoginCheck">
    <div v-if="adminYn === 'Y' && adminName !=='' && adminName !== null" >
      <span class="login-site">{{this.UserInfo.Name}}점 ({{adminName}})</span>
    </div>
    <div v-else>
      <span class="login-site">{{this.UserInfo.Name}}점</span>
    </div>
    <div class="logout-btn">
      <v-btn color="#90A4AE" dark depressed small @click="logOut">
          로그아웃
          <v-icon right dark size="20px">fas fa-sign-out-alt</v-icon>
      </v-btn>
    </div>

  <!-- 알림 메시지 팝업 -->
    <MessageBox v-if="showAlertMsg"  @close="closeMsg(alertMsgPath)">
      <div slot="header"><h5 >알림</h5></div>
      <span slot="body" @click="closeMsg(alertMsgPath)"><pre class="msgBody">{{alertMsg}}</pre>
      </span>
      <div slot="footer" v-if="showAlerMsgBtn">
        <v-btn depressed small color="#967d5f" dark @click="closeMsg(alertMsgPath)"> 확인</v-btn>
      </div>
    </MessageBox>
  </div>
</template>

<script>
import MessageBox from '@/components/Common/MessageBox.vue'

export default {
  name: 'LoginCheck',
  components: {
    MessageBox: MessageBox
  },
  data(){
    return{
      showAlertMsg: false,
      showAlerMsgBtn: true,
      alertMsg: "",
      alertMsgPath: "",
      adminName: "",
      adminYn : "",
    }
  },
  computed:{
    CarInfo: {
        get() { return this.$store.getters.CarInfo },
        set(value) { this.$store.dispatch('UpdateCarInfo',value) }
    },
    UserInfo: {
        get() { return this.$store.getters.UserInfo },
        set(value) { this.$store.dispatch('UpdateUserInfo',value) }
    }
  },
  created : function() {
    if(this.UserInfo.UserID === '')
      this.UserInfo.UserID = this.$cookies.get('UserID');

    if(this.UserInfo.BsnID === '')
      this.UserInfo.BsnID = this.$cookies.get('BsnID');

    if(this.UserInfo.Name === '')
      this.UserInfo.Name = this.$cookies.get('UserNM');

    if(this.UserInfo.UserType === '')
      this.UserInfo.UserType = this.$cookies.get('UserType');

    if(this.$cookies.get('CarNo') !== undefined || this.$cookies.get('CarNo') !== '' || this.$cookies.get('CarNo') !== 'null') {
      this.CarInfo.CarNo = this.$cookies.get('CarNo');
    }
    if(this.$cookies.get('VinNo') !== undefined || this.$cookies.get('VinNo') !== '' || this.$cookies.get('VinNo') !== 'null') {
      this.CarInfo.VinNo = this.$cookies.get('VinNo');
    }

    if(this.UserInfo === null){
      this.alertMsg = "로그인 정보가 없습니다.\n다시 로그인 해주세요."
      this.showAlertMsg = !this.showAlertMsg;
      this.alertMsgPath = "Login";
      return;
    }

    if(this.UserInfo.BsnID === undefined || this.UserInfo.BsnID === null || this.UserInfo.BsnID.length === 0 )
    {
      this.alertMsg = "사이트 정보가 없습니다.\n다시 로그인 해주세요."
      this.showAlertMsg = !this.showAlertMsg;
      this.alertMsgPath = "Login";
      return;
    }

    if(this.UserInfo.UserID === undefined || this.UserInfo.UserID === null || this.UserInfo.UserID === 0 )
    {
      this.alertMsg = "로그인 정보가 없습니다.\n다시 로그인 해주세요."
      this.showAlertMsg = !this.showAlertMsg;
      this.alertMsgPath = "Login";
      return;
    }

    if(this.UserInfo.BsnID === undefined || this.UserInfo.BsnID === null || this.UserInfo.BsnID.length === 0 )
    {
      this.alertMsg = "사이트 정보가 없습니다.\n다시 로그인 해주세요."
      this.showAlertMsg = !this.showAlertMsg;
      this.alertMsgPath = "Login";
      return;
    }
    
    if(this.UserInfo.Name === undefined || this.UserInfo.Name === null || this.UserInfo.Name.length === 0 )
    {
      this.alertMsg = "사이트 정보가 없습니다.\n다시 로그인 해주세요."
      this.showAlertMsg = !this.showAlertMsg;
      this.alertMsgPath = "Login";
      return;
    }
    this.adminYn = localStorage.getItem('AdminYn');
    this.adminName = localStorage.getItem('AdminName');
  },
  updated(){
    this.adminName = localStorage.getItem('AdminName');
  },
  methods:
  {
    closeMsg(path) {     
        this.showAlertMsg = false;
        if(path.length > 0 && path == 'Login')
        {
            this.$router.push('/');
        }
    },

    logOut( )
    {
        var cookiesList = this.$cookies.keys();
        
        for(var i=0; i<cookiesList.length; i++)
        {
          this.$cookies.remove(cookiesList[i]);
        }
     
        this.UserInfo.UserID = "";
        this.UserInfo.BsnID = "";
        this.UserInfo.Name = "";
        this.UserInfo.EntNo = "";
        localStorage.clear();

        this.CarInfo.CarNo = "";
        this.CarInfo.VinNo = "";

        this.$router.push('/');
    }
  }
}
</script>

<style>
.LoginCheck{
  width:400px;
  position:relative;
}
.logout-btn{
  text-align: end;
}
.login-site{
  font-size: 0.54em;
  color: #999;
  float: right;
  margin-bottom: 0px;
  top: -15px;
  right: 0;
  position: absolute;
}
.login-name{
  font-size: 0.54em;
  top: -15px;
  color: #5d4038;
  position: absolute;
}
</style>
