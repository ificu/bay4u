<template>
  <v-card class="mainPage-web">
    <v-toolbar
      color="#9e9e9e"
      dark
      flat
      height = '30px'
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title class="mt-3">
        <div  class="page-title">
          <span class="font-weight-light"><h4>수입차 부품 견적 시스템<img height = "25px" src="@/assets/logo.png"></h4></span>
          <span>
            <v-chip color="#4E342E" text-color="white">
            <v-avatar><v-icon class="mr-1">account_circle</v-icon></v-avatar>
            {{this.UserInfo.Name}}
            </v-chip>
          </span>
        </div>
        <!--<h4>수입차 부품 견적 시스템<img height = "25px" src="@/assets/logo.png"></h4>-->
      </v-toolbar-title>

      <v-spacer></v-spacer>       
      <div class="page-top">
        <div class="download">
          <v-btn color="#546E7A" dark depressed small @click="chromeStore" class="mr-2">
          chrome 웹 스토어
          <v-icon right dark size="20px" small>system_update_alt</v-icon>
          </v-btn>
          <v-btn color="#546E7A" dark depressed small @click="openWindow" >

          채팅알림 다운로드
          <v-icon right dark size="20px" small>system_update_alt</v-icon>
          </v-btn>
        </div>
        <div class="logout">
          <!--<CheckLogin></CheckLogin>-->
          <v-btn color="#90A4AE" dark depressed small @click="logOut">
            로그아웃
            <v-icon right dark size="20px">fas fa-sign-out-alt</v-icon>
          </v-btn>
        </div>
      </div>

      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          fixed-tabs
          background-color="#9e9e9e"
          height="35px"
          class="page-tabs"
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab href="#tab-1" disabled>HOME</v-tab>
          <v-tab href="#tab-2" selected>견적 작업</v-tab>
          <v-tab href="#tab-3" disabled>이력 조회</v-tab>
          <v-tab href="#tab-4" disabled>부품/정비 TIP</v-tab>
          <v-tab href="#tab-5" disabled>영업 관리</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
     <v-tabs-items v-model="tab" class='chatTabItem'>
      <v-tab-item
        v-for="i in 3"
        :key="i"
        :value="'tab-' + i"
      >
        <v-card flat>
        <div class="page-content">
          <!-- Your content goes here -->
          <div class="content-userList">
            <UserListPage v-on:selectChat="setQtInfo" :chatInfo="chatInfo" :showQTId="qtId" v-on:setQtInfo="setQtInfo"></UserListPage>
          </div>

          <div class="content-chatTab">
            <ChatingPage></ChatingPage>
          </div>

          <div class="content-info">
            <InfoPage></InfoPage>
          </div>

          <!-- 알림 메시지 팝업 -->
          <MessageBox v-if="showAlertMsg"  @close="closeMsg(alertMsgPath)">
            <div slot="header"><h5 >알림</h5></div>
            <span slot="body" @click="closeMsg(alertMsgPath)"><pre>{{alertMsg}}</pre>
            </span>
            <div slot="footer" v-if="showAlerMsgBtn">
              <v-btn depressed small color="#967d5f" dark @click="closeMsg(alertMsgPath)"> 확인</v-btn>
            </div>
          </MessageBox>
          
        </div>
       </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script type="text/javascript" src="http://counter.sina.com.cn/ip/" charset="gb2312"></script>       
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script>
import UserListPage from '@/components/Dealer/UserListPage.vue'
import ChatingPage from '@/components/Dealer/ChatingPage.vue'
import InfoPage from '@/components/Dealer/InfoPage.vue'
//import CheckLogin from '@/components/Common/CheckLogin.vue'
import MessageBox from '@/components/Common/MessageBox.vue'

export default {
  name: 'MainPage',
  data () {
    return {
      qtId:'',
      hidden:false,
      showAlertMsg: false,
      showAlerMsgBtn: true,
      qtKey: '',
      chatInfo:[],
      alertMsg: "",
      alertMsgPath: "",
      tab: null,
      items: [
        'HOME', '견적 작업', '이력 조회', '부품/정비 TIP', '영업관리',
      ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    
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
  methods: {
    CheckLogin(){
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
    setQtInfo(info) {
      this.chatInfo = info;
      console.log(this.chatInfo);
    },
    closeMsg(path) {     
      this.showAlertMsg = false;
      this.logOut();
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
    },
    chromeStore()
    {
      let newPage=window.open('https://chrome.google.com/webstore/detail/clickonce-for-google-chro/kekahkplibinaibelipdcikofmedafmb');
    },
    openWindow()
    {
      let newPage=window.open(Constant.LAMBDA_URL.MESSAGE_POPUP + this.UserInfo.UserID);
    }
  },
  components: {
    UserListPage,
    ChatingPage,
    InfoPage,
   // CheckLogin,
    MessageBox
  },
  created : function() {
    // 혹시 모바일에서 접근하는 케이스라면 에러 처리 하자.
    if (navigator.userAgent.match("iPad|iPhone|Mobile|UP.Browser|Android|BlackBerry|Windows CE|Nokia|webOS|Opera Mini|SonyEricsson|opera mobi|Windows Phone|IEMobile|POLARIS") != null) 
    { 
      this.alertMsg = "로그인 정보가 잘못 설정되었습니다.\n다시 로그인 해주세요."
      this.showAlertMsg = !this.showAlertMsg;
      this.alertMsgPath = "Login";
    }

    this.CheckLogin();

    if(this.$route !== undefined && this.$route.query !== undefined && this.$route.query.ID !== undefined){
      
      this.qtId = this.$route.query.ID;
      console.log('ID :', this.qtId);
      // router 초기화
      this.$router.replace({'query': null});
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*
#696565 : 더 짙은 브라운
#afabab : 짙은 부라운
#fcf4df : 베이지
#ff9999 : 옅은 붉은색
#acd3ce : 옅은 녹색
#967d5f : 옅은 브라운
*/
html,body {height:100%; overflow:hidden}

.tab-focus {
  color: #fcf4df;
  font-weight: bold;
}

h4 {
  color: white;
  font-weight: bold;
}

a:hover {
  text-decoration: none;
}

.mainPage-web {
  overflow-y: hidden;
}

.page-content {
  display: flex;
  height: calc(100vh - 80px);
  /*background-color: aqua;*/
}

.page-content .content-userList{
  flex: 15%;
  border-right: 1px solid #aaa;
  /*height: 100%;*/
  background: #f8f9fa;
}
.page-content .content-chatTab{
  flex: 20%;
  padding: 10px;
  /*height: 100%;*/
}
.page-content .content-info{
  flex: 55%;
}
.page-title{
  width:550px;
  display: flex;
  position:absolute;
  top:5px;
}
.page-title span:nth-child(2){
 margin-left: 15px;
 margin-top: 0px;
}
.page-tabs{
  padding-top: 13px;
}
.page-top{
  width: 430px;
  padding-top: 10px
}
.page-top .logout{
  float:right;
}
.download{
  position: absolute;
  top: 5px;
}
</style>
